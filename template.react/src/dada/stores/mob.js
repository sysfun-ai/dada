import { observable } from 'mobx'

// mob 移动管理器
const mobiles = observable({
  isMobile: false,
  setIsMobile(v) {
    this.isMobile = v
  },
})

export function setMobile() {
  mobiles.setIsMobile(true)
}

export function mob(m, pc = null) {
  if (mobiles.isMobile) return m
  return pc
}

export function mobonly(c) {
  if (mobiles.isMobile) return c
  return null
}

export function pconly(c) {
  if (!mobiles.isMobile) return c
  return null
}

export function isMob() {
  return mobiles.isMobile
}
