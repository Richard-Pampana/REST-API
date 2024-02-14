const Sequelize = require("sequelize");
const db = require("../config/database");

const Apartment = db.define('apartment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    surface_area: Sequelize.INTEGER,
    capacity: Sequelize.INTEGER,
    address: Sequelize.STRING,
    availability: Sequelize.BOOLEAN,
    price_per_night: Sequelize.DECIMAL(10, 2)
});

module. exports = Apartment;
