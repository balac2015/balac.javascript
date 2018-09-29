/**
 * Created by yu869 on 2016/1/19.
 * 邮件服务器配置文件
 */

var nodemailer = require("nodemailer");

// 开启一个 SMTP 连接池
var smtpTransport = nodemailer.createTransport("SMTP",{
    host: "mail.midea.com", // 主机
    secureConnection: true, // 使用 SSL
    port: 994, // SMTP 端口
    auth: {
        user: "haojie.li@midea.com", // 账号
        pass: "li_18332561349" // 密码
    }
});

/*var mailOptions = {
    from: "U净云洗衣 <haojie.li@midea.com>", // 发件地址
    to: "yu86914@qq.com", // 收件列表
    subject: "U净云洗衣绑定邮箱验证码（请不要答复此邮件)", // 标题
    html: "亲爱的U净云洗衣用户Jackli，<br><br>" +
    "您好！您的绑定验证码是：<span style='color: red'>86894062</span><br>" +
    "本邮件是系统自动发送的，请勿直接回复！感谢您的访问，祝您使用愉快！<br><br>" +
    "U净云洗衣<br>host-pro-wx.zhinengxiyifang.cn/vendor" // html 内容
};*/

var mailOptions = {
    from: "U净云洗衣 <haojie.li@midea.com>", // 发件地址
    to: "yu86914@qq.com", // 收件列表
    subject: "U净-找回密码（请不要答复此邮件)", // 标题
    html: "亲爱的U净用户Jackli，<br><br>" +
    "您使用了<a href='http://host-pro-wx.zhinengxiyifang.cn/vendor'>U净</a>的找回密码功能，请点击以下链接重置您的密码：<br>" +
    "<a href='http://host-pro-wx.zhinengxiyifang.cn/vendor'>点击这里</a><br>" +
    "注意此链接将在24小时内失效。<br><br>" +
    "U净云洗衣<br>host-pro-wx.zhinengxiyifang.cn/vendor" // html 内容
};

// 发送邮件
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
    smtpTransport.close(); // 如果没用，关闭连接池
});
