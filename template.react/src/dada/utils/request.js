import { message } from 'antd'
import { makeAutoObservable } from 'mobx'
import qs from 'qs'
import axios from 'axios'
import { crypto } from '@/dada/stores/crypto'
import { HttpMethod } from '@/dada/consts/http'
import { setData } from '@/dada/utils/setData'

const jsonHeader = { 'Content-Type': 'application/json; charset=UTF-8' }

// Request 请求
export class Request {
  constructor({
    base,
    tokenName = 'token',
    logMode = process.env.NODE_ENV === 'development',
  }) {
    makeAutoObservable(this)
    this.setBase(base)
    this.setTokenName(tokenName)
    logMode ? this.enableLog() : this.disableLog()
  }

  count = 0 // 计数器

  addCount() {
    this.count++
  }

  base = undefined

  setBase(v) {
    this.base = v
  }

  tokenName = undefined

  setTokenName(v) {
    this.tokenName = v
  }

  logMode = true

  enableLog() {
    this.logMode = true
  }

  disableLog() {
    this.logMode = false
  }

  get token() {
    return crypto.getCookie(this.tokenName)
  }

  // get get请求
  async get({
    uri,
    data = {},
    params = {},
    headers = {},
    token = false,
    silent = false,
  }) {
    return this.request({
      method: HttpMethod.GET,
      url: this.base + uri,
      data,
      params,
      headers,
      token,
      silent,
    })
  }

  // post post请求
  async post({
    uri,
    data = {},
    params = {},
    headers = {},
    token = false,
    silent = false,
  }) {
    return this.request({
      method: HttpMethod.POST,
      url: this.base + uri,
      data,
      params,
      headers,
      token,
      silent,
    })
  }

  // put put请求
  async put({
    uri,
    data = {},
    params = {},
    header = {},
    token = false,
    silent = false,
  }) {
    return this.request({
      method: HttpMethod.PUT,
      url: this.base + uri,
      data,
      params,
      header,
      token,
      silent,
    })
  }

  // patch patch请求
  async patch({
    uri,
    data = {},
    params = {},
    header = {},
    token = false,
    silent = false,
  }) {
    return this.request({
      method: HttpMethod.PATCH,
      url: this.base + uri,
      data,
      params,
      header,
      token,
      silent,
    })
  }

  // option options请求
  async options({
    uri,
    data = {},
    params = {},
    header = {},
    token = false,
    silent = false,
  }) {
    return this.request({
      method: HttpMethod.OPTIONS,
      url: this.base + uri,
      data,
      params,
      header,
      token,
      silent,
    })
  }

  // delete delete请求
  async delete({
    uri,
    data = {},
    params = {},
    header = {},
    token = false,
    silent = false,
  }) {
    return this.request({
      method: HttpMethod.DELETE,
      url: this.base + uri,
      data,
      params,
      header,
      token,
      silent,
    })
  }

  // onRequestStart 开始请求回调
  onRequestStart = async () => {}

  // onRequestEnd 结束请求回调
  onRequestEnd = async () => {}

  // onSuccess 成功处理回调
  onSuccess = async () => {}

  // onTokenInvalid 令牌失效处理回调
  onTokenInvalid = async () => {
    localStorage.clear()
  }

  // onError 错误处理回调
  onError = () => {}

  // onRequestFailed 请求失误处理回调
  onRequestFailed = async () => message.error('request failed, network error')

  // request 基础请求
  async request({
    method,
    url,
    data = {},
    params = {},
    header = {},
    token = false,
    silent = false,
  }) {
    await this.onRequestStart()

    // 累加计数器
    !silent && this.addCount()
    const index = this.count

    // 拼装header
    const headers = {
      ...header,
      ...jsonHeader,
    }

    // 如果是需要token的请求，在header中加入token
    if (token) headers.Authorization = `Bearer ${this.token}`

    // 网络请求
    let rawRsp
    try {
      if (this.logMode && !silent) {
        console.log(`[ trace ] #${index} -> ${method}: ${url}`)
        console.log(
          '[ trace ] headers:',
          headers,
          'params:',
          params,
          'data:',
          data
        )
      }

      const opt = {
        url,
        method,
        data,
        headers,
        params,
      }

      // 用brackets格式拼装query，ids为ids[]
      const paramsSerializer = (params) => {
        return qs.stringify(params, { arrayFormat: 'brackets' })
      }

      // 使用axios进行网络请求
      rawRsp = await axios(opt, paramsSerializer)
    } catch (e) {
      rawRsp = e.rsponse
    }

    const rsponse = new Response(rawRsp)
    let jsonData = {}

    try {
      // 解析为json标准响应数据对象
      jsonData = rsponse.json()
    } catch (e) {
      jsonData = {
        data: undefined,
        success: false,
        error: 'request failed',
      }
    }

    const rsp = new JsonResponse(jsonData)

    if (this.logMode && !silent) {
      console.log(`[ trace ] -> #${index} ${method}:`, rsp)
    }

    // 根据返回响应数据进行业务处理
    if (!rsp.success) {
      switch (rsp.error) {
        case 'session expired':
          await this.onTokenInvalid(rsp.error)
          break
        default:
          // 处理业务请求错误
          await this.onError(rsp.error)
          break
      }
    } else {
      await this.onSuccess()
    }
    await this.onRequestEnd()
    return rsp
  }
}

// Response 返回值
class Response {
  constructor(raw) {
    this.setRaw(raw)
  }

  raw = undefined // 原始响应数据

  setRaw(v) {
    this.raw = v
  }

  // json 返回标准json响应数据对象
  json() {
    return {
      code: this.raw.status,
      success: this.raw.data.success,
      data: this.raw.data.data,
      error: this.raw.data.error,
      total: this.raw.data.total,
      headers: this.raw.headers,
      raw: this.raw,
    }
  }
}

// JsonResponse json返回值
class JsonResponse {
  constructor(data) {
    this.setData(data)
  }

  setData = setData

  data = undefined

  headers = undefined

  total = undefined

  success = undefined

  error = undefined

  code = undefined

  raw = undefined
}
