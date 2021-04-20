import {
  getMenuByRouter
} from '@/utils/role'
import system from '@/router/modules/system'
import article from '@/router/modules/article'
import study from '@/router/modules/study'
import work from '@/router/modules/work'
import count from '@/router/modules/count'
import permission from '@/router/modules/permission'
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  permission_routes: (state) => {
    const desktop = state.app.desktop
    let routeList = []
    switch (desktop) {
      case 'system':
        routeList = system
        break
      case 'permission':
        routeList = permission
        break
      case 'article':
        routeList = article
        break
      case 'study':
        routeList = study
        break
      case 'work':
        routeList = work
        break
      case 'count':
        routeList = count
        break
    }
    return getMenuByRouter(state.user.access, routeList)
  },
  errorLogs: state => state.errorLog.logs
}
export default getters
