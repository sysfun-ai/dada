import { observable } from 'mobx'

// env 环境
export const env = observable({
  get env() {
    return process.env.NODE_ENV
  },
  get isDev() {
    return this.env === 'development'
  },
  get isTest() {
    return this.env === 'test'
  },
  get isPrd() {
    return this.env === 'production'
  },
})
