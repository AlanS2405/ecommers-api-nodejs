const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");

//En la tabla product creamos la columna categoryId
Product.belongsTo(Category)//categoryId
Category.hasMany(Product)

//En la tabla Cart creamos las columnas userId y productId
Cart.belongsTo(User) //userId
User.hasMany(Cart)

Cart.belongsTo(Product) //productId
Product.hasMany(Cart)

//En la tabla Purchase creamos las columnas userId y productId
Purchase.belongsTo(User) //userId
User.hasMany(Purchase)

Purchase.belongsTo(Product) //productId
Product.hasMany(Purchase)