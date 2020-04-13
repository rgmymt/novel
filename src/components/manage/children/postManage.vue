<template>
  <div class="postManage">
    <van-nav-bar title="帖子" left-arrow @click-left="$router.push('/manage')" />
    <van-tabs v-model="active" @change="Tabchange" sticky animated>
      <van-tab name="first" title="交流分享">
      </van-tab>
      <van-tab name="second" title="问题反馈">
      </van-tab>
    </van-tabs>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-swipe-cell v-for="(item,index) in postList" :key="index">
          <div class="postLine" @click="lookPost(item)">
          <div class="head">
            <span class="title">{{item.posttitle}}</span>
          </div>
          <div class="bottom">
            <div class="author">{{item.writername}}</div>
            <div class="time">{{util.formatDateTime(item.createtime)}}</div>
          </div>
        </div>
          <template #right>
            <van-button square type="danger" class="delete-button" text="删除" @click="deletePost(item)"/>
          </template>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active:0,
      TabType:'交流分享',
      postList: [],
      page: 0, // 当前页数
      size: 10, // 每页条数
      loading: false, // 是否显示加载中
      finished: false, // 是否到达尾端
      refreshing: false // 是否刷新
    };
  },
  methods: {
    // Tab切换
    Tabchange(name,title){
      this.TabType = title
      this.postList=[]
      this.getpostList()
    },
    // 上滑加载更多
    onLoad() {
      if (this.refreshing) {
        this.postList = [];
        this.refreshing = false;
      } else {
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
          postType: this.TabType
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
    deletePost(item) {
      console.log(item)
      const formData = new FormData();
      formData.append("postId", item.postid);
      this.$request({
        url: `${process.env.VUE_APP_API}/post/delete`,
        method: "delete",
        data: formData
      }).then(res => {
        console.log(res)
        this.$toast.success('删除成功');
        this.postList = []
        this.getpostList()
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
.postManage {
  .postLine {
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
  .delete-button {
    height: 100%;
  }
}
</style>
