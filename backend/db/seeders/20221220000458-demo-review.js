'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'Was not able to get into the spot',
        stars: 1
      },
      {
        spotId: 2,
        userId: 1,
        review: 'This place was awesome!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'It was okay.',
        stars: 3
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Definitely worth the money.',
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Too expensive!',
        stars: 2
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Good place to stay.',
        stars: 5
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['I was haunted by a ghost!', 'This place was awesome!', 'It was okay.', 'Definitely worth the money.', 'Too expensive!'] }
    }, {});
  }
};
