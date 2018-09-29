<template>
    <el-dialog title="" :visible="true">
        <form>
            <div class="input-wrapper">
                <input type="text" name="fullname" placeholder="姓名" />
                <label class="error is-visible">请填写姓名</label>
            </div>
            <div class="input-wrapper">
                <input type="text" name="phone_num" placeholder="手机号" />
                <label class="error">请填写手机号</label>
            </div>
            <div class="input-wrapper">
                <input type="password" name="password" placeholder="密码（不少于 8 位）" />
                <i class="icon-show-password"></i>
                <label class="error is-visible">请填写密码</label>
            </div>
        </form>
    </el-dialog>
</template>

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
</style>