<template>
  <div class="bookdetil">
    <van-nav-bar left-arrow title="小说详情" @click-left="$router.go(-1)" />
    <div class="bookLine">
      <!-- <div class="img">
        <img :scr="info.imgUrl" style="width:100%;height:100%" />
      </div> -->
      <div class="text">
        <div class="title">{{info.novelname}}</div>
        <div class="author">作者：{{info.writername}}</div>
        <!-- <div class="content">{{item.content}}</div> -->
        <div class="tag">
          <span>标签：</span>
          <van-tag plain type="primary">{{info.typename}}</van-tag>
        </div>
      </div>
    </div>
    <div class="btnBox">
      <van-button plain type="info" @click="bookContent">开始阅读</van-button>
      <van-button v-if="user.userName!='admin'" plain icon="star-o" type="warning" @click="collect">收藏</van-button>
      <van-button v-if="user.userName!='admin'" plain icon="like-o" type="danger" @click="like">点赞</van-button>
    </div>
    <keep-alive>
      <van-tabs v-model="active" sticky animated>
        <van-tab title="评论">
          <div class="comment_body" v-for="(item,index) in commentList" :key="index">
            <div class="head">
              <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="40" />
              <div style="margin-left:0.5rem">
                <div class="author">{{item.writername}}</div>
                <div class="time">{{util.formatDateTime(item.createtime)}}</div>
              </div>
            </div>
            <div class="content">
              <div>{{item.commentcontent}}</div>
              <div class="handleBar">
                <div class="btn" @click="commentlike(item)">
                  <van-icon name="like-o" />
                  <span>{{item.likedata}}</span>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="目录">
          <Catalog :chapter="chapterList"></Catalog>
        </van-tab>
      </van-tabs>
    </keep-alive>
    <van-cell-group v-if="active==0" class="bottom">
      <van-field v-model="comment" rows="1" autosize type="textarea" placeholder="发表评论">
        <template #button>
          <van-button size="small" type="info" @click="sumbitPost">发表</van-button>
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import Catalog from "./catalog";
export default {
  components: {
    Catalog
  },
  data() {
    return {
      active: 0,
      commentList:[],
      comment:'',
      user:{},
      chapterList:[],
      info: {
        imgUrl: "",
        novelname: "",
        author: "",
        content: "",
        tagname: ""
      }
    };
  },
  created(){
  },
  activated() {
    this.user = this.$store.state.user;
    this.info = JSON.parse(this.$route.query.info);
    this.getCommentList()
    this.getChapterList()
  },
  methods: {
    bookContent() {
      this.$request({
        url: `${process.env.VUE_APP_API}/chapter/getAll`,
        method: "get"
      }).then(res => {
        this.$router.push({ path: "/bookContent", query: { info: res[0] } });
      });
    },
    getChapterList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/chapter/getAll`,
        method: "get"
      }).then(res => {
        this.chapterList = res;
      });
    },
    collect() {
      this.$request({
        url: `${process.env.VUE_APP_API}/measure/insert`,
        method: "post"
      }).then(res => {
        if (res.type === "success") {
            this.$toast.success("收藏成功");
          } else {
            this.$toast.fail(res.msg);
          }
      });
    },
    like() {
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/doLike`,
        method: "post"
      }).then(res => {
        console.log(res);
        this.$toast.success("点赞成功");
      });
    },
    getCommentList(){
      this.$request({
        url: `${process.env.VUE_APP_API}/comment/pagesAll`,
        method: "get",
        params:{
          novelId:this.info.novelid
        }
      }).then(res => {
        this.commentList = res.list;
      });
    },
    sumbitPost(){
      const formData = new FormData();
      formData.append("commentContent", this.comment);
      this.$request({
        url: `${process.env.VUE_APP_API}/comment/insertComment`,
        method: "post",
        data:formData
      }).then(res => {
         if (res.type === "success") {
            this.$toast.success('发表成功');
            this.getCommentList();
            this.comment=''
          } else {
            this.$toast.fail(res.msg);
          }
      });
    },
    commentlike(item){
      const formData = new FormData();
      formData.append("commentId", item.commentid);
      this.$request({
        url: `${process.env.VUE_APP_API}/comment/doLike`,
        method: "post",
        data:formData
      }).then(res => {
         if (res.type === "success") {
            this.$toast.success(res.msg);
             this.getCommentList();
          } else {
            this.$toast.fail(res.msg);
          }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bookdetil {
  .van-nav-bar {
    width: 100%;
    background-color: #5a62a1;
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__title{
      color: #fff;
    }
  }
  .bookLine {
    padding: 0.7rem;
    display: flex;
    .img {
      float: left;
      width: 5rem;
      height: 6rem;
      padding: 0.28rem 0.4rem;
    }
    .text {
      //font-size: ;
      //float: right;
      padding: 0.36rem 0;
      text-align: left;
      .author {
        font-size: 0.5rem;
        color: #969799;
        padding: 0.3rem 0;
      }
      .content {
        font-size: 0.3rem;
        color: #969799;
        padding: 0.3rem 0;
      }
      .tag {
        font-size: 0.3rem;
        color: #969799;
        padding: 0.3rem 0;
      }
    }
  }
  .comment_body {
    padding: 1rem;
    border-bottom: 1px dashed #ddd;
    .head {
      display: flex;
      align-items: center;
      .author {
        font-size: 1rem;
        //color:#969799;
        margin-top: 0.3rem;
      }
      .time {
        font-size: 0.5rem;
        color: #969799;
        margin-top: 0.3rem;
        span {
          color: #333333;
        }
      }
    }
    .content {
      position: relative;
      margin-top: 0.3rem;
      background: #ffffff;
      min-height: 3rem;
      //overflow-y: auto;
      padding: 0.3rem;
      padding-bottom: 1.5rem;
      .handleBar {
        position: absolute;
        bottom: 0.5rem;
        right: 0.5rem;
        .btn {
          float: right;
          margin-left: 0.5rem;
          display: flex;
          align-items: center;
          span {
            font-size: 0.3rem;
            color: #969799;
            margin-left: 0.3rem;
          }
        }
      }
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    .van-button--info{
      background-color: #5a62a1;
      border:1px solid #5a62a1;
    }
  .van-cell{
    box-shadow: 0px -3px 10px #ddd;;
  }
  }
  .btnBox {
    .van-button {
      margin-left: 1rem;
      margin-bottom: 0.5rem;
    }
  }
  /deep/.van-tabs__nav {
    background-color: #fff;
  }
  /deep/.van-tabs__line {
    background-color: cornflowerblue;
    height: 1px;
  }
}
</style>
