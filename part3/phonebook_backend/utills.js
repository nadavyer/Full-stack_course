
const getCurrentTime = () => {
    
    const getDay = () => {
        var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        var d = new Date()
        var dayName = days[d.getDay()]
        return dayName
    }

    return getDay() //todo: stoped here
}

 module.exports = {
     getCurrentTime: getCurrentTime
 }
