onload = () => {
  $('#headerUsername').text($util.getItem('userInfo').username)
  $('#headerDivB').text('用户管理')
  fetchUserList()
}

let pageNum = 1
let userList = []

const fetchUserList = () => {
  let params = {
    pageNum,
    pageSize: 10,
    userName: $('#username').val()
  }
  $.ajax({
    url: API_BASE_URL + '/admin/queryUserList',
    type: 'POST',
    data: JSON.stringify(params),
    dataType: 'json',
    contentType: 'application/json',
    success(res) {
      $('#table #tbody').html('')
      userList = res.data
      res.data.map((item, index) => {
        let json = JSON.stringify(item);
        $('#table #tbody').append(`
          <tr>
            <td>${index + 1}</td>
            <td>${item.username}</td>
            <td>${item.password}</td>
            <td>${item.startTime}</td>
            <td>${item.stopTime}</td>
            <td>
              <button type="button" class="btn btn-link" onclick={handleReset('${json}')}>重置密码</button>
              <button type="button" class="btn btn-link" onclick="handleEdit('${item.id}')">编辑</button>
              <button type="button" class="btn btn-link btn-red" onclick={handleClose('${json}')}>关闭</button>
              <button type="button" class="btn btn-link btn-red" onclick="deleteUser('${item.id}')">删除</button>
            </td>
          </tr>
        `)
      })
    }
  })
}
const deleteUser = (id) => {
  let params = {
    id: id
  }
  $.ajax({
    url: API_BASE_URL + '/admin/deleteUserById',
    type: 'POST',
    data: JSON.stringify(params),
    dataType: 'json',
    contentType: 'application/json',
    success(res) {
      fetchUserList()
    }
  })
}

const handleReset = (json) => {
  let user = JSON.parse(json);
  user.password = '123456';
  $.ajax({
    url: API_BASE_URL + '/admin/modifyUserInfo',
    type: 'POST',
    data: JSON.stringify(user),
    dataType: 'json',
    contentType: 'application/json',
    success(res) {
      fetchUserList()
    }
  })
}

const handleClose = (json) => {
  let user = JSON.parse(json);
  user.status = '0';
  $.ajax({
    url: API_BASE_URL + '/admin/modifyUserInfo',
    type: 'POST',
    data: JSON.stringify(user),
    dataType: 'json',
    contentType: 'application/json',
    success(res) {
      fetchUserList()
    }
  })
}

const handleTableChange = (page) => {
  if (page === 1) {
    if (pageNum === 1) return
    pageNum--
  } else if (page === 2) {
    pageNum++
  } else if (page === 3) {
    pageNum = +$('#goNum').val()
  }
  $('#currentPage').text(pageNum)
  fetchUserList()
}

const handleCreateUser = () => {
  $util.setPageParam('user', undefined)
  location.href = '/pages/createUser/index.html'
}

const handleEdit = (id) => {
  let user = userList.filter(item => item.id === id)[0]
  $util.setPageParam('user', user)
  location.href = '/pages/createUser/index.html'
}
