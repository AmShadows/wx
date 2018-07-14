// pages/index-detail/index-detail.js
import { DBPost } from '../../db/DBPost.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperTitle: [{
      text: "菜单",
      id: 1
    }, {
      text: "评价",
      id: 2
    }, {
      text: "商家",
      id: 3
    }],
    menu: [],
    // currentPage: 0,
    selected: 0,
    howMuch: 12,
    cost: 0,
    pullBar: false,
    shop:0,
    // chi:231312

    newsarr: [
      { id: 0, message: "本店新用户立减1元（在线支付专享）" },
      { id: 1, message: "本店新用户立减2元（在线支付专享）" },
      { id: 2, message: "本店新用户立减3元（在线支付专享）" },
      { id: 3, message: "本店新用户立减4元（在线支付专享）" },
      { id: 4, message: "本店新用户立减5元（在线支付专享）" }
    ],
    autoplay: true,
    interval: 3000,
    duration: 2000,
    vertical: true,
    circular: true,
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.dbPost = new DBPost(postId);
    this.postData = this.dbPost.getPostItemById().data;
    this.setData({
      post: this.postData
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  tabdetail: function(e) {
    this.setData({
      currentPage: e.currentTarget.dataset.index
    })
  },
  turnTitle: function(e) {
    if(e.detail.source == "touch") {//判断是否是滑动引起的界面切换
      this.setData({
        currentPage: e.detail.current
     })
    }
  },
  turnMenu: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    })
    console.log(e.currentTarget.dataset.index);
  },

  // 添加菜
  addfood: function (e) {
    var info = this.data.post;
    console.log(info.groups[this.data.selected]);
    info.groups[this.data.selected].menuContent[e.currentTarget.dataset.index].numb++;
    this.setData({
      cost: this.data.cost + info.groups[this.data.selected].menuContent[e.currentTarget.dataset.index].price,
      post: info,
    })
  },
  // 删除菜
  removefood: function (e) {
    var info = this.data.post;
    if (info.groups[this.data.selected].menuContent[e.currentTarget.dataset.index].numb != 0) {
      info.groups[this.data.selected].menuContent[e.currentTarget.dataset.index].numb--;
      this.setData({
        cost: this.data.cost - info.groups[this.data.selected].menuContent[e.currentTarget.dataset.index].price,
        post: info,
      })
    }
  },
  // 提交订单
  placeorder: function () {
    var that=this;
    if (this.data.cost > 0) {
      var detailArray = new Array;
      var jsonC = this.data.post.groups;
      console.log('a' + jsonC[0].menuContent.length);
      for (var i = 0; i < jsonC.length; i++) {
        for (var j = 0; j < jsonC[i].menuContent.length; j++) {
          if (jsonC[i].menuContent[j].numb > 0) {
            var a = {
              title: jsonC[i].menuContent[j].name,
              src: jsonC[i].menuContent[j].src,
              price: jsonC[i].menuContent[j].price,
              numb: jsonC[i].menuContent[j].numb,
              // num: jsonC[i].groups[j].num,
              // price: jsonC[i].groups[j].price,
              // gid: jsonC[i].groups[j].gid
            };
            // console.log(jsonC[i].groups[j].title);
            // console.log(a);
            detailArray.push(a);
            
          }
        }
      }
      var orderResult = {
        // sumNum: that.data.sumNum,
        shop: this.data.post.name,
        cost: this.data.cost,
        // meta: that.data.meta,
        detail: detailArray
      };
      // console.log(cost);
      wx.setStorage({
        // key: app.globalData.storageKey,
        key:"keyaaa",
        data: orderResult
      });
      console.log(orderResult)
      wx.navigateTo({
        url: "/pages/index-detail/order/order"
      })
    } else {
      wx.showToast({
        title: "请先添加产品",
        icon: "success",
        duration: 500
      })
    }
  },
})