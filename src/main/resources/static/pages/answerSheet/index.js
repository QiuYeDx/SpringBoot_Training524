let isPreview;
let problem;
let name;
let desc;
let answer;

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
                alert('编辑成功！')
                location.href = "/pages/questionnaire/index.html"
            }
        })
    }else{

    }
}

onload = () => {
    problem = $util.getItem('problemList');
    name = $util.getItem('name');
    desc = $util.getItem('desc');
    isPreview = $util.getItem('isPreview');
    console.log(isPreview);
    if(isPreview){
        $('#btn-primary-submit').text('完成编辑');
    }

  $('.questionnaire-title').text(name);
  $('.questionnaire-description').text(desc);
  problem.map((item, index) => {
    switch(item.type){
      case 1:
        $('#problem').append(`
          <div class="question" id="question1" data-type="1" data-problemIndex="1">
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
            <div class="question" id="question1" data-type="1" data-problemIndex="1">
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
          <div class="question" id="question1" data-type="1" data-problemIndex="1">
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
          <div class="question" id="question1" data-type="1" data-problemIndex="1">
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
          <div class="question" id="question1" data-type="1" data-problemIndex="1">
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
