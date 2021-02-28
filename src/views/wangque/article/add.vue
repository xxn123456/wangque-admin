<template>
  <div class="artice">
    <div class="top">
      <div class="article-name">
      

        <div contenteditable="true" class="a-title" id="title">文章标题</div>

      </div>
     
      <div class="article-type">
        <span>文章归类：</span>
        <el-select v-model="form.articleTypeId" placeholder="请选择">
          <el-option v-for="item in articleType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
         <div class="article-handel">
             <el-button type="primary" round @click="saveArticle">发布文章</el-button>
        <el-button round>清空内容</el-button>
         <el-button round @click="goArticle">返回</el-button>
       
      </div>

       
      </div>
    </div>
    <div class="mavon-boy">
      <mavon-editor v-model='form.editorContent' :subfield="true" :ishljs="true" :navigation="true" ref=md
        @imgAdd="$imgAdd" @imgDel="$imgDel" @change="changeData">
      </mavon-editor>

    </div>

  </div>
</template>
<script>
  import {
    create,
    upload
  } from '@/api/article.js'
  import qs from 'querystring'
  import 'mavon-editor/dist/css/index.css'
  export default {
    data() {
      return {
       
        img_file:{},
        form: {
          id: "",
          title: "",
          articleTypeId: "1",
          userId: "1",
          editorContent: ""
        },
        articleType: [{
            label: "天涯",
            value: 1
          },
          {
            label: "q前端",
            value: 2
          }

        ],
        editorContentHtml: null,
      }
    },

    methods: {
    
      //  发布文章
      saveArticle() {
        let title_text=document.getElementById('title').innerText;

        this.form.title=title_text;
      
        let msg = {
          title: this.form.title,
          articleTypeId: this.form.articleTypeId,
          userId: this.form.userId,
          content: this.form.editorContent,
        }
        let new_msg = qs.stringify(msg);
        create(new_msg).then((res) => {
          let {
            code
          } = res;
          if (code == "200") {
            this.$message("发布成功");
          } else {
            this.$message("发布失败")
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      },

      goArticle(){
        this.$router.push({
          path:'/blog/article'
        })
      },
      //  md 文本编辑器 获取相应md 文件" @change="changeData"
      changeData(value, render) {

        this.editorContentHtml = render;

      },
      $imgAdd(pos,$file) {
        
         let formdata = new FormData();
          formdata.append('articleImg', $file);
          this.img_file[pos] = $file;
           upload(formdata).then((res) => {
            const {
              code,
              url
            } = res;
            if(code=="200"){
                 let new_imgUrl = "http://localhost:3000" + url;
                 this.$refs.md.$img2Url(pos, new_imgUrl);
            }
            
          }).catch(error => {
            reject(error)
          })
      },
      $imgDel(pos) {
        delete this.img_file[pos];
      }
    }
  }

</script>
<style lang="scss" scoped>
  .artice {
    width: 100%;
    height: calc(100vh - 120px);
    padding: 30px 15px;

    .top {
      width: 100%;
      height: 120px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .article-name {
        width: 100%;
        margin-right: 15px;
        .a-title{
          width: 80%;
          height: 32px;
          line-height: 32px;
          border-bottom: 2px solid rgb(117,117,117);
          font-size: 24px;
        
          font-weight: bold;
          color: #555555;
        }
      }

      .role-type {

        width: 150px;
        position: relative;
        z-index: 1501;
        margin-right: 15px;

      }

     

      .article-type {
        width: 100%;
        height: 50px;
        position: relative;
        z-index: 1501;
        margin-right: 15px;
        font-size: 14px;
        color: #555555;
         .article-handel {
        width:300px;
        float: right;
     

      }

      }
    }

    .mavon-boy {

      width: 100%;
      height: 100%;
      overflow: hidden;



    }


  }

</style>
