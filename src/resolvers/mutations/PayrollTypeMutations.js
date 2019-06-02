
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
  },
  async createPayrollRegistry(parent, args, ctx, info) {
        // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const companyPromise = ctx.db.query.company(
    {
        where: { id: args.company }
    },
    `{ id active name }`
    );
    const configPromise = ctx.db.query.payrollConfig(
      {
        where: { id: args.frequency }
      },
      `{ name payroll_frequency }`
    );
    const [company, config] = await Promise.all([companyPromise, configPromise]);
    let relation_obj = {
      config: { create: { ...config } }
    };
    if (company != null) {
      const idCompany = company.id;
      delete company.id;
      relation_obj = {
          ...relation_obj,
          company: { create: { ...company, _id: idCompany } }
      };
    }
    
     // 2. create
    const registry = await ctx.db.mutation.createPayrollRegistry(
      {
        data: {
          name: args.name,
          date_start: args.date_start,
          date_end: args.date_end,
          ...relation_obj
        }
      },
      info
    );
    return registry;
  }
};

module.exports = PayrollTypeMutations;