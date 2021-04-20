import Layout from '@/layout'

export default [
  {
    path: '/statisticalAnalysis',
    component: Layout,
    redirect: '/statisticalAnalysis/statisticalAnalysis-list',
    alwaysShow: true, // will always show the root menu
    name: 'statisticalAnalysis',
    meta: {
      title: '统计分析',
      icon: 'example',
      roles: ['exam_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'partyStatistical',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: {
          title: '党组统计',
          roles: ['lesson_list']
        }
      },
      {
        path: 'memberStatistical',
        component: () => import('@/views/error-page/building'),
        name: 'memberStatistical',
        meta: {
          title: '党员统计',
          roles: ['lesson_list']
        }
      },
      {
        path: 'memberInfoStatistical',
        component: () => import('@/views/error-page/building'),
        name: 'memberInfoStatistical',
        meta: {
          title: '党员信息统计',
          roles: ['lesson_list']
        }
      },
      {
        path: 'partyBuildStatistical',
        component: () => import('@/views/dashboard/activityStatistics_list'),
        name: 'partyBuildStatistical',
        meta: {
          title: '会议活动统计',
          roles: ['lesson_list']
        }
      }
    ]
  }

]
