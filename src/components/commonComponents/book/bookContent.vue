<template>
  <div class="bookcontent">
    书本内容
    <div class="moreInfo">
      <van-popup
        v-model="show"
        position="top"
        :overlay="false"
        :style="{ height: '6%' }"
      >
      <van-row>
        <van-col span="4">
          <van-icon name="arrow-left" color="#7d7e80" size="2rem" @click="$router.go(-1)"/>
        </van-col>
        <van-col span="16" >
          <div class="van-ellipsis">{{"1.bohe11111111111111111111111111111111111111111111"}}</div>
        </van-col>
      </van-row>
      </van-popup>
      <van-popup
        v-model="show"
        position="bottom"
        :overlay="false"
        :style="{ height: '10%' }"
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
        <Catalog></Catalog>
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
      show:false,
      catalog:false,
    }
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
    closePopup(){
      if(this.catalog!=true){
        this.show=!this.show
      }
    },
    showCatalog(){
      this.catalog=true;
    },
    toBookDetil(){
      this.$router.push({path:'/bookDetil'})
    },
    toHome(){
      this.$router.push({path:'/'})
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bookcontent{
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
        height: 10%;
      }
    }
  }
  // .catalogBox{

  // }

  
}
</style>
