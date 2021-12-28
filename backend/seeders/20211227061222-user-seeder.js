'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('users', [
        {
          firstName: "Laurissa",
          lastName: "Thorn",
          address: "1101 Holmes Ave Canton, Mississippi(MS)",
          postcode: "39046",
          phone: "(601) 667-3461",
          email: "thorn.laurissa@email.com",
          password: "insert_hashed_password_here"
        },
        {
          firstName: "Alice",
          lastName: "Merchant",
          address: "5911 Roberts Rd Corryton, Tennessee(TN)",
          postcode: "37721",
          phone: "(865) 687-7338",
          email: "merchant.alice@email.com",
          password: "insert_hashed_password_here"
        },
        {
          firstName: "Zack",
          lastName: "Sherburne",
          address: "241 Dawsey St Cordova, South Carolina(SC)",
          postcode: "29039",
          phone: "(803) 535-3338",
          email: "sherburne.zack@email.com",
          password: "insert_hashed_password_here"
        },
        {
          firstName: "Houston",
          lastName: "Sergeant",
          address: "1451 Manor Ct Fort Gibson, Oklahoma(OK)",
          postcode: "74434",
          phone: "(918) 682-6288",
          email: "sergeant.houston@email.com",
          password: "insert_hashed_password_here"
        },
        {
          firstName: "Hugo",
          lastName: "Gold",
          address: "1233 Promontory Path Marietta, Georgia(GA)",
          postcode: "30062",
          phone: "(770) 321-8672",
          email: "gold.hugo@email.com",
          password: "insert_hashed_password_here"
        }
      ]);
    },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('users', {}, null)
  }
};
