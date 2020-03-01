<template>
  <div class="works">
    <van-nav-bar title="我的作品" left-arrow right-text="保存" @click-left="$router.go(-1)" @click-right="saveBook"></van-nav-bar>
    <van-cell-group>
      <van-field label="书名" :value="bookFrom.name" />
      <!-- <van-field label="简介" value="输入框已禁用"/> -->
      <van-field
        v-model="bookFrom.content"
        rows="2"
        autosize
        label="简介"
        type="textarea"
        maxlength="200"
        placeholder="200字以内"
        show-word-limit
      />
      <van-cell class="cover" title="封面">
        <van-uploader v-model="fileList" :max-count="1" :after-read="afterRead" multiple/>
      </van-cell>
    </van-cell-group>
    <div class="catalog">
      <!-- <div class="title">
        <span style="float:left">章节</span>
        <van-icon name="add-o" style="float:right" />
        <div style="clear:both"></div>
      </div> -->
      <van-row>
        <van-col span="4">章节</van-col>
        <van-col span="12" offset="4">标题</van-col>
        <van-icon name="add-o"  @click="addCatalog(-1)"/>
      </van-row>
      <van-row v-for="(item ,index) in chapterList" :key="index" @click="bookContent">
        <van-col span="4">{{item.index}}</van-col>
        <van-col span="12" offset="4">{{item.title}}</van-col>
        <van-col span="2"><van-icon name="edit" @click="addCatalog(index)"/></van-col>
        <van-col span="2"><van-icon name="delete" @click="delCatalog(index)"/></van-col>
      </van-row>
    </div>
    <van-popup closeable position="bottom" v-model="show" :style="{ height: '100%' }">
      <van-field v-model="chapterFrom.index" readonly />
      <van-field v-model="chapterFrom.title" placeholder="请输入标题"/>
      <h6 style="padding-left:16px;">正文</h6>
      <van-field
        v-model="chapterFrom.content"
        rows="10"
        autosize
        type="textarea"
        maxlength="2000"
        placeholder="2000字以内"
        show-word-limit
      />
      <van-button class="saveBtn" @click="save" plain type="info">保存</van-button>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show:false,
      bookFrom: {
        name: "",
        content: ""
      },
      chapterList: [],
      fileList: [],
      chapterFrom:{
        index:'第一章',
        title:'',
        content:''
      },
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    addCatalog(index){
      this.show=true;
      if(index!=-1){
        this.chapterFrom=this.chapterList[index];
      }
    },
    delCatalog(index){
      console.log("删除章节",index)
    },
    save(){
      this.show=false;
      this.chapterList.push(this.chapterFrom)
    },
    saveBook(){
      console.log("保存")
      this.$router.push({path:"/works"})
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.works {
  .van-nav-bar {
    .van-icon {
      color: #333;
    }
  }
  .van-cell-group{
    .cover{
      /deep/.van-cell__title{
        //display: none;
        -webkit-box-flex: 0;
        flex: none;
        width: 90px;
      }
      /deep/.van-cell__value{
        text-align: left;
      }
    }
  }
  .catalog {
    .title {
      margin: 5px 5%;
      width: 90%;
    }
    .van-row{
        //margin-top: 2rem;
       padding: 1rem 0;
       margin: 0 1rem;
      border-bottom: 1px solid #e8ecf3;
      .van-icon{
        float: right;
      }
    }
  }
}
</style>
