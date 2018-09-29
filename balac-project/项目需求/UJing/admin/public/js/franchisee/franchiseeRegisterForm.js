/**
 * Created by xingjie201 on 2015/11/27.
 */
$(document).ready(function () {
    $("#regSave").on('click',function(){
        $("#franchiseeRegForm").submit();
    });
    $("#franchiseeRegForm").validate({
        rules: {
            fullname: {
                required: true
            },numberID: {
                required: true,
                numberID:true
            },tel: {
                required: true,
                phoneCN:true
            },mobile: {
                required: true,
                mobileCN:true
            },email: {
                required: true,
                emailCN:true
            }
        },
        messages: {
            fullname: {required:"申请人不能为空"},
            numberID: {required:"身份证不能为空"},
            tel: {required:"联系电话不能为空"},
            mobile: {required:"移动电话不能为空"},
            email: {required:"邮箱不能为空"}
        },success:function(e)
        {
            return true;
        }
    });
});
