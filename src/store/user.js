
import $ from 'jquery'
import jwt_decode from "jwt-decode"

const MuduleUser = {
  state: {
    id: "",
    username: "",
    photo: "",
    followerCount: 0,
    access: "",
    refresh: "",
    is_login: false,
  },
  getters: {

  },
  mutations: {  // 调用mutations里面的函数, 要用commit
    updateUser (state, user) {
      state.id = user.id;
      state.username = user.username;
      state.photo = user.photo;
      state.followerCount = user.followerCount;
      state.access = user.access;
      state.refresh = user.refresh;
      state.is_login = user.is_login;
      localStorage.setItem('id', user.id);
      localStorage.setItem('username', user.username);
      localStorage.setItem('photo', user.photo);
      localStorage.setItem('followerCount', user.followerCount);
      localStorage.setItem('access', user.access);
      localStorage.setItem('refresh', user.refresh);
      localStorage.setItem('is_login', user.is_login);
    },
    updateAccess (state, access) {
      state.access = access;
      localStorage.setItem('access', access);
    },
    logout (state) {
      state.photo = "";
      state.username = "";
      state.followerCount = 0;
      state.access = "";
      state.refresh = "";
      state.is_login = false;
      state.id = "";
      localStorage.clear();
    }
  },
  actions: {  // 调用里面的函数是用dispatch
    login (context, data) {  // 获取jwt
      $.ajax({
        url: 'https://app165.acapp.acwing.com.cn/api/token/',
        type: "post",
        data: {
          username: data.username,
          password: data.password
        },
        success (resp) { // 成功的话  
          const { access, refresh } = resp;
          // 吧jwt解码, 
          const access_obj = jwt_decode(access);

          // 每隔五分钟获取一个access, 
          setInterval(() => {
            $.ajax({
              url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
              type: "POST",
              data: {
                refresh,
              },
              success (resp) {
                console.log(resp.access);
                context.commit('updateAccess', resp.access);
              }
            });
          }, 4.9 * 60 * 1000);

          // 通过jwt, 获取用户信息
          $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
            type: "GET",
            data: {
              user_id: access_obj.user_id,
            },
            headers: {
              'Authorization': 'Bearer ' + access
            },
            success (resp) {
              context.commit("updateUser", { // 更新store里面的内容
                ...resp,
                access: access,
                refresh: refresh,
                is_login: true,
              });
              data.success(); // 调用前端传来的回调函数
            }
          })
        },
        error () {
          data.error();
        }
      });
    },

    register (context, data) {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/user/",
        type: 'post',
        data: {
          username: data.username,
          password: data.password,
          password_confirm: data.confirm_password,
        },
        success (resp) {
          if (resp.result === "success") {
            // 注册成功, 调用这个函数, 跳转到登录页面
            data.success();
          }
          else {
            data.error(resp);
          }
        }
      });
    }
  },
  modules: {

  }
};

export default MuduleUser;