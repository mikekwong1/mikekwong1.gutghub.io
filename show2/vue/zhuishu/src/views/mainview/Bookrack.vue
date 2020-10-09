<template>
  <div class="bookrack">
    <van-nav-bar class="header" title="书城">
      <template #right>
        <van-icon  @click="toggle({name:'Search'})" name="search" size="18" />
      </template>
    </van-nav-bar>
      <div class="box-scroll">
      <div class="rock-bottom">
        <div class="rack-list clearfix">
          <div  class="rack-list-one fl " v-for="(item, index) in rackList"  :key="index" @touchstart="setBook()" @touchend="end(item)"  ref="tocheck" >
            <div class="list-check" :class="{ 'active': isShow }">
              <van-checkbox  v-model="item.isActive"  @click="Onecheck"
              ></van-checkbox>
            </div>
            <div class="list-img">
              <img class="img-auto" :src="item.cover" alt="" />
            </div>
            <div class="list-title one-text">
              {{ item.title }}
            </div>
          </div>
          <div class="rack-list-one fl" @click="toggle({name:'Search'})" >
            <div class="list-img">
              <img  class="img-auto"  src="../../assets/img/icon/addbook.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rackList: [],
      isShow: true,
      loop: null,
      allCheck: true,
      count: 0,
    };
  },
  
  created(){
    this.get();
  },

  components: {},

  computed: {},

  methods: {
    // 跳转页面
    toggle(e) {
      this.$router.push(e);
    },
    // 获取数据
    get() {
      this.rackList = [];

      let obj = localStorage.valueOf()

      for (let key in obj) {
        if (key.slice(0, 8) == "rackList") {
          let top = JSON.parse(obj[key]);
          top.isActive = false;
          this.rackList.push(top);
        }
      }
    },
    // 设置书籍
    setBook() {
      this.loop = setTimeout(() => {
        this.isShow = false;
        for (let i = 0; i < this.rackList.length; i++) {
          this.rackList[i].isActive = false;
        }
      },500);
    },
    // 全选
    allcheck() {
      if (this.allcheck) {
        for (let i = 0; i < this.rackList.length; i++) {
          this.rackList[i].isActive = true;
        }
        this.allCheck = false;
      } else {
        for (let i = 0; i < this.rackList.length; i++) {
          this.rackList[i].isActive = false;
        }
        this.allCheck = true;
      }
      this.num();
    },
    // 单选
    Onecheck(){
      for(let i = 0; i < this.rackList.length;i++){
        if(this.rackList[i].isActive){
            this.allcheck = true
        }
      }

      this.num()
    },
    //选中数量
    num(){
      this.count = 0;
      for(let i = 0;i <this.rackList.length;i++){
        if(this.rackList[i].isActive){
          this.count++
        }
      }
    } ,
    //删除书籍
    del(){
      let arr = []
      for(let i=0;i<this.rackList.length;i++){
        if(this.rackList[i].isActive){
          arr.push(this.rackList[i]._id)
        }
      }
      for(let j = 0; j<arr.length;j++){
        localStorage.removeItem('reackList'+arr[j])
      }
      this.get()
    },
    // 尾
    end(item){
      clearTimeout(this.loop)
      if(this.isShow){
        this.toggle({name:"Bookmsg",query:{id:item._id,title:item.title}})
      }
    }
  },
};
</script>
<style lang="less" scoped>
.header {
  background-color: lightblue;
}
.box-scroll {
  position: absolute;
  left: 0px;
  top: 50px;
  width: 100%;
  height: 600px;
  overflow: hidden;
  overflow-y: scroll;
  .rock-bottom {
    width: 92%;
    margin: 20px auto 50px;
    border-radius: 20px;
    min-height: 490px;
    background-color: #fff;
  }
}
.rack-list {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  .rack-list-one {
    cursor: pointer;
    position: relative;
    width: 26%;
    margin: 10px 10px;
  }
  .list-img {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
  }
  .one-detail{
    padding: 5px 10px;
        color: #ccc;
        height: 46px;
        overflow: hidden;
  }
  .list-title {
    text-indent: 1em;
    margin-top: 5px;
    font-weight: 700;
  }
}
.mask.active{
    display: none;
}
.list-check.active{
    display: none;
}
.one-text{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
