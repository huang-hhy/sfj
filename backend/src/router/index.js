import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
// import nestedRouter from './modules/nested'
import article from './modules/article'
import study from './modules/study'
import work from './modules/work'
import count from './modules/count'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/license',
    component: () => import('@/views/login/license'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/desktop',
    component: () => import('@/views/sass-platform/sass_platform'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 权限管理start
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        // component: () => import('@/views/sass-platform/sass_platform'),
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
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
          title: '用户类型',
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
  },
  // 权限管理end
  ...article,
  ...study,
  ...work,
  ...count,
  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },
  //
  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
