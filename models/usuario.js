module.exports = (database, Sequelize) => {
    const Usuario = database.define('usuario', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    return Usuario
}

