const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');
const EmployeeQuery = require('./queries/EmployeeQuery');
const PayrollRegistry = require('./queries/PayrollRegistry');

const Query = {
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    // 2. Check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    // 2. if they do, query all the users!
    return ctx.db.query.users({}, info);
  },
  employees: forwardTo('db'),
  async companies(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const data = await ctx.db.query.companies(args, `{ id name }`);
    const companiesRender = data.map(c => ({
      id: c.id,
      value: c.id,
      label: c.name
    }));
    return companiesRender;
  },
  async employeesSelect(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const data = await ctx.db.query.employees(
      args,
      `{ id first_name last_name }`
    );
    const render = data.map(c => ({
      id: c.id,
      value: c.id,
      label: c.first_name + c.last_name
    }));
    return render;
  },
  async companiesList(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    return ctx.db.query.companies(args, info);
  },
  async payrollConfigSelect(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const data = await ctx.db.query.payrollConfigs(
      args,
      `{id name frequency }`
    );
    const render = data.map(c => ({
      id: c.id,
      value: c.id,
      label: c.name,
      frequency: c.frequency
    }));
    return render;
  },
  async payrollTypeSelect(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const data = await ctx.db.query.payrollTypes({}, `{id name }`);
    const render = data.map(c => ({
      id: c.id,
      value: c.id,
      label: c.name
    }));
    return render;
  },
  async payrollTypes(parent, { category }, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    const data = await ctx.db.query.payrollTypes(
      {
        where: {
          category: category
        }
      },
      info
    );
    return data;
  },
  ...EmployeeQuery,
  ...PayrollRegistry
};

module.exports = Query;