/**
 * Created by JiBingkun on 2015/07/09.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

/**
 * 短息设置
 * @type {Schema}
 */
var NoteTextSchema = new Schema({
    id: ObjectId
    , smsUser : { type: String, trim: true, required: true}//短信通道用户名
    , smsPassword: { type: String, trim: true, required: true}//短信通道密码
})

var noteText =  mongoose.model('NoteText', NoteTextSchema,'NoteText')





