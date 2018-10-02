"use strict"

const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')

const pluginDependencies = {
  'axios': '^0.18.0',
  'vue-router': '^3.0.1',
  'vuex': '^3.0.1'
}

const middlewareDependencies = {
  "koa-router": "7.4.0",
  "koa-static": "5.0.0",
  "koa-body-parsers": "3.1.0",
  "koa-session": "5.9.0",
  "koa-rewrite": "3.0.1",
  "koa-compress": "3.0.0",
  "koa-jwt": "3.5.1",
  "@koa/cors": "2.2.2",
  "koa-locales": "1.8.0",
  "koa-etag": "3.0.0",
}

module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Application Name',
      default: 'my-app'
    },
    version: {
      type: 'string',
      required: true,
      message: 'Project version',
      default: '0.0.0'
    },
    plugins: {
      type: 'checkbox',
      message: 'Select which Vue plugins to install',
      choices: Object.keys(pluginDependencies),
      default: ['axios', 'vue-router', 'vuex']
    },
    middlewares: {
      type: 'checkbox',
      message: 'Select which koa-* middleware to install',
      choices: Object.keys(middlewareDependencies),
      default: ["koa-router", "koa-static", "koa-session", "koa-body-parsers"]
    }
  },
  helpers: {
    isEnabled(list, check, opts) {
      console.log('isEnabled')
      if (list[check]) return opts.fn(this)
      else return opts.inverse(this)
    },
    deps (plugins, middlewares) {
      let modules = [...Object.keys(plugins), ...Object.keys(middlewares)]
      if (modules.length < 1) return ''
      let dependencies = {
        ...pluginDependencies,
        ...middlewareDependencies
      }
      return ',\n' + modules.map(name => (`    "${name}": "${dependencies[name]}"`)).join(',\n')
    }
  },
  complete (data) {
    console.log('completed with:')
    console.log(data)
  }
}
