import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _6826f67e = () => import('..\\pages\\users.vue' /* webpackChunkName: "pages_users" */).then(m => m.default || m)
const _66cacfc6 = () => import('..\\pages\\about.vue' /* webpackChunkName: "pages_about" */).then(m => m.default || m)
const _bf7a4a5a = () => import('..\\pages\\about\\profile.vue' /* webpackChunkName: "pages_about_profile" */).then(m => m.default || m)
const _cfc93c6c = () => import('..\\pages\\about\\contact.vue' /* webpackChunkName: "pages_about_contact" */).then(m => m.default || m)
const _58a24ad3 = () => import('..\\pages\\long.vue' /* webpackChunkName: "pages_long" */).then(m => m.default || m)
const _f2faaaea = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/users",
			component: _6826f67e,
			name: "users"
		},
		{
			path: "/about",
			component: _66cacfc6,
			name: "about",
			children: [
				{
					path: "profile",
					component: _bf7a4a5a,
					name: "about-profile"
				},
				{
					path: "contact",
					component: _cfc93c6c,
					name: "about-contact"
				}
			]
		},
		{
			path: "/long",
			component: _58a24ad3,
			name: "long"
		},
		{
			path: "/",
			component: _f2faaaea,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
