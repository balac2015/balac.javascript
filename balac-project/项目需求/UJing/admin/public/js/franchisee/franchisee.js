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
        ajax: {url: '/franchisee/datatable'},
        rowid: '_id',
        columnDefs: [
            {targets: 0, visible: true, sortable: true, width: 40, searchable: true, defaultContent: ''},
            {targets: 1, visible: true, sortable: true, width: 80, searchable: true, defaultContent: ''},
            {
                targets: -1, visible: true, sortable: false, width: 80, className: 'text-center',
                data: null,
                render:function(data,type,row){
                    return "<a title='查看' class='btn btn-default btn-xs' href='/franchisee/editFran/"+row._id+"'><i class='fa fa-search'></i></a>"
                        + "<a id='delrow' class='btn btn-default btn-xs' title='启用' onclick=setId('"+row._id+","+row.isEnabled+"')" +
                        " data-toggle='modal' data-target='#delFranchise' aria-label='Left Align'><i class='fa " +
                        "fa-check-square-o'></i></a>"+"<button class='btn btn-default btn-xs' data-toggle='modal' data-target='#resetPassword'" +
                        " aria-label='Left Align' title='重置密码' onclick=reseted('"+row._id+"') ><i class='fa fa-refresh'></i></button>";
                }
            }
        ]
    };
    var t = $('#franchiseeList').dataTable(
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
                    {data: "approvedBy", defaultContent: ''},
                    {data: "isEnabled", defaultContent: '',render:function ( data, type, full, meta ) {
                        var name='';
                        if(data){
                            name='启用'
                        }else{
                            name = '禁用'
                        }
                        return name;
                    }},
                    {data: "approvedStatus", defaultContent: '',render:function ( data, type, full, meta ) {
                        var name=getStatusName(data);
                        return name;
                    }},
                    {data: ""}
                ]
            }));
});
function getStatusName(code){
    var status = [{"code": '01', "name": '待审核'}
        ,{"code": '02', "name": '通过'}
        ,{"code": '03', "name": '不通过'}];
    for(i in status){
        if(status[i].code == code){
            return status[i].name;
        }
    }
}
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