# url-to-action
Library to run action by matched URL pathname route.

## Installation
This is library available through [npm registry](https://npmjs.com/url-to-action).

```
npm install --save url-to-action
```

## Routers

Set unique property keys to creating a route with add property rules.
Optional property params will give a key to capture groups. And action will be run when URL matched with rules.

| property | default | value
|--|--|--|
| rules | none | RegEx |
| params | [] | Array |
| action | function | function |

##### Example routes:
```
const routes = {
  home: {
    rules: /\/(home|$)/i,
    action: function () {
      console.log('home')
    }
  },
  user: {
    rules: /\/user\/(\w)/i,
    params: ['userId'],
    action: function (config) {
      console.log(`user id: ${config.params.userId}`)
    }
  }
}
```

## Run action
```
const UrlToAction = require('url-to-action')

const routes = {
  home: {
    rules: /\/(home|$)/i,
    action: function () {
      console.log('home')
    }
  },
  user: {
    rules: /\/user\/(\w)/i,
    params: ['userId'],
    action: function (config) {
      console.log(`user id: ${config.params.userId}`)
    }
  }
}

const router = new UrlToAction({
  routes: routes,
  domain: window.location.protocol + '//' + window.location.host
})

router.action('/home') // home
router.action('/user/1') // user id: 1
```
