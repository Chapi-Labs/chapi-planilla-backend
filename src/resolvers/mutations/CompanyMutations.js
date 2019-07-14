
const CompanyMutations = {
  async createCompany(parent, {name, professional_risk}, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    // 2. create
    const company = await ctx.db.mutation.createCompany(
      {
        data: {
          name,
          professional_risk: professional_risk/100.0,
          active: true,
          createdBy: { connect: { id: ctx.request.userId } }
        }
      },
      info
    );
    return company;
  },
  async updateCompany(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const updates = { ...args };

    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateCompany(
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

module.exports = CompanyMutations;