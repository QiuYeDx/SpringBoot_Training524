let start_time, end_time;

onload = () => {
  $('#headerUsername').text($util.getItem('userInfo')[0].username)
  $('#headerDivB').text('创建调查问卷')

  $('#startTime').datetimepicker({
    language: 'zh-CN', // 显示中文
    format: 'yyyy-mm-dd', // 显示格式
    minView: "month", // 设置只显示到月份
    initialDate: new Date(), // 初始化当前日期
    autoclose: true, // 选中自动关闭
    todayBtn: true // 显示今日按钮
  }).on('changeDate', function(e) {
    // 获取选择的日期
    let selectedDate = e.date;
    start_time = selectedDate;
    // 进行其他操作，如显示选择的日期或进行后续处理
    console.log(selectedDate);
  });
  $('#endTime').datetimepicker({
    language: 'zh-CN', // 显示中文
    format: 'yyyy-mm-dd', // 显示格式
    minView: "month", // 设置只显示到月份
    initialDate: new Date(), // 初始化当前日期
    autoclose: true, // 选中自动关闭
    todayBtn: true // 显示今日按钮
  }).on('changeDate', function(e) {
    // 获取选择的日期
    let selectedDate = e.date;
    end_time = selectedDate;
    // 进行其他操作，如显示选择的日期或进行后续处理
    console.log(selectedDate);
  });
}

const createQuestionnaire = () => {
  let params = {
    projectId: $util.getItem('pageParams').projectId,
    questionnaireName: $('#surveyName').val(),
    questionnaireDescription: $('#surveyDescription').val(),
    startDate: start_time,
    endDate: end_time,
  }
  console.log($('#startTime').val());
  console.log(params.startDate, params.endDate);
  if (!params.questionnaireName) return alert('问卷名称不能为空！')
  if (!params.questionnaireDescription) return alert('问卷描述不能为空！')
  if (!params.startDate) return alert('开始时间不能为空！')
  if (!params.endDate) return alert('结束时间不能为空！')
  $.ajax({
    url: API_BASE_URL + '/questionnaire/createQuestionnaire',
    type: "POST",
    data: JSON.stringify(params),
    dataType: "json",
    contentType: "application/json",
    success() {
      alert('创建成功！')
      $util.setPageParam('seeProject', params.projectId);
      location.href = "/pages/seeProject/index.html"
    }
  })
}