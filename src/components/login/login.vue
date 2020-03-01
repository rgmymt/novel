<template>
  <div class="login">
    <img class="logo" src="../../assets/logo.png">
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
    <van-button plain type="primary" @click="login">登录</van-button>
    <van-button plain type="info" @click="toRegister">注册</van-button>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  data(){
    return{
      user:{
        userName:'',
        passWord:''
      },
      userNameError:'',
      passWordError:'',
    }
  },
  methods:{
    ...mapActions(['setUserInfo']),
    login(){
      if(this.user.userName!=''&&this.user.passWord!=''){
        this.setUserInfo(this.user)
        console.log(this.$store.getters)
        this.$router.push({path:"/index"})
      }
      else if(this.user.userName==''){
        this.userNameError='用户名不能为空'
      }
      else{
        this.passWordError='密码不能为空'
      }
    },
    toRegister(){
      this.$router.push({path:"/register"})
    },
    userName(){
      if(this.user.userName==''){
        this.userNameError='用户名不能为空'
      }
      else{
        this.userNameError=''
      }
    },
    password(){
      if(this.passWord1==''){
        this.passWordError='密码不能为空'
      }
      else{
        this.passWordError=''
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 .login{
   height: 100vh;
   display: flex;
   flex-direction: column;
   align-items: center;
   .logo{
     margin-top: 30%;
     width: 50%;
   }
   .van-cell-group{
     width: 80%;
     background: none;
     margin-top:10%;
     .van-cell{
       background: none;
       border:none;
       margin: 2vh 0;
     }
     /deep/.van-field__control{
        border-bottom: 1px solid #999999;
      }
   }
   .van-button{
     width: 70%;
     margin: 2vh 0;
   }
 }
</style>
