let questionnaireId;
let problem = [];
let answerContentList = [];
let statistic = [];
let counts = [];

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

/**
 * 获取「指定选项对象」在「指定索引的题目』（矩阵类型）的二维索引
 * @param target 指定选项对象 e.g. {"left": "left1", "top": "选项1"}
 * @param index 指定题目的索引
 */
const getSecIndex = (target, index) => {
    let ans = {row: 0, col: 0, len_row: 0, len_col: 0};
    ans.len_row = problem[index].leftTitle.split(',').length;
    ans.len_col = problem[index].option.length;
    ans.row = problem[index].leftTitle.split(',').indexOf(target.left);
    ans.col = problem[index].option.findIndex((obj) => {
        return obj.chooseTerm === target.top;
    });
    return ans;
}

const getStatistic = () => {
    for(let i = 0; i < problem.length; i++){
        statistic[i] = new Map();   // statistic是问题回答情况的数组
        counts[i] = 0;
    }
    // console.log(statistic);
    answerContentList.forEach((item, index) => {    // item是某个整个问卷的回答，包含所有问题
        item.forEach((v, i) => {    // v是某个问题的回答 v: {"value": "选项2", "index": 0, "type": "1"}
            switch(v.type){
                case "1":
                    if(!statistic[v.index].has(v.value)){
                        statistic[v.index].set(v.value, 1);
                        counts[v.index]++;
                    }else{
                        statistic[v.index].set(v.value, statistic[v.index].get(v.value) + 1);
                        counts[v.index]++;
                    }
                    break;
                case "2":
                    v.value.forEach((value, k) => {
                        if(!statistic[v.index].has(value)){
                            statistic[v.index].set(value, 1);
                            counts[v.index]++;
                        }else{
                            statistic[v.index].set(value, statistic[v.index].get(value) + 1);
                            counts[v.index]++;
                        }
                    });
                    break;
                case "3": //  填空题 记录回答内容到数组中
                    if(v.value.length !== 0){
                        if(!statistic[v.index].has("content")){
                            statistic[v.index].set("content", [v.value]);
                            counts[v.index]++;
                        }else{
                            statistic[v.index].set("content", statistic[v.index].get("content").concat([v.value]));
                            counts[v.index]++;
                        }
                    }
                    break;
                case "4":
                    v.value.forEach((value, k) => { //  value是{"left": "left1", "top": "选项1"}这样的对象
                        let {row, col, len_row, len_col} = getSecIndex(value, v.index);
                        // 创建一个指定长度的二维数组，用来保存每个选项的计数
                        let arr = Array.from({length: len_row}, () => Array.from({ length: len_col }, () => 0));
                        console.log(arr);
                        if(!statistic[v.index].has("arr")){
                            statistic[v.index].set("arr", ++arr[row][col] && arr);
                            counts[v.index]++;  // 不用
                        }else{
                            let tmp = statistic[v.index].get("arr");
                            tmp[row][col]++;
                            statistic[v.index].set("arr", tmp);
                            counts[v.index]++;  // 不用
                        }
                    });
                    break;
                case "5":
                    if(!statistic[v.index].has(v.value)){
                        statistic[v.index].set(v.value, 1);
                        counts[v.index]++;
                    }else{
                        statistic[v.index].set(v.value, statistic[v.index].get(v.value) + 1);
                        counts[v.index]++;
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

const getPercent = (a, b) => {
    const percentage = (a / b) * 100;
    const roundedPercentage = percentage.toFixed(2);
    return isNaN(parseInt(roundedPercentage)) ? 0 : parseInt(roundedPercentage); // number类型
}

const appendFunc = () => {
    $('.title').text(name);
    $('.description').text(desc);
    problem && problem.map((item, index) => {
        switch(item.type){
            case 1:
                $('#problem').append(`
                    <div class="question">
                        <div class="question-title">
                            ${index + 1}.${item.problemName} <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' :
                                        '非必答题'}</span>
                        </div>
                        <div class="options">
                            ${item.option.map((v, i) => {
                                        return `<div class="option">
                                <div class="option-label">${v.chooseTerm}</div><div class="gap"></div>
                                <div class="option-percentage">${getPercent(statistic[index].get(v.chooseTerm), counts[index])}%</div>
                                <div class="option-count" style="width: calc(${getPercent(statistic[index].get(v.chooseTerm), counts[index]) || 0}% - 90px);">
                                </div>
                                <div class="option-answer-count">${statistic[index].get(v.chooseTerm) || 0} 个回答</div>
                            </div>`;
                                    }).join('')}
                        </div>
                    </div>
                `)
                break;
            case 2:
                $('#problem').append(`
                <div class="question">
                    <div class="question-title">
                        ${index + 1}.${item.problemName} <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' :
                        '非必答题'}</span>
                    </div>
                    <div class="options">
                        ${item.option.map((v, i) => {
                            return `
                                <div class="option">
                                    <div class="option-label">${v.chooseTerm}</div><div class="gap"></div>
                                    <div class="option-percentage">${getPercent(statistic[index].get(v.chooseTerm), counts[index])}%</div>
                                    <div class="option-count" style="width: calc(${getPercent(statistic[index].get(v.chooseTerm), counts[index]) || 0}% - 90px);"></div>
                                    <div class="option-answer-count">${statistic[index].get(v.chooseTerm) || 0} 个回答</div>
                                </div>
                            `
                        }).join('')}
                    </div>
                </div>
          `)
                break;
            case 3:
                $('#problem').append(`
                    <div class="question">
                        <div class="question-title">
                            ${index + 1}.${item.problemName} <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' :
                            '非必答题'}</span>
                        </div>
                        <div class="option-answer-count">一共 <span class="tk-answer-count">${counts[index] || 0}</span> 个回答${statistic[index].get("content") ? '，内容如下：' : ''}</div>
                        <div class="answers">
                            ${statistic[index].get("content") ? statistic[index].get("content").map((v, i) => {
                                return `<div class="option"><span class="answer-label">回答${i + 1}:</span>${v}</div>`;
                            }).join('') : ''}
                        </div>
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
            <div class="matrix">
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
                                        return `<td>${getPercent(statistic[index].get("arr")[i][_i], statistic[index].get("arr")[i].reduce((a, b) => a + b, 0))}%</td>`
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
                    <div class="question">
                        <div class="question-title">
                            ${index + 1}.${item.problemName} <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' :
                    '非必答题'}</span>
                        </div>
                        <div class="options">
                            ${item.option.map((v, i) => {
                                return `<div class="option">
                                            <div class="option-label">${v.chooseTerm}</div><div class="gap"></div>
                                            <div class="option-percentage">${getPercent(statistic[index].get(v.chooseTerm), counts[index])}%</div>
                                            <div class="option-count" style="width: calc(${getPercent(statistic[index].get(v.chooseTerm), counts[index]) || 0}% - 90px);">
                                            </div>
                                            <div class="option-answer-count">${statistic[index].get(v.chooseTerm) || 0} 个回答</div>
                                        </div>`;
                            }).join('')}
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