// pages/today/today.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'today',
    step: 0
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
    var that = this;
    wx.getWeRunData({
      success: function (res) {
        wx.request({
          url: 'http://localhost:8080/api/user/runData',
          method: 'get',
          header: {
            'content-type': 'application/json'
          },
          data: {
            iv: res.iv,
            encryptedData: res.encryptedData,
            sessionKey: app.globalData.sessionKey
          },
          success: res => {
            console.log(res);
            that.step = res.data[30].step
            that.setData({ step: res.data[30].step})
          },
          fail: err => {
            wx.showModal({
              title: '提示',
              content: '请先关注“微信运动”公众号并设置数据来源，以获取并提供微信步数数据',
              showCancel: false,
              confirmText: '知道了'
            })
          }
        })
      }
    })
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

  }
})