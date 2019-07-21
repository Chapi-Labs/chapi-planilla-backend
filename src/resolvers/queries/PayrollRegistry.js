const PayrollRegistry = {
  async findPayrollRegistry(parent, { company_id }, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    let where = {}
    if (company_id != null) {
      where = {
        company: {
          _id_in: [company_id]
        }
      }
    }
    const data = await ctx.db.query.payrollRegistries(
      {
        where
      },
      info
    );
    return data;
  }
};

module.exports = PayrollRegistry;
