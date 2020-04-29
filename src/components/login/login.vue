<template>
  <div class="login">
    <img class="logo" src="../../assets/logo.png" />
    <van-cell-group>
      <van-field
        v-model="user.userName"
        left-icon="my-wode1"
        placeholder="请输入用户名"
        :error-message="userNameError"
        @blur="userName"
      />
      <van-field
        v-model="user.passWord"
        type="password"
        left-icon="my-mima"
        placeholder="请输入密码"
        :error-message="passWordError"
        @blur="password"
      />
    </van-cell-group>
    <van-button  type="info" @click="login">登录</van-button>
    <van-button plain type="info" @click="toRegister">注册</van-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        userName: "",
        passWord: ""
      },
      userNameError: "",
      passWordError: ""
    };
  },
  created() {
    console.log(process.env.VUE_APP_API)
  },
  methods: {
    ...mapActions(["setUserInfo"]),
    login() {
      // if (this.user.userName === "admin") {
      //   if(this.user.passWord ==='admin'){
      //     this.setUserInfo(this.user);
      //     this.$router.push({ path: "/manage" })
      //   }else{
      //     this.$toast.fail('管理员密码错误');
      //   }
      //   return
      // } 
      if (this.user.userName != "" && this.user.passWord != "") {
        const formData = new FormData();
        formData.append("username", this.user["userName"]);
        formData.append("password", this.user["passWord"]);
        this.$request({
          url: `${process.env.VUE_APP_API}/login`,
          method: "post",
          data: formData
        }).then(res => {
          if (res.type === "success") {
            this.getUserInfo();
            console.log(res);
          } else {
            this.$toast.fail(res.msg);
          }
        });
      } else if (this.user.userName == "") {
        this.userNameError = "用户名不能为空";
      } else {
        this.passWordError = "密码不能为空";
      }
    },
    getUserInfo() {
      this.$request({
        url: `${process.env.VUE_APP_API}/userInfo`,
        method: "get"
      }).then(res => {
        console.log(res);
        this.user.iswriter = res.iswriter;
        this.user.userid = res.userid;
        this.setUserInfo(this.user);
        if (this.user.userName === "admin") {
          this.$router.push({ path: "/manage" })
        } else{
          this.$router.push({ path: "/index" });
        }
      });
    },
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    userName() {
      if (this.user.userName == "") {
        this.userNameError = "用户名不能为空";
      } else {
        this.userNameError = "";
      }
    },
    password() {
      if (this.passWord1 == "") {
        this.passWordError = "密码不能为空";
      } else {
        this.passWordError = "";
      }
    },
    getconnent() {
      this.$request({
        url:  `${process.env.VUE_APP_API}/post/pagesApart`,
        method: "get",
        params: {
          postType: "问题反馈"
        }
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    margin-top: 15%;
    width: 50%;
  }
  .van-cell-group {
    width: 80%;
    background: none;
    margin-top: 10%;
    .van-cell {
      background: none;
      border: none;
      margin: 2vh 0;
    }
    /deep/.van-field__control {
      border-bottom: 1px solid #999999;
    }
  }
  .van-button {
    width: 70%;
    margin: 2vh 0;
  }
  .van-button--info{
    background-color: #5a62a1;
    border:1px solid #5a62a1;
  }
  .van-button--plain.van-button--info{
    background: none;
    color:#5a62a1;
    border:1px solid #5a62a1;
  }
}
</style>
