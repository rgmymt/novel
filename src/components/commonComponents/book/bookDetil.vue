<template>
  <div class="bookdetil">
    <van-nav-bar left-arrow title="小说详情" @click-left="$router.go(-1)"/>
    <div class="bookLine" v-for="(item,index) in bookList" :key=index>
      <div class="img">
        <img :scr="item.imgUrl" style="width:100%;height:100%"/>
      </div>
      <div class="text">
        <div class="title">{{item.title}}</div>
        <div class="author" @click="authorDetil">{{item.author}}</div>
        <!-- <div class="content">{{item.content}}</div> -->
        <div class="tag">
          <van-icon name="label"/>
          <span>{{item.tagname}}</span>
        </div>
      </div>
    </div>
    <div class="btnBox">
      <van-button plain icon="star-o" type="primary">收藏</van-button>
      <van-button plain type="info" @click="bookContent">开始阅读</van-button>
    </div>
    <keep-alive>
      <van-tabs v-model="active" sticky animated>
        <van-tab title="简介">
          简介
        </van-tab>
        <van-tab title="目录">
          <Catalog></Catalog>
        </van-tab>
      </van-tabs>
    </keep-alive>
  </div>
</template>

<script>
import Catalog from './catalog'
export default {
  components:{
    Catalog
  },
  data(){
    return{
      active:0,
      bookList:[
        {
          imgUrl:"../../../assets/logo.png",
          title:"moumou",
          author:"木苏里",
          content:"欢迎来到实力至上主义的教室",
          tagname:"无限流",
        }
      ],
    }
   },
   methods:{
     authorDetil(){
       this.$router.push({path:'/authorDetil'})
     },
     bookContent(){
       this.$router.push({path:'/bookContent'})
     },

   },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bookdetil{
  .bookLine{
    padding: .7rem;
    display: flex;
    .img{
      float: left;
      width: 5rem;
      height: 6rem;
      padding: .28rem .4rem;
    }
    .text{
      //font-size: ;
      //float: right;
      padding: .36rem 0;
      text-align: left;
      .author{
        font-size: .5rem;
        color:#333;
        padding: .3rem 0;
      }
      .content{
        font-size: .3rem;
        color: #969799;
        padding: .3rem 0;
      }
      .tag{
        font-size: .3rem;
        color: #969799;
        padding: .3rem 0;
      }
    }
  }
  .btnBox{
    .van-button{
      margin: 0 1rem;
      margin-bottom: .5rem;
    }
  }
  /deep/.van-tabs__nav{
    background-color: #f2f4f9;
  }
  /deep/.van-tabs__line{
    background-color:cornflowerblue;
    height:1px;
  }
}
</style>
