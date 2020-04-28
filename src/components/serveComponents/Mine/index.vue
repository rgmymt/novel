<template>
  <div v-if="user.userName" class="mine">
    <div class="userBox">
      <van-cell
        :title="user.userName"
        icon="https://b.yzcdn.cn/vant/icon-demo-1126.png"
        size="large"
      >
        <template #label>
          <span style="margin-right:10px">{{user.iswriter|isWriter}}</span>
          <van-tag v-if="user.iswriter==-1" plain type="primary" @click="applyAuthor()">申请成为作家</van-tag>
        </template>
      </van-cell>
    </div>
    <div class="Box">
      <van-cell v-if="user.iswriter==1" title="我的作品" icon="my-shujia1" is-link to="works" />
      <!-- <van-cell title="路由跳转" icon="location-o" is-link to="Index" /> -->
    </div>
    <div class="Box">
      <van-cell v-if="user.iswriter==1" title="写作" icon="my-xiexin" is-link to="edit?isBook=false" />
      <!-- <van-cell title="设置" icon="my-system" is-link to="set" /> -->
    </div>
    <div class="Box">
      <van-button class="btn" type="info" block @click="loginOut">注销</van-button>
    </div>
  </div>
  <div class="mine" v-else>
    <div class="msg">您还没有登录~</div>
    <div class="Box">
      <van-button class="btn" type="info" block @click="Tologin">前往登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        userName: "",
        passWord: "",
        iswriter: "",
        userid: ""
      }
    };
  },
  activated() {
    this.user = this.$store.state.user;
    this.$set(this.user,'','')
  },
  methods: {
    ...mapActions(["setUserInfo"]),
    applyAuthor() {
      this.$request({
        url: `${process.env.VUE_APP_API}/apply/doApply`,
        method: "post"
      }).then(res => {
        console.log(res);
        this.getUserInfo()
        this.$toast.success('申请已成功提交');
      });
    },
    getUserInfo() {
      this.$request({
        url: `${process.env.VUE_APP_API}/userInfo`,
        method: "get"
      }).then(res => {
        console.log(res);
        this.user.iswriter = res.iswriter;
        this.user.userid = res.userid;
        this.setUserInfo(this.user);
        this.$set(this.user,'1',res.iswriter)
      });
    },
    loginOut() {
      this.user.userName = "";
      this.user.passWord = "";
      this.user.userid = "";
      this.user.iswriter = "";
      this.setUserInfo(this.user);
      this.$router.push("/login");
    },
    Tologin(){
      this.$router.push("/login");
    }
  },
  filters: {
    isWriter(val) {
      if (val === -1) {
        return "普通用户";
      } else if (val === 0) {
        return "普通用户（作家申请审核中…）";
      } else if (val === 1) {
        return "作家";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.mine {
  .userBox {
    /deep/.van-icon__image {
      width: 3rem;
      height: 3rem;
    }
  }
  .Box {
    margin-top: 1rem;
    .btn {
      margin: 0 auto;
      width: 90%;
    }
  }
  .msg{
    text-align: center;
    margin: 6rem;
  }
  .van-button--info{
    background-color: #5a62a1;
    border:1px solid #5a62a1;
  }
}
</style>
