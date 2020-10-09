<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
//import { utils } from './assets/js/utils';

export default {
  data() {
    return {};
  },
  created() {
    //获取带子分类的分类
    //this.getSubCategories();
    //获取分类详情
    //this.getCategoryInfo();
    //获取书籍详情
    //this.getBookInfo();
    //获取书籍相关推荐
    //this.getrecommend();
    //获取作者名下的书籍
    //this.getauthorbooks();
    //获取书籍源
    //this.getBookSources();
    //获取书籍章节列表
    //this.getBookChapters();
    //获取搜索结果
    //this.getsearch();
    // 获取内容
    //this.getneirong();
    // 获取书单
    //this.getbooklists();
    // 获取评论
    //this.getdiscussions();
    // 获取长评
    //this.getreviews();

  },
  // components:{
  //   utils
  // },
  methods: {
    //获取带子分类的分类
    getSubCategories() {
      // 开始网络请求 弹出加载轻提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "/sub-categories",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("sub-categories", res);
          // this.feamle = res.data.female;
          if (res.status == 200) {
            console.log("sub-categories", res.data);
          }
        });
      }, 1500);
    },
    //获取分类详情
    getCategoryInfo() {
      // let datas = utils.queryString({

      // })
      // 开始网络请求 弹出加载轻提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        //"/category-info?gender=male&type=hot&major=奇幻&minor=&start=0&limit=20"
        this.axios({
          // method: "GET",
          url:
            "http://novel.kele8.cn/category-info?gender=male&type=hot&major=奇幻&minor=&start=0&limit=20",
          // query: {},
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("category-info", res);
          // this.feamle = res.data.female;
        });
      }, 1500);
    },
    //获取书籍详情
    getBookInfo() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "http://novel.kele8.cn/recommend/53115e30173bfacb4904897e",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("BookInfo", res);
          // this.feamle = res.data.female;
        });
      }, 1500);
    },
    //获取书籍相关推荐
    getrecommend() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "http://novel.kele8.cn/recommend/53115e30173bfacb4904897e",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("recommend", res);
          // this.feamle = res.data.female;
        });
      }, 1500);
    },
    //获取作者名下的书籍
    getauthorbooks() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "http://novel.kele8.cn/author-books?author=李别浪",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("authorbooks", res);
          // this.feamle = res.data.female;
        });
      }, 1500);
    },
    //获取书籍源
    getBookSources() {
      //http://novel.kele8.cn/book-sources?view=summary&book=567d2cb9ee0e56bc713cb2c0
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url:
            "http://novel.kele8.cn/book-sources?view=summary&book=53c49cd82e15d8694c9a59b2",
          view: "summary",
          book: "/567d2cb9ee0e56bc713cb2c0",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("BookSources", res);
          // this.feamle = res.data.female;
        });
      }, 1500);
    },
    //获取书籍章节列表
    getBookChapters() {
      //http://novel.kele8.cn/book-chapters/56f8da09176d03ac1983f6cd
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "http://novel.kele8.cn/book-chapters/5a2025f53d9ddf9a0407fcf5",
          id: "56f8da09176d03ac1983f6cd",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("bookChapters", res);
          // this.feamle = res.data.female;
        });
      }, 1500);
    },
    //获取搜索结果
    getsearch() {
      //http://novel.kele8.cn/search?keyword={keyword}
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "/search?keyword=遮天",
          keyword: "遮天",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("search", res);
          // this.feamle = res.data.female;
        });
      }, 1500);
    },
    // 获取排名详情
    getRank() {
      //http://novel.kele8.cn/rank/:id
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "/rank/:id",
          id: "/54d42d92321052167dfb75e3",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("Rank", res);
          // this.feamle = res.data.female;
        });
      }, 1500);
    },
    getneirong() {
      //http://api.pingcc.cn/?xsurl2=qbxs/book/12893/9626498.html

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "http://api.pingcc.cn/?xsurl2=qbxs/book/12893/9626498",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("Rank", res);
          // this.feamle = res.data.female;
        });
      }, 1500);
    },
    //获取书单
    getbooklists() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "/booklists",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("booklists", res);
        });
      }, 1500);
    },
    //获取/book/discussions
    getdiscussions() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "/book/discussions?book=51060c88bb1c67cf28000035",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("discussions", res);
        });
      }, 1500);
    },
    //获取长评论
    getreviews() {
      //let id ="51060c88bb1c67cf28000035"
      // /book/reviews
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "/book/reviews?book=51060c88bb1c67cf28000035",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("reviews", res);
        });
      }, 1500);
    },
  },
};
</script>

<style lang="less">
body {
  background-color: #efffff;
}
* {
  padding: 0;
  margin: 0;
}
.main {
  padding-bottom: 50px;
}
#app {
  width: 100%;
  height: 100vh;
  position: relative;
}
.img-auto {
  width: 100%;
  display: block;
}
.clearfix {
  clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.nav {
  position: fixed;
  width: 100%;
  background-color: white;
  bottom: 0;
  display: flex;

  div {
    flex: 1;
    height: 70px;
    text-align: center;
    vertical-align: middle;
    padding: 20px 0px;
    box-sizing: border-box;
    // line-height: 100px;
    cursor: pointer;
    .img-auto {
      // width: 50px;
      height: 25px;
      margin: 0 auto;
      display: block;
      &:hover {
        color: lightblue;
        filter: frop-shadow(50px 0px 0rem rgb(255, 255, 255));
      }
    }
    a {
      font-size: 13px;
      color: black;
      display: block;
      height: 100px;
      &:hover {
        color: lightblue;
      }
    }
  }
}
 .one-text{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
