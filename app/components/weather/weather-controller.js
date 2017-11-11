function WeatherController(){
	var weatherService = new WeatherService();
	


	function draw(myWeather){
		var weatherElem = document.getElementById('weather')
		template = `
		<div class="row">
			<div class="col-sm-2 col-sm-offset-10">
				<div class="row">
					<div class="col-sm-6 text-left">
						<img src="http://openweathermap.org/img/w/${myWeather.icon}.png">
						<h4>${myWeather.city}</h4>
					</div>
					<div class="col-sm-6 text-left">
						<h3>${myWeather.fahrenheit}&#8457</h3>
						<h5>${myWeather.description}</h5>
					</div>
				</div>
			</div>
		</div>
		`
		weatherElem.innerHTML=template
	}
	this.getWeather = function getWeather(){
		weatherService.getWeather(draw)
	}
		//What can you do with this weather object?
	

}
