import Layout from '@/layout'

export default [
  {
    path: '/life',
    component: Layout,
    redirect: '/life/branch-party-meeting',
    alwaysShow: true,
    name: 'life',
    meta: {
      title: '党组织生活',
      icon: 'example',
      roles: ['life_manage']
    },
    children: [
      {
        path: 'org-life-list',
        component: () => import('@/views/work/org_life_list'),
        name: 'org_life_list',
        meta: {
          title: '会议列表',
          roles: ['org_life_list']
        }
      },
      {
        path: 'org-activity-list',
        component: () => import('@/views/work/org_activity_list'),
        name: 'org_life_list',
        meta: {
          title: '活动列表',
          roles: ['org_life_list']
        }
      },
      {
        path: 'org-life-cate',
        component: () => import('@/views/work/org_life_cate'),
        name: 'org_life_cate',
        meta: {
          title: '会议活动分类',
          roles: ['org_life_cate']
        }
      }
    ]
  },
  {
    path: '/work',
    component: Layout,
    redirect: '/work/branch-party-meeting',
    alwaysShow: true,
    name: 'work',
    meta: {
      title: '党务工作',
      icon: 'example',
      roles: ['work_manage']
    },
    children: [
      // {
      //   path: 'org-relation-transfer',
      //   component: () => import('@/views/work/org_relation_transfer'),
      //   name: 'org_relation_transfer',
      //   meta: {
      //     title: '组织关系转接',
      //     roles: ['org_relation_transfer']
      //   }
      // },
      {
        path: 'floating-party-members',
        component: () => import('@/views/work/floating_party_members'),
        name: 'floating_party_members',
        meta: {
          title: '流动党员',
          roles: ['floating_party_members']
        }
      },
      {
        path: 'recruiting-party-members',
        component: () => import('@/views/work/recruiting_party_members'),
        name: 'recruiting_party_members',
        meta: {
          title: '发展党员',
          roles: ['recruiting_party_members']
        }
      },
      {
        path: 'recruiting-party-members-process-list',
        component: () => import('@/views/work/recruiting_party_members_process_list'),
        name: 'recruiting_party_members_process_list',
        meta: {
          title: '发展党员流程列表',
          roles: ['recruiting_party_members_process_list']
        }
      },
      {
        path: 'recruiting-party-members-process',
        component: () => import('@/views/work/recruiting_party_members_process'),
        name: 'recruiting_party_members_process',
        meta: {
          title: '发展党员流程',
          roles: ['recruiting_party_members_process']
        }
      },
      {
        path: 'recruiting-party-members-list',
        component: () => import('@/views/work/recruiting_party_members_list'),
        name: 'recruiting_party_members_list',
        meta: {
          title: '发展党员列表',
          roles: ['recruiting_party_members_process']
        }
      },
      {
        path: 'custom',
        component: () => import('@/views/work/custom'),
        name: 'custom',
        meta: {
          title: '自定义表单',
          roles: ['']
        }
      },
      {
        path: 'party-fee-payment',
        component: () => import('@/views/work/party_fee_payment'),
        name: 'party_fee_payment',
        meta: {
          title: '党费缴纳',
          roles: ['party_fee_payment']
        }
      },
      {
        path: 'thought-report',
        component: () => import('@/views/work/thought_report'),
        name: 'thought_report',
        meta: {
          title: '思想汇报',
          roles: ['thought_report']
        }
      },
      {
        path: 'score-rule',
        component: () => import('@/views/work/score_rule'),
        name: 'score_rule',
        meta: {
          title: '积分规则',
          roles: ['score_rule']
        }
      }
    ]
  },
  // {
  //   path: '/changeTerm',
  //   component: Layout,
  //   redirect: '/changeTerm/changeTerm-list',
  //   alwaysShow: true,
  //   name: 'affiche',
  //   meta: {
  //     title: '换届管理',
  //     icon: 'example',
  //     roles: ['affiche_manage']
  //   }, children: [
  //     {
  //       path: 'changeTerm-list',
  //       component: () => import('@/views/error-page/building'),
  //       name: 'affiche_list',
  //       meta: {
  //         title: '换届列表',
  //         roles: ['affiche_list']
  //       }
  //     }
  //   ]
  // },
  {
    path: '/affiche',
    component: Layout,
    redirect: '/affiche/affiche-list',
    alwaysShow: true,
    name: 'affiche',
    meta: {
      title: '通知公告',
      icon: 'example',
      roles: ['affiche_manage']
    },
    children: [
      {
        path: 'affiche-list',
        component: () => import('@/views/work/affiche_list'),
        name: 'affiche_list',
        meta: {
          title: '通告列表',
          roles: ['affiche_list']
        }
      }
    ]
  },
  {
    path: '/leaving',
    component: Layout,
    redirect: '/leaving/leaving-list',
    alwaysShow: true, // will always show the root menu
    name: 'leaving',
    meta: {
      title: '留言箱',
      icon: 'example',
      roles: ['leaving_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'leaving-list',
        component: () => import('@/views/work/leaving_list'),
        name: 'leaving_list',
        meta: {
          title: '留言列表',
          roles: ['leaving_list']
        }
      }
    ]
  },
  {
    path: '/opinion',
    component: Layout,
    redirect: '/opinion/opinion-list',
    alwaysShow: true, // will always show the root menu
    name: 'opinion',
    meta: {
      title: '意见征集',
      icon: 'example',
      roles: ['opinion_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'opinion-list',
        component: () => import('@/views/work/opinion_list'),
        name: 'opinion_list',
        meta: {
          title: '意见征集',
          roles: ['opinion_list']
        }
      },
      {
        path: 'opinions-repository',
        component: () => import('@/views/work/opinions_repository'),
        name: 'opinions_repository',
        meta: {
          title: '评论内容',
          roles: ['opinions_repository']
        }
      }
    ]
  },
  {
    path: '/democratic',
    component: Layout,
    redirect: '/democratic/democratic-list',
    alwaysShow: true, // will always show the root menu
    name: 'democratic',
    meta: {
      title: '民主评议',
      icon: 'example',
      roles: ['democratic_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'democratic-list',
        component: () => import('@/views/work/democratic_list'),
        name: 'democratic_list',
        meta: {
          title: '评议列表',
          roles: ['democratic_list']
        }
      },
      {
        path: 'democratic-cate',
        component: () => import('@/views/work/democratic_cate'),
        name: 'democratic_cate',
        meta: {
          title: '评议类型',
          roles: ['democratic_cate']
        }
      }
    ]
  },
  {
    path: '/todo',
    component: Layout,
    redirect: '/todo/todo_manage',
    alwaysShow: true, // will always show the root menu
    name: 'todo',
    meta: {
      title: '待办事项',
      icon: 'example',
      roles: ['todo_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'todo-list',
        component: () => import('@/views/work/todo_list'),
        name: 'todo_list',
        meta: {
          title: '待办事项',
          roles: ['todo_list']
        }
      },
      {
        path: 'todo-done',
        component: () => import('@/views/work/todo_done'),
        name: 'todo_done',
        meta: {
          title: '已办事项',
          roles: ['todo_done']
        }
      }
    ]
  },
  // {
  //   path: '/starRating',
  //   component: Layout,
  //   redirect: '/starRating/starRating-list',
  //   alwaysShow: true,
  //   name: 'starRating',
  //   meta: {
  //     title: '星级评定',
  //     icon: 'example',
  //     roles: ['affiche_manage']
  //   }, children: [
  //     {
  //       path: 'starRating-list',
  //       component: () => import('@/views/error-page/building'),
  //       name: 'affiche_list',
  //       meta: {
  //         title: '星级评定',
  //         roles: ['affiche_list']
  //       }
  //     }
  //   ]
  // },
  {
    path: '/card',
    component: Layout,
    redirect: '/card/greeting-cards',
    alwaysShow: true, // will always show the root menu
    name: 'card',
    meta: {
      title: '活力党建',
      icon: 'example',
      roles: ['card_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'greeting-cards',
        component: () => import('@/views/work/greeting_cards'),
        name: 'greeting_cards',
        meta: {
          title: '党政生日',
          roles: ['greeting_cards']
        }
      }
      // ,
      // {
      //   path: 'greeting-cards-cate',
      //   component: () => import('@/views/work/greeting_cards_cate'),
      //   name: 'greeting_cards_cate',
      //   meta: {
      //     title: '贺卡分类',
      //     roles: ['greeting_cards_cate']
      //   }
      // }
    ]
  },
  {
    path: '/honour',
    component: Layout,
    redirect: '/honour/honour-list',
    alwaysShow: true, // will always show the root menu
    name: 'honour',
    meta: {
      title: '组织荣誉',
      icon: 'example',
      roles: ['honour_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'honour-list',
        component: () => import('@/views/work/honour_list'),
        name: 'honour_list',
        meta: {
          title: '组织荣誉',
          roles: ['honour_list']
        }
      }
    ]
  },
  {
    path: '/sanction',
    component: Layout,
    redirect: '/sanction/reward-list',
    alwaysShow: true, // will always show the root menu
    name: 'sanction',
    meta: {
      title: '党员奖惩管理',
      icon: 'example',
      roles: ['sanction_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'reward-list',
        component: () => import('@/views/work/reward_list'),
        name: 'reward_list',
        meta: {
          title: '党员奖励',
          roles: ['reward_list']
        }
      },
      {
        path: 'punishment-list',
        component: () => import('@/views/work/punishment_list'),
        name: 'punishment_list',
        meta: {
          title: '党员惩罚',
          roles: ['punishment_list']
        }
      }
    ]
  },
  {
    path: '/partycheck',
    component: Layout,
    redirect: '/partycheck/partycheck_template_list',
    alwaysShow: true, // will always show the root menu
    name: 'partycheck_template_list',
    meta: {
      title: '党性体检',
      icon: 'example',
      roles: ['sanction_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'partycheck_template_list',
        component: () => import('@/views/partyCheck/party_check_template_list'),
        name: 'party_check_template_list',
        meta: {
          title: '党性体检模板管理',
          roles: ['nature_table']
        }
      },
      {
        path: 'partycheck_template_form',
        component: () => import('@/views/partyCheck/form/party_check_template_form'),
        name: 'partycheck_template_form',
        meta: {
          title: '体检表添加',
          roles: ['nononono']
        }
      },
      {
        path: 'partycheck_project_list',
        component: () => import('@/views/partyCheck/party_check_project_list'),
        name: 'nature_matter',
        meta: {
          title: '体检项目管理',
          roles: ['nature_table']
        }
      },
      {
        path: 'partycheck_list',
        component: () => import('@/views/partyCheck/party_check_list'),
        name: 'nature_matter',
        meta: {
          title: '党性体检列表',
          roles: ['nature_table']
        }
      }
    ]
  },

  {
    path: '/msgtpl',
    component: Layout,
    redirect: '/msgtpl/note',
    alwaysShow: true, // will always show the root menu
    name: 'msgtpl',
    meta: {
      title: '消息模板管理',
      icon: 'example',
      roles: ['msgtpl_manage'] // you can set roles in root nav
    },
    children: [
      {
        path: 'note-tpl-list',
        component: () => import('@/views/work/note_tpl_list'),
        name: 'note_tpl_list',
        meta: {
          title: '短信模板',
          roles: ['note_tpl_list']
        }
      },
      {
        path: 'wechat-tpl-list',
        component: () => import('@/views/work/note_tpl_list'),
        name: 'wechat_tpl_list',
        meta: {
          title: '公众号模板',
          roles: ['wechat_tpl_list']
        }
      },
      {
        path: 'weapp-tpl-list',
        component: () => import('@/views/work/note_tpl_list'),
        name: 'weapp_tpl_list',
        meta: {
          title: '小程序模板',
          roles: ['wechat_tpl_list']
        }
      }
    ]
  }
]
