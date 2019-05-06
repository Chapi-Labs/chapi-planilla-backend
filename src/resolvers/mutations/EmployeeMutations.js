const EmployeeMutations = {
  async createEmployee(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const frequencyPromise = ctx.db.query.payrollConfig(
      {
        where: { id: args.payroll_frequency }
      },
      `{ id name frequency }`
    );

    const companyPromise = ctx.db.query.company(
      {
        where: { id: args.company }
      },
      `{ id active name }`
    );
    const [frequency, company] = await Promise.all([
      frequencyPromise,
      companyPromise
    ]);
    const idConfig = frequency.id;
    const idCompany = company.id;
    delete frequency.id;
    delete company.id;
    // 2. create Employee
    const employee = await ctx.db.mutation.createEmployee(
      {
        data: {
          ...args,
          active: true,
          createdBy: { connect: { id: ctx.request.userId } },
          payroll_frequency: {
            create: {
              ...frequency,
              _id: idConfig
            }
          },
          company: { create: { ...company, _id: idCompany } }
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
