<template>
  <div class="applyManage">
    <van-nav-bar
      title="标签管理"
      left-arrow
      @click-left="$router.go(-1)"
      right-text="新增"
      @click-right="Tagadd=true"
    />
    <van-cell class="tagLine" v-if="Tagadd">
      <van-field v-model="value" placeholder="请输入标签名称" />
      <template #right-icon>
        <van-icon color="#1989fa" name="success" @click="addTag()" style="margin:auto" />
      </template>
    </van-cell>
    <van-cell class="tagLine" v-for="(item,index) in tagList" :key="index">
      {{item.typename}}
      <template #right-icon>
        <van-icon color="#1989fa" name="cross" @click="deleteTag(item)" />
      </template>
    </van-cell>
    <van-divider v-if="tagList.length == 0">暂无申请</van-divider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      Tagadd: false,
      tagList: []
    };
  },
  created() {
    this.gettagList();
  },
  methods: {
    gettagList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/novelType/getAll`,
        method: "get"
      }).then(res => {
        console.log(res);
        this.tagList = res;
      });
    },
    addTag() {
      const formData = new FormData();
      formData.append("typeName", this.value);
      this.$request({
        url: `${process.env.VUE_APP_API}/novelType/insert`,
        method: "post",
        data: formData
      }).then(res => {
        console.log(res);
        if (res.type === "success") {
          this.$toast.success("添加标签成功");
          this.gettagList();
          this.value = "";
          this.Tagadd = false;
          console.log(res);
        } else {
          this.$toast.fail(res.msg);
        }
      });
    },
    deleteTag(item) {
      console.log(item);
      const formData = new FormData();
      formData.append("typeId", item.typeid);
      this.$request({
        url: `${process.env.VUE_APP_API}/novelType/delete`,
        method: "delete",
        data: formData
      }).then(res => {
        console.log(res);
        this.$toast.success("标签已删除");
        this.gettagList();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.applyManage {
  /deep/.van-field {
    padding: 0px;
  }
  .delete-button {
    height: 100%;
  }
}
</style>
