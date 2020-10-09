<template>
  <div>
    <van-nav-bar
      class="header"
      :title="title"
      left-text="返回"
      @click-left="back"
    />
    <div class="book" v-for="(item, index) in rank" :key="index">
      <div
        class="book-box clearfix"
        v-for="(it, id) in item"
        @click="goBooktedail(it._id)"
        :key="id"
      >
        <div class="book-left fl">
          <img
            class="img-auto"
            :src="'http://statics.zhuishushenqi.com' + it.cover"
            alt=""
          />
        </div>
        <div class="book-right fr">
          <div class="book-title">
            <h3>{{ it.title }}</h3>
          </div>
          <div class="book-author">作者: {{ it.author }}</div>
          <!-- <van-collapse v-model="activeNames">
            <van-collapse-item title="详情内容" name="1">{{ it.shortIntro }}</van-collapse-item>
          </van-collapse> -->
          <div class="book-info">{{ it.shortIntro }}</div>

          <div class="book-right-bottom clearfix">
            <span class="fl">{{ it.minorCate }}</span>
            <span class="fr">{{ it.majorCate }}</span>
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
      id: "",
      rank: [],
      activeNames: ["1"],
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.title = this.$route.query.titles;
    this.gettopDdetail(this.id);
  },
  components: {},

  computed: {},

  methods: {
    goBooktedail(id) {
      this.$router.push({ name: "Bookdetail", query: { id } });
    },
    back() {
      this.$router.go(-1);
    },
    gettopDdetail(id) {
      console.log(id, this.$route.query);

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      setTimeout(() => {
        this.axios({
          url: "/rank/" + id,
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("Rank", res.data.ranking.books[0]._id);
          this.rank.push(res.data.ranking.books);
        });
      }, 1500);
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  background-color: lightblue;
}
.book {
  .book-box {
    display: flex;
    flex: 1;
    background-color: white;
    .book-left {
      padding: 23px 3px;
      box-sizing: border-box;
      width: 20%;
    }
    .book-author {
      padding-top: 10px;
      color: #e00000;
    }
    .book-right {
      display: inline;
      padding-top: 10px;
      box-sizing: border-box;
      width: 80%;
      position: relative;

      .book-info {
        padding-top: 10px;
        box-sizing: border-box;
        color: #ccc;
        height: 45px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 13px;
      }
      .book-right-bottom {
        padding-right: 20px;
        box-sizing: border-box;
        width: 100%;
        position: absolute;
        bottom: 15px;
        font-size: 14px;
        color: mediumorchid;

        span {
          display: block;
        }
      }
    }
  }
}
</style>
