const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

//En la tabla product se añade la columna categoryId
Product.belongsTo(Category)//categoryId
Category.hasMany(Product)


