var express = require('express');
var router = express.Router();
var articles = require('./../models/article')
var clubs = require('./../models/club')
var multer = require('multer');
let fs = require("fs");
let path = require("path");
// var Collections = require('./../models/collection')

// 新建文章
router.post('/post', function(req, res, next) {
    var param = {
        userName: req.body.data.userName,
    }
    let types = req.body.data.types
    let articleObj = req.body.data.article[types]
    let id = req.body.data.id
    articles.findOne(param, function(err0, doc0) {
        // 集合不存在，新建集合
        if (doc0 == "" || doc0 == null) {
            // 第一篇文章设置id为1
            articleObj[0].idIndex = 1
            articleObj[0].id = types+1
            delete req.body.data.types //外层的types不需要保存
            delete req.body.data.id //外层的types不需要保存
            articles.create(req.body.data, function(err, doc) {
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
            // 如果id存在,那么就修改原文章
            if(id){
                
                doc0.article[types].forEach((item,index)=>{
                    if(id==item.id){
                        // 为传入的对象添加idIndex和id
                        articleObj[0].idIndex = doc0.article[types][index].idIndex
                        articleObj[0].id = doc0.article[types][index].id
                        doc0.article[types][index]=articleObj[0]
                        doc0.save(function(err2, doc2) {
                            if (err2) {
                                res.json({
                                    status: "1",
                                    msg: "修改失败" + err2
                                })
                            } else {
                                res.json({
                                    status: "0",
                                    msg: "修改成功"
                                })
                            }
                        })
                    }
                })
                return false
            }
            // 如果id不在，就新增文章
            // 如果当前的大类是空数组，或者不存在，直接push就行了,
            if (doc0.article[types] == "") {
                articleObj[0].idIndex = 1
                articleObj[0].id = types+1
                doc0.article[types].push(articleObj[0])

            } //如果不是空数组
            else {
                console.log(doc0.article[types],"====")
                let len = doc0.article[types].length
                articleObj[0].idIndex = doc0.article[types][len - 1].idIndex + 1
                articleObj[0].id = types+articleObj[0].idIndex
                doc0.article[types].push(articleObj[0])
            }
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

// 读取所有文章
router.get('/get', function(req, res, next) {
    // let pageSize = req.param("pageSize")
    // let currentPage = req.param("currentPage")
    // let Collect = { userName: req.param("userName") }
    // let skip = (currentPage - 1) * pageSize //从哪一条开始查询
    // let totol; //总条数
    var param = {
        userName: req.param("userName"),
        // TemplateId:req.param("TemplateId")
    }
    let flag = req.param("flag")
    let idIndex = req.param("idIndex")
    articles.findOne(param, function(err0, doc0) {
        if(err0){
            res.json({
                status: "1",
                msg: "查询失败",
                resulet: ""
            })
            return false
        }
        if(idIndex){//如果idIndex存在，就只查某一篇文章
            console.log(doc0)
            doc0.article[flag].forEach((item,index)=>{
                if(item.idIndex == idIndex){
                    res.json({
                        status: "0",
                        msg: "获取成功",
                        resulet: doc0.article[flag][index]
                    })
                }
            })
           
        }//如果不存在根据types来查询一个集合或者所有文章
        else{
            if(flag=="all"){//查所有
                let obj = doc0.article["baidu"]
            .concat(doc0.article["sanliuling"]).
            concat(doc0.article["gogle"])
            .concat(doc0.article["sougou"])
            .concat(doc0.article["tuiguang"])
            res.json({
                status: "0",
                msg: "获取成功",
                resulet: obj
            })
            }else{//查集合
                let obj = doc0.article[flag]
                res.json({
                    status: "0",
                    msg: "获取成功",
                    resulet: obj
                })
            }
            
           
        }
        // console.log(doc0)
        // res.json({
        //     status: "0",
        //     msg: "获取成功",
        //     resulet: doc0
        // })
    })

});

//继续阅读
router.get('/getKeep', function(req, res, next) {
    var param = {
        userName: req.param("userName"),
    }
    let flag = req.param("flag")
    // let idIndex = req.param("idIndex")
    articles.findOne(param, function(err0, doc0) {
        if(err0){
            res.json({
                status: "1",
                msg: "查询失败",
                resulet: ""
            })
            return false
        }
        let ary=[]
            doc0.article[flag].forEach((item,index)=>{
             let obj ={};
             obj.title=item.title
             obj.types=item.types
             obj.idIndex=item.idIndex
             ary.push(obj)
             if(ary.length>4){
                 return
             }
                 
            })
               //找到该文章的后4篇
               res.json({
                status: "0",
                msg: "获取成功",
                resulet: ary
            })
        
           
        
    })

});


module.exports = router;