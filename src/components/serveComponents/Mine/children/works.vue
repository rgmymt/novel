<template>
  <div class="works">
    <van-nav-bar title="我的作品" left-arrow @click-left="$router.go(-1)">
      <div slot="right" @click="goNewnovel" class="right_shot">
        <van-icon name="my-xiexin" color="#1989fa" style="line-height:12px;font-size:12px" />
        <div style="line-height:12px;font-size:12px">写作</div>
      </div>
    </van-nav-bar>
    <div v-if="workList.length!=0">
      <van-cell class="novelLine" v-for="(item,index) in workList" :key="index">
        <div class="head">
          <span class="title">{{item.novelname}}</span>
        </div>
        <div class="bottom">
          <div class="detail">
            <div class="data">{{'收藏量：'+item.likedata}}</div>
            <div class="data">{{'阅读量：'+item.readdata}}</div>
          </div>
        </div>
        <template #right-icon>
          <div class="btn" @click="edit(item)">
          开始创作
          <van-icon color="#1989fa" name="arrow" @click="addTag()"/>
          </div>
        </template>
      </van-cell>
    </div>
    <!-- <div class="bookBox" v-if="workList.length!=0">
      <div class="bookCell" v-for="(item,index) in workList" :key="index">
        <div class="img">
          <img src="../../../../assets/2.jpg" style="width:100%;height：100%">
        </div>
        <div class="title">{{item.title}}</div>
        <van-icon name="edit" style="float:left"/><span style="font-size:12px;line-height:16px;float:left">编辑</span>
      </div>
    </div>-->
    <div class="noData" v-else>你还没有作品~</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workList: []
    };
  },
  created(){
    this.getworkList()
  },
  methods: {
    getworkList(){
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/getUserBook`,
        method: "get"
      }).then(res => {
        console.log(res);
        this.workList = res;
      });
    },
    edit(item){
      this.$router.push({ path: "/edit" ,query:{info:item,isBook:true}});
    },
    goNewnovel() {
      this.$router.push({ path: "/edit",query:{isBook:false} });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.works {
  .van-nav-bar {
    .right_shot {
      line-height: 30px;
      margin: 8px 0;
      color: #1989fa;
      cursor: pointer;
    }
    .van-icon {
      color: #333;
    }
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
          margin-right: 1rem;
        }
      }
    }
    .btn{
      color: #1989fa;
      margin: auto;
      /deep/.van-icon{
        top:2px;
      }
    }
  }
  .noData {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
