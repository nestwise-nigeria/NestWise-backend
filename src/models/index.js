const User = require('./userModel');
const Property = require('./propertyModel');
const Plan = require('./planModel')
const Subscription = require('./Subscription')

function associateModels() {
  User.hasMany(Property, { foreignKey: 'authorId', as: 'properties' });
  Property.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
  Plan.hasMany(Subscription, { as: 'plan'})
  Subscription.belongsTo(Plan, { foreignKey: 'planId', as: 'plan' });
  Subscription.belongsTo(User, { foreignKey: 'agentId', as: 'agent'});
}

module.exports = associateModels;