<template>
  <!-- 点击右边的按钮 改变 -->
  <div class="shopbag">
    <van-nav-bar
      title="购物袋"
      left-text="返回"
      left-arrow
      :fixed="true"    
      @click-right="editProduct"
      @click-left="back"
    >
      <!-- 插槽  右边的 就显示   如果右边的shopbagData  -->
      <template #right v-if="shopbagData.length > 0">
        <!-- 绑定的数据 isEidt -->
        <div>{{isEdit ? '完成' : '编辑'}}</div>
      </template>
    </van-nav-bar>
    <div v-if="shopbagData.length > 0">
      <div class="shopbag-bg"></div>
      <!-- 遍历 shopbagData -->
      <van-swipe-cell :disabled="!isEdit" v-for="(item, index) in shopbagData" :key="index">

        <van-cell :border="false">
          <div class="clearfix cell-box">
            <div class="fl check">
              <!-- 如果 单选改变 -->
              <van-checkbox v-model="item.isCheck" icon-size="24px" checked-color="#0C34BA" @change="simpleSelect"></van-checkbox>
            </div>
            <div class="fl pro-img">
              <img class="auto-img" :src="item.small_img" alt="">
            </div>
            <div class="fl pro-info">
              <div class="text-box">
                <div class="clearfix">
                  <div class="fl text-name">{{item.name}}</div>
                  <div class="fl text-rule">{{item.rule}}</div>
                </div>
                <div class="text-enname">{{item.enname}}</div>
              </div>
              <div class="price-box">
                <div class="fl price">￥{{item.price}}</div>
                <div class="fr">
                  <van-stepper v-model="item.count" theme="round" button-size="24" disable-input @change="modifyCount(item)" />
                </div>
              </div>
            </div>
          </div>
        </van-cell>
        
        <template #right>
          <!-- 删除单个商品 -->
          <van-button square color="#3D75FE" text="删除" @click="removeOneShopbag(item.sid)" />
        </template>
      </van-swipe-cell>

      <div>
        <!-- 点击事件 submit -->
        <van-submit-bar v-show="!isEdit" :price="total" button-text="提交订单" button-color="#0C34BA" @submit="commit">
          <van-checkbox @click="allSelect" v-model="allCheck" icon-size="24px" checked-color="#0C34BA">全选</van-checkbox>
        </van-submit-bar>

        <van-submit-bar v-show="isEdit" button-text="删除选择" button-color="#0C34BA" @submit="removeMoreShopbag">
          
          <!-- 双向绑定 allCheck      -->
          <van-checkbox v-model="allCheck" @click="allSelect" icon-size="24px" checked-color="#0C34BA">全选</van-checkbox>
        </van-submit-bar>
      </div>
    </div>
    <div v-else>
      <van-empty description="购物袋空空如也,去逛一逛!">
        <!-- 点击事件 返回到菜单  -->
        <van-button round color="#0C34BA" class="bottom-button" @click="goMenu">去逛一逛</van-button>
      </van-empty>
    </div>

    

  </div>
</template>

<script>
  import '../../assets/less/shopbag.less'
  import {utils} from '../../assets/js/utils'
  export default {
    data() {
      return {
        // 是否删除 或者完成
        isEdit: false,
        // 绑定 选择 allCheck 
        allCheck: false,
        // 绑定 shopbagData
        shopbagData: [],
        // 计算总数
        total: 0
      };
    },
    created() {
      console.log('shopbag');
      //查询购物袋数据
      this.findShopbag();
    },

    methods: {
      // 返回上一页
      back() {
        this.$router.go(-1);
      },
      //回到菜单
      goMenu() {
        this.$router.push({name: 'Menu'});
      },

      //提交订单
      commit() {
        //查找需要购买的商品, sid
        let sids = [];
        // 遍历 shopbagData 
        this.shopbagData.map(v => {
          // 如果要都选true
          if (v.isCheck) {
            // [_s1597454975691,_s1597420309730,_s1597415156818]
            sids.push(v.sid);
          }
        })
        // _s1597454975691-_s1597420309730-_s1597415156818
        sids = sids.join('-');
        // 传给路由Pay
        this.$router.push({name: 'Pay', query: {sids}});


        // console.log('sids ==> ', sids);
      },

      //编辑商品
      editProduct() {
        // 更改true false
        this.isEdit = !this.isEdit;
      },

      //查询购物袋数据
      findShopbag() {

        //获取token字符串  获取CSTK
        let tokenString = localStorage.getItem('CSTK');
        // 如果 CSTK 有数据就返回 true
        if (!tokenString) {
          return;
        }

        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0,
          loadingType: 'spinner'
        })

        this.axios({
          method: 'GET',
          // findAllShopcart 数据
          url: '/findAllShopcart',
          params: {
            appkey: this.appkey,
            tokenString
          }
        }).then(result => {
          // 清除 toast 
          this.$toast.clear();
          console.log('find shopcartbag result ==> ', result);
          // 如果 data.code == 5000
          if (result.data.code == 5000) {
            // 
            result.data.result.map(v => {
              // 单选框  返回 false
              v.isCheck = false;
            })
            //  result.data.result 给了  shopbagData
            this.shopbagData = result.data.result;
          } else {
            this.$toast(result.data.msg);
          }

        }).catch(err => {
          this.$toast.clear();
          console.log('err ==> ', err);
        })
      },

      //全选
      allSelect() {
        // 全选框 为true 然后  单选框都是true
        this.shopbagData.map(v => {
          v.isCheck = this.allCheck;
        })
        // 计算的都调用一遍
        this.sum();

      },

      //单选
      simpleSelect() {
        // 计算的调用一遍
        this.sum();
        // 
        for (let i = 0; i < this.shopbagData.length; i++) {
          
          // 如果shopbagData.isCheck 没有 false 就跳出循环
          if (!this.shopbagData[i].isCheck) {
            this.allCheck = false;
            return;
          }
        }
        // 如果全都选中全选就打勾
        this.allCheck = true;
      },

      //修改商品数量
      modifyCount(item) {
        //获取token字符串
        let tokenString = localStorage.getItem('CSTK');
        // 如果 没有 CSTK 就返回出去
        if (!tokenString) {
          return;
        }

        //参数序列化
        let data = utils.queryString({
          appkey: this.appkey,
          tokenString,
          sid: item.sid,
          count: item.count
        })

        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0,
          loadingType: 'spinner'
        })

        this.axios({
          method: 'POST',
          url: '/modifyShopcartCount',
          data
        }).then(result => {
          // 清除 toast
          this.$toast.clear();
          console.log('result ==> ', result);
          // 把总和算出来
          this.sum();
          // 如果 result.data.code 不等于 6000 
          if (result.data.code !== 6000) {
            // 查询商品失败
            this.$toast(result.data.msg);
          }
        }).catch(err => {
          this.$toast.clear();
          console.log('err ==> ', err);
        })
      },

      //删除购物袋数据
      removeShopbag(sids) {

        //sids: sid的集合，类型：array

        //获取token字符串
        let tokenString = localStorage.getItem('CSTK');
        if (!tokenString) {
          return;
        }

        //参数序列化
        let data = utils.queryString({
          // 获取appkey
          appkey: this.appkey,
          // 获取一个localStrage token 的数组
          tokenString,
          // JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。
          sids: JSON.stringify(sids),
        })

        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0,
          loadingType: 'spinner'
        })

        return this.axios({
          method: 'POST',
          url: '/deleteShopcart',
          data
        })

      },

      //单个删除购物袋
      removeOneShopbag(sid, index) {
        //删除购物袋数据
        this.removeShopbag([sid]).then(result => {
          this.$toast.clear();
          console.log('result ==> ', result);
          if (result.data.code == 7000) {
            this.shopbagData.splice(index, 1);
          }
          
          this.$toast(result.data.msg);

          this.sum();
        }).catch(err => {
          this.$toast.clear();
          console.log('err ==> ', err);
        })
      },

      //删除多个购物袋
      removeMoreShopbag() {
        //查找选择购物袋
        let sids = [];
        this.shopbagData.map(v => {
          if (v.isCheck) {
            sids.push(v.sid);
          }
        })

        this.removeShopbag(sids).then(result => {
          this.$toast.clear();
          console.log('result ==> ', result);
          if (result.data.code == 7000) {
            
            for (let i = this.shopbagData.length - 1; i >= 0; i--) {
              if (this.shopbagData[i].isCheck) {
                this.shopbagData.splice(i, 1);
              }
            }

            this.sum();

          }
          
          this.$toast(result.data.msg);
        }).catch(err => {
          this.$toast.clear();
          console.log('err ==> ', err);
        })

      },

      //计算总金额
      sum() {
        // 一开始赋值为0
        this.total = 0;
        // shopbagData如果有 
        this.shopbagData.map(v => {
          // 有单选的 为 true
          if (v.isCheck) {
            // 选中的值 和数量加起来 不停的加入到总价里
            this.total += v.count * v.price;
          }
        })
        // 总价给了总量
        this.total *= 100;
      }
    }
  }
</script>