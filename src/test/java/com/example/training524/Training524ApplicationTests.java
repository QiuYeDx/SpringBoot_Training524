package com.example.training524;

import com.example.training524.common.utils.UUIDUtil;
import com.example.training524.dao.ProjectEntityMapper;
import com.example.training524.dao.QuestionnaireEntityMapper;
import com.example.training524.dao.UserEntityMapper;
import com.example.training524.dao.entity.ProjectEntity;
import com.example.training524.dao.entity.QuestionnaireEntity;
import com.example.training524.dao.entity.UserEntity;
import com.example.training524.service.UserService;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Before;


import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.CollectionUtils;

import java.io.IOException;

import java.io.InputStream;
import java.util.List;
import org.apache.log4j.Logger;

//@SpringBootTest
class DemoApplicationTests {

    Logger log = Logger.getLogger(DemoApplicationTests.class);
//    @Test
    public void queryUserList() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建UserMapper对象，mybatis自动生成mapper代理对象
        UserEntityMapper userEntityMapper = sqlSession.getMapper(UserEntityMapper.class);
        //调用userMapper的方法
        UserEntity userEntity = new UserEntity();
        List<UserEntity> list = userEntityMapper.queryUserList(userEntity);
        if(CollectionUtils.isEmpty(list)){
            // 记录error级别的信息
        }else{
            System.out.println(list);
            // 记录info级别的信息
            log.info(">>queryUserList用户列表查询测试成功");
        }
    }

//    @Test
    public void selectUserInfo() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建UserMapper对象，mybatis自动生成mapper代理对象
        UserEntityMapper userEntityMapper = sqlSession.getMapper(UserEntityMapper.class);
        //调用userMapper的方法
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("admin");
        userEntity.setPassword("123");
        List<UserEntity> list = userEntityMapper.selectUserInfo(userEntity);
        if(CollectionUtils.isEmpty(list)){
            // 记录error级别的信息
        }else{
            System.out.println(list);
            // 记录info级别的信息
            log.info(">>qselectUserInfo用户登录测试成功");
        }
    }

//    @Test
    public void insert() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建UserMapper对象，mybatis自动生成mapper代理对象
        UserEntityMapper userEntityMapper = sqlSession.getMapper(UserEntityMapper.class);
        //调用userMapper的方法
        UserEntity userEntity = new UserEntity();
        userEntity.setId(UUIDUtil.getOneUUID());
        userEntity.setStatus("1");
        userEntity.setUsername("LS");
        userEntity.setPassword("123");
        int i = userEntityMapper.insert(userEntity);
        if(i==0){
            // 记录error级别的信息
        }else{
            System.out.println(i);
            // 记录info级别的信息
            log.info(">>insert用户插入测试成功");
        }
    }

//    @Test
    public void deleteUserByName() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建UserMapper对象，mybatis自动生成mapper代理对象
        UserEntityMapper userEntityMapper = sqlSession.getMapper(UserEntityMapper.class);
        //调用userMapper的方法
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("test");
        int i = userEntityMapper.deleteUserByName(userEntity);
        if(i==0){
            // 记录error级别的信息
        }else{
            System.out.println(i);
            // 记录info级别的信息
            log.info(">>delete用户删除测试成功");
        }
    }

//    @Test
    public void deleteUserById() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建UserMapper对象，mybatis自动生成mapper代理对象
        UserEntityMapper userEntityMapper = sqlSession.getMapper(UserEntityMapper.class);
        //调用userMapper的方法
        UserEntity userEntity = new UserEntity();
        userEntity.setId("b6670b6871dc40dfb7881b87e5eba38b");
        int i = userEntityMapper.deleteUserById(userEntity);
        if(i==0){
            // 记录error级别的信息
        }else{
            System.out.println(i);
            // 记录info级别的信息
            log.info(">>delete用户删除测试成功");
        }
    }

//    @Test
    public void updateByPrimaryKeySelective() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建UserMapper对象，mybatis自动生成mapper代理对象
        UserEntityMapper userEntityMapper = sqlSession.getMapper(UserEntityMapper.class);
        //调用userMapper的方法
        UserEntity userEntity = new UserEntity();
        userEntity.setId("b6670b6871dc40dfb7881b87e5eba38b");
        userEntity.setStatus("1");
        userEntity.setUsername("LS");
        userEntity.setPassword("123");
        int i = userEntityMapper.updateByPrimaryKeySelective(userEntity);
        if(i==0){
            // 记录error级别的信息
        }else{
            System.out.println(i);
            // 记录info级别的信息
            log.info(">>修改用户信息测试成功");
        }
    }

//    @Test
    public void queryProjectList() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建ProjectMapper对象，mybatis自动生成mapper代理对象
        ProjectEntityMapper projectEntityMapper = sqlSession.getMapper(ProjectEntityMapper.class);
        //调用projectMapper的方法
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setCreatedBy("QiuYeDx");
        List<ProjectEntity> list = projectEntityMapper.queryProjectList(projectEntity);
        if(CollectionUtils.isEmpty(list)){
            // 记录error级别的信息
        }else{
            System.out.println(list);
            // 记录info级别的信息
            log.info(">>queryProjectList项目列表查询测试成功");
        }
    }
//    @Test
    public void insertProject() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建ProjectMapper对象，mybatis自动生成mapper代理对象
        ProjectEntityMapper projectEntityMapper = sqlSession.getMapper(ProjectEntityMapper.class);
        //调用projectMapper的方法
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setId(UUIDUtil.getOneUUID());
        projectEntity.setProjectName("新项目名称");
        projectEntity.setProjectContent("新项目描述");
        projectEntity.setCreatedBy("QiuYeDx");
        int i = projectEntityMapper.insert(projectEntity);
        if(i==0){
            // 记录error级别的信息
        }else{
            System.out.println(i);
            // 记录info级别的信息
            log.info(">>insert项目插入测试成功");
        }
    }
//    @Test
    public void deleteProjectById() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建ProjectMapper对象，mybatis自动生成mapper代理对象
        ProjectEntityMapper projectEntityMapper = sqlSession.getMapper(ProjectEntityMapper.class);
        //调用projectMapper的方法
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setId("c66496c28ffb4a0a8f82cc3fe444c74d");
        int i = projectEntityMapper.deleteProjectById(projectEntity);
        if(i==0){
            // 记录error级别的信息
        }else{
            System.out.println(i);
            // 记录info级别的信息
            log.info(">>deleteProjectById根据ID删除项目测试成功");
        }
    }
//    @Test
    public void updateByPrimaryKeySelective_project() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建ProjectMapper对象，mybatis自动生成mapper代理对象
        ProjectEntityMapper projectEntityMapper = sqlSession.getMapper(ProjectEntityMapper.class);
        //调用projectMapper的方法
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setId("c66496c28ffb4a0a8f82cc3fe444c74d");
        projectEntity.setProjectName("Project Edited");
        projectEntity.setProjectContent("该Project描述已编辑");
        int i = projectEntityMapper.updateByPrimaryKeySelective(projectEntity);
        if(i==0){
            // 记录error级别的信息
        }else{
            System.out.println(i);
            // 记录info级别的信息
            log.info(">>修改项目信息测试成功");
        }
    }
//    @Test
    public void selectProjectInfo() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建ProjectMapper对象，mybatis自动生成mapper代理对象
        ProjectEntityMapper projectEntityMapper = sqlSession.getMapper(ProjectEntityMapper.class);
        //调用projectMapper的方法
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setCreatedBy("QiuYeDx");
        projectEntity.setProjectName("Project B");
        List<ProjectEntity> list = projectEntityMapper.selectProjectInfo(projectEntity);
        if(CollectionUtils.isEmpty(list)){
            // 记录error级别的信息
        }else{
            System.out.println(list);
            // 记录info级别的信息
            log.info(">>selectProjectInfo根据项目名称和创建人获取项目测试成功");
        }
    }
//    @Test
    public void selectProjectInfoById() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建ProjectMapper对象，mybatis自动生成mapper代理对象
        ProjectEntityMapper projectEntityMapper = sqlSession.getMapper(ProjectEntityMapper.class);
        //调用projectMapper的方法
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.setId("62306a01114e44db81a0cefb3b9145c3");
        List<ProjectEntity> list = projectEntityMapper.selectProjectInfoById(projectEntity);
        if(CollectionUtils.isEmpty(list)){
            // 记录error级别的信息
        }else{
            System.out.println(list);
            // 记录info级别的信息
            log.info(">>selectProjectInfoById根据项目ID获取项目测试成功");
        }
    }

    @Test
    public void queryQuestionnaire() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建ProjectMapper对象，mybatis自动生成mapper代理对象
        QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
        //调用questionnaireMapper的方法
        QuestionnaireEntity questionnaireEntity = new QuestionnaireEntity();
        questionnaireEntity.setId("80e5d114d1e14905b9d90b5999b896c0");
        QuestionnaireEntity entity = questionnaireEntityMapper.queryQuestionnaire(questionnaireEntity);
        if(entity == null){
            // 记录error级别的信息
        }else{
            System.out.println(entity);
            // 记录info级别的信息
            log.info(">>queryQuestionnaire问卷查询测试成功");
        }
    }

    @Test
    public void queryQuestionnaireList() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建ProjectMapper对象，mybatis自动生成mapper代理对象
        QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
        //调用questionnaireMapper的方法
        QuestionnaireEntity questionnaireEntity = new QuestionnaireEntity();
        questionnaireEntity.setProjectId("8c3942a60c0b46648ba3c2b17a0df08b");
        List<QuestionnaireEntity> list = questionnaireEntityMapper.queryQuestionnaireList(questionnaireEntity);
        if(CollectionUtils.isEmpty(list)){
            // 记录error级别的信息
        }else{
            System.out.println(list);
            // 记录info级别的信息
            log.info(">>queryQuestionnaireList问卷列表查询测试成功");
        }
    }

    @Test
    public void queryQuestionnaireListNow() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建ProjectMapper对象，mybatis自动生成mapper代理对象
        QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
        //调用questionnaireMapper的方法
        QuestionnaireEntity questionnaireEntity = new QuestionnaireEntity();
        questionnaireEntity.setProjectId("8c3942a60c0b46648ba3c2b17a0df08b");
        List<QuestionnaireEntity> list = questionnaireEntityMapper.queryQuestionnaireListNow(questionnaireEntity);
        if(CollectionUtils.isEmpty(list)){
            // 记录error级别的信息
        }else{
            System.out.println(list);
            // 记录info级别的信息
            log.info(">>queryQuestionnaireListNow问卷列表查询测试成功");
        }
    }

    @Test
    public void createQuestionnaire() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建QuestionnaireMapper对象，mybatis自动生成mapper代理对象
        QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
        //调用questionnaireMapper的方法
        QuestionnaireEntity questionnaireEntity = new QuestionnaireEntity();
        questionnaireEntity.setId(UUIDUtil.getOneUUID());
        questionnaireEntity.setQuestionnaireName("新问卷标题");
        questionnaireEntity.setQuestionnaireContent("新问卷描述");
        questionnaireEntity.setCreatedBy("Test");
        int i = questionnaireEntityMapper.createQuestionnaire(questionnaireEntity);
        if(i==0){
            // 记录error级别的信息
        }else{
            System.out.println(i);
            // 记录info级别的信息
            log.info(">>createQuestionnaire创建问卷测试成功");
        }
    }

    @Test
    public void modifyQuestionnaire() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建ProjectMapper对象，mybatis自动生成mapper代理对象
        QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
        //调用questionnaireMapper的方法
        QuestionnaireEntity questionnaireEntity = new QuestionnaireEntity();
        questionnaireEntity.setProjectId("8c3942a60c0b46648ba3c2b17a0df08b");
        int result = questionnaireEntityMapper.modifyQuestionnaire(questionnaireEntity);
        if(result != -1){
            // 记录error级别的信息
        }else{
            System.out.println(result);
            // 记录info级别的信息
            log.info(">>modifyQuestionnaire问卷编辑测试成功");
        }
    }

    @Test
    public void publicQuestionnaire() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建ProjectMapper对象，mybatis自动生成mapper代理对象
        QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
        //调用questionnaireMapper的方法
        QuestionnaireEntity questionnaireEntity = new QuestionnaireEntity();
        questionnaireEntity.setProjectId("8c3942a60c0b46648ba3c2b17a0df08b");
        int result = questionnaireEntityMapper.publicQuestionnaire(questionnaireEntity);
        if(result != -1){
            // 记录error级别的信息
        }else{
            System.out.println(result);
            // 记录info级别的信息
            log.info(">>publicQuestionnaire发布问卷测试成功");
        }
    }

    @Test
    public void closeQuestionnaire() throws Exception {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建ProjectMapper对象，mybatis自动生成mapper代理对象
        QuestionnaireEntityMapper questionnaireEntityMapper = sqlSession.getMapper(QuestionnaireEntityMapper.class);
        //调用questionnaireMapper的方法
        QuestionnaireEntity questionnaireEntity = new QuestionnaireEntity();
        questionnaireEntity.setProjectId("8c3942a60c0b46648ba3c2b17a0df08b");
        int result = questionnaireEntityMapper.closeQuestionnaire(questionnaireEntity);
        if(result != -1){
            // 记录error级别的信息
        }else{
            System.out.println(result);
            // 记录info级别的信息
            log.info(">>closeQuestionnaire关闭问卷测试成功");
        }
    }
}
