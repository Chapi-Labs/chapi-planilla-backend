
const ConfigMutation = {
  async createConfig(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    // 2. create
    const config = await ctx.db.mutation.createConfig(
      {
        data: {
          ...args.data,
        }
      },
      info
    );
    return config;
  },
};
module.exports = ConfigMutation;