onload = () => {
  $('#headerUsername').text($util.getItem('userInfo')[0].username)
  $('#headerDivB').text('项目详情')

  let projectId = $util.getPageParam('seeProject')
  console.log(projectId, 'projectId')
  fetchProjectInfo(projectId)
}

const fetchProjectInfo = (id) => {
  let params = {
    id
  }
  $.ajax({
    url: API_BASE_URL + '/selectProjectInfoById',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      let info = res.data[0]
      console.log(info, 'res')
      $('#projectName').text(info.projectName)
      $('#personInCharge').text(info.createdBy)
      $('#createTime').text(info.creationDate)
      $('#projectDescription').text(info.projectContent)
    }
  })
}