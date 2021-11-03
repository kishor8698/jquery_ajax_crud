$(document).ready(function()
{
    $(".post").hover(function()
    {
        $(this).css("background-color", "aquamarine");
    },
    function()
    {
        $(this).css("background-color", "cornflowerblue");
    });


    $("#upload").click(function(e)
    {
        e.preventDefault();
        var row_data = $('#registerfrm').serializeArray();
        
        var uname=$("#unm").val();
        var email=$("#email").val();
        var pass=$("#pass").val();
        var con_password=$("#cpass").val();

        
        console.log(row_data);
        if(uname == "" )
        {
            $("#error_username").text("Please Enter Username * ").css("display", "block");
        }
        if(uname != "")
        {
            $("#error_username").css("display", "none");
        }
        if(email == "")
        {
            $("#error_email").text("Please Enter Email * ").css("display", "block");
        }
        if(email != "")
        {
            $("#error_email").css("display", "none");
        }
        if(pass == "")
        {
            $("#error_password").text("Please Enter Password * ").css("display", "block");
        }
        if(pass != "")
        {
            $("#error_password").css("display", "none");
        }
        if(con_password == "")
        {
            $("#error_con_password").text("Please Enter Conform Password * ").css("display", "block");
        }
        if(con_password != "")
        {
            $("#error_con_password").css("display", "none");
        }
        if((uname != "") && (email != "") && (pass != "") && (con_password != "")) 
        {
            var userdata=new FormData();
            $.each(row_data, function(key, input)
            {
                userdata.append(input.name,input.value);
            });
            //console.log(userdata);
                $.ajax({
                        type: "POST",
                        enctype: "multipart/form-data",
                        url:'/user_reg',
                        data:userdata,
                        processData: false,
                        contentType: false,
                        cache: false,
                        success: function(response)
                        {
                            console.log(response);
                            console.log(response.email);
                            console.log(response.password);
                            console.log(response.username);
                            var row = '<tr><td>' + response.username+ '</td><td>' + response.email + '</td><td>' + response.password + '</td></tr>';
                            $('#tablebody').append(row);
                            console.log(row);
        
                            setTimeout(function()
                            {
                               $('#responsrtn').css('display', 'none');
                             }, 5000);
                        }
                });
        }

    });

    // Deleting Record Logic

});

// function delete_data(id)
// {
//     console.log('Deleting')
//     var id=id;
//     data_id={}
//     data_id['id']=id;
//     console.log(data_id['id']);
//     $.ajax({
//         url:"/delete_post",
//         type:"POST",
//         data:data_id,
//         success:function(response)
//         {
//             $("#post-"+id).remove();
//             console.log(response.status);
//         }
//     });
// }

function edit_data(id)
{
    postid={'id':id}
    console.log(postid['id']);
    $.ajax({
        url:"/edit_data",
        type:"POST",
        data:postid,
        datatype:"json",
        success:function(response)
        {
            console.log(response.id,response.body);
            $("#modal_id").val(response.id);
            $("#modal_body").val(response.body);
        }
    });

}

function update_data()
{
    var row_data = $('#modal_form').serializeArray();
    var form_data=new FormData();
    $.each(row_data,function(key,input)
    {
        form_data.append(input.name,input.value);
    });
    console.log(row_data);
    $.ajax({
        type:"POST",
        url:"/update_data",
        data:form_data,
        datatype:"json",
        processData: false,
        contentType: false,
        cache: false,
        success:function(response)
        {      
            console.log(response,'<<<<<<<<<<<<<');
            var id=response.id;
            $("#body_value"+id).text(response.comment);
            // $(".success_message").text("recorded successfully").show("fast");
            // $(".success_message").hide(3000);
            $(".success_message").css("display","block");
            setTimeout(function(){  $(".success_message").css("display","none");  },3000);
            $.notify("Record Updated Successfully", "success");

        }
    });
}

///bootbox logic 
function delete_data(id)
{
    data_id={}
    data_id['id']=id;
    bootbox.confirm({
    message: "Are You Sure You Want To Delete Your Data ?",
    buttons: {
        confirm:{
            label: 'Yes',
            className: 'btn-success'
        },
        cancel:{
            label: 'No',
            className: 'btn-danger'
        },
    },

    callback:function(result){
        console.log(result);
    if (result) {
        $.ajax({
            url:"/delete_post",
            type:"POST",
            data:data_id,
            success:function(response)
            {
                $("#post-"+id).remove();
                console.log(response.status);
               
                var notify = new Notify();
               
            }
        });
    }
    else{
        
    }
    }
});
}



