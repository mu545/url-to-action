function UrlToAction({domain, routes}) {
  // a.k.a this
  const self = this
  const currentUrl = new URL(domain || 'http://example.com')

  /**
   * Current config from current URL.
   *
   * @key         current route key
   * @pathname    requested pathname
   * @params      available parameter in the pathname
   * @search      search queries
   */
  this.config = {
    key: null,
    pathname: null,
    params: {},
    search: currentUrl.searchParams
  }

  // when URL no match with all available route
  // notfound action will be executed
  if (typeof routes.notfound === 'undefined') {
    routes.notfound = function () {
      return new Error('No match rule found')
    }
  }

  // setup empty routes params and action
  for (var routeKey in routes) {
    if (typeof routes[routeKey].params === 'undefined') {
      routes[routeKey].params = []
    }

    if (typeof routes[routeKey].action !== 'function') {
      routes[routeKey].action = function () {
        return new Error(`No action found for ${routeKey}`)
      }
    }
  }

  /**
   * Search available action from URL.
   *
   * @param   string
   * @return  mixed
   */
  this.action = function (pathname) {
    currentUrl.href = domain + pathname
    self.config.pathname = currentUrl.pathname.replace(/\\/g, '/')

    let routeKey, result

    for (routeKey in routes) {
      result = self.config.pathname.match(routes[routeKey].rules)

      if (result) {
        break
      }
    }

    if (result) {
      const params = {}

      result.shift()

      for (var resultKey in result) {
        let paramKey = routes[routeKey].params[resultKey]

        if (typeof paramKey  === 'undefined') {
          break
        } else {
          params[paramKey] = result[resultKey]
        }
      }

      self.config.key = routeKey
      self.config.params = params
    } else {
      routeKey = 'notfound'
      self.config.key = routeKey
      self.config.params = {}
    }

    return routes[routeKey].action(self.config)
  }
}

module.exports = UrlToAction
