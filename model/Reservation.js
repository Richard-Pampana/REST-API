const Sequelize = require("sequelize");
const db = require("../config/database");
const Apartment = require("./Apartment");

const Reservation = db.define('reservation', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    apartmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Apartment, // Utilisation du modèle Apartment
            key: 'id'
        }
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    guestName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Reservation;
