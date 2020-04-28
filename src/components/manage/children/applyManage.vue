<template>
  <div class="applyManage">
    <van-nav-bar title="审核中心" left-arrow @click-left="$router.push('/manage')" />
        <van-swipe-cell v-for="(item,index) in applyList" :key="index">
          <div class="applyLine">
          <div class="head">
            <span class="title">{{'申请人：'+item.writername}}</span>
          </div>
          <div class="bottom">
            <!-- <div class="author">{{item.applystatus}}</div> -->
            <div class="time">{{item.applytime}}</div>
          </div>
        </div>
          <template #right>
            <van-button square type="primary" class="delete-button" text="通过" @click="agreeApply(item)"/>
            <van-button square type="danger" class="delete-button" text="驳回" @click="refuseApply(item)"/>
          </template>
        </van-swipe-cell>
        <van-divider v-if="applyList.length == 0">暂无申请</van-divider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applyList: [],
      page: 0, // 当前页数
      size: 10, // 每页条数
    };
  },
  created(){
      this.getapplyList()
  },
  methods: {
    getapplyList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/apply/getList`,
        method: "get",
      }).then(res => {
        console.log(res);
        this.applyList = res
      })
    },
    agreeApply(item) {
      console.log(item)
      const formData = new FormData();
      formData.append("applyId", item.applyid);
      this.$request({
        url: `${process.env.VUE_APP_API}/apply/agree`,
        method: "post",
        data: formData
      }).then(res => {
        console.log(res)
        this.$toast.success('申请已通过');
        this.applyList = []
        this.getapplyList()
      });
    },
    refuseApply(item) {
      console.log(item)
      const formData = new FormData();
      formData.append("applyId", item.applyid);
      this.$request({
        url: `${process.env.VUE_APP_API}/apply/refuse`,
        method: "post",
        data: formData
      }).then(res => {
        console.log(res)
        this.$toast.success('申请已驳回');
        this.applyList = []
        this.getapplyList()
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.applyManage {
  .van-nav-bar {
    width: 100%;
    background-color: #5a62a1;
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__title{
      color: #fff;
    }
    .van-nav-bar__text{
      color: #fff;
    }
  }
  .applyLine {
    background: #ffffff;
    padding: 0 0.3rem;
    margin: 0.3rem 0;
    border-bottom: 1px dashed #ddd;
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
