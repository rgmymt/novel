<template>
  <div class="bookshelf">
    <van-tabs v-model="active" sticky animated>
      <van-tab title="交流分享">
        <div class="editBar">
          <div class="btn" @click="addPost('交流分享')">
            <div>
              <van-icon class="icon" name="edit" />
            </div>
            <div>发表新帖</div>
          </div>
        </div>
        <share></share>
      </van-tab>
      <van-tab title="问题反馈">
        <div class="editBar">
          <div class="btn" @click="addPost('问题反馈')">
            <div>
              <van-icon class="icon" name="edit" />
            </div>
            <div>发表新帖</div>
          </div>
        </div>
        <feedback></feedback>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import feedback from "./children/feedback";
import share from "./children/share";
export default {
  components: {
    feedback,
    share
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    // 点击发表新帖
    addPost(type) {
      this.$router.push({path:'/creatPost',query:{postType:type}});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bookshelf {
  .editBar {
    display: flex;
    //justify-content: space-between;
    justify-content: flex-end;
    margin-top: 10px;
    line-height: 20px;
    font-size: 12px;
    margin-right: 10px;
    .btn {
      display: flex;
      .icon {
        margin-top: 4px;
      }
      margin-left: 10px;
    }
  }
  /deep/.van-tabs--line .van-tabs__wrap {
    height: 30px;
  }
  /deep/.van-tabs__line {
    background-color: cornflowerblue;
    height: 1px;
  }
  /deep/.van-tab {
    line-height: 30px;
  }
  /deep/.van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0;
  }
}
</style>
