const products = require("../Model/products");
const Data = require("../Data");

const data = async () => {
  await products.deleteMany({});
  await products.insertMany(Data);
};
module.exports = data;
