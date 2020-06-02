const Sequelize = require('sequelize');
console.log(process.env.DATABASE_URL)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err => console.log(err));

module.exports = sequelize;