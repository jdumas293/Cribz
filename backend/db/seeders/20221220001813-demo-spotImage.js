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
        url: 'https://a0.muscache.com/im/pictures/f37d079d-0cc4-43b4-99f9-acd21985f130.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/761f65e5-7022-45bc-aec2-f48e3bb7ec5a.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-716797913778103603/original/32282176-a304-4317-99af-b787a210e447.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/d6323739-eb9a-4ce4-9374-453a06aa16b8.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50939368/original/72a50d17-bd3c-4fe9-93e4-3ac2a7bead28.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-737675916900385663/original/8512ae88-faec-4428-b0cc-84a13dd429b6.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-600762922625870822/original/d0701b75-5a46-499e-9673-3582ca65223f.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-29104113/original/8cf50701-f437-4bac-8fef-5a1ee1b62dbb.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/d83f04a2-b8e8-4ea4-960a-cd2cea91e70e.jpg?im_w=1200',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: ['1', '2', '3', '4', '5', '6', '7', '8', '9'] }
    }, {});
  }
};
