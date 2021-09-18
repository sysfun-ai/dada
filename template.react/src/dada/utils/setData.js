import { runInAction } from 'mobx'

// setData 为object赋值
export function setData(data) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      runInAction(() => (this[key] = data[key]))
    }
  }
}
