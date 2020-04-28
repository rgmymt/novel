<template>
  <div class="share">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="postLine" v-for="(item,index) in postList" :key="index" @click="lookPost(item)">
          <div class="head">
            <span class="title">{{item.posttitle}}</span>
          </div>
          <div class="bottom">
            <div class="author">{{item.writername}}</div>
            <div class="time">{{util.formatDateTime(item.createtime)}}</div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [],
      page: 0, // 当前页数
      size: 10, // 每页条数
      loading: false, // 是否显示加载中
      finished: false, // 是否到达尾端
      refreshing: false, // 是否刷新
      visible: false // 是否显示筛选
    };
  },
  created() {},
  methods: {
    // 上滑加载更多
    onLoad() {
      if (this.refreshing) {
        this.page = 1
        this.postList = [];
        this.refreshing = false;
      }else{
        this.page = this.page + 1;
      }
      // 异步更新数据
      this.getpostList();
    },
    // 下拉刷新
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    getpostList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/post/pagesApart`,
        method: "get",
        params: {
          page: this.page,
          size: this.size,
          postType: "交流分享"
        }
      }).then(res => {
        console.log(res);
        res.list.forEach(item => {
          this.postList.push(item);
        });
        this.loading = false;
        if (this.postList.length >= res.total) {
          this.finished = true;
        }
      });
    },
    lookPost(item){
      this.$request({
        url: `${process.env.VUE_APP_API}/post/getOne`,
        method: "get",
        params:{
          postId:item.postid
        }
      }).then(res => {
        this.$router.push({path:'/postDetil',query:{info:res}})
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.share {
  .popclass {
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 99;
    right: 5px;
    color: #ffffff;
    width: 20%;
    border-radius: 5px;
    .classcell {
      width: 85%;
      margin: 0 auto;
      text-align: center;
      font-size: 14px;
      line-height: 25px;
      border-bottom: 0.5px #ffffff solid;
    }
    .classcell:nth-last-child(1) {
      border-bottom: 0;
    }
  }
  .postLine {
    background: #ffffff;
    padding: 0 0.3rem;
    margin: 0.3rem 0;
    border-bottom: 1px #dddddd dashed;
    .head {
      padding: 0.3rem 0;
      .title {
        font-size: 1rem;
        color: #333;
      }
    }
    .bottom {
      font-size: 0.5rem;
      color: #969799;
      padding: 0.3rem 0;
      display: flex;
      justify-content: space-between;
      .time {
        font-size: 0.5rem;
        margin-left: 1rem;
      }
    }
  }
}
</style>
