module.exports = (sequelize, DataTypes) => {
    return sequelize.define('task', {
        taskName: DataTypes.STRING,
        dueDate: DataTypes.DATE,
        timeOfTask: DataTypes.INTEGER,
        priority: DataTypes.STRING,
        taskCompleted: DataTypes.BOOLEAN
    });
};