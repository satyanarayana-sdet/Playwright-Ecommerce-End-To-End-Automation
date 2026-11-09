const base = require('@playwright/test');

exports.customtest = base.test.extend({

    // Custom fixture
    testDataForOrder: {
        category: "Men",
        subCategory: "Tshirts",
        productName: "Men Tshirt",

        cardDetails: {
            name_on_card: "John Doe",
            card_number: "1234567890123456",
            cvc: "123",
            expiry_month: "12",
            expiry_year: "2029"
        }
    }

});