const install = Vue => {
  // 创建新的Vue实例
  const Bus = new Vue({
    methods: {
      emit(eventName, ...args) {
        this.$emit(eventName, ...args);
      },
      on(eventName, callBack = () => {}) {
        this.$on(eventName, callBack);
      },
      off(eventName, callBack) {
        this.$off(eventName, callBack);
      }
    }
  });
  // 添加到 Vue 原型
  Vue.prototype.$bus = Bus;
};
// 对外暴露 install 方法
export default install;

/*
 * 在项目入口处注册
 * import EventBus from './event-bus'
 * Vue.use(EventBus)
 */
