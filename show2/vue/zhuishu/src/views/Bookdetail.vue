<template>
  <div class="bookdetail">
    <van-nav-bar
      class="header"
      title="书籍详情"
      left-text="返回"
      @click-left="back"
    />
    <div class="book-name clearfix">
      <div class="name-img fl">
        <img class=" img-autos" style="height:100%；  border-radius: 19px;" :src="bookData.cover" alt="" />
      </div>
      <div class="name-msg fl">
        <div class="one-text">{{ bookData.title }}</div>
        <div>{{ bookData.author }}</div>
        <div>
          <span>{{ bookData.majorCate }}</span>
          <span>|</span>
          <span>连载</span>
        </div>
      </div>
    </div>
    <div class="book-massage clearfix">
      <div class="fl">
        <div>5000</div>
        <div><span>个人评论</span></div>
      </div>
      <div class="fl">
        <div>1.5万</div>
        <div>阅读</div>
      </div>
      <div class="fl">
        <div>{{ bookData.totalFollower }}</div>
        <div>人气值</div>
      </div>
      <div class="fl">
        <div>{{ bookData.wordCount }}</div>
        <div>字数</div>
      </div>
    </div>
    <div class="book-info">
      {{ bookData.longIntro }}
    </div>
    <div class="book-last clearfix ">
      <div class="fl">目录</div>
      <div class="fl  last-center one-text"></div>
      <div class="fr">{{ bookData.updated }}更新</div>
    </div>
    <div class="you-like">
      <div class="author-title">你感兴趣的书</div>
      <div class="like-list">
        <div class="like-list-width clearfix" ref="widthH">
          <div
            class="like-list-one fl"
            v-for="(item, index) in likeData"
            @click="getBookInfo(item._id)"
            :key="index"
          >
            <div>
              <img :src="item.cover" alt="" class="img-auto" />
            </div>
            <div class="one-text">
              {{ item.title }}
            </div>
            <div>
              {{ item.author }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="book-fixed">
      <div class="fl" @click="addRack" :class="{ 'active': rack }">
        {{ rack ? addrack.torack : addrack.outrack }}
      </div>
      <div class="fl" @click="go()">开始阅读</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      bookData: [],
      isshow: "",
      authorData: [],
      likeData: [],
      addrack: {
        torack: "已加入书架",
        outrack: "加入书架",
      },
      rack: false,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getBookInfo(this.id);
  },
  components: {},

  computed: {},

  methods: {
    // 看是否已加入书架
    isRack() {
      let isAll = localStorage.valueOf();
      let a = "rackList" + this.bookData._id;
      let arr = [];
      for (let key in isAll) {
        arr.push(key);
      }
      if (arr.indexOf(a) == -1) {
        this.rack = false;
      } else {
        this.rack = true;
      }
    },
    // 添加书架
    addRack() {
      if (this.rack) {
        return;
      }
      localStorage.setItem("rackList"+this.bookData._id,JSON.stringify(this.bookData))
      this.rack = true
    },
    back() {
      this.$router.go(-1);
    },
    // 图片处理
    go() {
      this.$router.push({
        name: "Bookmsg",
        query: { id: this.bookData._id, title: this.bookData.title },
      });
    },
    //获取书籍详情
    getBookInfo(id) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          methods: "GET",
          url: "/book-info/" + id,
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("BookInfo", res);
          res.data.cover = this.imgKey(res.data.cover);
          
          res.data.updated = res.data.updated.slice(0, 10)
          //console.log("res.data.updated", res.data.updated);
          res.data.wordCount = res.data.wordCount > 10000 ? String(res.data.wordCount).slice( 0, String(res.data.wordCount).length - 4 ) + "万"  : res.data.wordCount;  
          res.data.totalFollower = res.data.totalFollower > 10000 ? String(res.data.totalFollower).slice( 0, String(res.data.totalFollower).length - 4 ) + "万" : String(res.data.totalFollower);   
          this.bookData = res.data;
          console.log("res.data",res.data)
          console.log("bookData", this.bookData._id);
          this.getyoulike(this.bookData._id);
          this.isRack();
        });
      }, 1500);
    },
    // 图片处理
    imgKey(value) {
      return unescape(value).slice(7);
    },
    // 获取相关书籍
    //获取书籍详情
    getyoulike(id) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          method: "GET",
          url: "/recommend/" + id,
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          
          this.$refs.widthH.style.width =
            86 * res.data.books.length + 10 + "px";
          for (let i = 0; i < res.data.books.length; i++) {
            res.data.books[i].cover = this.imgKey(res.data.books[i].cover);
          }
          this.likeData = res.data.books;
          console.log("this.likeData", this.likeData);
        });
      }, 1500);
    },
  },
};
</script>
<style lang="less" scoped>
.img-autos{
  width: 100%;
  height: 100%;
  border-radius: 20px ;
}
.header {
  background-color: lightblue;
}
.book-name {
  // box-sizing: border-box;
  height: 150px;
  padding: 15px;
  background-color: #fff;
  .name-img {
    width: 120px;
    height: 140px;
  }
  .name-msg {
    margin-left: 10px;
    > div {
      margin-bottom: 7px;
      color: #f88070;
    }
    > div:first-child {
      font-size: 16px;
      color: black;
      font-weight: 700;
      width: calc(~"100%-120px");
    }
    > div:last-child {
      color: #ccc;
      > span {
        margin-right: 5px;
      }
    }
  }
}
.book-fixed {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  font-size: 14px;
  color: #000;
  div {
    width: 45%;
    margin-left: 13px;
    height: 40px;
    margin-top: 5px;
    text-align: center;
    line-height: 40px;
  }
  div:last-child {
    color: #fff;
    background: #05d390;
  }
}
.book-massage {
  height: 50px;
  background-color: #fff;
  > .fl {
    text-align: center;
    width: 25%;
    > div:first-child {
      color: black;
      font-size: 16px;
      font-weight: 700;
    }
    > div:last-child {
      color: #ccc;
    }
  }
}
.book-info {
  height: 60px;
  font-size: 13px;
  line-height: 17px;
  background-color: #fff;
  padding: 8px 15px;
  color: #404143;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  box-sizing: border-box;
  overflow: hidden;
}
.book-last {
  margin-top: 3px;
  padding: 15px 20px;
  background-color: #fff;
  line-height: 20px;
  color: #c6c7cb;
  height: 20px;
  .last-center {
    width: 190px;
  }
  > div:first-child {
    color: #000;
    font-size: 16px;
    font-weight: 700;
    margin-right: 10px;
  }
}
.you-like {
  background-color: white;
  height: 200px;
  .author-title {
    padding: 5px 15px;
    margin-top: 5px;
    background-color: #fff;
    font-size: 16px;
    font-weight: 700;
  }
  .like-list {
    margin: 5px 15px;
    overflow-x: scroll;
    overflow-y: hidden;
    margin-bottom: 50px;
    &:-webkit-scrollbar {
      display: none;
    }
    .like-list-one {
      width: 70px;
      margin: 0 8px;
      > div {
        color: #000;
      }
      > div:first-child {
        width: 70px;
        border-radius: 10px;
        overflow: hidden;
      }
      > div:last-child {
        color: #ccc;
      }
    }
  }
}
.one-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
