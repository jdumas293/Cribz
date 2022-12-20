'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'example1.jpg'
      },
      {
        reviewId: 2,
        url: 'example2.jpg'
      },
      {
        reviewId: 3,
        url: 'example3.jpg'
      },
      {
        reviewId: 4,
        url: 'example4.jpg'
      },
      {
        reviewId: 5,
        url: 'example5.jpg'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['example1.jpg', 'example2.jpg', 'example3.jpg', 'example4.jpg', 'example5.jpg'] }
    }, {});
  }
};
