/**
 * Created by xingjie201 on 2015/11/5.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

function testAggregate(){

MongoClient.connect('mongodb://localhost/cxer', function (err, db) { //链接数据库
                                                                           // Create a test collection
  var collection = db.collection('orders');
  //获取当前时间  YYYY/MM/DD 00:00:00 用于查看当天订单
  var d = moment(new Date());
  console.log(d._d);
 // var nowStr = d.format("YYYY/MM/DD 00:00:00.000Z");

  //
  db.collection('orders').aggregate(
                [
                    {$match:{deviceId: ObjectId("563835ec03599ac0163b88fe"),createdAt: {$gte: d}}},
                    {
                        $group: {
                            "_id": "$status",
          "amount": {$sum: "$amount"},
          "allowance": {$sum: "$allowance"},
          "count": {$sum: 1}
        }
      }
    ]
  ).toArray(function (err, result) {
      //console.log("result===================================开始===============================");
      //console.log(result);
      //console.log("result===================================结束===============================");
    });
})
}
