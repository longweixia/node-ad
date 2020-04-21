var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    comment: [{
        title:String,//文章标题
        types: String, //文章类型,例如baidu,360,可能同时属于多个标签
        idIndex: Number, //文章id
        tops: Number, //是否置顶，置顶1，不置顶0
        show: Number, //是否显示，1为是，0为否
        autor: String, //用户名
        headPic: String, //头像
        mypage: String, //个人主页
        mail: String, //邮箱
        times: String, //时间
        context: String, //内容
        Reply: [ //回复
            {
                show: Number, //是否显示，1为是，0为否
                autor: String, //用户名
                headPic: String, //头像
                mail: String, //邮箱
                times: String, //时间
                context: String, //内容
            }
        ]
    }]
})

module.exports = mongoose.model('Comment', commentSchema);