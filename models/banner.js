var mongoose = require('mongoose');
var bannerSchema = new mongoose.Schema({
    bannerList: [{
        "id": Number,
        "url": String, //图片url
        "name": String, //图片名
        "times": String, //上传时间
        "routerUrl": String, //跳转url
        "sort": Number, //排序根据数字排序，小的在前面
        "show": Number, //是否展示1,展示，0隐藏
    }]
})

module.exports = mongoose.model('Banner', bannerSchema);