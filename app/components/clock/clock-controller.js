function ClockController() {
    var clockService = new ClockService()


    function draw(currentTimeObj) {
        var template = ''
        var clockElem = document.getElementById('clock')
        template += `
        <div class="time">
            <div class="text-center hours">
                <h1> ${currentTimeObj.hours}</h1>
            </div>
            <div class="colon">
                <h1>:</h1>
            </div>
            <div class="text-center minutes">
                <h1> ${currentTimeObj.minutes}</h1>
            </div>
            <div class="colon"> 
                <h1>:</h1>
            </div>
            <div class="text-center seconds">
                <h1> ${currentTimeObj.seconds}</h1>
            </div>
            <div class="text-center time-of-day">
                <h1> ${currentTimeObj.timeOfDay}</h1>
            </div>
        <div class="row">
            <div class="col-sm-6 col-sm-offset-3 text-center greeting">
                <h2>${currentTimeObj.greeting}</h2>
            </div>
        </div>
            
            `
        clockElem.innerHTML=template
    }


    this.updateClock = function updateClock() {
        clockService.updateClock(draw)
    }

    this.updateClock()
    
}