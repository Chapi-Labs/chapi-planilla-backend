const CompanyMutation = require('./mutations/CompanyMutations');
const ConfigMutation = require('./mutations/ConfigMutation');
const EmployeeMutation = require('./mutations/EmployeeMutations');
const PayrollMutation = require('./mutations/PayrollConfigMutation');
const PayrollTypeMutation = require('./mutations/PayrollTypeMutations');
const UserMutation = require('./mutations/UserMutations');

const Mutation = {
  ...CompanyMutation,
  ...ConfigMutation,
  ...EmployeeMutation,
  ...PayrollMutation,
  ...PayrollTypeMutation,
  ...UserMutation,
  
};

module.exports = Mutation;