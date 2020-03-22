<template>
  <div class="bookshelf">
    <van-tabs v-model="active" sticky animated>
      <van-tab title="推荐">
        <recommend></recommend>
      </van-tab>
      <van-tab title="新闻通知">
        <news></news>
      </van-tab>
      <van-tab title="活动">
        <activity></activity>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import news from "./children/news";
import recommend from "./children/recommend";
import activity from "./children/activity";
export default {
  components: {
    recommend,
    news,
    activity
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bookshelf {
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
