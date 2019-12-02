const sidebar = require("./sidebar");

module.exports = {
  base: "/my-boke/",
  title: "古咕咕的学习笔记",
  description: "积沙成塔，良言善行",
  head: [["link", { rel: "icon", href: "/logo.png", type: "image/png" }]],
  port: 8888,
  themeConfig: {
    editLinks: false,
    nav: [],
    sidebar: sidebar
  }
};
