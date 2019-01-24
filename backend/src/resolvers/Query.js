const {forwardTo} = require('prisma-binding');
const {hasPermission} = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    if(!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({
      where: {id: ctx.request.userId}
    }, info);
  },
  async users(parent, args, ctx, info) {
    if(!ctx.request.userId) {
      throw new Error('You must be logged in')
    }
    
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    return ctx.db.query.users({}, info);

  },
  async order(parents, args, ctx, info){
    if(!ctx.request.userId) {
      throw new Error('You must be logged in');
    }

    const order = await ctx.db.query.order({
      where: {id: args.id},
    });

    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.permission.includes('ADMIN');

    if(!ownsOrder || !hasPermissionToSeeOrder) {
      throw new Error('You can\'t see me');
    }

    return order;
  } 
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // }
};

module.exports = Query;
