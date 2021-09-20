export default function({app, store, route, redirect}) {
  const access_token = app.$cookies.get('access_token', { parseJSON: false })
  if(route.path === '/login' && access_token) {
    return redirect('/')
  } else if(route.path !== '/login') {
    if(!access_token) {
      return redirect('/login')
    }
    store.commit('SET_ACCESS_TOKEN', access_token)
  } 
}