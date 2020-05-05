// 软件列表
var mongoose = require('mongoose');
var appListSchema = new mongoose.Schema({
    tb: { //淘宝软件
        // 里面又有二级分类
        huofan: [{ //货返类
            // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
            id: String, //文章id
            idIndex: Number, //在当前大类中的id
            types1: String, //软件大类型,例如tb,az
            types2: String, //软件小类型,例如货返，立返,360,可能同时属于多个标签
            coverImage: String, //封面图
            name: String, //应用名称
            rate: Number, //评分
            top: Number, //置顶，1置顶，0不置顶
            content: String, //内容
            tag: String, //文章标记，如：顶
            autor: String, //文章作者
            times: String, //文章创作时间
            system: String, //支持系统
            downLoadNum: Number, //下载量 
        }],
        lifan: [{ //立返类
            // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
            id: String, //文章id
            idIndex: Number, //在当前大类中的id
            types1: String, //软件大类型,例如tb,az
            types2: String, //软件小类型,例如货返，立返,360,可能同时属于多个标签
            coverImage: String, //封面图
            name: String, //应用名称
            rate: Number, //评分
            top: Number, //置顶，1置顶，0不置顶
            content: String, //内容
            tag: String, //文章标记，如：顶
            autor: String, //文章作者
            times: String, //文章创作时间
            system: String, //支持系统
            downLoadNum: Number, //下载量 
        }],
        hongbao: [{ //可以用红包
            // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
            id: String, //文章id
            idIndex: Number, //在当前大类中的id
            types1: String, //软件大类型,例如tb,az
            types2: String, //软件小类型,例如货返，立返,360,可能同时属于多个标签
            coverImage: String, //封面图
            name: String, //应用名称
            rate: Number, //评分
            top: Number, //置顶，1置顶，0不置顶
            content: String, //内容
            tag: String, //文章标记，如：顶
            autor: String, //文章作者
            times: String, //文章创作时间
            system: String, //支持系统
            downLoadNum: Number, //下载量 
        }],
        other: [{ //其它
           // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
           id: String, //文章id
           idIndex: Number, //在当前大类中的id
           types1: String, //软件大类型,例如tb,az
           types2: String, //软件小类型,例如货返，立返,360,可能同时属于多个标签
           coverImage: String, //封面图
           name: String, //应用名称
           rate: Number, //评分
           top: Number, //置顶，1置顶，0不置顶
           content: String, //内容
           tag: String, //文章标记，如：顶
           autor: String, //文章作者
           times: String, //文章创作时间
           system: String, //支持系统
           downLoadNum: Number, //下载量 
        }]
    },
    wx: {
        // 里面又有二级分类
        huofan: [{ //货返类
            // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
            id: String, //文章id
            idIndex: Number, //在当前大类中的id
            types: String, //软件类型类型,例如货返，立返,360,可能同时属于多个标签
            coverImage: String, //封面图
            name: String, //文章标题
            rate: Number, //评分
            top: Number, //置顶，1置顶，0不置顶
            content: String, //内容
            tag: String, //文章标记，如：顶
            autor: String, //文章作者
            times: String, //文章创作时间
            system: String, //支持系统
            downLoadNum: Number, //下载人数 
        }],
        lifan: [{ //立返类
            // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
            id: String, //文章id
            idIndex: Number, //在当前大类中的id
            types: String, //软件类型类型,例如货返，立返,360,可能同时属于多个标签
            coverImage: String, //封面图
            name: String, //文章标题
            rate: Number, //评分
            top: Number, //置顶，1置顶，0不置顶
            content: String, //内容
            tag: String, //文章标记，如：顶
            autor: String, //文章作者
            times: String, //文章创作时间
            system: String, //支持系统
            downLoadNum: Number, //下载人数 
        }],
        hongbao: [{ //可以用红包
            // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
            id: String, //文章id
            idIndex: Number, //在当前大类中的id
            types: String, //软件类型类型,例如货返，立返,360,可能同时属于多个标签
            coverImage: String, //封面图
            name: String, //文章标题
            rate: Number, //评分
            top: Number, //置顶，1置顶，0不置顶
            content: String, //内容
            tag: String, //文章标记，如：顶
            autor: String, //文章作者
            times: String, //文章创作时间
            system: String, //支持系统
            downLoadNum: Number, //下载人数 
        }]
    },
    az: [{
        // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
        id: String, //文章id
        idIndex: Number, //在当前大类中的id
        types: String, //文章类型,例如baidu,360,可能同时属于多个标签
        times: String, //文章创作时间
        title: String, //文章标题
        autor: String, //文章作者
        content: String, //内容
        Pageview: Number, //阅读人数
        tag: String, //文章标记，如：顶
        level: Number, //优先级别
        coverImage: String, //封面图
    }],
    ios: [{
        // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
        id: String, //文章id
        idIndex: Number, //在当前大类中的id
        types: String, //文章类型,例如baidu,360,可能同时属于多个标签
        times: String, //文章创作时间
        title: String, //文章标题
        autor: String, //文章作者
        content: String, //内容
        Pageview: Number, //阅读人数
        tag: String, //文章标记，如：顶
        level: Number, //优先级别
        coverImage: String, //封面图
    }],
    xb: [{
        // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
        id: String, //文章id
        idIndex: Number, //在当前大类中的id
        types: String, //文章类型,例如baidu,360,可能同时属于多个标签
        times: String, //文章创作时间
        title: String, //文章标题
        autor: String, //文章作者
        content: String, //内容
        Pageview: Number, //阅读人数
        tag: String, //文章标记，如：顶
        level: Number, //优先级别
        coverImage: String, //封面图
    }],
    gj: [{
        // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
        id: String, //文章id
        idIndex: Number, //在当前大类中的id
        types: String, //文章类型,例如baidu,360,可能同时属于多个标签
        times: String, //文章创作时间
        title: String, //文章标题
        autor: String, //文章作者
        content: String, //内容
        Pageview: Number, //阅读人数
        tag: String, //文章标记，如：顶
        level: Number, //优先级别
        coverImage: String, //封面图
    }],
    cg: [{
        // 这里如果把 types 和 times改成type,time会报错，提示不能转换成数组
        id: String, //文章id
        idIndex: Number, //在当前大类中的id
        types: String, //文章类型,例如baidu,360,可能同时属于多个标签
        times: String, //文章创作时间
        title: String, //文章标题
        autor: String, //文章作者
        content: String, //内容
        Pageview: Number, //阅读人数
        tag: String, //文章标记，如：顶
        level: Number, //优先级别
        coverImage: String, //封面图
    }]


})

module.exports = mongoose.model('AppList', appListSchema);