const ConfigMutation = require('./mutations/ConfigMutation');
const CompanyMutation = require('./mutations/CompanyMutations');
const EmployeeMutation = require('./mutations/EmployeeMutations');
const PayrollMutation = require('./mutations/PayrollConfigMutation');
const UserMutation = require('./mutations/UserMutations');


const Mutation = {
  ...ConfigMutation,
  ...CompanyMutation,
  ...EmployeeMutation,
  ...PayrollMutation,
  ...UserMutation,
  
};

module.exports = Mutation;