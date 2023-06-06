package com.example.training524.controller;

import com.example.training524.beans.HttpResponseEntity;
import com.example.training524.dao.entity.QuestionnaireEntity;
import com.example.training524.service.QuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * @Author 白子涵
 * @Date 2023/6/5 16:40
 * @Description 计算机实训第三次迭代
 */
@RestController
@RequestMapping("/questionnaire")
public class QuestionnaireController {
    @Autowired
    private QuestionnaireService questionnaireService;

    /**
     * 根据问卷ID查询问卷
     */
    @RequestMapping(value = "/queryQuestionnaire", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaire(@RequestBody QuestionnaireEntity questionnaireEntity){
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try{
            QuestionnaireEntity questionnaire = questionnaireService.queryQuestionnaire(questionnaireEntity);
            if(questionnaire == null){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setData(null);
                httpResponseEntity.setMessage("查询失败");
            }else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(questionnaire);
                httpResponseEntity.setMessage("查询成功");
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 根据项目ID查询问卷列表
     */
    @RequestMapping(value = "/queryQuestionnaireList", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireList(@RequestBody QuestionnaireEntity questionnaireEntity){
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try{
            List<QuestionnaireEntity> hasQuestionnaire = questionnaireService.queryQuestionnaireList(questionnaireEntity);
            if(CollectionUtils.isEmpty(hasQuestionnaire)){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setData(null);
                httpResponseEntity.setMessage("无问卷信息");
            }else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(hasQuestionnaire);
                httpResponseEntity.setMessage("查询成功");
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 创建问卷
     */
    @RequestMapping(value = "/createQuestionnaire", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity createQuestionnaire(@RequestBody QuestionnaireEntity questionnaireEntity){
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try{
            String result = questionnaireService.createQuestionnaire(questionnaireEntity);
            if(!Objects.equals(result, "3")){
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMessage("创建成功");
            }else{
                httpResponseEntity.setCode("0");
                httpResponseEntity.setData(0);
                httpResponseEntity.setMessage("创建失败");
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 编辑问卷内容
     */
    @RequestMapping(value = "/modifyQuestionnaire", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity modifyQuestionnaire(@RequestBody QuestionnaireEntity questionnaireEntity){
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try{
            int result = questionnaireService.modifyQuestionnaire(questionnaireEntity);
            if(result != 0){
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMessage("编辑成功");
            }else{
                httpResponseEntity.setCode("0");
                httpResponseEntity.setData(0);
                httpResponseEntity.setMessage("编辑失败");
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 根据问卷ID发布问卷
     */
    @RequestMapping(value = "/publicQuestionnaire", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity publicQuestionnaire(@RequestBody QuestionnaireEntity questionnaireEntity){
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try{
            int result = questionnaireService.publicQuestionnaire(questionnaireEntity);
            if(result != 0){
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(result);
                httpResponseEntity.setMessage("发布成功");
            }else{
                httpResponseEntity.setCode("0");
                httpResponseEntity.setData(0);
                httpResponseEntity.setMessage("发布失败");
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

    /**
     * 根据项目ID查询问卷列表 && 未到期的
     */
    @RequestMapping(value = "/queryQuestionnaireListNow", method = RequestMethod.POST, headers = "Accept=application/json")
    public HttpResponseEntity queryQuestionnaireListNow(@RequestBody QuestionnaireEntity questionnaireEntity){
        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
        try{
            List<QuestionnaireEntity> hasQuestionnaire = questionnaireService.queryQuestionnaireListNow(questionnaireEntity);
            if(CollectionUtils.isEmpty(hasQuestionnaire)){
                httpResponseEntity.setCode("0");
                httpResponseEntity.setData(null);
                httpResponseEntity.setMessage("无问卷信息");
            }else{
                httpResponseEntity.setCode("666");
                httpResponseEntity.setData(hasQuestionnaire);
                httpResponseEntity.setMessage("查询成功");
            }
        }catch(Exception e){
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
        return httpResponseEntity;
    }

//    /**
//     * 项目修改
//     */
//    @RequestMapping(value = "/modifyQuestionnaireInfo", method = RequestMethod.POST, headers = "Accept=application/json")
//    public HttpResponseEntity modifyQuestionnaireInfo(@RequestBody QuestionnaireEntity questionnaireEntity){
//        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
//        Date currentTime = new Date();
//        try{
//            questionnaireEntity.setLastUpdateDate(currentTime);
//            int result = questionnaireService.modifyQuestionnaireInfo(questionnaireEntity);
//            if(result != 0){
//                httpResponseEntity.setCode("666");
//                httpResponseEntity.setData(result);
//                httpResponseEntity.setMessage("修改成功");
//            }else{
//                httpResponseEntity.setCode("0");
//                httpResponseEntity.setData(0);
//                httpResponseEntity.setMessage("修改失败");
//            }
//        }catch(Exception e){
//            System.out.println(e.getMessage());
//            e.printStackTrace();
//        }
//        return httpResponseEntity;
//    }

//    /**
//     * 根据ID删除项目
//     */
//    @RequestMapping(value = "/deleteQuestionnaireById", method = RequestMethod.POST, headers = "Accept=application/json")
//    public HttpResponseEntity deleteQuestionnaireById(@RequestBody QuestionnaireEntity questionnaireEntity){
//        HttpResponseEntity httpResponseEntity = new HttpResponseEntity();
//        try{
//            int result = questionnaireService.deleteQuestionnaireById(questionnaireEntity);
//            if(result != 0){
//                httpResponseEntity.setCode("10");
//                httpResponseEntity.setData(result);
//                httpResponseEntity.setMessage("删除成功");
//            }else{
//                httpResponseEntity.setCode("0");
//                httpResponseEntity.setData(0);
//                httpResponseEntity.setMessage("删除失败");
//            }
//        }catch(Exception e){
//            System.out.println(e.getMessage());
//            e.printStackTrace();
//        }
//        return httpResponseEntity;
//    }

}
