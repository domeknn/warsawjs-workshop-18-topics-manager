import { observable, action } from 'mobx'

class UserStore {
  @observable user

  constructor() {
    this.user = null
  }

  @action
  setUser(user) {
    this.user = user
  }
}

export default new UserStore()
