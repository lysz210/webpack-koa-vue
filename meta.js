"use strict"

const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const axios = require('axios')

const githubAPI = axios.create({
  baseURL: 'https://api.github.com/repos/lysz20/'
})

async function getCurrentSHA (author) {

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
      choices: ['axios', 'vue-router', 'vuex'],
      default: ['axios', 'vue-router', 'vuex']
    }
  },
  helpers: {
    isEnabled(list, check, opts) {
      console.log('isEnabled')
      if (list[check]) return opts.fn(this)
      else return opts.inverse(this)
    },
    deps (plugins) {
      let pluginNames = Object.keys(plugins)
      if (pluginNames.length < 1) return ''
      let dependencies = {
        'axios': '^0.18.0',
        'vue-router': '^3.0.1',
        'vuex': '^3.0.1'
      }
      return pluginNames.map(plugin => (`    "${plugin}": "${dependencies[plugin]}"`)).join(',\n') + ','
    }
  },
  complete (data) {
    console.log('completed with:')
    console.log(data)
  }
}