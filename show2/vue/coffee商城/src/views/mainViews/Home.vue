<template>
  <div class="home">
    <van-nav-bar :fixed="true">
      <template #left>
          <div class="header-img" > <img class="img-auto" src="../../assets/images/咖啡.svg" alt=""> </div>
          <div class="header-img" > <img class="img-auto" src="../../assets/images/咖啡2.svg" alt=""> </div>
          <div class="header-img" > <img class="img-auto" src="../../assets/images/咖啡3.svg" alt=""> </div>
          <div class="header-img" > <img class="img-auto" src="../../assets/images/咖啡4.svg" alt=""> </div>
          <div class="header-img" > <img class="img-auto" src="../../assets/images/咖啡.svg" alt=""> </div>
      </template>
      <template #right>
          <van-search
           background="transparent"
          placeholder="请输入商品名称"
          shape="round"
          @focus="gotoshousuo()"
        />
      </template>
    </van-nav-bar>
    <div class="banner-box">   
      <van-swipe :autoplay="5000" :show-indicators="false">
        <!-- 点击跳转事件  viewProductInfo -->
        <van-swipe-item
          v-for="(item, index) in bannerData"
          :key="index"
          @click="viewProductInfo(item.pid)"
        >
          <img class="auto-img" :src="item.bannerImg" alt="" />
          <div class="pro-info-banner one-text">{{ item.name }}</div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hot-product">
      <div class="hot-product-title">
        热门推荐
        <div class="hot-img"><img class="huo" src="../../assets/images/huo.svg" alt="" /></div>
        <div class="hot-img"><img class="huo" src="../../assets/images/huo.svg" alt="" /></div>
        <div class="hot-img"><img class="huo" src="../../assets/images/huo.svg" alt="" /></div>
        
          <div class="home-title">
            {{ timeText }}&nbsp;<span class="name" v-if="isLogin">{{
              userInfo.nickName
            }}</span>
          </div>
      
      </div>
      <div class="product-box clearfix">
        <div
          class="product-item fl"
          :class="[index % 2 == 0 ? 'p-left' : 'p-right']"
          v-for="(item, index) in hotProducts"
          :key="index"
        >
          <!-- 点击跳转事件  viewProductInfo -->
          <div class="p-img" @click="viewProductInfo(item.pid)">
            <img class="auto-img" :src="item.smallImg" alt="" />
          </div>
          <div class="pro-name one-text">{{ item.name }}</div>
          <div class="clearfix">
            <!-- <div class="en-pro-name one-text fl">heitangbobo</div> -->
            <div class="pro-price fl">￥{{ item.price }}</div>
          </div>
          <img src="../../assets/images/购物车.svg" class="fr pro-img" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/less/home.less";

export default {
  name: "Home",
  data() {
    return {
      timeText: "",
      bannerData: [],
      hotProducts: [],
      isLogin: false,
      userInfo: {},
    };
  },

  created() {
    this.getTime();
    this.getbannerData();
    this.getHotProducts();
    this.getUserInfo();
  },

  methods: {
    gotoshousuo() {
      this.$router.push({ name: "Search" });
    },
    //获取时间段
    getTime() {
      let hours = new Date().getHours();
      if (hours >= 6 && hours < 12) {
        this.timeText = "早上好";
      } else if (hours >= 12 && hours < 18) {
        this.timeText = "下午好";
      } else if (hours >= 18 && hours < 24) {
        this.timeText = "晚上好";
      } else {
        this.timeText = "深夜好";
      }
    },

    //获取banner
    getbannerData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/banner",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == 300) {
            this.bannerData = result.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    //获取推荐商品数据
    getHotProducts() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/typeProducts",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
          key: "isHot",
          value: 1,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == 500) {
            this.hotProducts = result.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    //查看商品详情
    viewProductInfo(pid) {
      this.$router.push({ name: "Detail", query: { pid } });
    },

    //获取用户信息
    getUserInfo() {
      //获取token字符串
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "GET",
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == "A001") {
            if (result.data.result.length > 0) {
              this.isLogin = true;
              this.userInfo = result.data.result[0];
            }
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
  },
};
</script>
