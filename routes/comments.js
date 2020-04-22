var express = require('express');
var router = express.Router();
var comments = require('./../models/comment')
// 提交评论
router.post('/postComments', function(req, res, next) {
    let obj = req.body.data
    comments.findOne(function(err0, doc0) {
        let lists; //存数据的数据
        // 集合不存在，新建集合
        if (doc0 == "" || doc0 == null) {
            //拼装数据
            lists = {
                comment: [{
                    ids: obj.ids,
                    types: obj.types,
                    title: obj.title,
                    list: [obj.list],
                }]
            }
            comments.create(lists, function(err, doc) {
                if (err) {
                    res.json({
                        status: "1",
                        msg: "提交失败" + err
                    });
                } else {
                    res.json({
                        status: "0",
                        msg: "提交成功"
                    });
                }
            })
        } else {

            //  如果当前的评论是空数组，直接push就行了,
            if (doc0.comment == "") {

            } else {
                // 如果不为空，判断文章id是否存在，及是否已有该文章的评论
                for (let i = 0, t = doc0.comment; i < t.length; i++) {
                    // 文章存在push
                    if (t[i].ids == obj.ids) {
                        doc0.comment[i].list.push(obj.list)
                        doc0.save(function(err1, doc1) {
                            if (err1) {
                                res.json({
                                    status: "1",
                                    msg: "提交失败" + err1
                                })
                            } else {
                                res.json({
                                    status: "0",
                                    msg: "提交成功"
                                })
                            }
                        })
                        return false
                    }
                }
                // 不存在文章就是新建
                //拼装数据
                lists = {
                    comment: [{
                        ids: obj.ids,
                        types: obj.types,
                        title: obj.title,
                        list: [obj.list],
                    }]
                }
                doc0.comment.push(lists)
                doc0.save(function(err2, doc2) {
                    if (err2) {
                        res.json({
                            status: "1",
                            msg: "提交失败" + err2
                        })
                    } else {
                        res.json({
                            status: "0",
                            msg: "提交成功"
                        })
                    }
                })
            }
        }
    })
});

// 提交回复
router.post('/postRelay', function(req, res, next) {

    let indexs = req.body.data.base.indexs  //文章的第几条评论
    let ids = req.body.data.base.ids  //文章的第几条评论
    comments.findOne(function(err0, doc0) {
        // console.log(doc0.comment[0].context,"回复数据")
        if (err0) {
            res.json({
                status: "1",
                msg: "回复失败",
                resulet: err0
            })
        } else {
            doc0.comment.forEach((item,index)=>{
                if(ids==item.ids){
                    doc0.comment[index].list[indexs].Reply.push(req.body.data.Reply)
                }
            })
            doc0.save(function(err1, doc1) {
                if (err1) {
                    res.json({
                        status: "1",
                        msg: "回复失败" + err1
                    })
                } else {
                    res.json({
                        status: "0",
                        msg: "回复成功"
                    })
                }
            })
        }

    })


});


// 删除文章
router.post('/delete', function(req, res, next) {
    var param = {
        userName: req.body.data.userName
    }
    let id = req.body.data.id
    let types = req.body.data.types
    articles.findOne(param, function(err, doc) {
        // console.log(doc)
        doc.article[types].forEach((item, index) => {
            if (item.id == id) {
                doc.article[types].splice(index, 1)
                // console.log(doc.article.baidu[0].id)
                doc.save(function(err1, doc1) {
                    if (err1) {
                        res.json({
                            status: "1",
                            msg: "删除失败" + err1
                        })
                    } else {
                        res.json({
                            status: "0",
                            msg: "删除成功"
                        })
                    }
                })
            }
        });
    })
});


// 修改文章
router.post('/edit', function(req, res, next) {
    var param = {
        userName: req.body.data.userName
    }
    let id = req.body.data.id
    let types = req.body.data.types
    articles.findOne(param, function(err, doc) {
        // console.log(doc)
        doc.article[types].forEach((item, index) => {
            if (item.id == id) {
                doc.article[types].splice(index, 1)
                // console.log(doc.article.baidu[0].id)
                doc.save(function(err1, doc1) {
                    if (err1) {
                        res.json({
                            status: "1",
                            msg: "删除失败" + err1
                        })
                    } else {
                        res.json({
                            status: "0",
                            msg: "删除成功"
                        })
                    }
                })
            }
        });
    })
});

// 读取评论
router.get('/getComment', function(req, res, next) {
    let ids = req.param("ids")
    comments.findOne(function(err0, doc0) {
        // 集合不存在，新建集合
        if (doc0 == "" || doc0 == null) {
            res.json({
                status: "0",
                msg: "评论为空",
                resulet: ""
            });

        } else {
            doc0.comment.forEach((item, index) => {
                if (item.ids == ids) {
                    res.json({
                        status: "0",
                        msg: "获取成功",
                        resulet: doc0.comment[index]
                    })
                    return false
                }

            })
        }





    })

});




module.exports = router;