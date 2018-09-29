<template>
    <el-dialog :visible="true" width="300px">
        <div slot="title" class="title">
            <h2>登录 vue</h2>
            <p>与世界分享你的知识、经验和见解</p>
        </div>
        <form>
            <div class="input-wrapper">
                <input type="text" name="account" placeholder="机号或姓名" />
                <label class="error is-visible">请填写手机号或姓名</label>
            </div>
            <div class="input-wrapper">
                <input type="password" name="password" placeholder="密码（不少于 8 位）" />
                <i class="icon-show-password"></i>
                <label class="error is-visible">请填写密码</label>
            </div>
            <div class="actions">
                <button class="submit blue-button">登录</button>
            </div>
            <div class="sns clearfix">
                <label class="remember-me">
                    <input type="checkbox" name="remember_me" checked="" value="true">
                    记住我
                </label>
                <span class="middot">.</span>
                <button class="unable-login" type="button">无法登录？</button>
                <button type="button" class="js-show-sns-buttons" style="visibility: hidden;">社交帐号登录</button>
                <div class="sns-buttons is-visible">
                    <button type="button" class="wechat"><span class="ico sprite-global-icon-wechat-gray"></span>微信</button>
                    <button type="button" class="weibo"><span class="ico sprite-global-icon-weibo-gray"></span>微博</button>
                    <button type="button" class="qq"><span class="ico sprite-global-icon-qq-gray"></span>QQ</button>
                </div>
            </div>
        </form>
    </el-dialog>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .input-wrapper {
        position: relative;
        border-bottom: 1px solid #eee;
    }
    .input-wrapper input {
        padding: 15px 8px;
        height: 48px;
        width: 100%;
        font-size: 14px;
        line-height: 18px;
        color: #787878;
        border: 0;
        outline: 0;
        box-sizing: border-box;
    }
    .input-wrapper .icon-show-password {
        position: absolute;
        top: 0;
        right: 0;
        margin: auto;
        border: solid #fff;
        border-width: 17px 8px 17px 0;
        cursor: pointer;
        background-position: -41px -25px; /* -1px -41px; */
        width: 21px;
        height: 13px;
    }
    .input-wrapper .error {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 8px;
        line-height: 48px;
        color: #c33;
        cursor: text;
        background: #fff;
        background: -webkit-linear-gradient(left,rgba(255,255,255,0),#fff 8px);
        background: linear-gradient(to right,rgba(255,255,255,0),#fff 8px);
        visibility: hidden;
        opacity: 0;
        -ms-filter: "alpha(Opacity=0)";
        -webkit-transition: .25s ease-out;
        transition: .25s ease-out;
        -webkit-transform: translate(8px,0);
        -ms-transform: translate(8px,0);
        transform: translate(8px,0);
    }
    .input-wrapper .icon-show-password ~ .error {
        right: 30px;
    }
    .input-wrapper .is-visible {
        visibility: visible;
        opacity: 1;
        -ms-filter: "alpha(Opacity=100)";
        -webkit-transform: translate(0,0);
        -ms-transform: translate(0,0);
        transform: translate(0,0)
    }
    
    .input-wrapper .icon-show-password {
        background-image: url('../assets/icons_bg.png');
    }
    .title {
        margin-bottom: -30px;
        text-align: center;
        line-height: 1;
        -webkit-transition: .3s ease-out;
        transition: .3s ease-out;
    }
    .title h2 {
        font-size: 16px;
        line-height: 18px;
        font-weight: 700;
        margin-bottom: 10px;
    }
    .title p {
        font-size: 14px;
        font-weight: 400;
    }
</style>