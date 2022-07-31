<template>
  <ContentBase>
    <div class="row">
      <div class="col-3">
        <UserInfo :user="user"
                  @follow1="follow"
                  @unfollow1="unfollow" />
        <UserWrite v-if="is_me"
                   @submit_post="submit_post" />
      </div>

      <div class="col-9">
        <UserPosts :posts="posts"
                   @remove="remove" />
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase.vue'
import UserInfo from '../components/userprofile/UserInfo.vue'
import UserPosts from '../components/userprofile/UserPosts.vue'
import { reactive } from 'vue'
import UserWrite from '../components/userprofile/UserWrite.vue'
import { useRoute } from 'vue-router'
import $ from 'jquery'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'UserProfileView',
  components: {
    ContentBase,
    UserInfo,
    UserPosts,
    UserWrite,
  },
  setup () {

    const route = useRoute();
    const userId = route.params.userId;
    const store = useStore();

    const user = reactive({});
    const posts = reactive({});


    // 计算是不是自己
    const is_me = computed(() => {
      return userId == store.state.user.id;
    })

    // 获取用户信息
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
      type: "get",
      data: {
        user_id: userId,
      },
      headers: {
        'Authorization': "Bearer " + store.state.user.access,
      },
      success (resp) {
        console.log(resp);
        user.id = resp.id;
        user.username = resp.username;
        user.photo = resp.photo;
        user.followerCount = resp.followerCount;
        user.is_followed = resp.is_followed;
      }
    })

    // 获取用户的所有帖子
    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
      type: 'get',
      data: {
        user_id: userId,
      },
      headers: {
        'Authorization': "Bearer " + store.state.user.access,
      },
      success (resp) {
        posts.count = resp.length;
        posts.posts = resp;
      }
    })
    const submit_post = (content) => {
      ++posts.count
      posts.posts.unshift({
        id: posts.count,
        userid: 1,
        content: content,
      })
    }

    const follow = () => {
      if (user.is_followed) return;
      user.is_followed = true;
      ++user.followerCount;
    }

    const unfollow = () => {
      if (!user.is_followed) return;
      user.is_followed = false;
      --user.followerCount;
    }

    const remove = (id) => {
      // 吧数组中为id的post删掉
      for (let i = 0; i < posts.posts.length; ++i) {
        if (posts.posts[i].id == id) {
          posts.posts.splice(i, 1);
          break;
        }
      }
    }


    return {
      user,
      follow,
      unfollow,
      posts,
      submit_post,
      is_me,
      remove,
    }
  }
}

</script>

<style scoped>
</style>>
