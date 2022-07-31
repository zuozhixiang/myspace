import { createStore } from 'vuex'
import MuduleUser from './user'

export default createStore({
  state: { // 存放数据的

  },
  getters: {  // 获取数据的
  },
  mutations: { // 修改数据的
  },
  actions: { // 行为

  },
  modules: { // 分模块存储, 每个模块也都是一个store
    user: MuduleUser,
  }
})
