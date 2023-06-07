package com.example.training524.service;

import com.example.training524.common.utils.UUIDUtil;
import com.example.training524.dao.AnswerEntityMapper;
import com.example.training524.dao.QuestionnaireEntityMapper;
import com.example.training524.dao.entity.AnswerEntity;
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
    @Autowired
    private AnswerEntityMapper answerEntityMapper;

    /**
     * 根据项目ID查询问卷列表
     */
    public List<QuestionnaireEntity> queryQuestionnaireList(QuestionnaireEntity questionnaireEntity){
        return questionnaireEntityMapper.queryQuestionnaireList(questionnaireEntity);
    }

    /**
     * 根据项目ID查询项目
     */
    public QuestionnaireEntity queryQuestionnaire(QuestionnaireEntity questionnaireEntity){
        return questionnaireEntityMapper.queryQuestionnaire(questionnaireEntity);
    }

    /**
     * 创建项目
     */
    public String createQuestionnaire(QuestionnaireEntity questionnaireEntity){
        questionnaireEntity.setId(UUIDUtil.getOneUUID());
        int questionnaireResult = questionnaireEntityMapper.createQuestionnaire(questionnaireEntity);
        if(questionnaireResult != 1){
            return "3"; // 数字3代表项目存在
        }else{
            return questionnaireEntity.getId();
        }
    }

    /**
     * 根据项目ID查询问卷列表 && 未到期的
     */
    public List<QuestionnaireEntity> queryQuestionnaireListNow(QuestionnaireEntity questionnaireEntity){
        return questionnaireEntityMapper.queryQuestionnaireListNow(questionnaireEntity);
    }

    /**
     * 根据问卷ID发布问卷
     */
    public int publicQuestionnaire(QuestionnaireEntity questionnaireEntity){
        return questionnaireEntityMapper.publicQuestionnaire(questionnaireEntity);
    }
    /**
     * 修改项目信息
     */
    public int modifyQuestionnaire(QuestionnaireEntity questionnaireEntity){
        return questionnaireEntityMapper.modifyQuestionnaire(questionnaireEntity);
    }

    /**
     * 根据问卷ID关闭问卷
     */
    public int closeQuestionnaire(QuestionnaireEntity questionnaireEntity){
        return questionnaireEntityMapper.closeQuestionnaire(questionnaireEntity);
    }

    public int answerQuestionnaire(AnswerEntity answerEntity){
        answerEntity.setId(UUIDUtil.getOneUUID());
        return answerEntityMapper.answerQuestionnaire(answerEntity);
    }

}
