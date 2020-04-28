<template>
  <div class="newsdetil">
    <van-nav-bar left-arrow title="新闻通知" @click-left="$router.go(-1)" />
    <div class="body">
      <div class="title">{{info.newstitle}}</div>
      <div class="author">
        <span>{{util.formatDateTime(info.createtime)}}</span>
        <span>{{info.writer}}</span>
      </div>
      <div class="content">{{info.newscontent}}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      info: {
        newstitle:'',

      }
    };
  },
  created() {
    this.info = this.$route.query.info;
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.newsdetil {
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
  .body{
    padding: 1rem;
    .title{
      text-align: center;
      font-size: 1.5rem;
    }
    .author{
      text-align: center;
      font-size: 0.5rem;
      color:#969799;
      span{
        padding:0.5rem;
      }
    }
    .content{
      margin-top: 1rem;
    }
  }
}
</style>
