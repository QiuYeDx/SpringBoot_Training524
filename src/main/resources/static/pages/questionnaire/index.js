function debounce(func, wait, immediate) {
  let timer;

  return function () {
    let context = this;
    let args = arguments;

    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, wait);
    }
  }
}

const DELAY_NUM = 100;

onload = () => {
  $('#headerUsername').text($util.getItem('userInfo')[0].username)
  handleHeaderLoad()
  fetchProjectList()
}

let projectList = []
let questionnaireList = []
let qSet = []

const searchProject = () => {
  if($('#projectName').val() === ''){
    fetchProjectList();
    return;
  }
  let params = {
    createdBy: $util.getItem('userInfo')[0].username,
    projectName: $('#projectName').val()
  }
  $.ajax({
    url: API_BASE_URL + '/selectProjectInfo',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      projectList = res.data
      $('#content').html('')

      res.data.map((item, _index) => {
        let tmp_param = encodeURIComponent(JSON.stringify({name: item.projectName, id: item.id}));

        $.ajax({
          url: API_BASE_URL + '/questionnaire/queryQuestionnaireListNow',
          type: "POST",
          data: JSON.stringify({projectId: item.id}),
          dataType: "json",
          contentType: "application/json",
          success(r) {
            questionnaireList = r.data.length !== 0 ? r.data : [];
            if(r){
              if(questionnaireList !== [])
                qSet.push(item.id);
              $('#content').append(`
              <div class="list">
                <div class="list-header">
                  <div>${item.projectName}</div>
                  <div>
                    <button type="button" class="btn btn-link" onclick="onCreateQuestionnaire('${tmp_param}')">创建问卷</button>
                    <button type="button" class="btn btn-link" onclick="onSeeProject('${item.id}')">查看</button>
                    <button type="button" class="btn btn-link" onclick="onEditProject('${item.id}')">编辑</button>
                    <button type="button" class="btn btn-link" onclick="onDelProject('${item.id}')">删除</button>
                  </div>
                </div>
                <div class="list-footer">
                  <div class="questionnaire-list">
                    ${questionnaireList.map((v) => {
                return `<div class="questionnaire">
                        <h3 class="questionnaire-title">${'问卷标题：' + v.questionnaireName || '问卷标题'}</h3>
                        <p class="questionnaire-description">${'问卷描述：' + v.questionnaireDescription || '问卷描述'}</p>
                        <div class="gap"></div>
                      </div>`
              }).join('')}
                  </div>
                </div>
              </div>
            `);
            }



            if(_index === res.data.length - 1){
              window.setTimeout(() => {
                // 使用 Array.filter() 过滤掉 projectList 中 projectId 在 qSet 中存在的对象
                let qSets = new Set(qSet);
                const filteredA = projectList.filter(obj => !qSets.has(obj.id));
                console.log(qSet);
                console.log(qSets);
                console.log(filteredA);
                filteredA.map((item) => {
                  let tmp_param = encodeURIComponent(JSON.stringify({name: item.projectName, id: item.id}));
                  $('#content').append(`
                    <div class="list">
                      <div class="list-header">
                        <div>${item.projectName}</div>
                        <div>
                          <button type="button" class="btn btn-link" onclick="onCreateQuestionnaire('${tmp_param}')">创建问卷</button>
                          <button type="button" class="btn btn-link" onclick="onSeeProject('${item.id}')">查看</button>
                          <button type="button" class="btn btn-link" onclick="onEditProject('${item.id}')">编辑</button>
                          <button type="button" class="btn btn-link" onclick="onDelProject('${item.id}')">删除</button>
                        </div>
                      </div>
                      <div class="list-footer">
                        <div class="questionnaire-list">
                          <div class="no-questionnaire">暂无调查问卷或问卷已过期</div>
                        </div>
                      </div>
                    </div>
                  `);
                });
              }, DELAY_NUM);
            }




          }
        });
      });
    }
  })
}

const debouncedSearchProject = debounce(searchProject, DELAY_NUM + 100, true);

const fetchProjectList = () => {
  let params = {
    createdBy: $util.getItem('userInfo')[0].username,
    projectName: $('#projectName').val()
  }
  $.ajax({
    url: API_BASE_URL + '/queryProjectList',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success(res) {
      projectList = res.data
      $('#content').html('')

      res.data.map((item, _index) => {
        let tmp_param = encodeURIComponent(JSON.stringify({name: item.projectName, id: item.id}));

        $.ajax({
          url: API_BASE_URL + '/questionnaire/queryQuestionnaireListNow',
          type: "POST",
          data: JSON.stringify({projectId: item.id}),
          dataType: "json",
          contentType: "application/json",
          success(r) {
            questionnaireList = r.data.length !== 0 ? r.data : [];
            if(r){
              if(questionnaireList !== [])
                qSet.push(item.id);
              $('#content').append(`
              <div class="list">
                <div class="list-header">
                  <div>${item.projectName}</div>
                  <div>
                    <button type="button" class="btn btn-link" onclick="onCreateQuestionnaire('${tmp_param}')">创建问卷</button>
                    <button type="button" class="btn btn-link" onclick="onSeeProject('${item.id}')">查看</button>
                    <button type="button" class="btn btn-link" onclick="onEditProject('${item.id}')">编辑</button>
                    <button type="button" class="btn btn-link" onclick="onDelProject('${item.id}')">删除</button>
                  </div>
                </div>
                <div class="list-footer">
                  <div class="questionnaire-list">
                    ${questionnaireList.map((v) => {
                return `<div class="questionnaire">
                        <h3 class="questionnaire-title">${'问卷标题：' + v.questionnaireName || '问卷标题'}</h3>
                        <p class="questionnaire-description">${'问卷描述：' + v.questionnaireDescription || '问卷描述'}</p>
                        <div class="gap"></div>
                      </div>`
              }).join('')}
                  </div>
                </div>
              </div>
            `);
            }



            if(_index === res.data.length - 1){
                window.setTimeout(() => {
                  // 使用 Array.filter() 过滤掉 projectList 中 projectId 在 qSet 中存在的对象
                  let qSets = new Set(qSet);
                  const filteredA = projectList.filter(obj => !qSets.has(obj.id));
                  console.log(qSet);
                  console.log(qSets);
                  console.log(filteredA);
                  filteredA.map((item) => {
                    let tmp_param = encodeURIComponent(JSON.stringify({name: item.projectName, id: item.id}));
                    $('#content').append(`
                    <div class="list">
                      <div class="list-header">
                        <div>${item.projectName}</div>
                        <div>
                          <button type="button" class="btn btn-link" onclick="onCreateQuestionnaire('${tmp_param}')">创建问卷</button>
                          <button type="button" class="btn btn-link" onclick="onSeeProject('${item.id}')">查看</button>
                          <button type="button" class="btn btn-link" onclick="onEditProject('${item.id}')">编辑</button>
                          <button type="button" class="btn btn-link" onclick="onDelProject('${item.id}')">删除</button>
                        </div>
                      </div>
                      <div class="list-footer">
                        <div class="questionnaire-list">
                          <div class="no-questionnaire">暂无调查问卷或问卷已过期</div>
                        </div>
                      </div>
                    </div>
                  `);
                  });
                }, DELAY_NUM);
            }




          }
        });
      });



    }
  })
}

const onCreatePrject = () => {
  location.href = "/pages/createProject/index.html"
}

const onCreateQuestionnaire = (arr) => {
  arr = decodeURIComponent(arr);
  console.log(arr);
  let item = JSON.parse(arr);
  console.log(item);
  $util.setPageParam('projectName', item.name)
  $util.setPageParam('projectId', item.id)
  location.href = "/pages/createQuestionnaire/index.html"
}

const onSeeProject = (id) => {
  $util.setPageParam('seeProject', id)
  location.href = "/pages/seeProject/index.html"
}

const onEditProject = (id) => {
  let project = projectList.filter(item => item.id === id)[0]
  $util.setPageParam('editProject', project)
  location.href = "/pages/editProject/index.html"
}

const onDelProject = (pid) => {
  let state = confirm("确认删除该项目吗？")

  if (state) {
    let params = {
      id:pid
    }
    //alert(JSON.stringify(params))
    $.ajax({
      url: API_BASE_URL + '/deleteProjectById',
      type: "POST",
      data: JSON.stringify(params),
      dataType: "json",
      contentType: "application/json",
      success(res) {
        alert(res.message)
        fetchProjectList()
      }
    })
  }
  
}
