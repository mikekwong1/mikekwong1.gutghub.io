<template>
  <div>
    <div>
      <!-- 二级路由 -->
      <!-- include="Home,Menu" Home组件和Menu组件被缓存 include="Home,Menu" -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

      <van-tabbar v-model="tabbarIndex" active-color="#37a6e1" :route="true">
        <van-tabbar-item
          v-for="(item, index) in tabbarData"
          :key="index"
          :to="item.url"
        >
          <span>{{ item.title }}</span>
          <template #icon="props">
            <img :src="props.active ? item.icon.active : item.icon.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbarIndex: 4,
      tabbarData: [
        {
          title: "书架",
          icon: {
            active: require("../assets/img/myshu_active.png"),
            inactive: require("../assets/img/myshu.png"),
          },
          url: {
            name: "Bookrack",
          },
        },
        {
          title: "商城",
          icon: {
            active: require("../assets/img/shu_active.png"),
            inactive: require("../assets/img/shu.png"),
          },
          url: {
            name: "Bookstore",
          },
        },
        {
          title: "排行榜",
          icon: {
            active: require("../assets/img/shujia_active.png"),
            inactive: require("../assets/img/shujia.png"),
          },
          url: {
            name: "Ranking",
          },
        },
        {
          title: "我的",
          icon: {
            active: require("../assets/img/shulian_active.png"),
            inactive: require("../assets/img/shulian.png"),
          },
          url: {
            name: "My",
          },
        },
      ],
    };
  },

  components: {},

  computed: {},

  methods: {},
};
</script>
<style lang="less" scoped>
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
</style>
