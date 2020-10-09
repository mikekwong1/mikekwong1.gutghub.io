import Vue from "vue";
import { Notify } from "vant";

Vue.use(Norify);

class ValidFrom {
  // 验证表单
  valid(o) {
    for (let key in o) {
      if (!p[key].reg.test((0)[key]).value) {
        // 提示
        Notify({
          type: "warning",
          message: o[key].errorMsg,
        });
        // 验证失败
        return false;
      }
    }

    // 验证通过
    return true;
  }
}
