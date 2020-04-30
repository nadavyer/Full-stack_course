
const validPassword = (password) => {
    return password === undefined || password.length < 3 ?
        false : true
}

module.exports = {
    validPassword
}