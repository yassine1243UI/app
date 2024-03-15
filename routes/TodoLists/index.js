const todoListRoute = require('express').Router(),
    todoListController = require('../../controller/todoListe');
const {checkIsAuth} = require("../../config/jwtConfig");

module.exports = (app) => {
    todoListRoute.get('/todoListe', checkIsAuth , todoListController.getAll)
    todoListRoute.post('/todoListe', checkIsAuth, todoListController.create)
    todoListRoute.put('/todoListe/:uuid', checkIsAuth, todoListController.update)
    todoListRoute.delete('/todoListe/:uuid', checkIsAuth, todoListController.delete)
    todoListRoute.get('/todoListe/:uuid', checkIsAuth, todoListController.getById)
    app.use('/api/v1', todoListRoute)
}