import Layout from '@/layout'

export default [
  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/exam-manage',
    alwaysShow: true, // will always show the root menu
    name: 'exam',
    meta: {
      title: '考试管理',
      icon: 'example',
      roles: ['exam_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'exam-list',
        component: () => import('@/views/study/exam_list'),
        name: 'exam_list',
        meta: {
          title: '试卷列表',
          roles: ['exam_list']
        }
      },
      {
        path: 'exam-detail',
        component: () => import('@/views/study/exam_detail'),
        name: 'exam_detail',
        hidden: true,
        meta: {
          title: '试题详情',
          roles: ['exam_one']
        }
      },
      {
        path: 'question-list',
        component: () => import('@/views/study/question_list'),
        name: 'question_list',
        meta: {
          title: '题库管理',
          roles: ['question_list']
        }
      }
    ]
  },
  {
    path: '/questionnaire',
    component: Layout,
    redirect: '/questionnaire/questionnaire-list',
    alwaysShow: true, // will always show the root menu
    name: 'questionnaire',
    meta: {
      title: '问卷调查',
      icon: 'example',
      roles: ['study_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'questionnaire-list',
        component: () => import('@/views/study/questionnaire_list'),
        name: 'questionnaire_list',
        meta: {
          title: '调查问卷',
          roles: ['questionnaire_list']
        }
      }
      // ,{
      //   path: 'question-list',
      //   component: () => import('@/views/study/question_list'),
      //   name: 'question_list',
      //   meta: {
      //     title: '题库管理',
      //     roles: ['question_list']
      //   }
      // }
    ]
  },
  {
    path: '/study',
    component: Layout,
    redirect: '/study/lesson-list',
    alwaysShow: true, // will always show the root menu
    name: 'study',
    meta: {
      title: '专题学习',
      icon: 'example',
      roles: ['study_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'lesson-list',
        component: () => import('@/views/study/lesson_list'),
        name: 'lesson_list',
        meta: {
          title: '课程列表',
          roles: ['lesson_list']
        }
      },
      {
        path: 'lesson-cate',
        component: () => import('@/views/study/lesson_cate'),
        name: 'lesson_cate',
        meta: {
          title: '课程分类',
          roles: ['lesson_cate']
        }
      }
    ]
  },
  {
    path: '/guidelines',
    component: Layout,
    redirect: '/guidelines/guidelines-list',
    alwaysShow: true, // will always show the root menu
    name: 'guidelines',
    meta: {
      title: '工作指引',
      icon: 'example'
      // roles: ['guidelines_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'guidelines-list',
        component: () => import('@/views/study/guidelines_list'),
        name: 'guidelines_list',
        meta: {
          title: '工作指引列表'
          // roles: ['guidelines_list']
        }
      },
      {
        path: 'guidelines-cate',
        component: () => import('@/views/study/guidelines_cate'),
        name: 'guidelines_cate',
        meta: {
          title: '工作指引分类'
          // roles: ['guidelines_cate']
        }
      }
    ]
  },
  {
    path: '/partybuildStatistic',
    component: Layout,
    redirect: '/partybuildStatistic/partybuildStatistic-list',
    alwaysShow: true, // will always show the root menu
    name: 'partybuildStatistic',
    meta: {
      title: '数说党建',
      icon: 'example',
      roles: ['study_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'partybuildStatistic-list',
        component: () => import('@/views/study/partybuildStatistic_list'),
        name: 'partybuildStatistic_list',
        meta: {
          title: '数说党建',
          roles: ['lesson_list']
        }
      }
    ]
  }
]
