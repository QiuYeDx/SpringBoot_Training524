const handleConfirmModify = () => {
  $('#modifyTitleModal').modal('hide')
  $('.questionnaire-title > span').text(questionnaireTitle)
  $('.questionnaire-description > span').text(questionnaireDescription)
  problem.questionnaireTitle = questionnaireTitle;
  problem.questionnaireDescription = questionnaireDescription;
  console.log(problem);
}

const onQuestionnaireTitleInput = (e) => {
  questionnaireTitle = e.value
}

const onQuestionnaireDescriptionInput = (e) => {
  questionnaireDescription = e.value
}
