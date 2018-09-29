/**
 * Created by xingjie201 on 2015/11/27.
 */
$(document).ready(function () {
    var opts = {
        "language": {
            "url": "/plugins/datatables/Chinese.json"
        },
        autoWidth: true,
        select: true,
        searching: true,
        processing: true,
        serverSide: true,
        scrollX:true,
        ajax: {url: '/franchisee/datatableWait'},
        rowid: '_id',
        columnDefs: [
            {targets: 0, visible: true, sortable: true, width: 40, searchable: true, defaultContent: ''},
            {targets: 1, visible: true, sortable: true, width: 80, searchable: true, defaultContent: ''},
            {
                targets: -1, visible: true, sortable: false, width: 80, className: 'text-center',
                data: null,
                render:function(data,type,row){
                    return "<a title='审核' class='btn btn-default btn-xs' href='/franchisee/editFran/"+row._id+"'><i class='fa fa-gavel'></i></a>"
                        + "<button class='btn btn-default btn-xs' data-toggle='modal' data-target='#resetPasswordWait'" +
                        " aria-label='Left Align' title='重置密码' onclick=reseted('"+row._id+"') ><i class='fa fa-refresh'></i></button>";
                }
            }
        ]
    };
    var t = $('#franchiseeWaitList').dataTable(
        $.extend(opts,
            {
                order: [[1, 'asc']],
                columns: [
                    {data: "fullname", defaultContent: ''},
                    {data: "mobile", defaultContent: ''},
                    {data: "numberID", defaultContent: ''},
                    {data: "email", defaultContent: ''},
                    {data: "createdAt", defaultContent: '',render: function ( data, type, full, meta ) {
                        var b = moment(new Date(data));
                        var date = "";
                        if (data != null) {
                            date = b.format("YYYY-MM-DD HH:mm:ss");
                        }
                        return date;
                    }},
                    {data: "approvedStatus", defaultContent: '',render:function ( data, type, full, meta ) {
                        return "未审核";
                    }},
                    {data: ""}
                ]
            }));
});

function setId(data){
    var d=data.split(",");
    var id=d[0];
    var isEnabled=d[1];
    if(isEnabled =='true'){
        $('#isEnabled').attr("checked",true);
    }else{
        $('#isEnabled').attr("checked",false);
    }
    $('#delId').val(id);
}
function reseted(id){
    $("#userId").val(id);
}