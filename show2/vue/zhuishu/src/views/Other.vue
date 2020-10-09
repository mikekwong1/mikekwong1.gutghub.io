<template>
  <div>
    <van-tabs>
      <van-tab
        v-for="(item, index) in Categories"
        :title="item.name"
        :key="index"
        style=" padding-bottom: 40px;"
      >
        <div class="content " v-for="(it, id) in item" :key="id">
          <div class="neirong" v-for="(i, d) in it" :key="d">
            <p class="box-font font-header ">{{ i.name }}</p>
            <div class="img-big-box">
              <div class="img-box" v-for="(ie, ide) in i.bookCover" :key="ide">
                <img
                  class="img-auto"
                  :src="'http://statics.zhuishushenqi.com' + ie"
                />
              </div>
            </div>
            <p class="box-font font-bottom">
              <span>{{ i.bookCount }}</span>
              <span class="fr">{{ i.monthlyCount }}</span>
            </p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      active: 3,

      abc: ["a", "b"],
      Categories: [],
    };
  },
  created() {
    //获取带书籍数量的父分类
    this.getCategories();
  },
  components: {},

  computed: {},

  methods: {
    btn() {
      console.log("123456", this.Categories[0]);
    },

    //获取带书籍数量的父分类
    getCategories() {
      // 开始网络请求 弹出加载轻提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      setTimeout(() => {
        this.axios({
          url: "/categories",
        }).then((res) => {
          // 关闭加载轻提示
          this.$toast.clear();
          console.log("res.data", res.data);
          this.Categories.push(
            { name: "女人", dataone: res.data.female },
            { name: "男人", dataone: res.data.male },
            { name: "图书", dataone: res.data.picture },
            { name: "出版", dataone: res.data.male }
          );
          console.log(this.Categories);
        });
      }, 1500);
    },
  },
};
</script>
<style lang="less" scoped>
.content {
 
  font-size: 18px;
  color: lightblue;
  &:nth-child(1),
  &:nth-child(2) {
    padding-bottom: 0px;
    margin-bottom: 0px;
  }
}
.neirong {
  &:nth-child(1),
  &:nth-child(2) {
    padding-bottom: 0px;
    margin-bottom: 0px;
  }
}
.font-header {
  // background: lightgreen;
  text-align: center;
}
.img-head {
  width: 50px;
  height: 50px;
  border: 50%;
}
.header {
  background-color: lightblue;
}
.img-big-box {
  display: flex;
  flex: 1;
}
.box-font {
  padding: 2px 20px 0px  20px;
}
.img-box {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
// .font-bottom{
//   padding: ;
// }
</style>

