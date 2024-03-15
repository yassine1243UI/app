const TodoListeModel = require('../../models/todoListe');

exports.getAll = async (req, res) => {
    try {
        const todoLists = await TodoListeModel.findAll();
        return res.status(200).json({ msg: 'OK', todoLists });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.create = async (req, res) => {
    const { titre, description, userId } = req.body;
    try {
        const todoList = await TodoListeModel.create({
            titre,
            description,
            userId
        });
        if (!todoList.id) {
            return res.status(400).json({ msg: 'BAD REQUEST' });
        }
        return res.status(200).json({ msg: 'OK', todoList: todoList.dataValues });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ msg: 'BAD REQUEST', error: error.message });
    }
};

exports.update = async (req, res) => {
    const { titre, description, userId } = req.body;
    const { uuid } = req.params;
    try {
        const [updatedRows] = await TodoListeModel.update(
            { titre, description, userId },
            { where: { id: uuid } }
        );
        if (updatedRows === 0) {
            return res.status(400).json({ msg: 'BAD REQUEST' });
        }
        return res.status(200).json({ msg: 'OK' });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ msg: 'BAD REQUEST', error: error.message });
    }
};

exports.delete = async (req, res) => {
    const { uuid } = req.params;
    try {
        const deletedRows = await TodoListeModel.destroy({ where: { id: uuid } });
        if (deletedRows === 0) {
            return res.status(400).json({ msg: 'BAD REQUEST' });
        }
        return res.status(200).json({ msg: 'OK' });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ msg: 'BAD REQUEST', error: error.message });
    }
};

exports.getById = async (req, res) => {
    const { uuid } = req.params;
    try {
        const todoList = await TodoListeModel.findByPk(uuid);
        if (!todoList) {
            return res.status(400).json({ msg: 'BAD REQUEST' });
        }
        return res.status(200).json({ msg: 'OK', todoList });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ msg: 'BAD REQUEST', error: error.message });
    }
};
