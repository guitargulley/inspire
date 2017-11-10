function QuoteController(){

	var quoteService = new QuoteService()

	function draw(data){
		var quoteElem = document.getElementById('quote')

		template = 

		`<div class="row">
		<div class="col-sm-8 col-sm-offse-2 text-center">
			<h1>${data.quote}</h1>
			<h4>${data.author}</h4>
		</div>
	</div>`

	quoteElem.innerHTML = template

	}
	this.getQuote = function getQuote(){
		quoteService.getQuote(draw)
		console.log('here')
	}
	
	// this.getQuote()
}
