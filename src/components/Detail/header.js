import { Link } from 'react-router'

export const Header = (props) => {
  const { data, showSize, createUrl } = props
  const latestVersions = data && data.versions && data.versions[0] || {}
  const preVersions = data && data.versions && data.versions[1] || {}
  latestVersions.reviewStatus = 1

  return <div>
    <ul>
      { !latestVersions.reviewStatus && 
        <li>
          <div>{preVersions.codeVersion || `0.0.0`}</div>
          <div>已发布</div>
        </li>
      }
      <li>
        <a>
          <div>{latestVersions.codeVersion || `0.0.0`}</div>
          <div>已发布</div>
        </a>
      </li>
    </ul>
    { latestVersions.reviewStatus && <Link to={createUrl}><button>发布新版本</button></Link> }
    <hr/>
  </div>
}
