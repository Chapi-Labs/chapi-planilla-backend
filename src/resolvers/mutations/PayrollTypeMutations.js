
const PayrollTypeMutations = {
  async createPayrollType(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    // 2. create
    const company = await ctx.db.mutation.createPayrollType(
      {
        data: {
          ...args,
        }
      },
      info
    );
    return company;
  },
  async updatePayrollType(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const updates = { ...args };

    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updatePayrollType(
      {
        data: {
          ...updates
        },
        where: {
          id: args.id
        }
      },
      info
    );
  }
};

module.exports = PayrollTypeMutations;