<template>
  <div class="bookdetil">
    书本目录
    <van-row>
        <van-col span="4" offset="2">章节</van-col>
        <van-col span="12" offset="4">标题</van-col>
    </van-row>
    <van-row v-for="(item ,index) in chapterList" :key="index" @click="bookContent">
        <van-col span="4" offset="2">{{item.id}}</van-col>
        <van-col span="12" offset="4">{{item.title}}</van-col>
    </van-row>
    <van-divider>没有更多了</van-divider>
  </div>
</template>

<script>
export default {
    data(){
        return{
            chapterList:[
                {
                    id:1,
                    title:"薄荷"
                },
                {
                    id:2,
                    title:"薄荷"
                },
                {
                    id:3,
                    title:"薄荷"
                },
                {
                    id:3,
                    title:"薄荷"
                },
                {
                    id:3,
                    title:"薄荷"
                },
                {
                    id:3,
                    title:"薄荷"
                },
                {
                    id:3,
                    title:"薄荷"
                },
                {
                    id:3,
                    title:"薄荷"
                },
                {
                    id:3,
                    title:"薄荷"
                },
                {
                    id:3,
                    title:"薄荷"
                }
            ],
        }
    },
    methods:{
        bookContent(){
            this.$router.push({path:'/bookContent'})
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bookdetil{
    text-align: center;
    .van-row{
        //margin-top: 2rem;
        padding: 1rem 0;
        margin: 0 1rem;
        border-bottom: 1px solid #e8ecf3;
    }
}
</style>
