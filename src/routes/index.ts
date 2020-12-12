const routes: any = [
  {
    path: '/',
    component: '@/layouts',
    routes: [
      {
        path: '/',
        component: '@/pages/index',
      },
    ],
  },
];

export { routes };
