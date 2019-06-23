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
    const employees = data.map((e) => {
      let salary_rate = e.base_salary;
      const salary = e.base_salary;
      if (e.payroll.frequency === 'MONTHLY') {
        salary_rate = (salary * 12) / 52 / 48;
      } else if (e.payroll.frequency === 'WEEKLY') {
        salary_rate = (salary * 12 * 4) / 52 / 48;
      } else if (e.payroll.frequency === 'BI_WEEKLY') {
        salary_rate = (salary * 12 * 2) / 52 / 48;
      }
      e.hourly_rate = salary_rate;
      return e;
    });
    return employees;
  }
};

module.exports = EmployeeQuery;
