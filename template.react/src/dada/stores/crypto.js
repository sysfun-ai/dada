import CryptoJS from 'crypto-js'
import cookie from 'react-cookies'

// crypto 加解密
export const crypto = {
  // 公钥
  publicKey: undefined,
  setPublicKey(v) {
    console.log('[ trace ] set crypto.publicKey')
    this.publicKey = v
  },

  // 加解密
  encrypt(string) {
    return CryptoJS.TripleDES.encrypt(string, this.publicKey).toString()
  },
  decrypt(string) {
    return CryptoJS.TripleDES.decrypt(string, this.publicKey).toString(
      CryptoJS.enc.Utf8
    )
  },

  // localStorage，加解密封装
  set(key, value) {
    const encrypted = this.encrypt(value)
    return localStorage.setItem(key, encrypted)
  },
  get(key) {
    const encrypted = localStorage.getItem(key)
    if (encrypted === undefined || encrypted === null) return undefined
    return this.decrypt(encrypted)
  },
  remove(key) {
    localStorage.removeItem(key)
  },

  // cookies，加解密封装
  setCookie(key, value, opt) {
    const encrypted = this.encrypt(value)
    return cookie.save(key, encrypted, opt)
  },
  getCookie(key) {
    const encrypted = cookie.load(key)
    if (encrypted === undefined || encrypted === null) return undefined
    return this.decrypt(encrypted)
  },
  removeCookie(key, opt) {
    cookie.remove(key, opt)
  },
}
