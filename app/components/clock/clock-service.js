function ClockService(){

this.updateClock = function updateClock(cb){
    var currentTime = new Date()
    var currentTimeObj = {}
    var currentHours = currentTime.getHours()
    var currentMinutes = currentTime.getMinutes()
    var currentSeconds = currentTime.getSeconds()
    var greeting

    currentMinutes = (currentMinutes < 10 ? "0": "") + currentMinutes
    currentSeconds = (currentSeconds < 10 ? "0": "") + currentSeconds
    var timeOfDay = (currentHours < 12) ? "AM": "PM"
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours
    currentHours = (currentHours == 0) ? 12 : currentHours
    greeting = (timeOfDay == "AM") ? 'Good Morning' : 'Good Evening'
    
    currentTimeObj = {
        hours:currentHours,
        minutes:currentMinutes,
        seconds:currentSeconds,
        timeOfDay: timeOfDay,
        greeting: greeting
    }
    
    cb(currentTimeObj)
}




}