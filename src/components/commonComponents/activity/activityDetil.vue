<template>
  <div class="activitydetil">
    <van-nav-bar left-arrow title="活动详情" @click-left="$router.go(-1)" />
    <div class="body">
      <div class="title">{{info.acttitle}}</div>
      <div class="author">
        <span>发起者：</span>{{info.organizer}}
      </div>
      <div class="location"><span>活动地点：</span>{{info.location}}</div>
      <div class="content"><div class="title">描述：</div><div class="description">{{info.description}}</div></div>
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
.activitydetil {
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
      font-size: 1.5rem;
    }
    .author{
      font-size: 0.5rem;
      color:#969799;
      margin-top: 0.6rem;
      span{
        color: #333333;
      }
    }
    .location{
      font-size: 0.5rem;
      color:#969799;
      margin-top: 0.6rem;
      span{
        color: #333333;
      }
    }
    .content{
      margin-top: 1rem;
      .title{
        font-size: 1rem;
        margin-bottom: 0.6rem;
      }
      .description{
        background-color: #FFFFFF;
        min-height: 6rem;
        padding: 0.3rem;
      }
    }
  }
}
</style>
