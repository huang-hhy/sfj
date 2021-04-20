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
    path: '/config',
    component: Layout,
    redirect: '/config/setting',
    alwaysShow: true, // will always show the root menu
    name: 'config',
    meta: {
      title: '基础设置',
      icon: 'form',
      roles: ['config_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'setting',
        component: () => import('@/views/permission/config'),
        name: 'setting',
        meta: {
          title: '基础设置',
          roles: ['config_setting']
        }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/supplier-manage',
    alwaysShow: true, // will always show the root menu
    name: 'permission',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['auth_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'supplier-manage',
        component: () => import('@/views/permission/supplier_manage'),
        name: 'supplier_manage',
        meta: {
          title: '企业管理',
          roles: ['supplier_manage']
        }
      },
      {
        path: 'role-manage',
        component: () => import('@/views/permission/role_manage'),
        name: 'role_manage',
        meta: {
          title: '角色管理',
          roles: ['role_manage']
        }
      },
      {
        path: 'pack-manage',
        component: () => import('@/views/permission/pack_manage'),
        name: 'pack_manage',
        meta: {
          title: '套餐管理',
          roles: ['pack_manage']
        }
      },
      {
        path: 'menu-manage',
        component: () => import('@/views/permission/auth_manage'),
        name: 'menu_manage',
        meta: {
          title: '菜单管理',
          roles: ['menu_manage']
        }
      }
    ]
  },
  {
    path: '/org',
    component: Layout,
    redirect: '/org/org-list',
    alwaysShow: true, // will always show the root menu
    name: 'org',
    meta: {
      title: '组织管理',
      icon: 'tree-table',
      roles: ['org_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'org-list',
        component: () => import('@/views/permission/org_manage'),
        name: 'org_list',
        meta: {
          title: '组织列表',
          roles: ['org_list']
        }
      },
      {
        path: 'org-type',
        component: () => import('@/views/permission/org_type'),
        name: 'org_type',
        meta: {
          title: '组织类型',
          roles: ['org_type']
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/user-list',
    alwaysShow: true, // will always show the root menu
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'user',
      roles: ['user_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'user-list',
        component: () => import('@/views/permission/user_manage'),
        name: 'user_list',
        meta: {
          title: '用户列表',
          roles: ['user_list']
        }
      },
      {
        path: 'user-type',
        component: () => import('@/views/permission/user_type'),
        name: 'user_type',
        meta: {
          title: '职务管理',
          roles: ['user_type']
        }
      }
    ]
  },
  {
    path: '/sensitive',
    component: Layout,
    redirect: '/sensitive/sensitive-list',
    alwaysShow: true, // will always show the root menu
    name: 'sensitive',
    meta: {
      title: '敏感词库',
      icon: 'language',
      roles: ['sensitive_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'sensitive-list',
        component: () => import('@/views/permission/sensitive'),
        name: 'sensitive_list',
        meta: {
          title: '敏感词库',
          roles: ['sensitive_list']
        }
      }
    ]
  },
  {
    path: '/logs',
    component: Layout,
    redirect: '/logs/logs-list',
    alwaysShow: true, // will always show the root menu
    name: 'logs',
    meta: {
      title: '操作日志',
      icon: 'bug',
      roles: ['logs_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'logs-list',
        component: () => import('@/views/permission/logs'),
        name: 'logs_list',
        meta: {
          title: '操作日志',
          roles: ['logs_list']
        }
      }
    ]
  }
]
