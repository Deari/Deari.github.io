const fs = require('fs-extra')
const webpack = require('webpack')
const debug = require('debug')('app:bin:compile')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')
const GitRepo = require('git-repository');

// Wrapper around webpack to promisify its compiler and supply friendly logging
const webpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)

    compiler.run((err, stats) => {
      if (err) {
        debug('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      debug('Webpack compile completed.')
      debug(stats.toString(project.compiler_stats))

      if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.')
        debug(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.')
        debug(jsonStats.warnings.join('\n'))
      } else {
        debug('No errors or warnings encountered.')
      }
      resolve(jsonStats)
    })
  })

const compile = () => {
  debug('Starting compiler.')
  return Promise.resolve()
    .then(() => webpackCompiler(webpackConfig))
    .then(stats => {
      if (stats.warnings.length && project.compiler_fail_on_warning) {
        throw new Error('Config set to fail on warning, exiting with status code "1".')
      }
      debug('Copying static assets to dist folder.')
      fs.copySync(project.paths.public(), project.paths.dist())
    })
    .then(() => {
      debug('Compilation completed successfully.')
      gitDeploy();
    })
    .catch((err) => {
      debug('Compiler encountered an error.', err)
      process.exit(1)
    })
}

compile()

const getRemote = (slot) => {
  slot = slot || '';
  const website  = `http://open.${slot}.ffan.net`;
  return {
    name: 'origin',
    url: 'git@10.77.144.192:web-fe/colosseum-build.git',
    website,
  }
};

async function gitDeploy(){
  // By default deploy to the staging deployment slot
  const remote = getRemote(process.argv.includes('--production') ? null : 'sit');

  // Initialize a new Git repository inside the `/build` folder
  // if it doesn't exist yet
  const repo = await GitRepo.open('dist', { init: true });
  await repo.setRemote(remote.name, remote.url);

  // Fetch the remote repository if it exists
  if ((await repo.hasRef(remote.url, 'master'))) {
    await repo.fetch(remote.name);
    await repo.reset(`${remote.name}/master`, { hard: true });
    await repo.clean({ force: true });
  }

  // Build the project in RELEASE mode which
  // generates optimized and minimized bundles
  // process.argv.push('--release');

  try {
    // Push the contents of the build folder to the remote server via Git
    await repo.add('--all .');
    await repo.commit('Update');
    await repo.push(remote.name, 'master');
    // Check if the site was successfully deployed
    const response = await fetch(remote.website);
    console.log(`${remote.website} -> ${response.statusCode}`);

  } catch (e) {
    console.log('-- deploy error --');
    console.log(e);
  }
}
