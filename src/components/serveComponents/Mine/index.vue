<template>
  <div class="mine">
    <div class="userBox">
      <van-cell :title="user.userName" icon="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="large" label="描述信息" is-link/>
    </div>
    <div class="Box">
      <van-cell title="我的作品" icon="my-shujia1" is-link to="works" />
      <van-cell title="路由跳转" icon="location-o" is-link to="Index" />
    </div>
    <div class="Box">
      <van-cell title="写作" icon="my-xiexin" is-link to="edit" />
      <van-cell title="反馈" icon="my-fankui" is-link to="feedback" />
      <van-cell title="设置" icon="my-system" is-link to="set" />
    </div>
    <div class="Box">
      <van-button class="btn" type="info" block @click="loginOut">注销</van-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data(){
    return{
      user:{
        userName:'',
        passWord:''
      }
    }
  },
  created(){
    this.user=this.$store.getters.user
    console.log(this.$store.getters)
  },
  methods:{
    ...mapActions(["setUserInfo"]),
    loginOut(){
      this.user.userName = ''
      this.user.passWord = ''
      this.setUserInfo(this.user);
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.mine{
  .userBox{
    /deep/.van-icon__image{
        width: 3rem;
        height: 3rem;
    }
  }
  .Box{
    margin-top: 1rem;
    .btn{
      margin: 0 auto;
      width: 90%;
    }
  }

}
</style>
