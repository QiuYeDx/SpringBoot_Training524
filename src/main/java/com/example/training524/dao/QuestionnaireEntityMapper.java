package com.example.training524.dao;

import com.example.training524.dao.entity.ProjectEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @Author 白子涵
 * @Date 2023/6/5 16:40
 * @Description 计算机实训第三次迭代
 */
@Mapper
@Component
public interface QuestionnaireEntityMapper {
    /**
     * 查询项目[信息]列表
     */
    List<ProjectEntity> queryProjectList(ProjectEntity projectEntity);

    /**
     * 创建项目的基本信息
     */
    int insert(ProjectEntity projectEntity);

    /**
     * 根据ID删除项目信息
     */
    int deleteProjectById(ProjectEntity projectEntity);

    /**
     * 编辑项目信息
     */
    int updateByPrimaryKeySelective(ProjectEntity projectEntity);

    /**
     * 根据项目名称查询项目
     */
    List<ProjectEntity> selectProjectInfo(ProjectEntity projectEntity);

    /**
     * 根据项目ID查询项目
     */
    List<ProjectEntity> selectProjectInfoById(ProjectEntity projectEntity);
}
