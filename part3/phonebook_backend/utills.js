
const getCurrentTime = () => {
    
    let date = new Date()
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const getDay = () => {
        let dayName = days[date.getDay()]
        return dayName
    }

    const getMonth = () => {
        let monthName = months[date.getMonth()]
        return monthName
    }

    const getYear = () => {
        return date.getFullYear()
    }

    const getDayInMonth = () => {
        return date.getDate()
    }

    const getTime = () => {
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    return `${getDay()} ${getMonth()} ${getDayInMonth()} ${getYear()} ${getTime()}`
}

const validAddInput = (person) => {
    return person.name && person.number
}

const nameInPhonebook = (name, persons) => {
    const person = persons.filter(p => p.name.toLowerCase() === name.toLowerCase())
    return person.length
}

 module.exports = {
    getCurrentTime: getCurrentTime,
    validAddInput: validAddInput,
    nameInPhonebook: nameInPhonebook
 }
