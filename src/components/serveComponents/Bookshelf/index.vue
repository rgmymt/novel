<template>
  <div class="bookshelf">
    <!-- <van-tabs v-model="active" sticky animated>
      <van-tab title="收藏"> -->
        <Collect></Collect>
      <!-- </van-tab>
      <van-tab title="已阅">
        <Read></Read>
      </van-tab>
    </van-tabs> -->
  </div>
</template>

<script>
//import Read from './read'
import Collect from './collect'
export default {
  components:{
    //Read,
    Collect
  },
  data(){
    return{
      active:0,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bookshelf{
  /deep/.van-tabs__nav{
    background-color: #f7f8fa;
  }
  /deep/.van-tabs--line .van-tabs__wrap {
    height: 30px;
  }
  /deep/.van-tab {
    line-height: 30px;
  }
  /deep/.van-tabs__line{
    background-color:cornflowerblue;
    height:4px;
    width: 20px !important;
  }
  /deep/.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after{
    border-width:0;
  }
  /deep/.van-tabs--line .van-tabs__wrap{
    width: 50%;
    margin-left: 50%;
    transform: translate(-50%,0)
  }
}
</style>
