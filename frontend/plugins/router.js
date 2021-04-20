import {deviceType} from "@/libs/deviceType"
export default ({app, store, redirect}) => {
  // @ts-ignore
  app.context.userAgent = process.server
    ? app.context.req.headers["user-agent"]
    : navigator.userAgent;
  app.context.deviceType = deviceType(app.context.userAgent)
  if (process.client) {
    let typeArr = ['android', 'ios']
    if (typeArr.indexOf(app.context.deviceType.type) > -1) {
      app.router.afterEach((to, from, next) => {
        const token = sessionStorage.getItem('token')
        if (!token) {
          redirect('/mobile/login')
        } else {
          redirect(to)
        }
      })
    }
  }
}
