function ImageService() {
	var url = '//bcw-getter.herokuapp.com/?url=';
	var url2 = 'http://www.splashbase.co/api/v1/images/random?images_only=true'
	var apiUrl = url + encodeURIComponent(url2);

	this.getImage = function getImage(callWhenDone) {
		// ^^^^^^^ How do you call this function?
		return $.get(apiUrl, function (res) {
			
			res = JSON.parse(res)
			console.log('Image Data:', res)
			if(res.large_url == null){
				getImage(callWhenDone)
			}
			callWhenDone(res)
		})
	}
}
