
const validPassword = (password) => {
    return !(password === undefined || password.length < 3)
}

module.exports = {
    validPassword
}