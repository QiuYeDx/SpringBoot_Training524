let isPreview;
let problem;
let name;
let desc;
let user;
let questionnaireId;

const handleSubmit = () => {
    if(isPreview){
        let contentJsonString = encodeURIComponent(JSON.stringify(problem));
        let params = {
            id: $util.getItem('pageParams').questionnaireId,
            questionnaireName: name,
            questionnaireDescription: desc,
            questionnaireContent: contentJsonString
        }
        $.ajax({
            url: API_BASE_URL + '/questionnaire/modifyQuestionnaire',
            type: "POST",
            data: JSON.stringify(params),
            dataType: "json",
            contentType: "application/json",
            success(res) {
                localStorage.removeItem("problemList");
                localStorage.removeItem("name");
                localStorage.removeItem("desc");
                localStorage.removeItem("isPreview");
                alert('编辑成功！')
                location.href = "/pages/questionnaire/index.html"
            }
        })
    }else{
        let {isOK, ans} = saveUserAnswers();
        if(!isOK) return;
        let params = {
            questionnaireId: questionnaireId,
            answerContent: encodeURIComponent(ans),
            answeredBy: user
        }
        $.ajax({
            url: API_BASE_URL + '/questionnaire/answerQuestionnaire',
            type: "POST",
            data: JSON.stringify(params),
            dataType: "json",
            contentType: "application/json",
            success(res) {
                alert('回答提交成功！')
                location.href = "/pages/questionnaire/index.html"
            }
        })
    }
}

onload = () => {
    isPreview = $util.getItem('isPreview');
    if(isPreview){
        // 预览问卷
        problem = $util.getItem('problemList');
        name = $util.getItem('name');
        desc = $util.getItem('desc');
        $('#btn-primary-submit').text('完成编辑');
        appendFunc();
    }else{
        // 回答问卷 获取URL中的查询参数
        const urlParams = new URLSearchParams(window.location.search);
        questionnaireId = urlParams.get('id');
        user = $util.getItem('userInfo') !== null ? $util.getItem('userInfo')[0].username : '匿名';
        let paramsA = {
            id: questionnaireId
        }
        $.ajax({
            url: API_BASE_URL + '/questionnaire/queryQuestionnaire',
            type: 'POST',
            data: JSON.stringify(paramsA),
            dataType: 'json',
            contentType: 'application/json',
            success(res){
                // console.log(res);
                if(res.code !== '0'){   // 查询到结果
                    let date_now = Date.now();
                    if(res.data.isActive === 'false' || date_now > new Date(res.data.endDate).getTime())
                        return alert("该问卷当前不可作答！");
                    problem = JSON.parse(decodeURIComponent(res.data.questionnaireContent));
                    name = res.data.questionnaireName;
                    desc = res.data.questionnaireDescription;
                    appendFunc();
                }else{
                    return alert("当前问卷ID不存在问卷！")
                }
            }
        })
    }
}

const saveUserAnswers = () => {
    let questions = document.getElementsByClassName("question");
    let userAnswers = [];

    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        let questionId = question.getAttribute("data-problemIndex");
        let answer = {};

        // 根据不同题型获取用户答案
        let questionType = question.getAttribute("data-type");
        if (questionType === "1") { // 单选题
            let radioInputs = question.getElementsByTagName("input");
            for (let j = 0; j < radioInputs.length; j++) {
                if (radioInputs[j].checked) {
                    answer.value = problem[i].option[j].chooseTerm;
                    answer.index = i;
                    answer.type = "1";
                    break;
                }
            }
        } else if (questionType === "2") { // 多选题
            let checkboxInputs = question.getElementsByTagName("input");
            let selectedOptions = [];
            for (let j = 0; j < checkboxInputs.length; j++) {
                if (checkboxInputs[j].checked) {
                    selectedOptions.push(problem[i].option[j].chooseTerm);
                }
            }
            answer.value = selectedOptions;
            answer.index = i;
            answer.type = "2";
        } else if (questionType === "3") { // 填空题
            let textarea = question.getElementsByTagName("textarea")[0];
            answer.value = textarea.value;
            answer.index = i;
            answer.type = "3";
        } else if (questionType === "4") { // 矩阵问题
            let table = question.getElementsByTagName("table")[0];
            let tableInputs = table.getElementsByTagName("input");
            let matrixAnswers = [];
            for (let j = 0; j < tableInputs.length; j++) {
                if (tableInputs[j].checked) {
                    let row = Math.floor(j / problem[i].option.length);
                    let column = (j % problem[i].option.length);
                    matrixAnswers.push({left: problem[i].leftTitle.split(',')[row], top:problem[i].option[column].chooseTerm});
                }
            }
            answer.value = matrixAnswers;
            answer.index = i;
            answer.type = "4";
        } else if (questionType === "5") { // 量表问题
            let scaleInputs = question.getElementsByTagName("input");
            for (let j = 0; j < scaleInputs.length; j++) {
                if (scaleInputs[j].checked) {
                    answer.value = problem[i].option[j].chooseTerm;
                    answer.index = i;
                    answer.type = "5";
                    break;
                }
            }
        }
        // console.log(answer.value, (answer.value === undefined || answer.value.length === 0 ), problem[i].mustAnswer)
        if((answer.value === undefined || answer.value.length === 0 ) && problem[i].mustAnswer){
            alert("您有必答题未做：" + problem[i].problemName);
            return {isOK: false, ans: JSON.stringify(userAnswers)};
        }
        userAnswers[questionId] = answer;
    }

    // 将用户答案序列化为JSON字符串并保存
    return {isOK: true, ans: JSON.stringify(userAnswers)};
}

const appendFunc = () => {
    $('.questionnaire-title').text(name);
    $('.questionnaire-description').text(desc);
    problem && problem.map((item, index) => {
        switch(item.type){
            case 1:
                $('#problem').append(`
          <div class="question" id="question1" data-type="1" data-problemIndex="${index}">
            <div class="top">
              <span class="question-title" id="questionTitle">${index + 1}.${item.problemName}</span>
              <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' : '非必答题'}</span>
            </div>
            <div class="bottom">
              ${item.option.map((v, i) => {
                    return `<div style="display: flex; align-items: center; margin-bottom: 3px;">
                          <label class="radio-inline">
                            <input type="radio" name="chooseTerm">${v.chooseTerm}
                          </label>
                        </div>`
                }).join('')}
            </div>
          </div>
        `)
                break;
            case 2:
                $('#problem').append(`
            <div class="question" id="question2" data-type="2" data-problemIndex="${index}">
              <div class="top">
                <span class="question-title" id="questionTitle">${index + 1}.${item.problemName}</span>
                <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' : '非必答题'}</span>
              </div>
              <div class="bottom">
              
                ${item.option.map((v, i) => {
                    return `<div style="display: flex; align-items: center; margin-bottom: 3px;">
                            <label class="checkbox-inline">
                              <input type="checkbox" name="chooseTerm">${v.chooseTerm}
                            </label>
                          </div>`
                }).join('')}
                
              </div>
            </div>
          `)
                break;
            case 3:
                $('#problem').append(`
          <div class="question" id="question3" data-type="3" data-problemIndex="${index}">
            <div class="top">
              <span class="question-title" id="questionTitle">${index + 1}.${item.problemName}</span>
              <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' : '非必答题'}</span>
            </div>
            <div class="bottom">
              <textarea class="form-control" placeholder="请输入" rows="4" style="width: 70%;"></textarea>
          </div>
        `)
                break;
            case 4:
                $('#problem').append(`
          <div class="question" id="question4" data-type="4" data-problemIndex="${index}">
            <div class="top">
              <span class="question-title" id="questionTitle">${index + 1}.${item.problemName}</span>
              <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' : '非必答题'}</span>
            </div>
            <div class="bottom">
              <table class="table">
                <thead>
                  <tr>
                    <th></th>
                    ${item.option.map((v, i) => {
                    return `<th>${v.chooseTerm}</th>`
                }).join('')}
                  </tr>
                </thead>
                <tbody>
                    ${item.leftTitle.split(',').map((v, i) => {
                    return `<tr>
                                <td>${v}</td>
                                ${item.option.map((_v, _i) => {
                        return `<td><input type="radio" name="${'chooseTerm' + i}" /></td>`
                    }).join('')}
                              </tr>`
                }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `)
                break;
            case 5:
                $('#problem').append(`
          <div class="question" id="question5" data-type="5" data-problemIndex="${index}">
            <div class="top">
              <span class="question-title" id="questionTitle">${index + 1}.${item.problemName}</span>
              <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' : '非必答题'}</span>
            </div>
            <div class="bottom" style="display: flex; align-items: center; justify-content: space-between;">
              <div>${item.option[0].chooseTerm}</div>
              ${item.option.map((v, i) => {
                    return `<div>
                              <label class="radio-inline">
                                <input type="radio" name="fraction" />${v.fraction}
                              </label>
                            </div>`
                }).join('')}
              <div>${item.option[item.option.length - 1].chooseTerm}</div>
            </div>
          </div>
        `)
                break;
            default:
                break;
        }
    });
}