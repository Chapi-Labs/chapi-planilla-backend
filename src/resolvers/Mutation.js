const UserMutation = require('./mutations/UserMutations');
const EmployeeMutation = require('./mutations/EmployeeMutations');
const CompanyMutation = require('./mutations/CompanyMutations');

const Mutation = {
  ...UserMutation,
  ...EmployeeMutation,
  ...CompanyMutation
};

module.exports = Mutation;