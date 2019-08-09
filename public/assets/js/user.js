$.ajax({
    type:'get',
    url:'/users',
    success:function(res) {
        userAry = res
        render(userAry);
    }
})

function render(res) {
    let html = template('userTpl',{
        list:res
    })
    $('tbody').html(html);
}

$('#add').on('click', function() {
    $.ajax({
        type:'post',
        url:'/users',
        data:$('#dataForm').serialize(),
        success:function(result) {
            userAry.push(result)
            render(userAry);
        }
    })
})

$('#avatar').on('change',function() {
    let formData = new FormData();
    formData.append('avatar', this.files[0]);
  
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData: false,
		contentType: false,
        success:function(res) {
            console.log(res);
            
           $('#preview').attr('src',res[0].avatar);
           $('#ava').val(res[0].avatar)           
        }
    })
})
 let id;
$('tbody').on('click','.edit',function() {
    id = $(this).parent().attr('data-id');
    console.log(id);
      
    $('#dataForm > h2').text('修改用户');
    $('#email').val($(this).parents('tr').children('td').eq(2).text());
    $('#nickName').val($(this).parents('tr').children('td').eq(3).text());
    let status = $(this).parents('tr').children('td').eq(4).text()
    let role = $(this).parents('tr').children('td').eq(5).text()
    let src = $(this).parents('tr').children('td').eq(1).children('img').attr('src');
    if (src) {
        $('#preview').prop('src',src)
    } else {
        $('#preview').prop('src','../assets/img/default.png')
    }    
    if (status == '激活') {
        $('#jh').prop('checked',true)
    } else {
        $('#wjh').prop('checked',true)
    }
    if (role == '超级管理员') {
        $('#role1').prop('checked',true)
    } else {
        $('#role2').prop('checked',true)
    }
    $('#add').hide();
    $('#change').show();
})

$('#change').on('click',function() {
    $.ajax({
        type:'put',
        url:'/users/' + id,
        data:$('#dataForm').serialize(),
        success:function(result) {
            let index =  userAry.findIndex(item => item._id == id) 
            console.log(index);             
            userAry[index] = result;
            render(userAry)               
        }
    })   
})