package com.example.training524.controller;

import com.example.training524.service.QuestionnaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

/**
 * @Author 白子涵
 * @Date 2023/6/5 16:40
 * @Description 计算机实训第三次迭代
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/answerSheet")
public class AnswerController {
    @Autowired
    private QuestionnaireService questionnaireService;

    /**
     * 根据问卷ID访问答卷页面
     */
    @GetMapping("/{id}")
    public RedirectView getAnswerSheetPage(@PathVariable("id") String id) {
        // 构建答卷回答页面的URL
        String answerSheetUrl = "/pages/answerSheet/index.html?id=" + id;

        // 返回答卷回答页面的URL
        return new RedirectView(answerSheetUrl);
    }
}
