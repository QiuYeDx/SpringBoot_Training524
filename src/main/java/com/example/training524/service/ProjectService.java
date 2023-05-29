package com.example.training524.service;

import com.example.training524.common.utils.UUIDUtil;
import com.example.training524.dao.ProjectEntityMapper;
import com.example.training524.dao.entity.ProjectEntity;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @Author 白子涵
 * @Date 2023/5/29 09:24
 * @Description 计算机实训第二次迭代
 */
@Service
public class ProjectService {
    @Autowired
    private ProjectEntityMapper projectEntityMapper;

    /**
     * 查询项目列表
     */
    public List<ProjectEntity> queryProjectList(ProjectEntity projectEntity){
        List<ProjectEntity> result = projectEntityMapper.queryProjectList(projectEntity);
        return result;
    }

    /**
     * 根据项目名称查询项目
     */
    public List<ProjectEntity> selectProjectInfo(ProjectEntity projectEntity){
        List<ProjectEntity> result = projectEntityMapper.selectProjectInfo(projectEntity);
        return result;
    }

    /**
     * 根据项目ID查询项目
     */
    public List<ProjectEntity> selectProjectInfoById(ProjectEntity projectEntity){
        List<ProjectEntity> result = projectEntityMapper.selectProjectInfoById(projectEntity);
        return result;
    }

    /**
     * 创建项目
     */
    public int addProjectInfo(ProjectEntity projectEntity){
        projectEntity.setId(UUIDUtil.getOneUUID());
        int projectResult = projectEntityMapper.insert(projectEntity);
        if(projectResult != 0){
            return 3; // 数字3代表项目存在
        }else{
            return projectResult;
        }
    }

    /**
     * 修改项目信息
     */
    public int modifyProjectInfo(ProjectEntity projectEntity){
        int projectResult = projectEntityMapper.updateByPrimaryKeySelective(projectEntity);
        return projectResult;
    }

    /**
     * 根据ID删除项目信息
     */
    public int deleteProjectById(ProjectEntity projectEntity){
        int projectResult = projectEntityMapper.deleteProjectById(projectEntity);
        return projectResult;
    }

}
