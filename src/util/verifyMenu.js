const roleRouter = {
  coustomer: [{
    name: 'product',
  },
  {
    name: 'productList',
  },
  {
    name: 'productAdd',
  },
  {
    name: 'home',
  },
  {
    name: 'statistics',
  },
  ],
  admin: [{
    name: 'product',
  },
  {
    name: 'productList',
  },
  {
    name: 'productAdd',
  },
  {
    name: 'category',
  },
  {
    name: 'home',
  },
  {
    name: 'statistics',
  },
  ],
};

export default function getRouterName(role, routes) {
  const allowRouterName = roleRouter[role].map((item) => item.name);
  const routerList = routes.filter((r) => {
    const obj = r.children;
    if (allowRouterName.indexOf(r.name) !== -1) {
      const children = obj;
      // eslint-disable-next-line no-param-reassign
      r.children = children.filter((c) => allowRouterName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return routerList;
}
