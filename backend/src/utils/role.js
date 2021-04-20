import system from '@/router/modules/system'
import permission from '@/router/modules/permission'

export function getRouteList() {
  let routeList = []
  routeList = getRoutes(permission)
  routeList = [...routeList, ...getRoutes(system)]
  return routeList
}

export function getRoutes(routes) {
  const routeList = []
  for (const key in routes) {
    if (routes[key].path !== '/') {
      // 因为每个用户都有权限功能，故过滤掉
      const route = {
        title: routes[key].meta.title,
        role: routes[key].meta.roles[0]
      }
      if (routes[key].children) {
        route.children = getRoutes(routes[key].children)
      }
      routeList.push(route)
    }
  }
  return routeList
}

export function getMenuByRouter(access, routeList) {
  const res = []
  routeList.forEach(item => {
    if (!item.meta || (item.meta && !item.hidden) || item.alwaysShow) {
      const obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta,
        path: item.path
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(access, item.children)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) {
        res.push(obj)
      }
    }
  })
  return res
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.roles && item.meta.roles.length) {
    if (hasOneOf(item.meta.roles, access)) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}
