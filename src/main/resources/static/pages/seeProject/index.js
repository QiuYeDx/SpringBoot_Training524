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
      $('#createTime').text($util.getDateFormat(info.creationDate))
      $('#projectDescription').text(info.projectContent)
    }
  })
}

const handlePublic = (id) => {
  let date_now = Date.now()
  let l, r;
  let _params = {
    id
  }
  $.ajax({
    url: API_BASE_URL + '/questionnaire/queryQuestionnaire',
    type: "POST",
    data: JSON.stringify(_params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      l = new Date(res.data.startDate);
      r = new Date(res.data.endDate);
      if(res.data.releaseDate != null)
        return alert('【发布失败】不能重复发布！');
      console.log(l.getTime(), r.getTime(), date_now);
      if(date_now > l.getTime() && date_now < r.getTime()){
        let params = {
          id,
          releaseDate: date_now
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
      }else{
        return alert('【发布失败】当前时间未在「开始时间 ~ 结束时间」区间内！');
      }
    }
  })
}

const handleClose = (id) => {
  let _params = {
    id
  }
  $.ajax({
    url: API_BASE_URL + '/questionnaire/queryQuestionnaire',
    type: "POST",
    data: JSON.stringify(_params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      if(res.data.releaseDate != null && res.data.isActive === 'false')
        return alert('【关闭失败】问卷已关闭！');

      if(res.data.releaseDate === null && res.data.isActive === 'false')
        return alert('【关闭失败】尚未发布 无法关闭！');

      let params = {
          id
      }

      $.ajax({
          url: API_BASE_URL + '/questionnaire/closeQuestionnaire',
          type: "POST",
          data: JSON.stringify(params),
          dataType: "json",
          contentType: "application/json",
          success(res) {
            alert('关闭问卷成功！');
            location.reload();
          }
        })
      }
  })
}

const fetchQuestionnaireList = (id) => {
  let date_now = Date.now();
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
            <td>${item.questionnaireName || '无标题'}</td>
            <td>${new Date(item.endDate).getTime() <= date_now ? '已过期' : (item.releaseDate ? (item.isActive === 'true' ? $util.getDateFormat(item.releaseDate) : '已关闭') : '未发布') }</td>
            <td>
              <button type="button" class="btn btn-link ${new Date(item.endDate).getTime() <= date_now ? 'disabled no' : (item.releaseDate ? 'disabled no' : '')}" onclick="handlePublic('${item.id}')">发布</button>
              <button type="button" class="btn btn-link ${new Date(item.endDate).getTime() <= date_now ? 'disabled no' : (item.releaseDate ? (item.isActive === 'true' ? '' : 'disabled no') : 'disabled no' )}" onclick="handleClose('${item.id}')">关闭</button>
              <button type="button" class="btn btn-link btn-red ${new Date(item.endDate).getTime() <= date_now ? 'disabled no' : (item.releaseDate ? (item.isActive === 'true' ? '' : 'disabled no') : 'disabled no' )}">链接</button>
              <button type="button" class="btn btn-link btn-red ${new Date(item.endDate).getTime() <= date_now ? '' : (item.releaseDate ? (item.isActive === 'true' ? '' : '') : 'disabled no' )}">统计</button>
            </td>
          </tr>
        `)
      })
    }
  })
}