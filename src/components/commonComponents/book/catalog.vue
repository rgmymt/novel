<template>
  <div class="bookdetil">
    <van-row>
      <van-col span="4" offset="2">章节</van-col>
      <van-col span="12" offset="4">标题</van-col>
    </van-row>
    <van-row v-for="(item ,index) in chapterList" :key="index" @click="bookContent(item)">
      <van-col span="4" offset="2">{{index+1}}</van-col>
      <van-col span="12" offset="4">{{item.chaptername}}</van-col>
    </van-row>
    <van-divider>没有更多了</van-divider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chapterList: [
        {
          id: 1,
          title: "薄荷"
        },
        {
          id: 2,
          title: "薄荷"
        },
        {
          id: 3,
          title: "薄荷"
        },
        {
          id: 3,
          title: "薄荷"
        },
        {
          id: 3,
          title: "薄荷"
        },
        {
          id: 3,
          title: "薄荷"
        },
        {
          id: 3,
          title: "薄荷"
        },
        {
          id: 3,
          title: "薄荷"
        },
        {
          id: 3,
          title: "薄荷"
        },
        {
          id: 3,
          title: "薄荷"
        }
      ]
    };
  },
  created(){
      this.getChapterList()
  },
  methods: {
    bookContent(item) {
      console.log(this.$route.path)
      if(this.$route.path ==='/bookContent'){
        this.$emit('change',item)
      }else{
        this.$router.push({ path: "/bookContent" ,query:{info:item}});
      }
    },
    getChapterList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/chapter/getAll`,
        method: "get"
      }).then(res => {
        this.chapterList = res 
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bookdetil {
  text-align: center;
  .van-row {
    //margin-top: 2rem;
    padding: 1rem 0;
    margin: 0 1rem;
    border-bottom: 1px solid #e8ecf3;
  }
}
</style>
