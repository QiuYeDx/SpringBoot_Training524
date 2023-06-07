package com.example.training524.dao;

import com.example.training524.dao.entity.QuestionnaireEntity;
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
     * 根据项目ID查询问卷列表
     */
    QuestionnaireEntity queryQuestionnaire(QuestionnaireEntity projectEntity);

    List<QuestionnaireEntity> queryQuestionnaireList(QuestionnaireEntity projectEntity);

    List<QuestionnaireEntity> queryQuestionnaireListNow(QuestionnaireEntity projectEntity);

    /**
     * 创建新问卷
     */
    int createQuestionnaire(QuestionnaireEntity projectEntity);

    /**
     * 编辑问卷内容
     */
    int modifyQuestionnaire(QuestionnaireEntity projectEntity);

    /**
     * 回答问卷
     */
    int answerQuestionnaire(QuestionnaireEntity projectEntity);

    /**
     * 发布问卷
     */
    int publicQuestionnaire(QuestionnaireEntity projectEntity);

    /**
     * 关闭问卷
     */
    int closeQuestionnaire(QuestionnaireEntity projectEntity);

    /**
     * 分享问卷链接
     */
    int shareQuestionnaire(QuestionnaireEntity projectEntity);

    /**
     * 预览问卷
     */
    int previewQuestionnaire(QuestionnaireEntity projectEntity);

    /**
     * 查询问卷回答统计结果
     */
    String queryQuestionnaireResult(QuestionnaireEntity projectEntity);

}
