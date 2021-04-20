import Layout from '@/layout'

export default [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: '首页',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/operate-log',
    alwaysShow: true, // will always show the root menu
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'lock',
      roles: ['system'] // you can set roles in root nav
    },
    children: [
      {
        path: 'operate-log',
        component: () => import('@/views/system/operate_log'),
        name: 'operate_log',
        meta: {
          title: '操作日志',
          roles: ['operate_log']
        }
      }
    ]
  },
  {
    path: '/dataSum',
    component: Layout,
    // meta: { title: '数据统计', icon: 'dashboard', roles: ['data'] },
    children: [
      {
        path: '/data',
        component: () => import('@/views/data/data'),
        name: 'data',
        meta: { title: '数据统计', icon: 'dashboard', roles: ['data'] }
      }
    ]
  }
]
