
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
          active: true,
          createdBy: { connect: { id: ctx.request.userId }}
        }
      },
      info
    );
    return employee;
  },
  async updateEmployee(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateEmployee(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  }
};

module.exports = EmployeeMutations;