const PayrollConfigMutations = {
  async createPayrollConfig(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    // 2. create config
    const config = await ctx.db.mutation.createPayrollConfig(
      {
        data: {
          ...args
        }
      },
      info
    );
    return config;
  },
};

module.exports = PayrollConfigMutations;
