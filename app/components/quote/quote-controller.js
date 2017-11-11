function QuoteController(){

	var quoteService = new QuoteService()

	function draw(data){
		var quoteElem = document.getElementById('quote')

		template = 

		`<div class="row">
		<div class="col-sm-8 col-sm-offset-2 text-center quote-content">
			<h3>${data.quote}</h3>
			<h4 class="author">--${data.author}--</h4>
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
