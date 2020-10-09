import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueAxios from "vue-axios";
import axios from "axios";

// 导入vant框架的组件
import {
  Button,
  Toast,
  NavBar,
  Tab,
  Tabs,
  Pagination,
  Tabbar,
  TabbarItem,
  Col,
  Row,
  NoticeBar,
  Icon,
  PullRefresh,
  Swipe,
  SwipeItem,
  Lazyload,
  ImagePreview,
  Rate,Form,Field,Search,Collapse, CollapseItem,IndexBar, IndexAnchor,SwipeCell,Cell, CellGroup,Slider,Checkbox, CheckboxGroup,Popup
} from "vant";

Vue.use(VueAxios, axios);

Vue.use(Button)
  .use(Toast)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(Pagination)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Col)
  .use(Row)
  .use(NoticeBar)
  .use(Icon)
  .use(PullRefresh)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(ImagePreview)
  .use(Rate)
  .use(Form)
  .use(Field)
  .use(Search)
  .use(Collapse)
  .use(CollapseItem)
  .use(IndexBar)
  .use(IndexAnchor)
  .use(SwipeCell)
  .use(Cell)
  .use(CellGroup)
  .use(Slider)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Popup)
  


Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
