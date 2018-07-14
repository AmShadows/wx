// pages/location/location.js
// var bmap = require('../../wxapp-jsapi-master/src/bmap-wx.js');
var wxMarkerData = []; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {} 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '选择收货地址',
    })
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
  ontapjump: function (event) {
    wx.navigateTo({
      url: '/pages/addlocation/addlocation',
    })
  },

  //显示模态窗口
  // showModal: function (title, content, callback) {
  //   wx.showModal({
  //     title: title,
  //     content: content,
  //     confirmColor: '#1F4BA5',
  //     cancelColor: '#7F8389',
  //     success: function (res) {
  //       if (res.confirm) {
  //         callback && callback();
  //       }
  //     }
  //   })
  // },


  // 定位-获取当前位置和速度信息
  getLocation: function (callback) {
    var that=this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        // console.log(res);
        callback(res.longitude,res.latitude);
      }
    })
    wx.switchTab({
      url: '/pages/location/location'
    })
  },

  chooseLocation: function () {
    var that = this;
    var detailArray = new Array;
    wx.chooseLocation({
      type: 'gcj02',
      // key: "key",
      success: function (res) {
        // console.log(res);
        that.setData({
          address: res.address,
          
        })
        // detailArray.push(res.address);
        // console.log('lll' +detailArray);
      }
    })
  },




  // 定位-显示当前位置和速度信息
  // showLonLat: function () {
  //   var that = this;
  //   this.getLocation(function (lon, lat, speed) {
  //     var lonStr = lon >= 0 ? '东经' : '西经',
  //       latStr = lat >= 0 ? '北纬' : '南纬';
  //     lon = lon.toFixed(2);
  //     lat = lat.toFixed(2);
  //     lonStr += lon;
  //     latStr += lat;
  //     speed = (speed || 0).toFixed(2);
  //     that.showModal('当前位置和速度', '当前位置：' + lonStr + ',' + latStr + '。速度:' + speed + 'm/s');
  //   });
  // },

  //在地图上显示当前位置
  showMap: function () {
    this.getLocation(function (lon, lat) {
      wx.openLocation({
        latitude: lat,
        longitude: lon,
        scale: 20,
        fail: function () {
          wx.showToast({
            title: "地图打开失败",
            duration: 1000,
            icon: "cancel"
          });
        }
      });
    });
  },

  // input: function (e) {
  //   if (e.detail.value) {
  //     this.setData({
  //       hidden: false
  //     })
  //     this.search(e.detail.value);
  //   } else {
  //     this.setData({
  //       hidden: true
  //     })
  //   }
  // },
  // search: function (text) {
  //   var that = this;
  //   wx.request({
  //     url: 'http://api.map.baidu.com/place/v2/search?query=' + text + '&page_size=20&page_num=0&scope=2&region=南昌&output=json&ak=btsVVWf0TM1zUBEbzFz6QqWF',
  //     success: function (res) {
  //       console.log(res);
  //       that.setData({
  //         locationList: res.data.results
  //       })
  //     }
  //   })
  // },



})