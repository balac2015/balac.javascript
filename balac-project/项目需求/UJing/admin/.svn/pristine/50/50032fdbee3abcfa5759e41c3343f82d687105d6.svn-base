/**
 * Created by ZhangXiao on 2015/6/11.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

/**
 * 验证码
 * @type {Schema}
 */
var CheckCodeSchema = new Schema({
    id: ObjectId
    , mobile: { type: String, trim: true, required: true, unique: true }//手机号
    , type: { type: String, trim: true, required: true }//识别号
    , code: { type: String, trim: true, required: true }//验证码
    , ip: { type: String, trim: true, lowercase: true}//IP地址
    , createAt: { type: Date, default: Date.now }//创建时间
    , expireAt: { type: Date, default: Date.now }//时效时间
    , isUse: { type: Boolean, default: false }//是否使用
    , usingAt: { type: Date}//使用时间
})

CheckCodeSchema.methods = {
    /**
     * 生成6位随机数验证码
     * @param len
     * @returns {string}
     */
    genCheckCode : function(len){
        if(!len){
            len = 6;
        }
        var code = '';
        for(var i=0;i<len;i++){
            code += parseInt(10*Math.random());
        }
        return code;
    },

    /**
     * 发送验证码到手机
     * @param mobile
     * @param ip
     * @param now
     */
    sendToMobile : function(mobile, ip, now){
        //发送验证码到手机
        //1:检查60秒内是否发送过，如果已发过，需要等待.
        var sendFlag = this.checkSendTime(mobile);
        if(!sendFlag){
            return;
        }

        var code = this.genCheckCode();
        this.sendNewCheckCodeToMobile(mobile, code);

        //存手机号和验证码到数据库
        var checkCode = new CheckCodeSchema();
        checkCode.mobile = mobile;
        checkCode.checkCode = code;
        checkCode.ip = ip;
        checkCode.createAt = now;
        checkCode.expireAt = now + 1000 * 60 * 3;//3分钟后失效
        checkCode.isUse = false;
        checkCode.save(function(err, obj){
            if(!err){

            }
            return obj;
        });
    },

    /**
     * 检查发送时间
     * @param mobile
     * @param now
     * @returns {boolean}
     */
    checkSendTime : function(mobile, now){
        var flag = false;
        //检查在有效期内是否已发过
        CheckCodeSchema.findOne({mobile:mobile, expireAt:{$gt : now}}, function(err, obj){
            if(err){
                //有错误，不重复发
            }else if(obj){
                //如果有数据，查看在60秒内发过没
                var dnow = Date.now();
                var diff = parseInt((dnow - obj.createAt.getTime())/1000, 10)
                if(diff < 60){
                    //60秒内不允许重复发
                }else{
                    obj.isUse = true;//如果在有效期内，超过60秒，可以再发，并设置该记录状态为已使用
                    obj.save();

                    flag = true;
                }
            }else{
                //没有发过，可以发
                flag = true;
            }
        });
        return flag;
    },

    /**
     * 发送新的验证码到手机
     */
    sendNewCheckCodeToMobile : function (mobile, code){

    },

    /**
     * 检查一个ip发送的次数
     * @returns {boolean}
     */
    checkIpCount : function(){
        return true;
    }

}


mongoose.model('CheckCode', CheckCodeSchema)
