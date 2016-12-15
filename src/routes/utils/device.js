import {getParamByName} from './urlUtil.js';

export const isIOS = ()=>{
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

export const isAndroid = ()=>{
  return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
}

export const getAppVersion = ()=>{
  return getParamByName('app_version');
}
