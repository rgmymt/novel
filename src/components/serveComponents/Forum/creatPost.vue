<template>
  <div class="creatPost">
    <van-nav-bar title="发表帖子" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="postTitle"
        label="标题"
        name="title"
        placeholder="请输入标题"
        :rules="[{ required: true, message: '请填写帖子标题' }]"
      />
      <van-field
        class="textarea"
        v-model="postContent"
        name="content"
        rows="6"
        autosize
        label="内容"
        type="textarea"
        placeholder="请输入内容"
        :rules="[{ required: true, message: '请填写帖子内容' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postTitle: "",
      postContent: ""
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
      const formData = new FormData();
      formData.append("postTitle", this.postTitle);
      formData.append("postContent", this.postContent);
      formData.append("postType", this.$route.query.postType);
      this.$request({
        url: `${process.env.VUE_APP_API}/post/insert`,
        method: "post",
        data: formData
      }).then(res => {
        console.log(res);
        this.$toast.success('发表成功');
        this.$router.go(-1)
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.creatPost {
  text-align: center;
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
  .van-button--info{
    background-color: #5a62a1;
    border:1px solid #5a62a1;
  }
  .textarea {
    height: 70vh;
  }
}
</style>
