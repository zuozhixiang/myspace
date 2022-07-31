<template>
  <div class="card edit-filed">
    <div class="card-body">
      <div class="mb-3">
        <textarea class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="content"></textarea>
        <button type="button"
                @click="submit_post"
                class="btn btn-primary btn-sm send">发帖</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import $ from 'jquery'
import { useStore } from 'vuex';

export default {
  name: 'UserWrite',
  props: {
  },

  setup (props, context) {
    let content = ref('');
    const store = useStore();
    const submit_post = () => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "post",
        data: {
          content: content.value,
        },
        headers: {
          'Authorization': "Bearer " + store.state.user.access,
        },
        success (resp) {
          if (resp.result === "success") {
            context.emit('submit_post', content.value)
            content.value = "";
          }
        }
      });

    };
    return {
      content,
      submit_post,
    }
  }
}
</script>

<style scoped>
.send {
  margin-top: 10px;
}
.edit-filed {
  margin-top: 20px;
}
</style>