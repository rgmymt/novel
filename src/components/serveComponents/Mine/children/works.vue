<template>
  <div class="works">
    <van-nav-bar
      title="我的作品"
      left-arrow
      @click-left="$router.go(-1)">
      <div slot="right" @click="goEdit" class="right_shot">
        <van-icon name="my-xiexin" color="#1989fa" style="line-height:12px;font-size:12px"/>
        <div style="line-height:12px;font-size:12px">写作</div>
      </div>
    </van-nav-bar>
    <div class="bookBox" v-if="workList.length!=0">
      <div class="bookCell" v-for="(item,index) in workList" :key="index">
        <div class="img">
          <img src="../../../../assets/2.jpg" style="width:100%;height：100%">
        </div>
        <div class="title">{{item.title}}</div>
        <van-icon name="edit" style="float:left"/><span style="font-size:12px;line-height:16px;float:left">编辑</span>
      </div>
    </div>
    <div class="noData" v-else>你还没有作品~</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workList: [
        {
          imgUrl: "../../../../assets/2.jpg",
          title: "moumou"
        },
        {
          imgUrl: "../../../../assets/2.jpg",
          title: "moumou"
        },
        {
          imgUrl: "../../../../assets/2.jpg",
          title: "moumou"
        }
      ]
    };
  },
  methods:{
    goEdit(){
      this.$router.push({path:"/edit"})
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.works {
    .van-nav-bar {
      .right_shot{
         line-height:30px;
         margin:8px 0;
         color:#1989fa;
         cursor: pointer;
      }
      .van-icon{
       color: #333;
    }
    }
  .bookBox {
      width: 90%;
      margin: 10% 5%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    .bookCell {
       width: 30%;
      // .img {
       
      // }
    }
  }
  .noData{
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
  }
}
</style>
