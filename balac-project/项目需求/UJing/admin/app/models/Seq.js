/**
 * Created by ZhangXiao on 2015/12/8.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

/**
 * 订单记录
 * @type {Schema}
 */
var SeqSchema = new Schema({
    id: ObjectId
    , seq: {type: String, require: true}// 序列号
    , type: {type: String, require:true} // 类型
});

SeqSchema.methods = {
    genSeq : function(type, callback){
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        };

        var dateStr = "XTE"  + new Date().Format('yy');

        Seq.find({'seq':{$regex: dateStr}, 'type':type}, function(err, result){
            if(result && result.length > 0){
                var data = result[0];
                var count = data.seq.substr(5)-0;
                count++;
                count = ("00000000" + count).substr(-5);
                data.seq =  dateStr + count;
                data.save(function(err, obj){
                    return callback(obj.seq);
                });
            }else{
                var seq = dateStr + "00001";
                var o = new Seq();
                o.seq = seq;
                o.type = type;
                o.save(function(err, obj){
                    return callback(obj.seq);
                });
            }
        });
    }
}

var Seq = mongoose.model('Seq', SeqSchema);