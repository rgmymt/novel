<template>
  <div class="index">
    <van-nav-bar title="云小说阅读器">
      <!-- <template #right>
        <van-icon name="search" />
      </template> -->
    </van-nav-bar>
    <div class="tabContent" v-if="active == 0">
      <keep-alive>
        <Bookshelf></Bookshelf>
      </keep-alive>
    </div>
    <div class="tabContent" v-if="active == 1">
      <keep-alive>
        <Bookshop></Bookshop>
      </keep-alive>
    </div>
    <div class="tabContent" v-if="active == 2">
      <keep-alive>
        <Forum></Forum>
      </keep-alive>
    </div>
    <div class="tabContent" v-if="active == 3">
      <keep-alive>
        <Mine></Mine>
      </keep-alive>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="bar-chart-o">书架</van-tabbar-item>
      <van-tabbar-item icon="shop-o">书城</van-tabbar-item>
      <van-tabbar-item icon="chat-o">论坛</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Bookshelf from "./serveComponents/Bookshelf/index";
import Bookshop from "./serveComponents/Bookshop/index";
import Forum from "./serveComponents/Forum/index";
import Mine from "./serveComponents/Mine/index";
export default {
  components: {
    Bookshelf,
    Bookshop,
    Forum,
    Mine
  },
  data() {
    return {
      active: 1,
      show:false
    };
  },
  methods:{
      turnshow(show){
          this.show = show
      }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
// .index{
//     /deep/.van-nav-bar{
//         background: none;
//     }
// }
</style>
