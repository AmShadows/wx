//index.js
import {DBPost} from '../../db/DBPost.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dbPost = new DBPost();
    this.setData({
      ppostList: dbPost.getAllPostData()
    });
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
    // var that = this;
    // wx.getStorage({
    //   key: "keyy",
    //   success: function (res) {
    //     console.log('aaa' + res.data)
    //     that.setData({
    //       Detail: res.data.detail,
    //       meta: res.data.meta,
    //       shop: res.data.shop,
    //       cost: res.data.cost,
    //       sumMon: res.data.sumMon,
    //       orderDetail: res.data.detail,
          
    //     })

        
    //     console.log(res.data)
    //   },
    // });
    
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

  //位置跳转
  ontapjump:function(event){
    wx.navigateTo({
      url: '/pages/location/location',
    })
  },
  //饭堂详情跳转
  ontaptodetail(event){
    var postId=event.currentTarget.dataset.postId;
    console.log(postId);
    wx.navigateTo({
      url: '/pages/index-detail/index-detail?id='+postId,
    })
  }
})















