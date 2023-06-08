// const answerArray = [
//     ["on", "off", "off"],
//     ["on", "on", "off", "off"],
//     ["Hello", "World"],
//     ["A1B1", "A2B2", "A3B3"],
//     ["off", "off", "on"]
// ];
//
// // 统计答案的函数
// function countAnswerStats(answers) {
//     const stats = {};
//
//     for (let i = 0; i < answers.length; i++) {
//         const answer = answers[i];
//
//         if (stats[answer]) {
//             stats[answer]++;
//         } else {
//             stats[answer] = 1;
//         }
//     }
//
//     const labels = Object.keys(stats);
//     const data = Object.values(stats);
//
//     return { labels, data };
// }
//
// // 获取问题容器元素
// const chartContainer = document.getElementById("chart");
//
// // 统计答案结果
// const stats = countAnswerStats(answerArray);
//
// // 创建柱状图
// const chart = new Chart(chartContainer, {
//     type: "bar",
//     data: {
//         labels: stats.labels,
//         datasets: [
//             {
//                 label: "答案统计结果",
//                 data: stats.data,
//                 backgroundColor: "rgba(75, 192, 192, 0.6)",
//                 borderColor: "rgba(75, 192, 192, 1)",
//                 borderWidth: 1
//             }
//         ]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 stepSize: 1
//             }
//         }
//     }
// });

let questionnaireId;
let problem = [];
let answerContentList = [];
let statistic = [];

onload = () => {
    // 获取URL中的查询参数
    const urlParams = new URLSearchParams(window.location.search);
    questionnaireId = urlParams.get('id');
    if(!questionnaireId) {
        alert("缺少问卷ID参数！");
        // location.href = "http://127.0.0.1:8085/pages/questionnaire/index.html";
        history.go(-1);
    }
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
            if(res.code !== '0'){   // 查询到结果
                problem = JSON.parse(decodeURIComponent(res.data.questionnaireContent));
                name = res.data.questionnaireName;
                desc = res.data.questionnaireDescription;
                queryAnswerContentList();
            }else{
                return alert("当前问卷ID不存在问卷！")
            }
        }
    })
}

const getStatistic = () => {
    statistic = [new Map(), new Map(), new Map(), new Map(), new Map()]; // statistic是问题回答情况的数组
    // console.log(statistic);
    answerContentList.forEach((item, index) => {    // item是某个整个问卷的回答，包含所有问题
        item.forEach((v, i) => {    // v是某个问题的回答 v: {"value": "选项2", "index": 0, "type": "1"}
            switch(v.type){
                case "1":
                    if(!statistic[v.index].has(v.value)){
                        statistic[v.index].set(v.value, 1);
                    }else{
                        statistic[v.index].set(v.value, statistic[v.index].get(v.value) + 1);
                    }
                    break;
                case "2":
                    v.value.forEach((value, k) => {
                        if(!statistic[v.index].has(value)){
                            statistic[v.index].set(value, 1);
                        }else{
                            statistic[v.index].set(value, statistic[v.index].get(value) + 1);
                        }
                    });
                    break;
                case "3": //  填空题 只记录 count 回答数量
                    if(!statistic[v.index].has("count")){
                        statistic[v.index].set("count", 1);
                    }else{
                        statistic[v.index].set("count", statistic[v.index].get("count") + 1);
                    }
                    break;
                case "4":
                    v.value.forEach((value, k) => { //  value是{"left": "left1", "top": "选项1"}这样的对象
                        if(!statistic[v.index].has(JSON.stringify(value))){
                            statistic[v.index].set(JSON.stringify(value), 1);
                        }else{
                            statistic[v.index].set(JSON.stringify(value), statistic[v.index].get(JSON.stringify(value)) + 1);
                        }
                    });
                    break;
                case "5":
                    if(!statistic[v.index].has(v.value)){
                        statistic[v.index].set(v.value, 1);
                    }else{
                        statistic[v.index].set(v.value, statistic[v.index].get(v.value) + 1);
                    }
                    break;
                default:
                    break;
            }
        })
    });
    // console.log(statistic);
}

const queryAnswerContentList = () => {
    let params = {
        questionnaireId: questionnaireId
    }
    $.ajax({
        url: API_BASE_URL + '/questionnaire/queryAnswerContentList',
        type: 'POST',
        data: JSON.stringify(params),
        dataType: 'json',
        contentType: 'application/json',
        success(res){
            // console.log(res)
            if(res.code !== '0'){   // 查询到结果
                res.data.forEach((item, index) => {
                    answerContentList.push(JSON.parse(decodeURIComponent(item.answerContent)));
                });
                // console.log(answerContentList);
                getStatistic();
                appendFunc();
            }else{
                return alert("该问卷暂无回答！");
            }
        }
    })
}

const appendFunc = () => {
    $('.questionnaire-title').text(name);
    $('.questionnaire-description').text(desc);
    problem && problem.map((item, index) => {
        switch(item.type){
            case 1:
                $('#problem').append(`
                      <div class="problem-name">${index + 1}.${item.problemName}</div>
                      <div class="options">
                      ${item.option.map((v, i) => {
                            return `<div class="option">
                                        <div class="option-label">${v.chooseTerm}</div>
                                        <div class="option-count" style="width: 60%;"></div>
                                        <div class="option-percentage">60%</div>
                                        <div class="option-answer-count">12 个回答</div>
                                    </div>`;
                      }).join('')}    
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

const handleSubmit = () => {
    history.go(-1);
}