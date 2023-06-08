package com.example.training524.dao;

import com.example.training524.dao.entity.AnswerEntity;
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
public interface AnswerEntityMapper {
    /**
     * 回答问卷
     */
    int answerQuestionnaire(AnswerEntity answerEntity);

    /**
     * 根据问卷ID查询回答内容列表
     */
    List<AnswerEntity> queryAnswerContentList(AnswerEntity answerEntity);
}
