<template>
  <div class="book clearfix" @click.self="toggle" ref="bookBig">
    <div class="top clearfix" :class="{ active: topActive }">
      <img @click="back" src="../assets/img/icon/back.png" alt="" class="fl" />
      <div class="fl">{{ eyeActive ? eyeData.open : eyeData.close }}</div>
      <img
        @click="isActive = !isActive"
        src="../assets/img/icon/shudian.png"
        alt=""
        class="fr"
      />
      <img src="../assets/img/icon/shoucang.png" alt="" class="fr" />
    </div>
    <div class="right-box " :class="{ active: isActive }">
      <div @click="otherView({ name: 'Bookrack' })">去书架</div>
      <div @click="otherView({ name: 'Bookdetail', query: { id } })">
        书籍详情
      </div>
    </div>
    <div class="bookmsg-Aa" :class="{ active: AaActive }">
      <div class="clearfix Aa-box">
        <div class="fl size">字号</div>
        <div class="fl down" @click="toggleFont(1)">-</div>
        <div class="fl num">{{ fontSize }}</div>
        <div class="fl up" @click="toggleFont(2)">+</div>
        <div class="fl like">默认</div>
      </div>
      <div class="clearfix Aa-box">
        <div class="fl size">行距</div>
        <div class="fl down" @click="togglelineHeight(1)">-</div>
        <div class="fl num">{{ lineHeight }}</div>
        <div class="fl up" @click="togglelineHeight(2)">+</div>
        <div class="fl like">默认</div>
      </div>
    </div>
    <div class="bookmsg-Aa" :class="{ active: BgActive }">
      <div class="fl bg">背景</div>
      <div
        class="fl cire"
        v-for="(item, index) in BgColor"
        :key="index"
        :style="{ backgroundColor: item.color }"
        :class="{ active: item.isActive }"
        @click="toggleBg(item)"
      ></div>
    </div>
    <div class="bookmsg-out" ref="bookBox" @scroll="btmUpdate">
      <div class="bookmsg" @click="toggle">
        <h3>{{ title }}</h3>
        <div ref="booka"></div>
      </div>
    </div>
    <div class="all" :class="{ active: topActive }">
      <div class="tgbook clearfix">
        <div class="fl" @click="togglebook(0)">上一章</div>
        <div class="fr" @click="togglebook(1)">下一章</div>
      </div>
      <div class="all-list clearfix">
        <div class="all-list-one fl" v-for="(item, index) in allData" :key="index" @click="catalog(index)">
          <div class="all-list-img">
            <img :src="item.icon" class=" img-auto" alt="" />
          </div>
          <div class="mulu">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="catalog" :class="{ active: catalogActive }">
      <div class="catalog-title">
        {{ Bigtitle }}
      </div>
      <div class="catalog-new clearfix">
        <div class="fl">连载中56分钟前更新</div>
        <div class="fr" @click="down()">
          {{ isDown ? downData.yes : downData.no }}
        </div>
      </div>
      <div class="catalog-list">
        <div
          class="catalog-list-one one-text"
          v-for="(item, index) in chaptersData"
          :key="index"
          @click="cli(index)"
          :class="{ active: item.active }"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontSize: 14,
      lineHeight: 30,
      AaActive: true,
      BgActive: true,
      isActive: true,
      id: "",
      Bigtitle: "",
      sourceId: "",
      title: "",
      tit: "",
      book: [],
      chaptersData: [],
      eyeActive: false,
      catalogActive: false,
      topActive: false,
      isDown: true,
      chaptersIndex: 0,
      eyeData: {
        open: "护眼:开",
        close: "护眼:关",
      },
      allData: [
        {
          title: "目录",
          icon: require("../assets/img/icon/mulu.png"),
        },
        {
          title: "背景",
          icon: require("../assets/img/icon/beijing.png"),
        },
        {
          title: "设置",
          icon: require("../assets/img/icon/Aa.png"),
        },
        {
          title: "护眼",
          icon: require("../assets/img/icon/eye.png"),
        },
      ],
      BgColor: [
        {
          color: "#fef8ea",
          isActive: true,
        },
        {
          color: "#d3f0d2",
          isActive: false,
        },
        {
          color: "#e8d0ce",
          isActive: false,
        },
        {
          color: "#c0d8f0",
          isActive: false,
        },
      ],
      downData: {
        yes: "正序",
        no: "倒序",
      },
      bottomIsactive: null,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.Bigtitle = this.$route.query.title;
    this.getBookSources(this.id);
  },

  components: {},

  computed: {},

  methods: {
    // 切换行距
    togglelineHeight(e){
       if(e==1){
          this.lineHeight = this.lineHeight-1 > 20 ?  this.lineHeight-1 : 20
          this.$refs.booka.style.lineHeight = this.lineHeight + "px"
      }else{
        this.lineHeight = this.lineHeight+1
        this.$refs.booka.style.lineHeight = this.lineHeight + "px"
      }
    },
    // 跳转页面
    otherView(e) {
      this.$router.push(e);
    },
    // 背景
    toggleBg(item) {
      for (let i = 0; i < this.BgColor.length; i++) {
        if (this.BgColor[i].isActive) {
          this.BgColor[i].isActive = false;
          break;
        }
      }
      item.isActive = true;
      this.$refs.bookBig.style.backgroundColor = item.color;
    },
    // 切换字体大小
    toggleFont(e) {
      if (e == 1) {
        this.fontSize = this.fontSize - 1 > 9 ? this.fontSize - 1 : 9;
        this.$refs.booka.style.fontSize = this.fontSize + "px";
      } else {
        this.fontSize = this.fontSize + 1;
        this.$refs.booka.style.fontSize = this.fontSize + "px";
      }
    },
    // 点击弹出框事件
    catalog(index) {
      if (index == 0) {
        this.catalogActive = true;
        this.topActive = false;
      } else if (index == 2) {
        this.topActive = false;
        this.AaActive = false;
      } else if (index == 1) {
        this.topActive = false;
        this.BgActive = false;
      } else {
        if (!this.eyeActive) {
          this.$refs.bookBig.style.backgroundColor = "#f1dbb6";
          this.eyeActive = true;
        } else {
          this.$refs.bookBig.style.backgroundColor = "#fef8ea";
          this.eyeActive = false;
        }
      }
    },
    // 点击章节
    cli(index) {
      this.bottomIsactive = false;
      this.changelink(index);
    },
    // 上下章节
    togglebook(i) {
      this.bottomIsactive = false;
      if (i == 1) {
        this.changelink(
          this.chaptersIndex + 1 > this.chaptersData.length - 1
            ? this.chaptersData.length - 1
            : this.chaptersIndex + 1
        );
      } else {
        this.changelink(
          this.chaptersIndex - 1 < 0 ? 0 : this.chaptersIndex - 1
        );
      }
    },
    // 触底刷新
    btmUpdate() {
      // console.log('scrollHeight',this.$refs.bookBox.scrollHeight)//该元素总高度（包括隐藏的部分）
      // console.log('clientHeight',this.$refs.bookBox.clientHeight)//该元素的可见高度
      // console.log('scrollTop',this.$refs.bookBox.scrollTop)//该元素顶部隐藏了的高度
      console.log("this.chaptersIndex+1 ", this.chaptersIndex + 1);
      console.log("this.chaptersData", this.chaptersData.length - 1);
      if (
        this.$refs.bookBox.scrollHeight <
        this.$refs.bookBox.clientHeight + this.$refs.bookBox.scrollTop + 1
      ) {
        this.bottomIsactive = true;
        this.changelink(
          this.chaptersIndex + 1 > this.chaptersData.length - 1
            ? this.chaptersData.length - 1
            : this.chaptersIndex + 1
        );
      }
    },
    // 弹出框的显示隐藏
    toggle() {
      if (!this.AaActive || !this.BgActive) {
        this.BgActive = true;
        this.AaActive = true;
      } else {
        if (this.catalogActive) {
          this.catalogActive = false;
          return;
        }
        this.isActive = true;
        this.topActive = !this.topActive;
      }
    },
    //获取书籍源
    getBookSources(id) {
      //http://novel.kele8.cn/book-sources?view=summary&book=567d2cb9ee0e56bc713cb2c0
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      this.axios({
        method: "GET",
        url: "/book-sources",
        params: {
          view: "summary",
          book: id,
        },
      }).then((res) => {
        // 关闭加载轻提示
        this.$toast.clear();
        console.log("BookSources", res);
        this.sourceId = res.data[0]._id;
        console.log("sourceId", this.sourceId);
        this.getBookChapters(this.sourceId);
      });
    },
    //获取书籍章节列表
    getBookChapters(id) {
      //http://novel.kele8.cn/book-chapters/56f8da09176d03ac1983f6cd
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //提示框不能关闭，直到网络请求
      });
      this.axios({
        url: "/book-chapters/" + id,
      }).then((res) => {
        // 关闭加载轻提示
        this.$toast.clear();
        console.log("bookChapters", res);
        this.chaptersData = res.data.chapters;
        console.log("chaptersData", this.chaptersData);
        this.chaptersData.forEach((v) => {
          v.active = false;
        });
        // 编码
        let link = encodeURIComponent(res.data.chapters[0].link);
        console.log("link", link);
        this.getChapterDetail(link);
      });
    },
    // 获取章节内容
    getChapterDetail(link) {
      console.log(link);
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      this.axios({
        method: "GET",
        url: `/chapters/${link}`,
      }).then((res) => {
        this.$toast.clear();
        console.log("chapters", res);
        this.book = res.data.chapter.cpContent.replace(
          /\s\s\s/g,
          "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        );
        if (this.bottomIsactive) {
          let tit = res.data.chapter.title;
          this.$refs.booka.innerHTML +=
            '<div class="big"><h3>' + tit + "</h3> </div>" + this.book;
        } else {
          this.$refs.bookBox.scrollTop = 0;
          this.$refs.booka.innerHTML = this.book;
          this.title = res.data.chapter.title;
        }
      });
    },
    // 转码 link
    changelink(index) {
      for (let i = 0; i < this.chaptersData.length; i++) {
        if (this.chaptersData[i].active) {
          this.chaptersData[i].active = false;
          break;
        }
      }
      this.chaptersData[index].active = true;
      console.log("chaptersData[index].active", this.chaptersData[index]);
      // 编码
      let link = encodeURIComponent(this.chaptersData[index].link);
      this.getChapterDetail(link);
      this.chaptersIndex = index;
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
.book {
  width: 100%;
  height: 100vh;
  background-color: #fef8ea;
  position: relative;
  overflow: hidden;
  .right-box {
    &.active {
      display: none;
    }
    position: absolute;
    right: 10px;
    top: 40px;
    width: 150px;
    border-radius: 5px;
    color: #a1865b;
    font-size: 16px;
    text-align: center;
    background-color: #f1dbb6;
    border: 1px solid #9b7f58;
    > div {
      padding: 10px;
    }
  }
  .bookmsg-Aa.active{
      display: none;
    }
  .bookmsg-Aa {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #f3ddb8;
    font-size: 16px;
    padding: 20px 10px;
    line-height: 20px;
    .bg {
      line-height: 50px;
      margin-left: 10px;
      color: #cf9734;
    }
    .cire {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-left: 20px;
      &.active {
        border: 3px solid #cf9734;
      }
    }
    .Aa-box {
      padding: 10px 0;
    }
    .size {
      color: #c5ab86;
      margin: 0 30px;
    }
    .down {
      color: #997651;
      border: 1px solid #997651;
      padding: 0 20px;
      border-radius: 10px;
      font-size: 20px;
    }
    .num {
      color: #997651;
      margin: 0 30px;
    }
    .up {
      color: #997651;
      border: 1px solid #997651;
      padding: 0 20px;
      border-radius: 10px;
      font-size: 20px;
    }
    .like {
      color: #d3a647;
      margin-left: 30px;
    }
  }
  .top {
    width: 100%;
    height: 20px;
    transition: opacity 0.15s, transform 0.15s, visibility 0.15s;
    transform: translateY(-100%);
    background-color: #f1dbb6;
    padding: 12px 0;
    line-height: 20px;
    &.active {
      transform: translateY(0);
    }
    > img {
      margin: 0 15px;
      padding-top: 3px;
    }
  }
  .bookmsg-out {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .bookmsg {
      font-size: 14px;
      line-height: 30px;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      .big {
        margin-top: 50px;
        color: black;
        font-weight: 700;
      }
    }
  }
  .all {
    transition: opacity 0.15s, transform 0.15s, visibility 0.15s;
    transform: translateY(100%);
    width: 100%;
    position: absolute;
    bottom: 0px;
    background-color: #f1dbb6;
    // display: flex;
    &.active {
      transform: translateY(2%);
      box-shadow: 0px 5px 5px 5px #000;
    }
    .tgbook {
      padding: 10px 25px;
    }
    .all-list {
      display: flex;
      .all-list-one {
        flex: 1;

        text-align: center;
        padding: 20px 30px;
        box-sizing: border-box;

        .all-list-img {
          margin: 0 auto;
          width: 30px;
        }
        .mulu {
          margin-top: 6px;
        }
      }
    }
  }
  .catalog {
    transition: opacity 0.15s, transform 0.15s, visibility 0.15s;
    transform: translateX(-100%);
    width: 200px;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #e2f0fd;
    padding: 10px;
    &.active {
      transform: translateX(0);
      box-shadow: 1px 0px 10px 1px #000;
    }
    .catalog-title {
      font-size: 18px;
    }
    .catalog-new {
      margin-top: 10px;
      //border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
      line-height: 25px;
      > .fl {
        color: #a8bfd0;
      }
      > .fr {
        color: #fed547;
        font-size: 14px;
      }
    }
    .catalog-list {
      height: 595px;
      font-size: 14px;
      color: #a8bfd0;
      overflow: hidden;
      overflow-y: scroll;
      position: absolute;
      top: 80px;
      left: 10px;
      .catalog-list-one {
        padding: 10px 2px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        width: 200px;
        &.active {
          color: #9c7854;
        }
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
