var mongoose = require('mongoose');
var friendLinksSchema = new mongoose.Schema({
    linkList: [{   
        "id": Number,
        "url": String, //link url
        "name": String, //链接名称
        "show": Number, //是否展示1,展示，0隐藏
    }]
})

module.exports = mongoose.model('FriendLink', friendLinksSchema);