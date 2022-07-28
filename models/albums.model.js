const { faker } = require("@faker-js/faker");

const products = generateFakeProducts();
function generateFakeProducts() {
  const products = [];
  for (let i = 0; i < 5; i++) {
    const product = {
      id: faker.datatype.uuid(),
      name: faker.name.jobType(),
      price: faker.commerce.price(),
      img: faker.image.business(),
    };
    products.push(product);
  }
  return products;
}

module.exports = products;
