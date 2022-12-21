'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '111 One Lane',
        city: 'Detroit',
        state: 'Michigan',
        country: 'United States',
        lat: 42.3314,
        lng: 83.0458,
        name: 'One Manor',
        description: 'Walking distance from Comerica Park.',
        price: 123
      },
      {
        ownerId: 2,
        address: '222 Two Lane',
        city: 'Miami',
        state: 'Florida',
        country: 'United States',
        lat: 25.7617,
        lng: 80.1918,
        name: 'Two Manor',
        description: 'Beach front property, amazing views.',
        price: 456
      },
      {
        ownerId: 3,
        address: '333 Three Lane',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States',
        lat: 41.8781,
        lng: 87.6298,
        name: 'Three Manor',
        description: 'Located downtown, short walk from tourist destinations.',
        price: 789
      },
      {
        ownerId: 1,
        address: '444 Four Lane',
        city: 'Houston',
        state: 'Texas',
        country: 'United States',
        lat: 29.7604,
        lng: 95.3698,
        name: 'Four Manor',
        description: 'Located downtown, many restaurants within walking distance.',
        price: 234
      },
      {
        ownerId: 2,
        address: '555 Five Lane',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 40.7128,
        lng: 74.0060,
        name: 'Five Manor',
        description: 'Penthouse in Chelsea, amazing views, good neighborhood.',
        price: 1000
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['111 One Lane', '222 Two Lane', '333 Three Lane', '444 Four Lane', '555 Five Lane'] }
    }, {});
  }
};
