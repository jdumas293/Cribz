'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'spot1.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'spot2.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'spot3.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'spot4.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'spot5.png',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['spot1.png', 'spot2.png', 'spot3.png', 'spot4.png', 'spot5.png'] }
    }, {});
  }
};
