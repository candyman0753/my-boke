const sidebar = require("./sidebar");
const monent = require("moment");

module.exports = {
  base: "/my-boke/",
  title: "古咕咕的学习笔记",
  description: "积沙成塔，良言善行",
  head: [["link", { rel: "icon", href: "/logo.png", type: "image/png" }]],
  port: 8888,
  themeConfig: {
    editLinks: false,
    lastUpdated: "上次更新",
    nav: [],
    sidebar: sidebar
  },
  plugins: [
    [
      "@vuepress/last-updated",
      {
        transformer: (timestamp, lang) => {
          monent.locale("zh-CN");
          return monent(timestamp).fromNow();
        }
      }
    ]
  ]
};
