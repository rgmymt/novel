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
          <van-icon name="arrow-left" color="#7d7e80" size="2rem" @click="$router.go(-1)"/>
        </van-col>
        <van-col span="16" >
          <div class="van-ellipsis">{{info.chaptername}}</div>
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
        <van-tabbar-item icon="bars" @click="showCatalog">目录</van-tabbar-item>
        <van-tabbar-item icon="description" @click="toBookDetil">文章详情</van-tabbar-item>
        <van-tabbar-item icon="home-o" @click="toHome">首页</van-tabbar-item>
      </van-tabbar>
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
      catalog:false,
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
        //this.chapterList = res 
      })
    },
    change(info){
      this.info = info
      this.catalog=false;
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
  .moreInfo{
    /deep/.van-popup{
    background-color: #000;
    opacity: 0.8;
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
