import { asyncComponent } from '../components/AsyncComponent'


// 登录注销注册
const UserLayout = asyncComponent(() => import('../layouts/UserLayout'))
const BasicLayout = asyncComponent(() => import('../layouts/BasicLayout'))
const Login = asyncComponent(() => import('../pages/User/Login'))
const Register = asyncComponent(() => import('../pages/User/Register'))
const RegisterResult = asyncComponent(() => import('../pages/User/RegisterResult'))

// 报错页面
const Three = asyncComponent(() => import('../pages/Exception/403'))
const Four = asyncComponent(() => import('../pages/Exception/404'))
const Five = asyncComponent(() => import('../pages/Exception/500'))
const TriggerException = asyncComponent(() => import('../pages/Exception/TriggerException'))

// home
const List = asyncComponent(() => import('../pages/Home/List'))
export const getRouterData = () => {
  return {
    '/': {
      name: '首页',
      component: BasicLayout,
    },
    '/home': {
      name: '列表页',
      component: List
    },
    '/exception/403': {
      name: '403',
      component: Three,
    },
    '/exception/404': {
      name: '404',
      component: Four,
    },
    '/exception/500': {
      name: '500',
      component: Five,
    },
    '/exception/trigger': {
      name: 'trigger',
      component: TriggerException,
    },
    '/user': {
      name: '账户',
      component: UserLayout,
    },
    '/user/login': {
      name: '登录',
      component: Login,
    },
    '/user/register': {
      name: '注册',
      component: Register,
    },
    '/user/register-result': {
      name: '注册结果',
      component: RegisterResult,
    },
  }
}
