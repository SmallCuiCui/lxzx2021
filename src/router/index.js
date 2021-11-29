import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/login",
    children: [
      {
        path: 'dashbord',
        name: 'Dashbord',
        component: () => import('../views/onDutySystem/Dashbord.vue'),
        meta:{title: "工作上报"}
      },
      {
        path: 'workReport',
        name: 'WorkReport',
        component: () => import('../views/onDutySystem/WorkReport.vue'),
        meta:{title: "工作上报"}
      },
      {
        path: 'workColect',
        name: 'WorkColect',
        component: () => import('../views/onDutySystem/WorkColect.vue'),
        meta:{title: "工作汇总"}
      },
      {
        path: 'personManage',
        name: 'PersonManage',
        component: () => import('../views/onDutySystem/PersonManage.vue'),
        meta:{title: "人员管理"}
      },
      {
        path: 'noticeManage',
        name: 'NoticeManage',
        component: () => import('../views/onDutySystem/NoticeManage.vue'),
        meta:{title: "通知管理"}
      },
      {
        path: 'workManage',
        name: 'WorkManage',
        component: () => import('../views/onDutySystem/WorkManage.vue'),
        meta:{title: "值班安排"}
      },
      {
        path: 'workCondition',
        name: 'WorkCondition',
        component: () => import('../views/onDutySystem/WorkCondition.vue'),
        meta:{title: "工作动态"}
      },
      {
        path: 'eventsRecord',
        name: 'EventsRecord',
        component: () => import('../views/onDutySystem/EventsRecord.vue'),
        meta:{title: "大事记"}
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta:{title: "登录"}
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta:{title: "404"}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 全局前置守卫，判断用户是否登录
router.beforeEach((to, from, next) => {
  if(to.path == "/login") {
    next();
  } else {
    let token = localStorage.getItem("Authorization");
    if(token === "" || token === null) {
      next("/login")
    } else {
      next();
    }
  }
})

export default router
