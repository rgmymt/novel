<template>
  <div class="activitydetil">
    <van-nav-bar left-arrow :title="info.posttitle" @click-left="$router.go(-1)" />
    <div class="post_body">
      <div class="head">
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="40" />
        <div style="margin-left:0.5rem">
          <div class="author">
            {{info.writername}}
            <van-tag plain type="primary">贴主</van-tag>
          </div>
          <div class="time">{{util.formatDateTime(info.createtime)}}</div>
        </div>
      </div>
      <div class="content">
        <div>{{info.postcontent}}</div>
      </div>
    </div>
    <div class="post_body" v-for="(item,index) in commentList" :key="index">
      <div class="head">
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="40" />
        <div style="margin-left:0.5rem">
          <div class="author">{{item.writername}}</div>
          <div class="time">{{util.formatDateTime(item.createtime)}}</div>
        </div>
      </div>
      <div class="content">
        <div>{{item.postcommentcontent}}</div>
        <div class="handleBar">
          <div class="btn" @click="like(item)"><van-icon name="like-o" /><span>{{item.likedata}}</span></div>
        </div>
      </div>
    </div>
    <van-cell-group class="bottom">
      <van-field v-model="postContent" rows="1" autosize type="textarea" placeholder="发表评论">
        <template #button>
          <van-button size="small" type="info" @click="sumbitPost">发表</van-button>
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      info: {},
      commentList: [],
      postContent: ""
    };
  },
  created() {
    this.info = this.$route.query.info;
    this.getComment();
  },
  methods: {
    getComment() {
      this.$request({
        url: `${process.env.VUE_APP_API}/postComment/pagesAll`,
        method: "get"
      }).then(res => {
        this.commentList = res.list;
      });
    },
    sumbitPost(){
      const formData = new FormData();
      formData.append("postCommentContent", this.postContent);
      this.$request({
        url: `${process.env.VUE_APP_API}/postComment/insert`,
        method: "post",
        data:formData
      }).then(res => {
         if (res.type === "success") {
            this.$toast.success('发表成功');
            this.getComment();
            this.postContent=''
          } else {
            this.$toast.fail(res.msg);
          }
      });
    },
    like(item){
      const formData = new FormData();
      formData.append("postCommentId", item.postcommentid);
      this.$request({
        url: `${process.env.VUE_APP_API}/postComment/addLike`,
        method: "post",
        data:formData
      }).then(res => {
         if (res.type === "success") {
            this.$toast.success(res.msg);
             this.getComment();
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
.activitydetil {
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
  padding-bottom: 50px;
  .post_body {
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
      min-height: 6rem;
      //overflow-y: auto;
      padding: 0.3rem;
      padding-bottom: 1.5rem;
      white-space: pre-wrap;
  word-wrap: break-word;
      .handleBar{
        position:absolute;
        bottom: 0.5rem;
        right: 0.5rem;
        .btn{
          float: right;
          margin-left: 0.5rem;
          display: flex;
          align-items: center;
          span{
            font-size: 0.3rem;
            color:#969799;
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
}
</style>
