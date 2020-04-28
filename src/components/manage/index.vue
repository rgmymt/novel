<template>
  <div class="manage">
    <van-nav-bar title="言悦文学管理"/>
    <div class="mod">
    <van-grid :column-num="3" :gutter="10">
      <van-grid-item icon="column" text="小说" @click="$router.push('/novelManage')"/>
      <van-grid-item icon="label-o" text="标签" @click="$router.push('/tagManage')"/>
      <van-grid-item icon="newspaper-o" text="新闻通知" @click="$router.push('/newsManage')"/>
      <van-grid-item icon="flag-o" text="活动" @click="$router.push('/activityManage')"/>
      <van-grid-item icon="chat-o" text="帖子/反馈" @click="$router.push('/postManage')"/>
      <van-grid-item icon="aim" text="申请审批" @click="$router.push('/applyManage')"/>
    </van-grid>
    </div>
    <div class="btnBar">
    <van-button class="btn" plain type="info" @click="loginOut">注销</van-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user:{}
    };
  },
  watch: {},
  methods: {
    ...mapActions(["setUserInfo"]),
    loginOut() {
      this.user.userName = "";
      this.user.passWord = "";
      this.user.userid = "";
      this.user.iswriter = "";
      this.setUserInfo(this.user);
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.manage {
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
  .van-button--plain.van-button--info{
    background: none;
    color:#5a62a1;
    border:1px solid #5a62a1;
  }
  .mod{
    margin-top: 1rem;
  }
  .btnBar{
    text-align: center;
    .btn{
      margin: 1rem;
      width: 50%;
    }
  }
}
</style>
