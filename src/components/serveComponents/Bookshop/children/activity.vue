<template>
  <div class="collect">
    <div class="editBar">
      <div class="btn" @click="addActivity()">
        <div>
          <van-icon class="icon" name="flag-o" />
        </div>
        <div>发起活动</div>
      </div>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="activityLine" v-for="(item,index) in activityList" :key="index" @click="lookActivity(item)">
          <div class="head">
            <span class="title">{{item.acttitle}}</span>
            <span class="location">{{item.location}}</span>
          </div>
          <div class="bottom">
            <div class="organizer">{{item.organizer}}</div>
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
        this.page = 1
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
    addActivity(){
      this.$router.push('/creatActivity')
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
.collect {
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
        margin-top: 2px;
        font-size: 16px;
      }
      margin-left: 10px;
    }
  }
  .activityLine {
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
}
</style>
