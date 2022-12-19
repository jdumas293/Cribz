'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-04-09',
        endDate: '2023-04-16'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2023-05-10',
        endDate: '2023-05-20'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2023-07-09',
        endDate: '2023-07-22'
      },
      {
        spotId: 4,
        userId: 3,
        startDate: '2023-04-14',
        endDate: '2023-04-20'
      },
      {
        spotId: 5,
        userId: 3,
        startDate: '2023-10-09',
        endDate: '2023-10-12'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['2023-04-09', '2023-05-10', '2023-07-09', '2023-04-14', '2023-10-09'] }
    }, {});
  }
};
