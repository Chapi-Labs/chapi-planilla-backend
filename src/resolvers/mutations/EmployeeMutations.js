
const EmployeeMutations = {
  async createEmployee(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    // 2. create Employee
    const employee = await ctx.db.mutation.createEmployee(
        {
            data: {
                ...args,
                active: true
            }
        },
        info
    );
    return employee;
  }
};

module.exports = EmployeeMutations;