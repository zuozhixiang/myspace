<template>
  <NavBar></NavBar>
  <!-- 用完整链接跳转 -->
  <router-view :key="$route.fullPath" />
</template>


<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import NavBar from '@/components/NavBar'

import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
import $ from 'jquery'

export default {
  name: "APP",
  components: { NavBar },

  setup () {
    const store = useStore();

    // 在根组件中, 现在localstorage中查看是否有
    const get_login_status = () => {
      let id = localStorage.getItem('id');
      if (id === null) return false;
      let user = {
        id: id,
        username: localStorage.getItem('username'),
        photo: localStorage.getItem('photo'),
        followerCount: localStorage.getItem('followerCount'),
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh'),
        is_login: localStorage.getItem('is_login'),
      }
      store.commit("updateUser", user);
      // 如果是登录状态的话, 就五分钟获取一次jwt
      setInterval(() => {
        $.ajax({
          url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
          type: "POST",
          data: {
            refresh: user.refresh,
          },
          success (resp) {
            console.log(resp.access);
            store.commit('updateAccess', resp.access);
          }
        });
      }, 4.9 * 1000 * 60);
    }
    onMounted(get_login_status);
    return {
      get_login_status,
    }
  }
}
</script>


<style>
</style>
