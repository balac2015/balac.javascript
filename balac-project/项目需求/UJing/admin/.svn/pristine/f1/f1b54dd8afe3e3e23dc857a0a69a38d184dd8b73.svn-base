/**
 * Created by xingjie201 on 2015/11/27.
 */
$(document).ready(function () {
    var fn=function() {
        var data=["代理商","学校自营","个人管理","其他"];
        var mgSubjects = $("#mg").val();
        $.each(data, function (i, item) {
            if (mgSubjects != null && mgSubjects!='') {
                if(mgSubjects == item ){
                    $("#mgSubject").append("<option value='" + item + "' selected='true' >" + item + "</option>");
                }else if(!contains(data,mgSubjects) && item=="其他"){
                    $("#mgSubject").append("<option value='" + item + "' selected='true' >" + item + "</option>");
                }else{
                    $("#mgSubject").append("<option value='" + item + "'>" + item + "</option>");
                }
            }else{
                $("#mgSubject").append("<option value='" + item + "'>" + item + "</option>");
            }
        });
        if(!contains(data,mgSubjects) && mgSubjects!=''){
            $("#mgSubjects").val(mgSubjects);
            $("#others").show();
        }else{
            $("#others").hide();
        }
    }
    fn();

    $("#mgSubject").on('change',function(){
        var mg= $(this).val();
        if(mg == "其他"){
            $("#others").show();
        }else{
            $("#others").hide();
        }
    });
    $("#save").on('click',function(){
        var mg=$("#mgSubject").val();
        if(mg == "其他"){
            var mgs=$("#mgSubjects").val();
            if(mgs!='' && mgs!=null){
                $("#franchiseeForm").submit();
            }else{
                $("#mgSubjects").focus();
                $("#mgSpan").html("请填写管理主体下的其他");
            }
        }
    });
    $("#franchiseeForm").validate({
        rules: {
            schoolName: {
                required: true
            },ubietyAddress: {
                required: true
            },stuNum: {
                required: true,
                numbers:true
            },dormitoryNum: {
                required: true,
                numbers:true
            },washhouseNum: {
                required: true,
                numbers:true
            },washerNum: {
                required: true,
                numbers:true
            },washerLocation: {
                required: true
            },mgSubject: {
                required: true
            }
        },
        messages: {
            schoolName: {required:"学校不能为空"},
            ubietyAddress: {required:"地址不能为空"},
            stuNum: {required:"学生数量不能为空",numbers:"请输入数字"},
            dormitoryNum: {required:"宿舍楼数量不能为空",numbers:"请输入数字"},
            washhouseNum: {required:"洗衣店数量不能为空",numbers:"请输入数字"},
            washerNum: {required:"洗衣机数量不能为空",numbers:"请输入数字"},
            washerLocation: {required:"洗衣机摆放位置不能为空"},
            mgSubject: {required:"管理主体不能为空"}

        }
    });
});
function contains(data,obj) {
    for(i in data){
        if(data[i] == obj){
            return true;
        }
    }
    return false;
}