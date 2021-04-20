import Layout from '@/layout'

export default [
  {
    path: '/article',
    component: Layout,
    redirect: '/article/article-manage',
    alwaysShow: true, // will always show the root menu
    name: 'article',
    meta: {
      title: '文章管理',
      icon: 'education',
      roles: ['article_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'article-manage',
        component: () => import('@/views/article/article_manage'),
        name: 'article_manage',
        meta: {
          title: '文章列表',
          roles: ['article_manage']
        }
      },
      {
        path: 'article-cate',
        component: () => import('@/views/article/article_cate'),
        name: 'article_cate',
        meta: {
          title: '频道列表',
          roles: ['article_cate']
        }
      }

    ]
  },
  {
    path: '/rotation',
    component: Layout,
    redirect: '/rotation/rotation-manage',
    meta: {
      title: 'banner管理',
      icon: 'guide',
      roles: ['rotation_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'rotation-list',
        component: () => import('@/views/article/rotation_manage'),
        name: 'rotation_list',
        meta: {
          title: 'banner列表',
          roles: ['rotation_list']
        }
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/notice-manage',
    meta: {
      title: '头条管理',
      icon: 'eye-open',
      roles: ['notice_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'notice-list',
        component: () => import('@/views/article/notice_manage'),
        name: 'notice_list',
        meta: {
          title: '头条列表',
          roles: ['notice_list']
        }
      }
    ]
  }
]
