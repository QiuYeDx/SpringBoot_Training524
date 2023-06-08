onload = () => {
  $('#headerUsername').text($util.getItem('userInfo')[0].username)
  $('#headerDivB').text('项目详情')

  let projectId = $util.getPageParam('seeProject')
  console.log(projectId, 'projectId')
  fetchProjectInfo(projectId)
  fetchQuestionnaireList(projectId)
  document.querySelector('#content').addEventListener('click', function(event) {
    let target = event.target;
    let popup = document.createElement('div');
      popup.className = 'popup';
      // 检查点击的元素是否为 "链接" 按钮或其子元素
      if (target.matches('.btn-link') && target.textContent === "链接") {
        // 获取问卷的唯一标识
        let questionnaireId = target.dataset.index;

        // 执行针对该问卷的操作
        // 显示悬浮框
        popup.style.display = 'block';

        // 要显示的字符串
        let textToCopy = API_BASE_URL + '/answerSheet/' + questionnaireId;

        // 在悬浮框中显示字符串
        let popupText = document.createElement('div');
        popupText.className = 'popup-text';
        popupText.textContent = textToCopy;
        popup.appendChild(popupText);

        let btn_wrapper = document.createElement('div');
        btn_wrapper.className = "btn-container";
        popup.appendChild(btn_wrapper);

        // 复制按钮
        let copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '复制';
        btn_wrapper.appendChild(copyBtn);

        // 关闭按钮
        let closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.textContent = '关闭';
        btn_wrapper.appendChild(closeBtn);

        closeBtn.addEventListener('click', function() {
          popup.parentNode.removeChild(popup);
        });

        // 复制按钮点击事件处理程序
        copyBtn.addEventListener('click', function() {
          // 复制字符串到剪贴板
          let textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          popup.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          popup.removeChild(textarea);
          alert('已复制到剪贴板');
          popup.parentNode.removeChild(popup);
        });
        // 将悬浮框添加到文档中
        document.body.appendChild(popup);
      }
  })
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

const handleStatistic = (id) => {
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
      if(res.data.releaseDate === null && res.data.isActive === 'false')
        return alert('【统计失败】尚未发布 无法统计！');
      location.href = API_BASE_URL + "/pages/statistic/index.html?id=" + id;
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
              <button type="button" class="btn btn-link btn-red ${new Date(item.endDate).getTime() <= date_now ? 'disabled no' : (item.releaseDate ? (item.isActive === 'true' ? '' : 'disabled no') : 'disabled no' )}" data-index="${item.id}">链接</button>
              <button type="button" class="btn btn-link btn-red ${new Date(item.endDate).getTime() <= date_now ? '' : (item.releaseDate ? (item.isActive === 'true' ? '' : '') : 'disabled no' )}" onclick="handleStatistic('${item.id}')">统计</button>
            </td>
          </tr>
        `)
      })
    }
  })
}