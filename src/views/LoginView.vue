<template>
  <ContentBase>
    <div class="row justify-content-md-center">
      <div class="col-3">
        <form>
          <div class="mb-3">
            <label for="username"
                   class="form-label">用户名</label>
            <input type="text"
                   v-model="username"
                   class="form-control"
                   id="username">
          </div>
          <div class="mb-3">
            <label for="password"
                   class="form-label">密码</label>
            <input type="password"
                   v-model="password"
                   class="form-control"
                   id="password">
          </div>
          <div class="error-msg">{{error_msg}}</div>
          <button type="submit"
                  @click.prevent="login"
                  class="btn btn-primary">登录</button>
        </form>
      </div>
    </div>

  </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase.vue'
import { ref } from 'vue'
import { useStore } from 'vuex';
import router from '@/router';
export default {
  name: 'LoginView',
  components: {
    ContentBase
  },

  setup () {
    const store = useStore();

    let username = ref(''), password = ref(''), error_msg = ref('');

    const login = () => {
      store.dispatch("login", {
        username: username.value,
        password: password.value,
        success () {
          router.push({ name: 'userlist' });
        },
        error () {
          error_msg.value = "用户名或密码错误";
        }
      })
    }

    return {
      username,
      password,
      error_msg,
      login,
    }
  }
}
</script>

<style scoped>
button {
  width: 100%;
}
.error-msg {
  color: red;
  font-size: 13px;
}
</style>>
