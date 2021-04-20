import Layout from '@/layout'

export default [
  {
    path: '/course',
    component: Layout,
    redirect: '/course/course-manage',
    alwaysShow: true, // will always show the root menu
    name: 'course',
    meta: {
      title: '课程管理',
      icon: 'lock',
      roles: ['course_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'course-manage',
        component: () => import('@/views/course/course_manage'),
        name: 'course_manage',
        meta: {
          title: '课程列表',
          roles: ['course_manage']
        }
      }
    ]
  }
]
