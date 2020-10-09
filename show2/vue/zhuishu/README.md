# zhuishu

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



    // fetch("/categories")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("data", data);
    //     this.id = data.female;
    //     console.log("data.female", data.female);
    //   });
    // this.paihang();

        //  paihang() {
    //   // 开始网络请求 弹出加载轻提示
    //   this.$toast.loading({
    //     message: "加载中...",
    //     forbidClick: true,
    //     duration: 0, //提示框不能关闭，直到网络请求
    //   });
    //   setTimeout(() => {
    //     this.axios("/rank-category").then((res) => {
    //       // 关闭加载轻提示
    //       this.$toast.clear();
    //       console.log(res);
    //       // this.feamle = res.data.female;
    //     });
    //   }, 1500);
    // },


        <!-- <div class="nav">
      <div>
        <img class="img-auto" src="./assets/img/书架(1).png" alt="" />
        <router-link to="/">书架</router-link>
      </div>
      <div>
        <img class="img-auto" src="./assets/img/书架.png" alt="" />
        <router-link to="/discover">书城</router-link>
      </div>
      <div>
        <img class="img-auto" src="./assets/img/书架.png" alt="" />
        <router-link to="/discover">分类</router-link>
      </div>
      <div>
        <img class="img-auto" src="./assets/img/书籍.png" alt="" />
        <router-link to="/my">排行</router-link>
      </div>
    </div> -->

    <!-- <ul class="item" v-for="(item, index) in feamle" :key="index">
          <li v-for=" (item, index) in item.bookCover" :key="index" >
             <img :src="'http://statics.zhuishushenqi.com' + item"    class="img-auto" alt="">
          </li>
          <li>{{ item.name }}</li>
          <li>书本{{item.bookCount}}</li>
          <li>月销售{{item.monthlyCount}}</li>
          
       </ul> -->