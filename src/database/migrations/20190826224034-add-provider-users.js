module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'provider', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'provider');
  },
};
