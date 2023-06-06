onload = () => {
  const problem = $util.getItem('problemList');
  console.log(problem);
  problem.map((item, index) => {
    switch(item.type){
      case 1:
        $('#problem').append(`
          <div class="question" id="question1" data-type="1" data-problemIndex="1">
            <div class="top">
              <span class="question-title" id="questionTitle">${index + 1}.${item.problemName}</span>
              <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' : '选答题'}</span>
            </div>
            <div class="bottom">
              ${item.option.map((v, i) => {
                return `<div style="display: flex; align-items: center; margin-bottom: 3px;">
                          <label className="radio-inline">
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
                <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' : '选答题'}</span>
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
              <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' : '选答题'}</span>
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
              <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' : '选答题'}</span>
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
              <span class="must-answer" id="mustAnswer">${item.mustAnswer ? '必答题' : '选答题'}</span>
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
