var express = require("express");
var router = express.Router();
var appLists = require("./../models/appList");
// var clubs = require('./../models/club')
// var multer = require('multer');
// let fs = require("fs");
// let path = require("path");
// var Collections = require('./../models/collection')

// 新建应用，修改应用
router.post("/postApp", function(req, res, next) {
  let data = req.body.data;
  let types1 = data.types1;
  let types2 = data.types2;
  let id = data.id;
  let obj = {};

  appLists.findOne(function(err0, doc0) {
    // 集合不存在，新建集合
    if (doc0 == "" || doc0 == null) {
      // 第一篇文章设置id为1
      data.idIndex = 1;
      data.id = types2 + data.idIndex;
      obj[types1] = {};
      obj[types1][types2] = [];
      obj[types1][types2].push(data);
      appLists.create(obj, function(err, doc) {
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
      });
    } else {
      // 如果id存在,那么就修改
      let typeArry = doc0[types1][types2];
      if (id) {
        typeArry.forEach((item, index) => {
          if (id == item.id) {
            // 为传入的对象添加idIndex和id
            data.idIndex = typeArry[index].idIndex;
            data.id = typeArry[index].id;
            typeArry[index] = data;
            doc0.save(function(err2, doc2) {
              if (err2) {
                res.json({
                  status: "1",
                  msg: "修改失败" + err2
                });
              } else {
                res.json({
                  status: "0",
                  msg: "修改成功"
                });
              }
            });
          }
        });
        return false;
      }
      // 如果id不在，就新增文章
      // 如果当前的大类是空数组，或者不存在，直接push就行了,
      if (typeArry == "") {
        data.idIndex = 1;
        data.id = types2 + data.idIndex;
        typeArry.push(data);
        console.log("空数组", data);
      } else {
        //如果不是空数组，需要处理下IdIndex和id
        let len = typeArry.length;

        data.idIndex = typeArry[len - 1].idIndex + 1;
        data.id = types2 + data.idIndex;
        typeArry.push(data);
      }
      doc0.save(function(err1, doc1) {
        if (err1) {
          res.json({
            status: "1",
            msg: "新增失败" + err1
          });
        } else {
          res.json({
            status: "0",
            msg: "新增成功"
          });
        }
      });
    }
  });
});

// 删除应用
router.post("/deleteApp", function(req, res, next) {
  let id = req.body.data.id;
  let types1 = req.body.data.types1;
  let types2 = req.body.data.types2;
  appLists.findOne(function(err, doc) {
    // console.log(doc)
    doc[types1][types2].forEach((item, index) => {
      if (item.id == id) {
        doc[types1][types2].splice(index, 1);
        // console.log(doc.article.baidu[0].id)
        doc.save(function(err1, doc1) {
          if (err1) {
            res.json({
              status: "1",
              msg: "删除失败" + err1
            });
          } else {
            res.json({
              status: "0",
              msg: "删除成功"
            });
          }
        });
      }
    });
  });
});

// 修改文章
router.post("/edit", function(req, res, next) {
  var param = {
    userName: req.body.data.userName
  };
  let id = req.body.data.id;
  let types = req.body.data.types;
  articles.findOne(param, function(err, doc) {
    // console.log(doc)
    doc.article[types].forEach((item, index) => {
      if (item.id == id) {
        doc.article[types].splice(index, 1);
        // console.log(doc.article.baidu[0].id)
        doc.save(function(err1, doc1) {
          if (err1) {
            res.json({
              status: "1",
              msg: "删除失败" + err1
            });
          } else {
            res.json({
              status: "0",
              msg: "删除成功"
            });
          }
        });
      }
    });
  });
});

// 读取应用
router.get("/getApp", function(req, res, next) {
  // let pageSize = req.param("pageSize")
  // let currentPage = req.param("currentPage")
  // let Collect = { userName: req.param("userName") }
  // let skip = (currentPage - 1) * pageSize //从哪一条开始查询
  // let totol; //总条数
  let types1 = req.param("types1");
  let types2 = req.param("types2");
  let id = req.param("id");
  appLists.findOne(function(err0, doc0) {
    if (err0) {
      res.json({
        status: "1",
        msg: "查询失败",
        resulet: ""
      });
      return false;
    }
    if (id) {//只读某一条，返回的是一个对象
      let typeArry = doc0[types1][types2];
      typeArry.forEach((item, index) => {
        if (id == item.id) {
          res.json({
            status: "0",
            msg: "获取成功",
            resulet: typeArry[index]
          });
        }
      });
      //如果id存在，就只查折这一篇文章

      //   for (var i in doc0[types1]) {
      //     for (var t = 0; t < doc0[types1][i].length; t++) {
      //       if (doc0[types1][i][t].id == id) {
      //         res.json({
      //           status: "0",
      //           msg: "获取全部成功",
      //           resulet: doc0[types1][i][t]
      //         });
      //       }
      //     }
      //   }
    } //如果id不存在根据types来查询
    else {
      if (types2 == "all") {
        //查所有
        let arr = [];
        for (var i in doc0[types1]) {
          for (var t = 0; t < doc0[types1][i].length; t++) {
            if (doc0[types1][i][t]) {
              arr.push(doc0[types1][i][t]);
            }
          }
        }

        res.json({
          status: "0",
          msg: "获取全部成功",
          resulet: arr
        });
      } else {
        //查集合
        let obj = doc0[types1][types2];
        res.json({
          status: "0",
          msg: "获取成功",
          resulet: obj
        });
      }
    }
  });
});

//继续阅读
router.get("/getKeep", function(req, res, next) {
  var param = {
    userName: req.param("userName")
  };
  let flag = req.param("flag");
  // let idIndex = req.param("idIndex")
  articles.findOne(param, function(err0, doc0) {
    if (err0) {
      res.json({
        status: "1",
        msg: "查询失败",
        resulet: ""
      });
      return false;
    }
    let ary = [];
    doc0.article[flag].forEach((item, index) => {
      let obj = {};
      obj.title = item.title;
      obj.types = item.types;
      obj.idIndex = item.idIndex;
      ary.push(obj);
      // if (ary.length > 4) {
      //     //找到该文章的后4篇

      //     return false
      // }
    });
    res.json({
      status: "0",
      msg: "获取成功",
      resulet: ary
    });
  });
});

module.exports = router;
