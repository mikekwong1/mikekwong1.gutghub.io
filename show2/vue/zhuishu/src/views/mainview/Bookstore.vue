<template>
  <div>
    <van-nav-bar class="header" title="书城">
      <template #right>
        <van-icon @click="toggle({name:'Search'})" name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-notice-bar
      left-icon="volume-o"
      text="读书养性,读书可以陶冶自己的性情,使自己温文尔雅,具有书卷气；读书破万卷,下笔如有神,多读书可以提高写作能力,写文章就才思敏捷；旧书不厌百回读,熟读深思子自知,读书可以提高理解能力,只要熟读深思,你就可以知道其中的道理了；读书可以使自己的知识得到积累,君子学以聚之.总之,爱好读书是好事.
      读书能够荡涤浮躁的尘埃污秽,过滤出一股沁人心脾的灵新之气,甚至还可以营造出一种超凡脱俗的娴静氛围.
      其实,对于任何人而言,读书最大的好处在于：它让求知的人从中获知,让无知的人变得有知."
    />
    <van-pull-refresh
      v-model="isLoading"
      :head-height="80"
      @refresh="onRefresh"
    >
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <img
          class="doge"
          src="https://img.yzcdn.cn/vant/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        <img class="doge" src="https://img.yzcdn.cn/vant/doge.png" />
      </template>
      <!-- 加载提示 -->
      <template #loading>
        <img class="doge" src="https://img.yzcdn.cn/vant/doge-fire.jpg" />
      </template>
      <!-- 轮播图 -->
      <div class="find-banner">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <div class="banner-img">
              <img class="img-box" v-lazy="image" />
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="find-box">
        <!-- 今天必须图 -->
        <div class="today-see">
          <div class="see-title clearfix ">
            <div class="fl">今日必读</div>
            <div class="fr" @click="toggle({ name: 'Topdetail',query:{_id:'54d42d92321052167dfb75e3'} })">
              查看更多
            </div>
          </div>
          <div class="see-boss clearfix" @click="toggle({name:'Bookdetail',query:{id:'5e27abf72c71ba233dd8e63d'}})">
            <div class="fl img-size">
              <img class="auto-img"  src="../../assets/img/icon/sanguo.png" alt=""/>
            </div>
            <div class="fr img-msg">
              <div>三国之曹家逆子</div>
              <div class="img-text">
                许褚：“主公，少主又说他病了！”许褚：“主公，少主又闯祸了！”许褚：“主公，少主又不见了！”曹操猛拍桌子，铁青着脸吼道：“我曹孟德英明一世，怎么就生了这么个逆子？”许褚：“主公，少主把吕布杀了！”许褚：“少主把邺城攻下了！”曹操仰天大笑：
              </div>
              <div>
                <div class="fl">你我当初</div>
                <div class="fr">历史</div>
                <div class="fr">连载</div>
              </div>
            </div>
          </div>
          <div class="seelist clearfix">
            <div class="see-list-one fl" v-for="(item, index) in seeList" :key="index"  @click="toggle({ name: 'Bookdetail',query:{id:item.id} })">
              <div>
                <img :src="item.url" class="see-img" alt="" />
              </div>
              <div class="see-list-center one-text">{{ item.title }}</div>
              <div class="one-text">{{ item.author }}</div>
            </div>
          </div>
        </div>
        <!-- 换一换 -->
        <div class="find-list">
          <div class="find-list-one" v-for="(item, index) in listTitle" :key="index">
            <div class="fl">
              {{ item.title }}
            </div>
            <div class="fr" @click="tougle(index)">换一换
              <span>
                <svg t="1597024057598" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2117" width="16" height="16"><path d="M946.962 627.613a48.888 48.888 0 0 0-45.255 29.399 429.42 429.42 0 0 1-794.095 3.633V644.13a49.548 49.548 0 0 0-49.549-49.548 49.218 49.218 0 0 0-49.548 37.656v243.118a49.548 49.548 0 0 0 99.097 0v-31.38a528.516 528.516 0 0 0 885.595-150.298 48.888 48.888 0 0 0-46.245-66.064z m68.376-280.774V148.645a49.548 49.548 0 0 0-99.096 0v33.032A528.516 528.516 0 0 0 30.316 330.323a49.218 49.218 0 0 0 46.576 66.064 47.897 47.897 0 0 0 44.924-29.399 429.42 429.42 0 0 1 794.426-3.633v16.186a49.879 49.879 0 0 0 99.096 12.222c0.33-18.829 0-44.924 0-44.924z" p-id="2118"></path></svg>  
              </span></div>
            <div class="textlist">
              <div  class="textlist-one clearfix"  v-for="(ids, ind) in item.listType"  :key="ind"  @click="toggle({ name: 'Bookdetail',query:{id:ids._id} })">
                <div class="textlist-img fl ">
                  <img :src="ids.cover" alt="" class="img-auto" />
                </div>
                <div class="textlist-msg fl">
                  <div>{{ ids.title }}</div>
                  <div class="img-text">{{ ids.shortIntro }}</div>
                  <div class="clearfix">
                    <div class="fl">{{ ids.author }}</div>
                    <div class="fr">{{ ids.majorCate }}</div>
                    <div class="fr">连载</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: [],
      books: [],
      isLoading: true,
      seeList: [
        {
          title: "噬天至尊",
          author: "轻弹烟灰",
          url: require("../../assets/img/icon/tianzun.png"),
          id: "5e5363c60883173aad82ce6b",
        },
        {
          title: "遮天记",
          author: "归来的洛秋",
          url: require("../../assets/img/icon/zhetian.png"),
          id: "5a9fb71596a7481e45100a51",
        },
        {
          title: "南宋第一卧底",
          author: "龙渊",
          url: require("../../assets/img/icon/xiaonvhai.png"),
          id: "5c6fcfa760f0ff2e796323dc",
        },
        {
          title: "鬼医神农",
          author: "三尺神剑",
          url: require("../../assets/img/icon/diyi.png"),
          id: "59510fc4eeb91c460802c813",
        },
      ],
      images: [
        require("../../assets/img/other/古代言情_.png"),
        require("../../assets/img/other/同人_.png"),
        require("../../assets/img/other/女尊_.png"),
        require("../../assets/img/other/悬疑灵异_.png"),
      ],
      listTitle: [
        {
          title: "为你推荐",
          listType: [],
          book: [],
        },
      ],
    };
  },
  created() {
    this.getTop("54d42d92321052167dfb75e3");
  },
  components: {},

  computed: {},

  methods: {
    // 获取书籍列表
    getTop(id) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duraion: 0,
      });
      this.axios({
        methods: "GET",
        url: "/rank/" + id,
      }).then((res) => {
        this.$toast.clear();
        console.log("res", res.data.ranking.books.length);
        for (let i = 0; i < res.data.ranking.books.length; i++) {
          res.data.ranking.books[i].cover = this.imgKey(
            res.data.ranking.books[i].cover
          );
        }
        this.books = res.data.ranking.books;
        this.threeNum();
        // console.log("this.books",this.books)
      });
    },
    // 获取3个随机数
    threeNum(index) {
      if (this.num.length == 3) {
        if (index || index == 0) {
          for (let i = 0; i < this.num.length; i++) {
            this.listTitle[index].listType.push(this.books[this.num[i]]);
          }
        } else {
          for (let j = 0; j < this.listTitle.length; j++) {
            for (let i = 0; i < this.num.length; i++) {
              this.listTitle[j].listType.push(this.books[this.num[i]]);
            }
          }
        }
      } else {
        let a = this.getNum(0, 21);
        if (this.num.indexOf(a) == -1) {
          this.num.push(a);
        }
        this.threeNum(index);
      }
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
    // 换一换 切换书籍
    tougle(index) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      this.num = [];
      this.listTitle[index].listType = []
      this.threeNum(index);
      setInterval(() => {
        this.$toast.clear();
      }, 500);
    },
    // 随机数封装
    getNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // 切换路由
    toggle(e) {
      this.$router.push(e);
    },
    // 空
    toggleTitclas(item) {
      for (let i = 0; i < this.titleClas.length; i++) {
        this.titleClas[i].isActive = false;
      }
      item.isActive = true;
    },
    // 图片路径改变字符串
    imgKey(value) {
      return unescape(value).slice(7);
    },
  },
};
</script>
<style lang="less" scoped>
// .find-box::-webkit-scrollbar {
//   display: none;
// }
.banner-img {
  width: 100%;
  height: 200px;
}
.img-box{
  width: 100%;
  height: 100%;
}
.header {
  background-color: lightblue;
}
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
.find-banner {
  width: 90%;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
}
.today-see {
  background-color: #fff;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  padding-bottom: 20px;

  .see-title {
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    font-size: 16px;
    padding: 0 10px;
    font-weight: 700;
    border-left: 3px solid skyblue;
    color: #646869;
  }
  .see-boss {
    width: 100%;
    // margin: 0px 17px;
    margin-top: 30px;
    display: flex;
    flex: 1;
    .img-size {
      width: 80px;
      margin-right: 15px;
    }
    .img-msg {
      flex: 1;
      width: 240px;
      > div {
        margin-bottom: 10px;
        color: #b4b4be;
      }
      > div:first-child {
        font-size: 16px;
        font-weight: 700;
        color: #646869;
      }
      > div:last-child {
        > div {
          border: 1px solid #ccc;
          padding: 3px 10px;
        }
        > div:first-child {
          margin-left: 5px;
          border: none;
          padding-left: 0;
        }
        > div:last-child {
          margin-right: 27px;
          color: skyblue;
          margin-right: 5px;
        }
      }
    }
  }
}
.img-text {
  overflow: hidden;
  // white-space: nowrap;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.seelist {
  width: 100%;
  display: flex;

  .see-list-one {
    flex: 1;
    box-sizing: border-box;
    padding: 22px 8px;
    .see-img {
      width: 74px;
      height: 93px;
      border-radius: 5px;
    }
    .see-list-center {
      font-size: 14px;
    }
    > div:last-child {
      color: #ccc;
    }
  }
}
.find-box {
  .find-list {
    background-color: #fff;
    height: 500px;
    border-radius: 10px;
    z-index: 10;
    > .find-list-one {
      background-color: white;
      padding: 5px 10px;
      font-size: 14px;
      .textlist {
        
        .textlist-one {
          display: flex;
          padding: 15px 0;
          .textlist-img {
       
            width: 20%;
            border-radius: 10px;
            overflow: hidden;
          }
          .textlist-msg {
           
          margin-left: 15px;
          width: 80%;
          > div {
            margin-bottom: 12px;
            color: #ccc;
          }
          > div:first-child {
            font-size: 16px;
            font-weight: 700;
            color: black;
          }
          > div:last-child {
            > div {
              border: 1px solid #ccc;
              padding: 3px 10px;
            }
            > div:first-child {
              margin-left: 5px;
              border: none;
              padding-left: 0;
            }
            > div:last-child {
              color: skyblue;
              margin-right: 5px;
            }
          }
        }
       
        
        }
      }
    }
  }
}
</style>
