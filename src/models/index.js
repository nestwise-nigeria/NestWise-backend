const User = require('./userModel');
const Property = require('./propertyModel');

function associateModels() {
  User.hasMany(Property, { foreignKey: 'authorId', as: 'properties' });
  Property.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
}

module.exports = associateModels;