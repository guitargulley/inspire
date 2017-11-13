function WeatherService() {
	var url = '//bcw-getter.herokuapp.com/?url=';
	var url2 = 'http://api.openweathermap.org/data/2.5/weather?q=boise&&APPID=bd82255fd0a21fa1238699b9eda2ee35'
	var apiUrl = url + encodeURIComponent(url2);

	var myWeather = {}
	this.getWeather = function (callWhenDone) {
		
		$.get(apiUrl, function (res) {
			res = JSON.parse(res)
			localStorage.setItem('weather', JSON.stringify(res))
			myWeather = {
				city : res.name,
				icon : res.weather[0].icon,
				description : res.weather[0].description,
				kelvin : res.main.temp.toFixed(0),
				celcius : (res.main.temp - 273.15).toFixed(0),
				fahrenheit : (res.main.temp * (9/5) - 459.67).toFixed(0)
			}
			
			callWhenDone(myWeather);
		})
	}
}
