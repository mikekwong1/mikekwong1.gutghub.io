<template>
  <div class="seach clearfix ">
    <van-nav-bar
      class="header"
      title="搜索页"
      left-text="返回"
      left-arrow
      @click-left="back"
    />
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键字"
      shape="round"
      autofocus
      show-action
      @input="gosearch"
      maxlength="10"
    />
    <div class="find-list">
      <div class="find-one" v-for="(item, index) in searchData"
        :key="index"
        @click="getsearch(item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="hot-tip">热搜榜</div>
    <div class="topdetail-list">
      <div class="list-one clearfix" v-for="(item, index) in books" :key="index" @click="goBooktedatil(item._id)">
        <div class="one-img fl">
          <img :src="item.cover" alt="" class="img-auto" />
        </div>
        <div class="fl one-right">
          <div class="one-title">{{ item.title }}</div>
          <div class="details">{{ item.shortIntro }}</div>
          <div class="one-last">
            <div class="fl">作者:{{ item.author }}</div>
            <div class="fr">{{ item.maforCate }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: [],
      searchValue: "",
      id: "",
      books: [],
      title: "",
    };
  },
  created() {
    //this.getsearch();
    //this.gosearch();
    this.getRank("5a6844f8fc84c2b8efaa8bc5");
  },
  components: {},

  computed: {},

  methods: {
    // 自动补全
    gosearch() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });

      this.axios({
        method: "GET",
        url: "/auto-complete",
        params: {
          query: this.searchValue,
        },
      }).then((res) => {
        // 关闭加载轻提示
        this.$toast.clear();
        console.log("input", res);

        this.searchData = res.data.keywords;
      });
    },
    //获取搜索结果
    getsearch(item) {
      //http://novel.kele8.cn/search?keyword={keyword}
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "/search?keyword="+item,
          params:{

          }
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("search", res);
          let id = res.data.books[0]._id
          this.$router.push({name:"Bookdetail",query:{id}})
        });
      }, 1500);
    },
    imgKey(value) {
      return unescape(value).slice(7);
    },
    onCancel() {
      this.$router.go(-1);
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 获取排名详情
    getRank(id) {
      //http://novel.kele8.cn/rank/:id
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      this.axios({
        method: "GET",
        url: "/rank/" + id,
      }).then((res) => {
        // 关闭加载轻提示
        this.$toast.clear();
        console.log("Rank", res);
        for (let i = 0; i < res.data.ranking.books.length; i++) {
          res.data.ranking.books[i].cover = this.imgKey(
            res.data.ranking.books[i].cover
          );
        }
        this.books = res.data.ranking.books;
        console.log(" this.books ", this.books);
      });
    },
    goBooktedatil(id){
      this.$router.push({name:"Bookdetail",query:{id}})
    }
  },
};
</script>
<style lang="less" scoped>
.header {
  background-color: lightblue;
}
.seach {
  background-color: #fff;
  position: relative;
  .find-list {
    background-color: #fff;
    position: absolute;
    width: 85%;
    left: 30px;
    top: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    z-index: 999;
    box-sizing: border-box;
    margin-top: 20px;
    > .find-one {
      padding: 5px 10px;
      font-size: 14px;
    }
  }
}
.hot-tip {
  text-align: center;
  font-size: 16px;
}
.find-top {
  background-color: #fff;
  position: absolute;
  padding: 15px;
  margin-top: 14px;
  .find-list {
    background-color: #fff;
    position: absolute;
    width: 85%;
    left: 30px;
    top: 60px;
    border-radius: 10px;
    z-index: 999;
    > .find-one {
      padding: 5px 10px;
      font-size: 14px;
    }
  }
  .top-x {
    width: 90%;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .top-x::-webkit-scrollbar {
    display: none;
  }
  .top-list {
    text-align: center;

    > div {
      font-size: 14px;
      font-weight: 700;
      color: #b6b9bf;
      margin-left: 10px;
      margin-right: 10px;

      &.active {
        font-size: 20px;
        color: black;
      }
    }
  }
}
.topdetail-list {
  margin-top: 10px;
  .list-one {
    display: flex;
    border-bottom: 1px solid #ccc;
     padding: 15px;
     box-sizing: border-box;
  }
  .one-img {
    width: 85px;
  }
  .one-right {
    flex: 1;
    width: calc(~"100% - 85px");
  }
  .one-title {
    font-size: 16px;
    font-weight: 700;
    padding: 5px;
    box-sizing: border-box;
  }
  .details {
    box-sizing: border-box;
    padding: 5px 10px;
    color: #ccc;
    height: 46px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .one-last {
    color: #feb67e;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
