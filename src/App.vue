<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Print Websocket Vue.js App"/>
    Label Data:
    <label>
      <input type="text" v-model="label_data">
    </label>
    IP:
    <label>
      <input type="text" v-model="ip">
    </label>
    Port:
    <label>
      <input type="text" v-model="port">
    </label>
    <button @click="send">打印</button>
  </div>
</template>

<script>

import HelloWorld from "@/components/HelloWorld";

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      label_data: 'Label Data Test',
      ip: '127.0.0.1',
      port: '9100'
    }
  },
  created() { // 页面创建生命周期函数
    this.initWebSocket()
  },
  destroyed: function () { // 离开页面生命周期函数
    this.onClose();
  },
  methods: {
    collapse: function(){
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.iconClass = "cebianlanzhankai";
      } else{
        this.iconClass = "cebianlanshouhui";
      }
    },
    initWebSocket: function () {
      const printWsUri = "ws://127.0.0.1:7777/print";
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      this.websock = new WebSocket(printWsUri);
      this.websock.onopen = this.onOpen;
      this.websock.onclose = this.onClose;
      this.websock.onerror = this.onError;
      this.websock.onmessage = this.onMessage;
    },
    onOpen: function (evt) {
      //console.log(evt);
      console.log("WebSocket连接成功");
      this.writeToScreen(evt);
    },
    onClose: function (e) {
      console.log("connection closed (" + e.code + ")");
    },
    onError: function (e) {
      console.log(e);
      console.log("WebSocket连接发生错误");
    },
    onMessage: function (e) {
      const da = e.data; // JSON.parse(e.data);
      console.log(da);
      this.message = da;
    },
    writeToScreen: function (message) {
      //var pre = document.createElement("p");
      //pre.style.wordWrap = "break-word";
      //pre.innerHTML = message;
      //output.appendChild(pre);
      console.log(message);
    },
    send: function () {
      let data =  {
        label_data: this.label_data,
        ip: this.ip,
        port: this.port
      }
      this.websock.send(JSON.stringify(data));
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
