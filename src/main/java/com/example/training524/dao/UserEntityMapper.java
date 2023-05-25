package com.example.training524.dao;

import com.example.training524.dao.entity.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @Author 白子涵
 * @Date 2023/5/25 10:08
 * @Description 计算机实训第一次迭代
 */
@Mapper
@Component
public interface UserEntityMapper {
    /**
     * 查询用户[信息]列表(这老师命名有问题 引起歧义)
     */
    List<UserEntity> queryUserList(UserEntity userEntity);

    /**
     * 创建用户的基本信息
     */
    int insert(UserEntity userEntity);

    /**
     * 根据ID删除用户信息
     */
    int deleteUserById(UserEntity userEntity);

    /**
     * 根据username删除用户信息
     */
    int deleteUserByName(UserEntity userEntity);

    /**
     * 编辑用户信息
     */
    int updateByPrimaryKeySelective(UserEntity userEntity);

    /**
     * 查询用户
     */
    List<UserEntity> selectUserInfo(UserEntity userEntity);
}
