package com.example.training524.dao.entity;
import java.io.Serializable;
import java.util.Date;

/**
 * @Author 白子涵
 * @Date 2023/5/29 09:24
 * @Description 计算机实训第二次迭代
 */

public class ProjectEntity implements Serializable{
    private String id;
    private String userId;
    private String projectName;
    private String projectContent;
    private String createdBy;
    private Date creationDate;
    private String lastUpdateBy;
    private Date lastUpdateDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectContent() {
        return projectContent;
    }

    public void setProjectContent(String projectContent) {
        this.projectContent = projectContent;
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

    public String getlastUpdateBy() {
        return lastUpdateBy;
    }

    public void setlastUpdateBy(String lastUpdateBy) {
        this.lastUpdateBy = lastUpdateBy;
    }

    public Date getLastUpdateDate() {
        return lastUpdateDate;
    }

    public void setLastUpdateDate(Date lastUpdateDate) {
        this.lastUpdateDate = lastUpdateDate;
    }

    @Override
    public String toString() {
        return "ProjectEntity{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", projectName='" + projectName + '\'' +
                ", projectContent='" + projectContent + '\'' +
                ", createdBy='" + createdBy + '\'' +
                ", creationDate=" + creationDate +
                ", lastUpdateBy='" + lastUpdateBy + '\'' +
                ", lastUpdateDate=" + lastUpdateDate +
                '}';
    }
}
