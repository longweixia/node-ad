var express = require('express');
var router = express.Router();
// var articles = require('./../models/article')
var comments = require('./../models/comment')
// var clubs = require('./../models/club')
// var multer = require('multer');
// let fs = require("fs");
// let path = require("path");
// var Collections = require('./../models/collection')

// 提交评论
router.post('/postComments', function(req, res, next) {
    var param = {
        userName: req.body.data.userName,
    }
    comments.findOne(param, function(err0, doc0) {
        console.log(doc0, "查新")
        // 集合不存在，新建集合
        if (doc0 == "" || doc0 == null) {
            comments.create(req.body.data, function(err, doc) {
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

            // // 如果当前的评论是空数组，或者不存在，直接push就行了,
            // if (doc0.comment == "") {
            doc0.comment.push(req.body.data.comment[0])

            // } //如果不是空数组
            // else {
            //     console.log(doc0.article[types],"====")
            //     let len = doc0.article[types].length
            //     articleObj[0].idIndex = doc0.article[types][len - 1].idIndex + 1
            //     articleObj[0].id = types+articleObj[0].idIndex
            //     doc0.article[types].push(articleObj[0])
            // }
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



        }

    })
});

// 提交回复
router.post('/postRelay', function(req, res, next) {

    let indexs = req.body.data.base.indexs
    comments.findOne(function(err0, doc0) {
        // console.log(doc0.comment[0].context,"回复数据")
        if (err0) {
            res.json({
                status: "1",
                msg: "回复失败",
                resulet: err0
            })
        } else {
            doc0.comment[indexs].Reply.concat(req.body.data.relay)
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
    let idIndex = req.param("idIndex")
    comments.findOne(function(err0, doc0) {
        // console.log(doc0, "评论数据")
        // if (err0) {
        //     res.json({
        //         status: "1",
        //         msg: "查询评论失败",
        //         resulet: ""
        //     })
        //     return false
        // }
        // 集合不存在，新建集合
        if (doc0 == "" || doc0 == null) {
            res.json({
                status: "0",
                msg: "评论为空",
                resulet: ""
            });
            
        }else{
            doc0.comment.forEach((item, index) => {
                if (item.idIndex == idIndex) {
                    res.json({
                        status: "0",
                        msg: "获取成功",
                        resulet: doc0.comment
                    })
                    return false
                }
    
            })
        }
     




    })

});




module.exports = router;