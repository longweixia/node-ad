var express = require('express');
var router = express.Router();
var banners = require('./../models/banner')
var multer = require('multer');
let fs = require("fs");
let path = require("path");

// 增加banner接口
router.post('/add', function(req, res, next) {
    let list = req.body.data
    banners.findOne(function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: "添加失败" + err
            });
        } else {
            console.log(doc, 909090009)
            // 当集合不存在的时候，创建集合
            // console.log(doc,8989898)
            if (doc == null) {
                list.id = 1
                let lists = { bannerList: list }
                banners.create(lists, function(err1, doc1) {
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
                //当集合存在的时候，直接push进数组

                // doc.bannerList为空数组时,id 为1
                // 不为空数组时，新id永远取查询到的最后一个值id+1
                doc.bannerList == "" ? list.id = 1 : list.id = doc.bannerList[doc.bannerList.length - 1].id + 1
                doc.bannerList.push(list)
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
        // console.log(docs,90)
    })
});

// 删除banner
router.post('/delete', function(req, res, next) {
    let id = req.body.id
    banners.findOne( function(err, doc) {
        if(err){
            res.json({
                status: "1",
                msg: "删除失败" + err
            })
            return false
        }
        doc.bannerList.forEach((item, index) => {
            if (item.id == id) {
                doc.bannerList.splice(index, 1)
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

// 修改banner接口
router.post('/edit', function(req, res, next) {
    let id = req.body.data.id
    let list = req.body.data.list

    banners.findOne(function(err, doc) {
        if (err) {
            res.json({
                status: "1",
                msg: "修改失败" + err
            });
        } else {
            doc.bannerList.forEach((item, index) => {
                if (item.id == id) {
                    doc.bannerList[index] = list
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
            // res.json({
            //     status: "0",
            //     msg: "修改成功"
            // });
        }
    })




    // console.log(docs,90)

});

// 读取banner
router.get('/get', function(req, res, next) {
    // let pageSize = req.param("pageSize")
    // let currentPage = req.param("currentPage")
    // let Collect = { userName: req.param("userName") }
    // let skip = (currentPage - 1) * pageSize //从哪一条开始查询
    // let totol; //总条数

    // let flag = req.param("flag")
    let id = req.param("flag")
    banners.findOne(function(err0, doc0) {
        if (err0) {
            res.json({
                status: "1",
                msg: "查询失败",
                resulet: ""
            })
            return false
        }
        if (id=="all") { //如果idIndex存在，就只查某一篇文章
            let obj = doc0.bannerList
            res.json({
                status: "0",
                msg: "获取成功",
                resulet: obj
            })
           

        } //如果不存在根据types来查询一个集合或者所有文章
        else {
            doc0.bannerList.forEach((item, index) => {
                if (item.id == id) {
                    res.json({
                        status: "0",
                        msg: "获取成功",
                        resulet: [doc0.bannerList[index]]
                    })
                }
            })
            


        }
        // console.log(doc0)
        // res.json({
        //     status: "0",
        //     msg: "获取成功",
        //     resulet: doc0
        // })
    })

});


module.exports = router;