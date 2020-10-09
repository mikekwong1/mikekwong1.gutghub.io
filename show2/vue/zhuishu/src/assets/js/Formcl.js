class FormCl {



    constructor (){
        
        this.validUserFormReg = {

            //昵称， 1-10个字符, 汉字字母数字_组合
            value2: {
            reg: /^[\u4e00-\u9fa5\w]{1,10}$/,
            msg: '昵称格式不正确'
            },
    
            //手机号
            value1: {
            reg: /^1[3-9]\d{9}$/,
            msg: '手机号格式不正确'
            },
    
            //密码
            value3: {
            reg: /^[a-zA-Z]\w{5,15}$/,
            msg: '密码格式不正确且以字母开头'
            },
        }
    }
    Verify (o,self){
        for(let key in o){
            if(!this.validUserFormReg[key].reg.test(o[key])){
                self.$toast(this.validUserFormReg[key].msg);
                return false;
            }
        }
        return true ;
    }
    




};