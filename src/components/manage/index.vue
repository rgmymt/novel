<template>
  <div class="manage">
    <van-nav-bar title="云小说阅读器管理"/>
    <div class="mod">
    <van-grid :column-num="3" :gutter="10">
      <van-grid-item icon="photo-o" text="小说" @click="$router.push('/novelManage')"/>
      <van-grid-item icon="photo-o" text="标签" @click="$router.push('/tagManage')"/>
      <van-grid-item icon="photo-o" text="新闻通知" @click="$router.push('/newsManage')"/>
      <van-grid-item icon="photo-o" text="活动" @click="$router.push('/activityManage')"/>
      <van-grid-item icon="photo-o" text="帖子/反馈" @click="$router.push('/postManage')"/>
      <van-grid-item icon="photo-o" text="申请审批" @click="$router.push('/applyManage')"/>
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
    return {};
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
