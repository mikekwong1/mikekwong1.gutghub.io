<template>
  <div>
    <van-nav-bar class="header" title="排行榜">
      <template #right>
        <van-icon  @click="toggle({name:'Search'})" name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs title-active-color="pink" color="pink">
      <van-tab v-for="(item, index) in titles" :title="item.name" :key="index">
        <div v-for="(item, index) in item.ranking" :key="index">
          <div class="title" @click="goTopdetail(item._id, item.shortTitle)">
            {{ item.shortTitle }}
            <div class="fr img-box ">
              <img
                class="img-auto"
                src="../../assets/img/icon/箭头.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: [],
    };
  },
  created() {
    this.getrankCategory();
  },
  components: {},

  computed: {},

  methods: {
    toggle(id){
      this.$router.push(id)
    },
    goTopdetail(_id, title) {
      // console.log(_id,title)
      this.$router.push({
        name: "Topdetail",
        query: { id: _id, titles: title },
      });
    },
    // 获取排名分类
    getrankCategory() {
      //http://novel.kele8.cn/rank-category
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "/rank-category",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("rankCategory", res.data);
          this.titles.push(
            { name: "总排行榜", ranking: res.data.epub },
            { name: "女生喜欢", ranking: res.data.female },
            { name: "男生喜欢", ranking: res.data.male },
            { name: "图书排行", ranking: res.data.picture }
          );
          console.log(this.titles);
        });
      }, 1500);
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  background: lightblue;
  width: 100%;
}
.img-box {
  width: 20px;
  height: 20px;
}
.van-tabs__line {
  background-color: pink;
}
.title {
  cursor: pointer;
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
  border: 1px solid #efefef;
  background-color: white;
}
</style>
