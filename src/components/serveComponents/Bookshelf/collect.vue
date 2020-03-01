<template>
  <div class="collect">
    <div class="bookLine" v-for="(item,index) in bookList" :key=index>
      <div class="img">
        <img :src="item.imgUrl" style="width:100%;height:100%"/>
      </div>
      <div class="text">
        <div class="title">{{item.title}}</div>
        <div class="author">{{item.author}}</div>
        <div class="content">{{item.content}}</div>
        <div class="tag">
          <van-icon name="label"/>
          <span>{{item.tagname}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.collect{
  .bookLine{
    padding: .3rem;
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
}
</style>
