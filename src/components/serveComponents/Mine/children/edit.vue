<template>
  <div class="works">
    <van-nav-bar title="我的作品" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <van-cell-group>
      <van-field label="书名" name="name">
        <template #input>
          <van-field v-model="bookName" placeholder="请输入书名" :readonly="isBook"/>
        </template>
      </van-field>
    </van-cell-group>
    <van-cell-group>
      <van-field label="标签" readonly name="tag"  @click="tagselect">
        <template #input class="tagBox">
          <van-tag v-for="(item,index) in tag" :key="index" plain type="primary">{{item.typename}}</van-tag>
        </template>
      </van-field>
    </van-cell-group>
    <!-- <van-field label="简介" value="输入框已禁用"/> -->
    <!-- <van-field
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
    </van-cell>-->
    <div v-if="!isBook" style="text-align:center;margin:1rem">
    <van-button plain type="info" @click="addBook">加入书库</van-button>
    </div>
    <van-popup class="tagsel" v-model="tagchoose" position="bottom" :style="{ height: '100%' }">
      <van-sticky>
        <div class="header">标签</div>
        <van-icon
          name="cross"
          style="top:1rem;right:0.5rem;position:fixed"
          @click="tagchoose=false"
        />
        <van-field label="已选" name="tag">
          <template #input class="tagBox">
            <van-tag v-for="(item,index) in tag" :key="index" plain type="primary">{{item.typename}}</van-tag>
          </template>
        </van-field>
      </van-sticky>
      <div class="tagList">
        <div class="title">标签列表</div>
        <van-cell
          class="tagLine"
          v-for="(item,index) in tagList"
          :key="index"
          @click="tagclick(item,index)"
        >
          {{item.typename}}
          <template #right-icon>
            <van-icon v-if="item.select" color="#1989fa" name="success" />
          </template>
        </van-cell>
      </div>
    </van-popup>
    <div v-show="isBook" class="catalog">
      <!-- <div class="title">
        <span style="float:left">章节</span>
        <van-icon name="add-o" style="float:right" />
        <div style="clear:both"></div>
      </div>-->
      <van-row>
        <van-col span="4">章节</van-col>
        <van-col span="12" offset="4">标题</van-col>
        <van-icon name="add-o" @click="addCatalog(-1)" />
      </van-row>
      <van-row v-for="(item ,index) in chapterList" :key="index" @click="bookContent">
        <van-col span="4">{{index+1}}</van-col>
        <van-col span="16" offset="4">{{item.chaptername}}</van-col>
        <!-- <van-col span="2">
          <van-icon name="edit" @click="addCatalog(index)" />
        </van-col>
        <van-col span="2">
          <van-icon name="delete" @click="delCatalog(index)" />
        </van-col> -->
      </van-row>
    </div>
    <van-popup closeable position="bottom" v-model="show" :style="{ height: '100%' }">
      <van-field v-model="title" readonly />
      <van-field v-model="chapterFrom.chapterName" placeholder="请输入标题" />
      <h6 style="padding-left:16px;">正文</h6>
      <van-field
        v-model="chapterFrom.content"
        rows="13"
        autosize
        type="textarea"
        maxlength="2000"
        placeholder="2000字以内"
        show-word-limit
      />
      <div style="text-align:right;margin:0.5rem 1rem">
      <van-button class="saveBtn" @click="saveCatalog" plain type="info">保存</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info:{},
      tagchoose: false,
      show: false,
      bookName: "",
      tag: [], // 已选标签列表
      tagList: [], // 所有标签列表
      isBook: false, // 是否加入书库成功
      chapterList: [],
      fileList: [],
      title:'章节名称',
      chapterFrom: {
        chapterName: "",
        content: ""
      }
    };
  },
  created() {
    this.gettagList();
    this.isBook = this.$route.query.isBook
    if(this.isBook){
      this.info = this.$route.query.info
      this.bookName = this.info.novelname
      this.tag.push(this.info)
      this.checkNovel()
    }
  },
  methods: {
    gettagList() {
      this.$request({
        url: `${process.env.VUE_APP_API}/novelType/getAll`,
        method: "get"
      }).then(res => {
        console.log(res);
        this.tagList = res;
        this.tagList.forEach(item => {
          item.select = false;
        });
      });
    },
    // 标签单选
    tagclick(item, index) {
      if (item.select === false) {
        this.tagList.forEach(item => {
          item.select = false;
        });
        this.$set(this.tagList[index], "select", !item.select);
        this.tagList.push("");
        this.tagList.pop();
        this.tag = [];
        this.tag.push(item);
      } else {
        this.tag = [];
        this.$set(this.tagList[index], "select", false);
        this.tagList.push("");
        this.tagList.pop();
      }
    },
    // 标签多选
    // tagclick(item,index){
    //   this.$set(this.tagList[index],'select',!item.select)
    //   this.tagList.push('')
    //   this.tagList.pop()
    //   console.log(this.tagList)
    //   if(item.select === false){
    //     this.tagChange(item.typename)
    //   }else{
    //     this.tag.push(item)
    //   }
    // },
    // tagChange(name){
    //   this.tag.forEach((item,index)=>{
    //     if(item.typename === name){
    //       this.tag.splice(index, 1)
    //     }
    //   })
    // },
    tagselect(){
      if(!this.isBook){
        this.tagchoose = true
      }
    },
    addBook() {
      console.log(this.tag);
      const formData = new FormData();
      formData.append("novelName", this.bookName);
      formData.append("typeName", this.tag[0].typename);
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/insert`,
        method: "post",
        data: formData
      }).then(res => {
        console.log(res);
        if (res.type === "success") {
          this.$toast.success("加入书库成功");
          this.isBook = true
        } else {
          this.$toast.fail(res.msg);
        }
      });
    },
    // afterRead(file) {
    //   // 此时可以自行将文件上传至服务器
    //   console.log(file);
    // },
    checkNovel(){
      this.$request({
        url: `${process.env.VUE_APP_API}/novel/getOne`,
        method: "get",
        params:{
          novelId:this.info.novelid
        }
      }).then(res => {
        console.log(res);
        this.getCatalogList()
      })
    },
    getCatalogList(){
      this.$request({
        url: `${process.env.VUE_APP_API}/chapter/getAll`,
        method: "get"
      }).then(res => {
        console.log(res);
        this.chapterList = res;
      });
    },
    // addCatalog(index) {
    //   this.show = true;
    //   console.log(index)
    // },
    // delCatalog(index) {
    //   console.log("删除章节", index);
    // },
    saveCatalog() {
      this.show = false;
      const formData = new FormData();
      formData.append("novelId", this.info.novelid);
      formData.append("chapterName", this.chapterFrom.chapterName);
      formData.append("content", this.chapterFrom.content);
      this.$request({
        url: `${process.env.VUE_APP_API}/chapter/insertByNovelId`,
        method: "post",
        data: formData
      }).then(res => {
        console.log(res);
        if (res.type === "success") {
          this.$toast.success("章节添加成功");
        } else {
          this.$toast.fail(res.msg);
        }
      });
    },
    saveBook() {
      console.log("保存");
      this.$router.push({ path: "/works" });
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
  /deep/.van-field__label {
    margin: auto;
  }
  /deep/.van-field__body {
    display: flex;
    flex-wrap: wrap;
    .van-field__control {
      display: flex;
      flex-wrap: wrap;
    }
    .van-tag {
      margin: 0.2rem;
    }
  }
  .van-cell-group {
    .cover {
      /deep/.van-cell__title {
        //display: none;
        -webkit-box-flex: 0;
        flex: none;
        width: 90px;
      }
      /deep/.van-cell__value {
        text-align: left;
      }
    }
  }
  .tagsel {
    .header {
      text-align: center;
      font-size: 1.4rem;
      line-height: 3rem;
      background-color: #ffffff;
    }
    .tagList {
      margin: 0.5rem 1rem;
      .title {
        //line-height: 2rem;
      }
    }
  }
  .catalog {
    .title {
      margin: 5px 5%;
      width: 90%;
    }
    .van-row {
      //margin-top: 2rem;
      padding: 1rem 0;
      margin: 0 1rem;
      border-bottom: 1px solid #e8ecf3;
      .van-icon {
        float: right;
      }
    }
  }
}
</style>
