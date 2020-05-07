// pages/input/input.js
//获取应用实例
const app = getApp()
Page({
  data: {
    imgSrc: [],
    show: false
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },
  getImg(e) {
    var _this = this;
    wx.chooseImage({
      count: 1, //照片可选数量
      sizeType: ['original', 'compressed'], //原图，缩略图
      sourceType: ['album', 'camera'], //相册，相机
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        _this.setData({
          imgSrc: [..._this.data.imgSrc, ...tempFilePaths]
        })
      }
    })
  },
  deleteImage: function (e) {

    var that = this;
    var images = that.data.imgSrc;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    console.log(e.currentTarget)
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          images.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        console.log(images)
        that.setData({
          imgSrc: images
        });
      }
    })
  },
  //上传图片到服务器 
  formSubmit: function () {
    console.log("上传")
    var that = this
    var adds = that.data.imgSrc;
    for (var i = 0; i < this.data.imgSrc.length; i++) {
      wx.uploadFile({
        url: 'http://localhost:8080/intake/fileUpload', //填写实际接口，仅测试     
        filePath: that.data.imgSrc[i],
        name: 'file',
        formData: {
          'file': adds
        },
        success: function (res) {
          console.log(res);
          if (res) {
            var a = JSON.parse(res.data)
            console.log(a)
            // wx.showToast({
            //   title: '已提交发布！',
            //   duration: 1000
            // });
            a = JSON.parse(a)
            wx.showModal({
              title: '详情',
              content: "菜名：" + a.result[0].name + "\n" + "卡路里：" + a.result[0].calorie,

            });
          }
        }
      })
    }
    // this.setData({
    //   formdata: ''
    // })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
  // ,
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})