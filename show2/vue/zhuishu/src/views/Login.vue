<template>
  <div class="login">
    <div class="login-box">
      <van-nav-bar @click-right="goHome">
        <template #left>
          <div class="left-text">
            <div class="logo">
              <img  src="../assets/img/icon/snipaste20200807_163950.png"    alt=""  class="img-auto"  />
            </div>
            <div class="logo-title">Luckin Novel</div>
          </div>
        </template>
        <template #right>
          <div class="close-box">关闭</div>
        </template>
      </van-nav-bar>
    </div>
    <div class="login-form">
        <div class="title">欢迎回来!</div>
        <div class="en-title">Please login to your accounts</div>

        <div class="login-form-box">

          <van-form >
              <div class="login-box-list">
                   <van-field    label="手机号"    placeholder="手机号"    v-model="userLoginInfo.phone" />
                    <van-field    :type="isPassword ? 'password' : 'text'"   label="密码"    placeholder="密码"    v-model="userLoginInfo.password"    :right-icon="isPassword ? 'closed-eye' : 'eye-o'"    @click-right-icon="viewPassword"    />
              </div>   
            <div class="clearfix forgot">
              <span class="fr">忘记密码?</span>
            </div>
            <div class="login-btn">
              <van-button round block type="info" native-type="submit" @click="onSubmit">登&nbsp;&nbsp;录</van-button>
            </div>
            <div class="login-btn">
              <van-button round block type="default" @click="show=!show">注&nbsp;&nbsp;册</van-button>
            </div>
          </van-form>

        </div>
      </div>
      <van-popup v-model="show" position="bottom" :style="{ height: '50%' }" >
        <div class="register-box">
            <van-field
              label="手机号"
              placeholder="手机号"
              v-model="userregisterInfo.phone"
            />
            <van-field
              label="昵称"
              placeholder="昵称"
              v-model="userregisterInfo.username"
            />
            <van-field
              :type="isPassword ? 'password' : 'text'"
              label="密码"
              placeholder="密码"
              v-model="userregisterInfo.password"
              :right-icon="isPassword ? 'closed-eye' : 'eye-o'"
              @click-right-icon="viewPassword"
            />
            <div class="register-btn">
                <van-button round block type="info" native-type="submit" @click="register">注&nbsp;&nbsp;册</van-button>
            </div>   
        </div>
    </van-popup>
  </div>
</template>

<script>
// import Formcl from "../assets/js/Formcl"
export default {
    
  data() {
    return {
        show:false,
        userLoginInfo:{
            phone:'',
            password:''
        },
        userregisterInfo:{
            phone:"",
            username:"",
            password:"",
        },
        validUserFormReg : {

            //昵称， 1-10个字符, 汉字字母数字_组合
            username: {
            reg: /^[\u4e00-\u9fa5\w]{1,10}$/,
            msg: '昵称格式不正确'
            },
    
            //手机号
            phone: {
            reg: /^1[3-9]\d{9}$/,
            msg: '手机号格式不正确'
            },
    
            //密码
            password: {
            reg: /^[a-zA-Z]\w{5,15}$/,
            msg: '密码格式不正确且以字母开头'
            },
      },
      isPassword: true
    };
  },

  components: {},

  computed: {},

  methods: {
       goHome() {
      this.$router.go(-1)
    },

    //查看密码
    viewPassword() {
      this.isPassword = !this.isPassword;
    },

    register(){
      if(this.formcl()){
        localStorage.setItem("login_TK",JSON.stringify(this.userregisterInfo));
        
        
        this.$toast("注册成功");
        this.show = false
      }

    },

    formcl(){
      for(let key in this.userregisterInfo){
        if(!this.validUserFormReg[key].reg.test(this.userregisterInfo[key])){
          this.$toast(this.validUserFormReg[key].msg);
          return false;
        }
      }
      return true
    },

    onSubmit(){
      
      for(let key in this.userLoginInfo){
        if(!this.validUserFormReg[key].reg.test(this.userLoginInfo[key])){
          this.$toast(this.validUserFormReg[key].msg);
          return false;
        }
      }
      
      if(!JSON.parse(localStorage.getItem("login_TK"))){
        this.$toast('手机号未注册')
        return
      }
      
      var name =JSON.parse(localStorage.getItem("login_TK")).phone
      var pass =JSON.parse(localStorage.getItem("login_TK")).password
      
      if(name==this.userLoginInfo.phone&&pass==this.userLoginInfo.password){
        this.$toast("您已成功登陆");
        this.$router.push({name:"My"})
      }else if(name==this.userLoginInfo.phone&&pass!==this.userLoginInfo.password){
          this.$toast("您的密码有误");
      }else if(name!==this.userLoginInfo.phone&&pass==this.userLoginInfo.password){
          this.$toast("您的手机号码有误");
      }else{
          this.$toast("您的手机和密码都有误");
      }    
    }
  },
};
</script>
<style lang="less" scoped>
    .login {

    .login-box{
      padding: 10px;
    }
  
    .left-text{
      display: flex;
    }
  
    .logo{
      width: 36px;
      height: 36px;
      background-color: #ddd;
      border-radius: 50%;
      margin-top: 5px;
    }
    .logo-title{
      font-weight: bold;
      font-size: 16px;
      margin-left: 10px;
      line-height: 46px;
    }
    .login-form{
      margin-top: 80px;
      padding: 0 10px;
    }
    .title{
      font-size: 32px;
      font-weight: bold;
    }
  
    .en-title{
      color: #838383;
      margin-top: 20px;
      font-size: 18px;
    }
  
    .login-form-box{
      margin-top: 50px;
    }
  
    /deep/ .login-form-box .van-cell{
      padding-left: 0;
      padding-right: 0;
    }
    .login-btn{
      margin-top: 40px;
    }
    .forgot{
      margin-top: 20px;
      color: #666;
    }
    .close-box{
      color: #666;
    }
    .register-box{
        width: 85%;
        margin: 20px auto;
    }
    .register-btn{
        margin-top: 30px;
    }
    .login-box-list{
        padding: 0 20px;
        background-color: #FFF;
    }
  }
</style>
