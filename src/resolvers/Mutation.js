const UserMutation = require('./mutations/UserMutations');
const EmployeeMutation = require('./mutations/EmployeeMutations');

const Mutation = {
  ...UserMutation,
  ...EmployeeMutation
};

module.exports = Mutation;