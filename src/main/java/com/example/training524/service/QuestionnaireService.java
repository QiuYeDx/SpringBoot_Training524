package com.example.training524.service;

import com.example.training524.common.utils.UUIDUtil;
import com.example.training524.dao.QuestionnaireEntityMapper;
import com.example.training524.dao.entity.QuestionnaireEntity;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @Author 白子涵
 * @Date 2023/6/5 16:40
 * @Description 计算机实训第三次迭代
 */
@Service
public class QuestionnaireService {
    @Autowired
    private QuestionnaireEntityMapper questionnaireEntityMapper;

    /**
     * 根据项目ID查询问卷列表
     */
    public List<QuestionnaireEntity> queryQuestionnaireList(QuestionnaireEntity questionnaireEntity){
        List<QuestionnaireEntity> result = questionnaireEntityMapper.queryQuestionnaireList(questionnaireEntity);
        return result;
    }

    /**
     * 根据项目ID查询项目
     */
    public QuestionnaireEntity queryQuestionnaire(QuestionnaireEntity questionnaireEntity){
        QuestionnaireEntity result = questionnaireEntityMapper.queryQuestionnaire(questionnaireEntity);
        return result;
    }

    /**
     * 创建项目
     */
    public int createQuestionnaire(QuestionnaireEntity questionnaireEntity){
        questionnaireEntity.setId(UUIDUtil.getOneUUID());
        int questionnaireResult = questionnaireEntityMapper.createQuestionnaire(questionnaireEntity);
        if(questionnaireResult != 0){
            return 3; // 数字3代表项目存在
        }else{
            return questionnaireResult;
        }
    }

    /**
     * 根据项目ID查询问卷列表 && 未到期的
     */
    public List<QuestionnaireEntity> queryQuestionnaireListNow(QuestionnaireEntity questionnaireEntity){
        List<QuestionnaireEntity> result = questionnaireEntityMapper.queryQuestionnaireListNow(questionnaireEntity);
        return result;
    }
//    /**
//     * 修改项目信息
//     */
//    public int modifyQuestionnaireInfo(QuestionnaireEntity questionnaireEntity){
//        int questionnaireResult = questionnaireEntityMapper.updateByPrimaryKeySelective(questionnaireEntity);
//        return questionnaireResult;
//    }

//    /**
//     * 根据ID删除项目信息
//     */
//    public int deleteQuestionnaireById(QuestionnaireEntity questionnaireEntity){
//        int questionnaireResult = questionnaireEntityMapper.deleteQuestionnaireById(questionnaireEntity);
//        return questionnaireResult;
//    }

}
