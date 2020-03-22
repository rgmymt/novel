<template>
  <div class="newsManage">
    <van-nav-bar
      title="新闻通知"
      left-arrow
      right-text="新增"
      @click-left="$router.go(-1)"
      @click-right="addNews = true"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-swipe-cell v-for="(item,index) in newsList" :key="index">
          <div class="newsLine">
            <div class="head">
              <span class="title">{{item.newstitle}}</span>
            </div>
            <div class="bottom">
              <div class="author">{{item.writer}}</div>
              <div class="time">{{item.createtime}}</div>
            </div>
          </div>
          <template #right>
            <van-button square type="danger" class="delete-button" text="删除" />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>
    <van-dialog v-model="addNews" title="新增新闻通知" show-cancel-button :beforeClose="chargeBtn">
     <van-form ref="form" @submit="onSubmit">
      <van-field
        v-model="newsTitle"
        label="标题"
        name="title"
        placeholder="请输入标题"
        :rules="[{ required: true, message: '请填写帖子标题' }]"
      />
      <van-field
        class="textarea"
        v-model="newsContent"
        name="content"
        rows="6"
        autosize
        label="内容"
        type="textarea"
        placeholder="请输入内容"
        :rules="[{ required: true, message: '请填写帖子内容' }]"
      />
      <!-- <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div> -->
    </van-form>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addNews: false,
      newsTitle: "",
      newsContent: "",
      newsList: [],
      page: 1, // 当前页数
      size: 10, // 每页条数
      loading: false, // 是否显示加载中
      finished: false, // 是否到达尾端
      refreshing: false, // 是否刷新
      done:false
    };
  },
  methods: {
    // 上滑加载更多
    onLoad() {
      if (this.refreshing) {
        this.newsList = [];
        this.refreshing = false;
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
      this.page = this.page + 1;
      this.onLoad();
    },
    getnewsList() {
      this.$request({
        url: "/api/news/pagesAll",
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
    chargeBtn(action, done) {
      if (action === "cancel") {
        //取消按钮
        done();
      } else if (action === "confirm") {
        //确定按钮
        //向后端传值并关闭dialog弹出框
        this.$refs.form.submit()
        console.log(this.done)
        done(this.done);
      }
    },
    onSubmit(values) {
      console.log(values);
      const formData = new FormData();
      formData.append("newsTitle", this.newsTitle);
      formData.append("newsContent", this.postContent);
      formData.append("writer", '管理员');
      this.$request({
        url: "/api/news/insert",
        method: "post",
        data: formData
      }).then(res => {
          console.log(res)
        this.$toast.success('新增成功');
        this.done = true
        this.addNews = false;
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.newsManage {
  .newsLine {
    background: #ffffff;
    padding: 0 0.3rem;
    margin: 0.3rem 0;
    box-sizing: border-box;
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
