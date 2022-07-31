<template>
  <div class="card">
    <div class="card-body">
      <ul>
        <li v-for="post in posts.posts"
            :key="post.id">
          <div class="card post-item">
            <div class="card-body">
              <div class="content">{{ post.content }}</div>
              <button type="button"
                      @click="remove(post.id)"
                      class="btn btn-danger delete btn-sm">删除</button>
            </div>
          </div>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { useStore } from 'vuex';

export default {
  name: 'UserPosts',
  props: {
    posts: {
      type: Object,
      required: true,
    }
  },

  setup (props, context) {
    const store = useStore();
    const remove = (id) => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "DELETE",
        data: {
          post_id: id,
        },
        headers: {  // 这里要加上headers, 里面放access, 获取
          'Authorization': 'Bearer ' + store.state.user.access
        },
        success (resp) {
          // 去更新父组件中的posts
          if (resp.result === "success")
            context.emit("remove", id);
        }

      })
    }

    return {
      remove,
    }
  }
}
</script>

<style scoped>
.post-item {
  margin-bottom: 10px;
}
.content {
  margin-bottom: 2.5vh;
}
li {
  list-style: none;
}

.anniu {
  position: relative;
}

button {
  padding: 2px 4px;
}

.delete {
  position: absolute;
  bottom: 1vh;
  right: 1vw;
}
</style>