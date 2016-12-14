export function getImageUrl(url, height, width) {
  if(!url) {
    return null;
  }
	if(typeof width === 'undefined') {
		width = height;
	}
  return `http:\/\/timg.ffan.com/convert/resize/url_${url}/${height && 'width_' + width + '/'}${height && 'height_' + height + '/'}tfs/x.png`
}
