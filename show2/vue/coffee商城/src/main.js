import Vue from "vue";

import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";

//导入vant框架的组件
import {
  NavBar,
  Form,
  Field,
  Button,
  Popup,
  Tabbar,
  TabbarItem,
  Toast,
  Notify,
  Swipe,
  SwipeItem,
  Search,
  Skeleton,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Stepper,
  SwipeCell,
  Cell,
  Checkbox,
  SubmitBar,
  Empty,
  Icon,
  AddressList,
  AddressEdit,
  Uploader,
  Tab,
  Tabs,
  Dialog,
} from "vant";

import "lib-flexible/flexible";

//全局注册
Vue.use(NavBar)
  .use(Form)
  .use(Field)
  .use(Button)
  .use(Popup)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Toast)
  .use(Notify)
  .use(Swipe)
  .use(SwipeItem)
  .use(Search)
  .use(Skeleton)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Stepper)
  .use(SwipeCell)
  .use(Cell)
  .use(Checkbox)
  .use(SubmitBar)
  .use(Empty)
  .use(Icon)
  .use(AddressList)
  .use(AddressEdit)
  .use(Uploader)
  .use(Tab)
  .use(Tabs)
  .use(Dialog);

//注册axios, ajax方案，用于请求数据
Vue.use(VueAxios, axios);

//设置请求基础路径
axios.defaults.baseURL = "http://www.kangliuyong.com:10002";

//设置post请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=utf-8";

//关闭生产环境提示
Vue.config.productionTip = false;

//添加一个Vue的原型属性
Vue.prototype.appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
