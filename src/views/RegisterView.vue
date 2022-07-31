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

          <div class="mb-3">
            <label for="confirm_password"
                   class="form-label">确认密码</label>
            <input type="password"
                   v-model="confirm_password"
                   class="form-control"
                   id="confirm_password">
          </div>
          <div class="error-msg">{{error_msg}}</div>
          <button type="submit"
                  @click.prevent="register"
                  class="btn btn-primary">注册</button>
        </form>
      </div>
    </div>

  </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase.vue'
import router from '@/router';
import { ref } from 'vue'
import { useStore } from 'vuex';
export default {
  name: 'RegisterView',
  components: {
    ContentBase
  },

  setup () {
    const store = useStore();
    let username = ref(''), password = ref(''), error_msg = ref(''), confirm_password = ref('');

    const register = () => {
      store.dispatch("register", { // 交给register, 去注册
        username: username.value,
        password: password.value,
        confirm_password: confirm_password.value,
        success () {  // 注册成功, 跳转到登录页面
          router.push({ name: 'login' });
        },
        error (resp) {
          error_msg.value = resp.result;
        }
      });
    }


    return {
      register,
      username,
      password,
      confirm_password,
      error_msg,
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
