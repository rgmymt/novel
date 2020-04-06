<template>
  <div class="novelManage">
    <van-nav-bar title="小说管理" left-arrow @click-left="$router.go(-1)" />
    <van-dropdown-menu>
      <van-dropdown-item v-model="tagName" :options="options" @change="tagChange" />
    </van-dropdown-menu>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-swipe-cell v-for="(item,index) in novelList" :key="index"  @click="lookDetail(item)">
          <div class="novelLine">
            <div class="head">
              <span class="title">{{item.novelname}}</span>
            </div>
            <div class="bottom">
              <div class="author">{{'作者：'+item.writername}}</div>
              <div class="detail">
                <div class="data">{{'收藏量：'+item.likedata}}</div>
                <div class="data">{{'阅读量：'+item.readdata}}</div>
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              square
              type="danger"
              class="delete-button"
              text="删除"
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
      tagName: "",
      options: [],
      tagList: [],
      novelList: [],
      page: 0, // 当前页数
      size: 10, // 每页条数
      loading: false, // 是否显示加载中
      finished: false, // 是否到达尾端
      refreshing: false // 是否刷新
    };
  },
  created() {
    this.gettagList();
  },
  methods: {
    gettagList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/novelType/getAll`,
        method: "get"
      }).then(res => {
        console.log(res);
        this.tagList = res;
        this.tagName = this.tagList[0].typename;
        this.getnovelList();
        this.tagList.forEach(item => {
          let obj = {
            text: item.typename,
            value: item.typename
          };
          this.options.push(obj);
        });
      });
    },
    tagChange() {
      this.novelList = [];
      this.getnovelList();
    },
    // 上滑加载更多
    onLoad() {
      if (this.refreshing) {
        this.novelList = [];
        this.refreshing = false;
      } else {
        this.page = this.page + 1;
      }
      // 异步更新数据
      this.getnovelList();
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
    getnovelList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/pagesByType`,
        method: "get",
        params: {
          typeName: this.tagName,
          page: this.page,
          size: this.size
        }
      }).then(res => {
        console.log(res);
        res.list.forEach(item => {
          this.novelList.push(item);
        });
        this.loading = false;
        if (this.novelList.length >= res.total) {
          this.finished = true;
        }
      });
    },
    deleteNovel(item) {
      console.log(item);
      const formData = new FormData();
      formData.append("novelId", item.novelid);
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/delete`,
        method: "delete",
        data: formData
      }).then(res => {
        console.log(res);
        this.$toast.success("删除成功");
        this.novelList = [];
        this.getnovelList();
      });
    },
    lookDetail(item){
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/getOne`,
        method: "get",
        params:{
          novelId:item.novelid
        }
      }).then(res => {
        console.log(res);
        this.$router.push({path:'/bookDetil',query:{info:res}})
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.novelManage {
  /deep/.van-dropdown-menu__title {
    width: 95%;
  }
  /deep/.van-dropdown-menu__title::after {
    margin-right: 16px;
  }
  .novelLine {
    background: #ffffff;
    padding: 0 1rem;
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
      .detail {
        display: flex;
        .data {
          font-size: 0.5rem;
          margin-left: 1rem;
        }
      }
    }
  }
  .delete-button {
    height: 100%;
  }
}
</style>
