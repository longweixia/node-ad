var express = require('express');
var router = express.Router();
var friendLinks = require('./../models/friendLink')
var multer = require('multer');
let fs = require("fs");
let path = require("path");

// 增加接口
router.post('/add', function(req, res, next) {
    let list = req.body.data
    friendLinks.findOne(function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: "添加失败" + err
            });
        } else {
            list.id=1
            let lists = { linkList: [list] }

            // 当集合不存在的时候，创建集合
            if (doc == null) {

                friendLinks.create(lists, function(err1, doc1) {
                    if (err1) {
                        res.json({
                            status: "1",
                            msg: "添加失败" + err1
                        });
                    } else {
                        res.json({
                            status: "0",
                            msg: "添加成功"
                        });
                    }
                })
            } else {
                if(doc.linkList== ""){
                    list.id=1;
                    doc.linkList.push(list)
                doc.save(function(err2, doc2) {
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
                return false
                }
               list.id = doc.linkList[doc.linkList.length-1].id+1
               doc.linkList.push(list)
                doc.save(function(err2, doc2) {
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

// 删除
router.post('/delete', function(req, res, next) {
    let id = req.body.id
    friendLinks.findOne(function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: "删除失败" + err
            })
            return false
        }
        doc.linkList.forEach((item, index) => {
            if (item.id == id) {
                doc.linkList.splice(index, 1)
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

// 修改接口
router.post('/edit', function(req, res, next) {
    let id = req.body.data.id
    let list = req.body.data.list

    friendLinks.findOne(function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: "修改失败" + err
            });
        } else {
            
            doc.linkList.forEach((item, index) => {
                if (item.id == id) {
                    doc.linkList[index] = list
                    doc.save(function(err1, doc1) {
                        if (err1) {
                            res.json({
                                status: "1",
                                msg: "编辑失败" + err1
                            })
                        } else {
                            res.json({
                                status: "0",
                                msg: "编辑成功"
                            })
                        }
                    })
                }
            })
        }
    })




    // console.log(docs,90)

});

// 读取
router.get('/get', function(req, res, next) {
    friendLinks.findOne(function(err0, doc0) {
        if (err0) {
            res.json({
                status: "1",
                msg: "查询失败",
                resulet: ""
            })
            return false
        }
        if (doc0 == null) {
            res.json({
                status: "1",
                msg: "查询失败",
                resulet: ""
            })
            return false
        }

        let obj = doc0.linkList
        res.json({
            status: "0",
            msg: "获取成功",
            resulet: obj
        })

    })


});


module.exports = router;