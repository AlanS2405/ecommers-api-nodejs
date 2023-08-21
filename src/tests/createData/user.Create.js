const User = require("../../models/User")

const userCreate = async () => {

    const user = {
        firstName:"Maria",
        lastName:"Becerra",
        email:"maria.becerra@mail.com",
        password:"maria12345",
        phone:"+5491123456789"
    }

    await User.create(user)
}

module.exports = userCreate