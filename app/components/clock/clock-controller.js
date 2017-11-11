function ClockController() {
    var clockService = new ClockService()


    function draw(currentTimeObj) {
        var template = ''
        var clockElem = document.getElementById('clock')
        template += `
             <div class="col-sm-4">
                 <h1>${currentTimeObj.hours}:${currentTimeObj.minutes}:${currentTimeObj.seconds} ${currentTimeObj.timeOfDay}</h1>
             </div>
            `
        clockElem.innerHTML=template
    }


    this.updateClock = function updateClock() {
        clockService.updateClock(draw)
    }

    this.updateClock()
}