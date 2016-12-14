import ffanSDK from '../../../core/ffan-sdk.min';
import logger from './logger';

let isReady = false;
let notSurport = false;
let notSurportText = 'jsbridge ready timeout.';

export async function ready(){
  if(isReady){
    return Promise.resolve();
  } else if(notSurport){
    return Promise.reject(notSurportText);
  }
  
	return new Promise((resolve, reject)=>{
		const T = setInterval(()=>{
      if(document.readyState === 'complete') {
        clearInterval(T);
        setTimeout(function() {
          notSurport = true;
          logger({
            err: notSurportText,
            ua: window.navigator.userAgent
          }, 'page');
          reject(notSurportText);
        }, 1000);
      }
		}, 2000);

		ffanSDK.ready(()=>{
			clearInterval(T);
      isReady = true;
			resolve();
		})
	})
}

export function promisify(fnName){
	return (data)=>{
		return new Promise(async (resolve, reject)=>{
			try {
        await ready();
				ffanSDK[fnName]({
					data: data,
					success: function (res){
						resolve(res);
					},
					fail: function (err){
            logger({
              err: err,
              msg: fnName+' call failed.'
            }, 'page');
						reject(err);
					}
				})
			} catch (e) {
				reject(e)
			}
		})
	}
}

export const getUserInfo = promisify('getUserInfo');
export const getPsid = promisify('getPsid');
export const getCity = promisify('getCity');
export const getLocationCity = promisify('getLocationCity');
export const getClientInfo = promisify('getClientInfo');
export const getDevInfo = promisify('getDevInfo');
export const getDevEncryption = promisify('getDevEncryption');
export const isLogin = promisify('isLogin');
export const login = promisify('login');

export async function share (option){
	try {
		await ready();
    ffanSDK['share'](option);
	}	catch (e) {
    console.log(e);
	}
};

export async function register(method, fn){
  try {
    await ready();
		ffanSDK.register(method, fn);
  } catch(e) {
    console.log(e);
  }
};
