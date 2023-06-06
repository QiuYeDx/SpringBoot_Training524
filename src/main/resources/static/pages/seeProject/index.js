onload = () => {
  $('#headerUsername').text($util.getItem('userInfo')[0].username)
  $('#headerDivB').text('项目详情')

  let projectId = $util.getPageParam('seeProject')
  console.log(projectId, 'projectId')
  fetchProjectInfo(projectId)
  fetchQuestionnaireList(projectId)
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

const handlePublic = (id) => {
  let params = {
    id,
    releaseDate: Date.now()
  }
  $.ajax({
    url: API_BASE_URL + '/questionnaire/publicQuestionnaire',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      alert('发布问卷成功！');
      location.reload();
    }
  })
}

const fetchQuestionnaireList = (id) => {
  let params = {
    projectId: id
  }
  $.ajax({
    url: API_BASE_URL + '/questionnaire/queryQuestionnaireList',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      let questionnaireList = res.data
      console.log(questionnaireList, 'res')
      res.data.map((item, index) => {
        $('#content').append(`
          <tr>
            <td>${index + 1}</td>
            <td>${item.questionnaireName || '未发布'}</td>
            <td>${item.releaseDate || '未发布'}</td>
            <td>
              <button type="button" class="btn btn-link" onclick="handlePublic('${item.id}')">发布</button>
              <button type="button" class="btn btn-link">关闭</button>
              <button type="button" class="btn btn-link btn-red">链接</button>
              <button type="button" class="btn btn-link btn-red">统计</button>
            </td>
          </tr>
        `)
      })
    }
  })
}