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
        name: 'One House',
        description: 'Walking distance from Comerica Park.',
        price: 1000
      },
      {
        ownerId: 2,
        address: '222 Two Lane',
        city: 'Miami',
        state: 'Florida',
        country: 'United States',
        lat: 25.7617,
        lng: 80.1918,
        name: 'Two House',
        description: 'Beach front property, amazing views.',
        price: 1500
      },
      {
        ownerId: 3,
        address: '333 Three Lane',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States',
        lat: 41.8781,
        lng: 87.6298,
        name: 'Three House',
        description: 'Located downtown, short walk from tourist destinations.',
        price: 1200
      },
      {
        ownerId: 1,
        address: '444 Four Lane',
        city: 'Houston',
        state: 'Texas',
        country: 'United States',
        lat: 29.7604,
        lng: 95.3698,
        name: 'Four House',
        description: 'Located downtown, many restaurants within walking distance.',
        price: 700
      },
      {
        ownerId: 2,
        address: '555 Five Lane',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 40.7128,
        lng: 74.0060,
        name: 'Five House',
        description: 'Penthouse in Chelsea, amazing views, good neighborhood.',
        price: 1400
      },
      {
        ownerId: 3,
        address: '666 Six Lane',
        city: 'Seattle',
        state: 'Washington',
        country: 'United States',
        lat: 40.7128,
        lng: 74.0060,
        name: 'Six House',
        description: 'Located on lake.',
        price: 550
      },
      {
        ownerId: 1,
        address: '777 Seven Lane',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States',
        lat: 40.7128,
        lng: 74.0060,
        name: 'Seven House',
        description: 'Come gamble.',
        price: 600
      },
      {
        ownerId: 2,
        address: '888 Eight Lane',
        city: 'Naples',
        state: 'Florida',
        country: 'United States',
        lat: 40.7128,
        lng: 74.0060,
        name: 'Eight House',
        description: 'Come enjoy the sunshine.',
        price: 850
      },
      {
        ownerId: 3,
        address: '999 Nine Lane',
        city: 'Wolfeboro',
        state: 'New Hampshire',
        country: 'United States',
        lat: 40.7128,
        lng: 74.0060,
        name: 'Nine House',
        description: 'Located on Lake Winnipesaukee',
        price: 500
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['111 One Lane', '222 Two Lane', '333 Three Lane', '444 Four Lane', '555 Five Lane', '666 Six Lane', '777 Seven Lane', '888 Eight Lane', '999 Nine Lane'] }
    }, {});
  }
};
