<template>
  <div class="manage">
    <van-nav-bar title="云小说阅读器管理"/>
    <div class="mod">
    <van-grid :column-num="3" :gutter="10">
      <van-grid-item icon="photo-o" text="小说" />
      <van-grid-item icon="photo-o" text="新闻通知" @click="$router.push('/newsManage')" />
      <van-grid-item icon="photo-o" text="活动" />
      <van-grid-item icon="photo-o" text="帖子/反馈" />
      <van-grid-item icon="photo-o" text="申请审批" />
    </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  watch: {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.manage {
  .mod{
    margin-top: 1rem;
  }
}
</style>
