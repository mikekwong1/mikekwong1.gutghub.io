<template>
  <div class="box"  ref="box">
    <!--  v-if="!isLogin"  @click="go({name:'Login'})" -->
    <!-- {{username}} -->
    <!-- height: 100px; -->
    <div class="my-login clearfix">
      <div class="fl login-img">
        <img src="../../assets/img/icon/touxiang.png" class="img-auto" alt="" />
      </div> 
      <div class="fl login-center"  @click="go({name:'Login'})" v-if="!isLogin" >
        <span>登录</span>/
        <span>注册</span>
      </div>
      <div class="fl login-center">
        {{username}}
      </div>
      <div class="fl login-vip">
        <img class="img-auto" src="../../assets/img/icon/my-vip.png" alt="" />
      </div>
    </div>
     <div class="balance clearfix">
      <div v-for="(item, index) in balanceData" :key="index" class="fl">
        <div>{{ item.count }}</div>
        <div>{{ item.title }}</div>
      </div>
    </div>
    <div class="my-cost">
      <div class="clearfix">
        <div class="cost-header  fl">
          <div class="cost-today">今日充值赠返</div>
          <div class="cost-good">充值赠好礼</div>
        </div>
        <div class="fr cost-pay">充值</div>
      </div>
      <div class="cost-pay-all clearfix">
        <div class="fl">消费记录</div>
        <div class="fl">充值记录</div>
        <div class="fl">打赏记录</div>
      </div>
    </div>
    <div class="my-msg clearfix">
      <div class="msg-one fl" v-for="(item, index) in msgData" :key="index">
        <div class="msg-one-img">
          <img :src="item.icon" alt="" class="img-auto" />
        </div>
        <div class="msg-one-info">{{ item.title }}</div>
      </div>
    </div>
    <!-- my-list   start-->
    <div class="my-list">
      <div
        class="my-list-one clearfix"
        v-for="(item, index) in listData"
        :key="index"
      >
        <div class="fl">{{ item }}</div>
        <div class="fr">
          <img class="img-auto" src="../../assets/img/icon/箭头.png" alt="" />
        </div>
      </div>
    </div>
    <!-- my-list end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      balanceData: [
        { title: "书豆", count: 0 },
        { title: "豆数", count: 0 },
        { title: "章节卷", count: 0 },
        { title: "月票", count: 0 },
      ],
      msgData: [
        { title: "消息", icon: require("../../assets/img/icon/my-msg.png") },
        {
          title: "收藏",
          icon: require("../../assets/img/icon/my-collect.png"),
        },
        {
          title: "书评",
          icon: require("../../assets/img/icon/my-shuping.png"),
        },
        { title: "阅历", icon: require("../../assets/img/icon/my-time.png") },
      ],
      listData: [
        "我的书籍",
        "我要协作",
        "阅读喜好",
        "意见反馈",
        "礼品中心",
        "公益3小时",
      ],
      isLogin: false,
      username: "",
    };
  },
  created() {
    if(JSON.parse(localStorage.getItem("login_TK"))){
      this.isLogin = true;
      this.username = JSON.parse(localStorage.getItem("login_TK")).username;
    }
  },
  components: {},
  computed: {},
  methods: {
    go(e){
      this.$router.push(e)
    }
  },
};
</script>
<style lang="less" scoped>
.box {
  height: 667px;
  overflow-y: scroll;
}
.my-list {
  width: 90%;
  margin: 0 auto;
  background: #fff;
  padding: 10px 15px;
  border-radius: 15px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 65px;
  .my-list-one {
    box-sizing: border-box;
    // padding: 10px 0px;
    height: 30px;
    line-height: 20px;
    > div:last-child {
      width: 20px;
    }
  }
}
.my-login {
  border-radius: 10px;
  width: 90%;
  margin: 10px auto;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  height: 100px;
  .login-img {
    border-radius: 50%;
    width: 80px;
  }
}
.login-center {
  font-weight: 700;
  font-size: 18px;
  margin-top: 25px;
  margin-left: 15px;
}
.login-vip {
  width: 20px;
  margin-top: 25px;
  margin-left: 10px;
}
.my-msg {
  border-radius: 10px;
  width: 90%;
  margin: 10px auto;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 0;
  display: flex;
  .msg-one {
    flex: 1;
    text-align: center;
    width: 25%;
  }
  .msg-one-img {
    margin: 0 auto;
    width: 50px;
    height: 50px;
  }
  .msg-one-info {
    color: #ccc;
  }
}
.my-cost {
  border-radius: 10px;
  width: 90%;
  margin: 10px auto;
  background-color: #fff;
  box-sizing: border-box;
  padding: 18px 40px;
  .cost-header {

    .cost-today {
      font-weight: 700;
      font-size: 20px;
    }
    .cost-good {
      font-size: 14px;
      font-weight: 700;
      color: #f4d2b2;
    }
  }

  .cost-pay {
    width: 70px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    background-color: #21b382;
    border-radius: 15px;
  }
  .cost-pay-all {
    width: 100%;
    margin-top: 60px;
    display: flex;
    > div {
      flex: 1;
      text-align: center;
      color: #959696;
      border-right: 1px solid #ccc;
    }
    > div:last-child {
      border-right: none;
    }
  }
}
.balance{
  border-radius: 10px;
  width: 90%;
  margin: -10px auto;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px 0;
  display: flex;
  > div{
    flex: 1;
    text-align: center;
    > div:first-child{
      font-size: 22px;
      font-weight: 700;
      color: #6c6e70;
    }
    > div:last-child{
      color:  #ddd;
    }
  }
}
</style>
