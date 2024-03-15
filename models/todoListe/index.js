// models/TodoListe.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const UserModel = require('../user');

const TodoListe = sequelize.define('TodoListe', {
    titre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateCreation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    terminee: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

TodoListe.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user',
    constraints: true, // Activer les contraintes de clé étrangère
    foreignKeyConstraint: true, // Utiliser une contrainte de clé étrangère
    onDelete: 'SET NULL', // Définir le comportement de suppression
    onUpdate: 'CASCADE' // Définir le comportement de mise à jour
});


UserModel.hasMany(TodoListe, {
    foreignKey: 'userId',
    as: 'todoLists'
});
TodoListe.sync()
// update User table if exist without delete
// await Product.sync({ alter: true });
// drop and create User table
// await Product.sync({ force: true });
// create User table if not exist
module.exports = TodoListe;
