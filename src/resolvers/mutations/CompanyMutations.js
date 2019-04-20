
const CompanyMutations = {
  async createCompany(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    // 2. create
    const company = await ctx.db.mutation.createCompany(
        {
            data: {
                ...args,
                active: true,
                createdBy: { connect: { id: ctx.request.userId }}
            }
        },
        info
    );
    return company;
  }
};

module.exports = CompanyMutations;