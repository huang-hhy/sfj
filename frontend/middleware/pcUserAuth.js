export default function ({ route, redirect }) {
  if (process.client) {
    const token = sessionStorage.getItem('token');
    if (!token && route.path !== '/pc/login') {
      window.confirm('请先登录')
      redirect('/pc/home',{name: '首页'})
    }
  }
}
