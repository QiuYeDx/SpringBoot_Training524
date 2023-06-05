package com.example.training524.dao.entity;

import java.util.Date;

public class AnswerEntity {
    private String id;
    private String questionnaireId;
    private String answerContent;
    private String answeredBy;
    private Date answerDate;
    private Date lastAnswerDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestionnaireId() {
        return questionnaireId;
    }

    public void setQuestionnaireId(String questionnaireId) {
        this.questionnaireId = questionnaireId;
    }

    public String getAnswerContent() {
        return answerContent;
    }

    public void setAnswerContent(String answerContent) {
        this.answerContent = answerContent;
    }

    public String getAnsweredBy() {
        return answeredBy;
    }

    public void setAnsweredBy(String answeredBy) {
        this.answeredBy = answeredBy;
    }

    public Date getAnswerDate() {
        return answerDate;
    }

    public void setAnswerDate(Date answerDate) {
        this.answerDate = answerDate;
    }

    public Date getLastAnswerDate() {
        return lastAnswerDate;
    }

    public void setLastAnswerDate(Date lastAnswerDate) {
        this.lastAnswerDate = lastAnswerDate;
    }

    @Override
    public String toString() {
        return "AnswerEntity{" +
                "id='" + id + '\'' +
                ", questionnaireId='" + questionnaireId + '\'' +
                ", answerContent='" + answerContent + '\'' +
                ", answeredBy='" + answeredBy + '\'' +
                ", answerDate=" + answerDate +
                ", lastAnswerDate=" + lastAnswerDate +
                '}';
    }
}
