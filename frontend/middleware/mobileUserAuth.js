export default function ({ route, redirect }) {
  if (process.client) {
    const token = sessionStorage.getItem('token');
    if (!token && route.path !== '/mobile/login') {
      redirect('/mobile/home',{name: '首页'})
    }
  }
}
