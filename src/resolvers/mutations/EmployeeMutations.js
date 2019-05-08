const EmployeeMutations = {
  async createEmployee(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const findEmployee = await ctx.db.query.employee({
      where: { email: args.email }
    }, `{ id }`);
    if (findEmployee) {
      throw new Error('El empleado ya existe');
    }
    if (args.payroll_frequency == null || args.company == null) {
      throw new Error('Formulario incompleto')
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
    let relation_obj = {};
    if (frequency != null) {
      const idConfig = frequency.id;
      delete frequency.id;
      relation_obj = {
        ...relation_obj,
        payroll_frequency: {
          create: {
            ...frequency,
            _id: idConfig
          }
        }
      }
    }
    if (company != null) {
      const idCompany = company.id;
      delete company.id;
      relation_obj = {
        ...relation_obj,
        company: { create: { ...company, _id: idCompany } }
      };
    }
    // 2. create Employee
    const employee = await ctx.db.mutation.createEmployee(
      {
        data: {
          ...args,
          active: true,
          createdBy: { connect: { id: ctx.request.userId } },
          ...relation_obj
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
        data: {
          ...updates,
          company: {
            update: {
              name: updates.company
            }
          }
        },
        where: {
          id: args.id
        }
      },
      info
    );
  }
};

module.exports = EmployeeMutations;
