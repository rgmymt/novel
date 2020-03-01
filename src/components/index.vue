<template>
    <div class="index">
        <van-nav-bar title="云小说阅读器"/>
        <div class="tabContent" v-if="active == 0">
            <keep-alive>
                <Bookshelf></Bookshelf>
            </keep-alive>
        </div>
        <div class="tabContent" v-if="active == 1">
            <keep-alive>
                <Recommend></Recommend>
            </keep-alive>
        </div>
        <div class="tabContent" v-if="active == 2">
            <keep-alive>
                <Mine></Mine>
            </keep-alive>
        </div>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="bar-chart-o">书架</van-tabbar-item>
            <van-tabbar-item icon="fire-o">推荐</van-tabbar-item>
            <van-tabbar-item icon="contact">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import Bookshelf from './serveComponents/Bookshelf/index'
import Recommend from './serveComponents/Recommend/index'
import Mine from './serveComponents/Mine/index'
export default {
    components: {
        Bookshelf,
        Recommend,
        Mine
    },
    data() {
        return {
            active:1,
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.index{
    // /deep/.van-nav-bar{
    //     background: none;
    // }
}
</style>
