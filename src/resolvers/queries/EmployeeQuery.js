const EmployeeQuery = {
  async findEmployee(parent, { company_id }, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const data = await ctx.db.query.employees(
      {
        where: {
          company: {
            _id: company_id
          }
        }
      },
      info
    );
    return data;
  }
};

module.exports = EmployeeQuery;
