var mongoose = require('mongoose');
var sidebarAdImgSchema = new mongoose.Schema({
    listTop: [{   //上方侧边栏
        "ids": String,
        "idIndex":Number,
        "url": String, //图片url
        "name": String, //图片名
        "times": String, //上传时间
        "routerUrl": String, //跳转url
        "show": Number, //是否展示1,展示，0隐藏
        "types":String,//"top"
    }],
    listBottom: [{//下方侧边栏
        "ids": String,
        "idIndex":Number,
        "url": String, //图片url
        "name": String, //图片名
        "times": String, //上传时间
        "routerUrl": String, //跳转url
        "show": Number, //是否展示1,展示，0隐藏
        "types":String//"bottom"
    }],
})

module.exports = mongoose.model('SidebarAdImg', sidebarAdImgSchema);