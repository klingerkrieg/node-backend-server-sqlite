
module.exports = (database, Sequelize) => {
    const Produto = database.define('produto', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        preco: {
            type: Sequelize.DOUBLE
        },
        descricao: Sequelize.STRING,
        foto: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        dono: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });
    return Produto
}
