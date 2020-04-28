<template>
  <div class="register">
    <van-nav-bar title="用户注册" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-field
        v-model="user.userName"
        left-icon="my-wode1"
        placeholder="请输入用户名"
        :error-message="userNameError"
        @blur="userName"
      />
      <van-field
        v-model="passWord1"
        type="password"
        left-icon="my-mima"
        placeholder="请输入密码"
        :error-message="password1Error"
        @blur="password1"
      />
      <van-field
        v-model="passWord2"
        type="password"
        left-icon="my-mima"
        placeholder="请再次输入密码"
        :error-message="password2Error"
        @blur="password2"
      />
      <!-- <van-radio-group class="radioBox" v-model="isWriter">
        <van-radio name="0">读者</van-radio>
        <van-radio name="1">作家</van-radio>
      </van-radio-group>-->
    </van-cell-group>
    <!-- <van-checkbox v-model="checked" icon-size="15px" shape="square">
      同意
      <a class="pager" href>《协议》</a>
    </van-checkbox> -->
    <van-button plain type="info" @click="register" :disabled="this.passWord1!=this.passWord2||this.user.userName==''||this.passWord1==''">注册</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        userName: "",
        passWord: ""
      },
      //isWriter: '0', // 是否为作家
      checked: true,
      disable: true,
      passWord1: "",
      passWord2: "",
      userNameError: "",
      password1Error: "",
      password2Error: ""
    };
  },
  methods: {
    register() {
      if (
        this.passWord1 == this.passWord2 &&
        this.user.userName != "" &&
        this.passWord1 != ""
      ) {
        this.user.passWord = this.passWord1;
        const formData = new FormData();
        formData.append("username", this.user["userName"]);
        formData.append("password", this.user["passWord"]);
        this.$request({
          url: `${process.env.VUE_APP_API}/register`,
          method: "post",
          data: formData
        }).then(res => {
          this.$toast.success("注册成功");
          this.$router.push({ path: "/login" });
          console.log(res);
        });
      }
    },
    userName() {
      if (this.user.userName == "") {
        this.userNameError = "用户名不能为空";
      } else {
        this.userNameError = "";
      }
    },
    password1() {
      if (this.passWord1 == "") {
        this.password1Error = "密码不能为空";
      } else {
        this.password1Error = "";
      }
    },
    password2() {
      if (this.passWord1 != this.passWord2) {
        this.password2Error = "两次密码输入不一致";
      } else {
        this.password2Error = "";
      }
    }
    // toLogin(){
    //   this.$router.push({path:"/login"})
    // },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.register {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-nav-bar {
    width: 100%;
    background-color: #5a62a1;
    
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__title{
      color: #fff;
    }
  }
  .logo {
    margin-top: 30%;
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
    .radioBox {
      display: flex;
      padding: 10px 16px;
    }
  }
  .van-checkbox {
    width: 70%;
    font-size: 12px;
    padding: 10px 0;
    .pager {
      color: #409eff;
      border-bottom: 1px solid #409eff;
    }
  }
  .van-button {
    width: 70%;
    margin-top: 10vh;
  }
  .van-button--plain.van-button--info{
    background: none;
    color:#5a62a1;
    border:1px solid #5a62a1;
  }
}
</style>
