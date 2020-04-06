<template>
  <div class="news">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="newsLine" v-for="(item,index) in newsList" :key="index" @click="lookNews(item)">
          <div class="head">
            <span class="title">{{item.newstitle}}</span>
          </div>
          <div class="bottom">
            <div class="author">{{item.writer}}</div>
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
      newsList: [],
      page: 0, // 当前页数
      size: 10, // 每页条数
      loading: false, // 是否显示加载中
      finished: false, // 是否到达尾端
      refreshing: false // 是否刷新
    };
  },
  methods: {
    // 上滑加载更多
    onLoad() {
      if (this.refreshing) {
        this.newsList = [];
        this.refreshing = false;
      }else{
        this.page = this.page + 1;
      }
      // 异步更新数据
      this.getnewsList();
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
    getnewsList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/news/pagesAll`,
        method: "get",
        params: {
          page: this.page,
          size: this.size
        }
      }).then(res => {
        console.log(res);
        res.list.forEach(item => {
          this.newsList.push(item);
        });
        this.loading = false;
        if (this.newsList.length >= res.total) {
          this.finished = true;
        }
      });
    },
    lookNews(item){
      this.$request({
        url: `${process.env.VUE_APP_API}/news/getOne`,
        method: "get",
        params:{
          newsId:item.newsid
        }
      }).then(res => {
        this.$router.push({path:'/newsDetil',query:{info:res[0]}})
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.news {
 .newsLine {
    background: #ffffff;
    padding: 0 0.3rem;
    margin: 0.3rem 0;
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
