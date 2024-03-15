const userRoute = require('express').Router(),
    userController = require('../../controller/user');
const {checkIsAuth} = require("../../config/jwtConfig");

module.exports = (app) => {
    userRoute.get('/users',  userController.getAll)
    userRoute.post('/user', userController.create)
    userRoute.put('/user/:uuid', userController.update)
    userRoute.delete('/user/:uuid', checkIsAuth, userController.delete)
    userRoute.get('/user/:uuid', userController.getById)
    app.use('/api/v1', userRoute)
}