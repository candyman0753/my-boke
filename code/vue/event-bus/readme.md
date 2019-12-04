# demo

## 原理

使用新的 Vue 实例作为中央事件总线(bus)，相当于中介，组件间的通信都在 bus 中完成

## 在项目入口注册

```js
// main.js
import EventBus from "./event-bus";
Vue.use(EventBus);
```

## 组件间使用

- component A

  ```js
  export default {
    data(){
      return {
        count: 0
      }
    },
    created(){
      this.$bus.on('increase', this.eventHandle)
    },
    methods(){
      eventHandle(num = 1){
        this.count += num
      }
    },
    beforeDestroy(){
      this.$bus.off('increase')
    }
  }
  ```

  ```
  1. $bus.on 最好在 created 钩子里使用，确保能监听到其他组件在 created 钩子中派发的事件
  2. 使用了$bus.on的组件，应该在beforeDestroy钩子里使用$bus.off注销相应事件，否则监听句柄会一直存在于event-bus实例中
  ```

- component B

  ```js
  export default {
    methods(){
      emitIncrease(){
        this.$bus.emit('increase', 10)
      }
    }
  }
  ```
