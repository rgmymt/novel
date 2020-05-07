<template>
  <div class="bookcontent">
    {{info.content}}
    <div class="moreInfo">
      <van-popup
        v-model="show"
        position="top"
        :overlay="false"
        :style="{ height: '5%' }"
      >
      <van-row>
        <van-col span="4">
          <van-icon name="arrow-left" color="#333" size="2rem" @click="$router.go(-1)"/>
        </van-col>
        <van-col span="16" >
          <div class="van-ellipsis" style="color:#646566">{{info.chaptername}}</div>
        </van-col>
      </van-row>
      </van-popup>
      <van-popup
        v-model="show"
        position="bottom"
        :overlay="false"
        :style="{ height: '7%' }"
      >
      <van-tabbar active-color="#7d7e80">
        <van-tabbar-item  @click="setFont = true" style="color:#646566"><img src="../../../assets/fontSize.png" style="width:18px"><br/>字体</van-tabbar-item>
        <van-tabbar-item icon="bars" @click="showCatalog">目录</van-tabbar-item>
        <van-tabbar-item icon="description" @click="toBookDetil">文章详情</van-tabbar-item>
        <van-tabbar-item icon="home-o" @click="toHome">首页</van-tabbar-item>
      </van-tabbar>
      </van-popup>
      <van-popup v-model="setFont" position="bottom" :overlay="false" :style="{ height: '14%' }" style="padding:10px 10px;box-sizing:border-box;font-size:17px">
        <div style="text-align:right"><van-icon name="cross" @click="setFont=false"/></div>
        <van-slider v-model="fontSize" :step="1" :min="12" :max="25" @change="fontSizeChange" />
        <div style="margin-top:20px;text-align:center">字体调整</div>
      </van-popup>
    </div>
    <div class="catalogBox">
      <van-popup position="right" v-model="catalog" closeable :style="{ width: '100%' ,height:'100%'}">
        <Catalog @change="change"></Catalog>
      </van-popup>
    </div>
  </div>
</template>

<script>
import Catalog from './catalog'
export default {
  props: {
    
  },
  components:{
    Catalog,
  },
  data(){
    return{
      info:{},
      show:false,
      setFont:false,
      catalog:false,
      fontSize:17
    }
  },
  created(){
    this.info = this.$route.query.info
    console.log(this.info)
    this.getCatalogDetail()
  },
  mounted () {
    window.addEventListener('click',this.closePopup)
    //window.addEventListener('scroll',this.handleScroll)
  },
  watch:{
    show(value){
      let vm = this;
      if(value==true){
         setTimeout(function(){
          vm.show=false;
        },3000);
      }  
    }
  },
  methods:{
    getCatalogDetail(){
      this.$request({
        url: `${process.env.VUE_APP_API}/chapter/getContent`,
        method: "get",
        params:{
          chapterId:this.info.chapterid
        }
      }).then(res => {
        console.log(res)
      })
    },
    change(info){
      this.info = info
      this.catalog=false;
    },
    fontSizeChange(val){
      let content = document.getElementsByClassName('bookcontent')[0]
      content.style.fontSize = val+'px'
    },
    closePopup(){
      if(this.catalog!=true){
        this.show=!this.show
      }
    },
    showCatalog(){
      this.catalog=true;
    },
    toBookDetil(){
      this.$router.go(-1)
    },
    toHome(){
      this.$router.push({path:'/index'})
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bookcontent{
  padding: 1rem;
  min-height: 100vh;
  background-color: rgba(215, 232, 212,1);
  font-size: 17px;
  white-space: pre-wrap;
  word-wrap: break-word;
  .moreInfo{
    /deep/.van-popup{
    background-color: rgba(150, 151, 153, 1);
   // opacity: 0.8;
      .van-ellipsis{
        line-height: 2rem;
        color: #7d7e80;
      }
      /deep/.van-tabbar{
        background: none;
        height: 7%;
      }
    }
  }
  // .catalogBox{

  // }

  
}
</style>
