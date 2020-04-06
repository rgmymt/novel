<template>
  <div class="creatPost">
    <van-nav-bar title="发起活动" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="activityTitle"
        label="活动名称"
        name="title"
        placeholder="请输入活动名称"
        :rules="[{ required: true, message: '请填写活动名称' }]"
      />
      <van-field
        v-model="activityPos"
        label="活动地点"
        name="position"
        placeholder="请输入活动地点"
        :rules="[{ required: true, message: '请填写活动地点' }]"
      />
      <van-field
        class="textarea"
        v-model="activityCon"
        name="content"
        rows="6"
        autosize
        label="活动内容"
        type="textarea"
        placeholder="请输入活动内容"
        :rules="[{ required: true, message: '请填写活动内容' }]"
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
      activityTitle: "",
      activityPos:'',
      activityCon: ""
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values);
      const formData = new FormData();
      formData.append("actTitle", this.activityTitle);
      formData.append("location", this.activityPos);
      formData.append("description", this.activityCon);
      this.$request({
        url: `${process.env.VUE_APP_API}/activity/insert`,
        method: "post",
        data: formData
      }).then(res => {
        console.log(res);
        this.$toast.success('发起成功');
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
  .textarea {
    height: 65vh;
  }
}
</style>
