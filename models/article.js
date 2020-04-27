// 文章列表
var mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
    userName: String,
    article:{
        tb:[
            {
                // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
                id:String,//文章id
                idIndex:Number,//在当前大类中的id
                types:String,//文章类型,例如baidu,360,可能同时属于多个标签
                times:String,//文章创作时间
                title:String,//文章标题
                autor:String,//文章作者
                content:String,//内容
                Pageview:Number,//阅读人数
                tag:String,//文章标记，如：顶
                level:Number,//优先级别
                coverImage:String,//封面图
            }
        ],
        wx:[{
            // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
            id:String,//文章id
            idIndex:Number,//在当前大类中的id
            types:String,//文章类型,例如baidu,360,可能同时属于多个标签
            times:String,//文章创作时间
            title:String,//文章标题
            autor:String,//文章作者
            content:String,//内容
            Pageview:Number,//阅读人数
            tag:String,//文章标记，如：顶
            level:Number,//优先级别
            coverImage:String,//封面图
        }],
        az:[{
            // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
            id:String,//文章id
            idIndex:Number,//在当前大类中的id
            types:String,//文章类型,例如baidu,360,可能同时属于多个标签
            times:String,//文章创作时间
            title:String,//文章标题
            autor:String,//文章作者
            content:String,//内容
            Pageview:Number,//阅读人数
            tag:String,//文章标记，如：顶
            level:Number,//优先级别
            coverImage:String,//封面图
        }],
        ios:[{
            // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
            id:String,//文章id
            idIndex:Number,//在当前大类中的id
            types:String,//文章类型,例如baidu,360,可能同时属于多个标签
            times:String,//文章创作时间
            title:String,//文章标题
            autor:String,//文章作者
            content:String,//内容
            Pageview:Number,//阅读人数
            tag:String,//文章标记，如：顶
            level:Number,//优先级别
            coverImage:String,//封面图
        }],
        xb:[{
            // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
            id:String,//文章id
            idIndex:Number,//在当前大类中的id
            types:String,//文章类型,例如baidu,360,可能同时属于多个标签
            times:String,//文章创作时间
            title:String,//文章标题
            autor:String,//文章作者
            content:String,//内容
            Pageview:Number,//阅读人数
            tag:String,//文章标记，如：顶
            level:Number,//优先级别
            coverImage:String,//封面图
        }],
        gj:[{
            // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
            id:String,//文章id
            idIndex:Number,//在当前大类中的id
            types:String,//文章类型,例如baidu,360,可能同时属于多个标签
            times:String,//文章创作时间
            title:String,//文章标题
            autor:String,//文章作者
            content:String,//内容
            Pageview:Number,//阅读人数
            tag:String,//文章标记，如：顶
            level:Number,//优先级别
            coverImage:String,//封面图
        }],
        cg:[{
            // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
            id:String,//文章id
            idIndex:Number,//在当前大类中的id
            types:String,//文章类型,例如baidu,360,可能同时属于多个标签
            times:String,//文章创作时间
            title:String,//文章标题
            autor:String,//文章作者
            content:String,//内容
            Pageview:Number,//阅读人数
            tag:String,//文章标记，如：顶
            level:Number,//优先级别
            coverImage:String,//封面图
        }]

    }
})

module.exports = mongoose.model('Article', articleSchema);