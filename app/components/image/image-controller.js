function ImageController() {
	//Your ImageService is a global constructor function what can you do here if you new it up?
	var imageService = new ImageService()
	
	this.getImage = function getImage(){
		imageService.getImage(draw)
	}
	
	function draw(data){
		var imageElem = document.getElementById('body')
		imageElem.style.backgroundImage = `url('${data.url}')`
	}

	this.getImage()
	
}


