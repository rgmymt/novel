<template>
  <div class="activityManage">
    <van-nav-bar title="活动" left-arrow @click-left="$router.go(-1)" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-swipe-cell v-for="(item,index) in activityList" :key="index" @click="lookActivity(item)">
          <div class="activityLine">
            <div class="head">
              <span class="title">{{item.acttitle}}</span>
              <span class="location">{{item.location}}</span>
            </div>
            <div class="bottom">
              <div class="organizer">{{item.organizer}}</div>
              <div class="time">{{util.formatDateTime(item.createtime)}}</div>
            </div>
          </div>
          <template #right>
            <van-button square type="danger" class="delete-button" text="删除" @click="deleteActivity(item)"/>
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
      activityList: [],
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
        this.activityList = [];
        this.refreshing = false;
      } else {
        this.page = this.page + 1;
      }
      // 异步更新数据
      this.getactivityList();
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
    getactivityList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/activity/pagesAll`,
        method: "get",
        params: {
          page: this.page,
          size: this.size
        }
      }).then(res => {
        console.log(res);
        res.list.forEach(item => {
          this.activityList.push(item);
        });
        this.loading = false;
        if (this.activityList.length >= res.total) {
          this.finished = true;
        }
      });
    },
    deleteActivity(item) {
      console.log(item)
      const formData = new FormData();
      formData.append("actId", item.actid);
      this.$request({
        url: `${process.env.VUE_APP_API}/activity/delete`,
        method: "delete",
        data: formData
      }).then(res => {
        console.log(res)
        this.$toast.success('删除成功');
        this.activityList = []
        this.getactivityList()
      });
    },
    lookActivity(item){
      this.$request({
        url: `${process.env.VUE_APP_API}/activity/getOne`,
        method: "get",
        params:{
          actId:item.actid
        }
      }).then(res => {
        this.$router.push({path:'/activityDetil',query:{info:res[0]}})
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.activityManage {
  .activityLine {
    background: #ffffff;
    padding: 0 0.3rem;
    margin: 0.3rem 0;
    .head {
      padding: 0.3rem 0;
      .title {
        font-size: 1rem;
        color: #333;
      }
      .location {
        margin-left: 1rem;
        font-size: 0.5rem;
        color: #969799;
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
