package com.example.training524.dao.entity;

import java.util.Date;

/**
 * @Author 白子涵
 * @Date 2023/6/5 16:40
 * @Description 计算机实训第三次迭代
 */

public class QuestionnaireEntity {
    private String id;
    private String projectId;
    private String questionnaireName;
    private String questionnaireDescription;
    private String questionnaireContent;
    private String createdBy;
    private Date creationDate;
    private String lastUpdatedBy;
    private Date lastUpdateDate;
    private Date startDate;
    private Date endDate;
    private Date releaseDate;
    private String questionnaireType;
    private String isActive;

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }

    public String getQuestionnaireType() {
        return questionnaireType;
    }

    public void setQuestionnaireType(String questionnaireType) {
        this.questionnaireType = questionnaireType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getQuestionnaireName() {
        return questionnaireName;
    }

    public void setQuestionnaireName(String questionnaireName) {
        this.questionnaireName = questionnaireName;
    }

    public String getQuestionnaireDescription() {
        return questionnaireDescription;
    }

    public void setQuestionnaireDescription(String questionnaireDescription) {
        this.questionnaireDescription = questionnaireDescription;
    }

    public String getQuestionnaireContent() {
        return questionnaireContent;
    }

    public void setQuestionnaireContent(String questionnaireContent) {
        this.questionnaireContent = questionnaireContent;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getLastUpdatedBy() {
        return lastUpdatedBy;
    }

    public void setLastUpdatedBy(String lastUpdatedBy) {
        this.lastUpdatedBy = lastUpdatedBy;
    }

    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    @Override
    public String toString() {
        return "QuestionnaireEntity{" +
                "id='" + id + '\'' +
                ", projectId='" + projectId + '\'' +
                ", questionnaireName='" + questionnaireName + '\'' +
                ", questionnaireDescription='" + questionnaireDescription + '\'' +
                ", questionnaireContent='" + questionnaireContent + '\'' +
                ", createdBy='" + createdBy + '\'' +
                ", creationDate=" + creationDate +
                ", lastUpdatedBy='" + lastUpdatedBy + '\'' +
                ", lastUpdateDate=" + lastUpdateDate +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", releaseDate=" + releaseDate +
                ", questionnaireType='" + questionnaireType + '\'' +
                ", isActive='" + isActive + '\'' +
                '}';
    }
}
