<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-3">
          <img :src="user.photo"
               class="img-fluid "
               alt="">
        </div>
        <div class="col-9">
          <div class="username">{{ user.username }}</div>
          <div class="fans">粉丝数: {{ user.followerCount }}</div>
          <button v-if="!user.is_followed"
                  @click="follow"
                  type="button"
                  class="btn btn-primary btn-sm"
                  btn-small>+关注</button>
          <button v-else
                  @click="unfollow"
                  type="button"
                  class="btn btn-primary btn-sm"
                  btn-small>取消关注</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import $ from 'jquery';
import { useStore } from 'vuex';
export default {
  name: 'UserInfo',

  props: {
    user: {
      type: Object,
      required: true,
    }
  },

  setup (props, context) {
    const store = useStore();
    const follow = () => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "POST",
        data: {
          target_id: props.user.id,
        },
        headers: {
          'Authorization': "Bearer " + store.state.user.access,
        },
        success (resp) {
          if (resp.result === "success") {
            context.emit('follow1');
          }
        }
      });
    };

    const unfollow = () => {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "POST",
        data: {
          target_id: props.user.id,
        },
        headers: {
          'Authorization': "Bearer " + store.state.user.access,
        },
        success (resp) {
          if (resp.result === "success") {
            context.emit('unfollow1');
          }
        }
      });
    }

    return {
      follow,
      unfollow,
    }
  }

}
</script>

<style scoped>
img {
  border-radius: 50%;
}

.username {
  font-weight: bold;
}

.fans {
  font-size: 13px;
  color: grey;
}

button {
  padding: 2px 4px;
  font-size: 13px;
}
</style>