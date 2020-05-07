<template>
  <div class="collect">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-swipe-cell v-for="(item,index) in bookList" :key="index">
          <div class="bookLine" @click="lookDetail(item)">
            <!-- <div class="img">
            <img :src="item.imgUrl" style="width:100%;height:100%" />
            </div>-->
            <div class="text">
              <div class="title">{{item.novelname}}
                <van-tag plain type="primary">{{item.typename}}</van-tag>
              </div>
              <!-- <div class="detail">
                <div class="time">{{'阅读量：'+item.readdata }}</div>
                <div class="poster">{{'点赞量：'+item.likedata}}</div>
            </div> -->
            </div>
          </div>
          <template #right>
            <van-button
              square
              type="danger"
              class="delete-button"
              text="取消收藏"
              right-width="50px"
              @click="deleteNovel(item)"
            />
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
      bookList: [],
      page: 0, // 当前页数
      size: 10, // 每页条数
      loading: false, // 是否显示加载中
      finished: false, // 是否到达尾端
      refreshing: false // 是否刷新
    };
  },
  // activated(){
  //   this.bookList = [];
  //   this.getCollectBook()
  // },
  methods: {
    // 上滑加载更多
    onLoad() {
      if (this.refreshing) {
        this.page = 1
        this.bookList = [];
        this.refreshing = false;
      } else {
        this.page = this.page + 1;
      }
      // 异步更新数据
      this.getCollectBook();
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
    getCollectBook() {
      this.$request({
        url: `${process.env.VUE_APP_API}/measure/pagesAll`,
        method: "get",
        params: {
          page: this.page,
          size: this.size
        }
      }).then(res => {
        console.log(res);
        res.list.forEach(item => {
          this.bookList.push(item);
        });
        this.loading = false;
        if (this.bookList.length >= res.total) {
          this.finished = true;
        }
      });
    },
    lookDetail(item) {
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/getOne`,
        method: "get",
        params: {
          novelId: item.novelid
        }
      }).then(res => {
        console.log(res);
        this.$router.push({ path: "/bookDetil", query: { info: JSON.stringify(res) } });
      });
    },
    deleteNovel(item) {
      const formData = new FormData();
      formData.append("measureId", item.measureid);
      this.$request({
        url: `${process.env.VUE_APP_API}/measure/deleteById`,
        method: "delete",
        data: formData
      }).then(res => {
        console.log(res);
        this.$toast.success("取消成功");
        this.bookList = [];
        this.getCollectBook();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.collect {
  .bookLine {
    padding: 0.3rem 1.5rem;
    display: flex;
    background: #ffffff;
    margin-top: 0.5rem;
    border-bottom: 1px #dddddd dashed;
    .img {
      float: left;
      width: 5rem;
      height: 6rem;
      padding: 0.28rem 0.4rem;
    }
    .text {
      //font-size: ;
      //float: right;
      padding: 0.36rem 0;
      text-align: left;
      .author {
        font-size: 0.5rem;
        color: #333;
        padding: 0.3rem 0;
      }
      .content {
        font-size: 0.3rem;
        color: #969799;
        padding: 0.3rem 0;
      }
      .detail {
            display: flex;
            font-size: 12px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 12px;
            margin: 0px;
            margin-bottom: 5px;
            display: flex;
            margin-bottom: 4px;
            margin-top: 13px;
            .poster {
              border-left: 1px #999999 solid;
              margin-left: 5px;
              padding-left: 5px;
            }
          }
    }
  }
  .delete-button {
    height: 100%;
    overflow: visible;
    width: auto;
  }
}
</style>
