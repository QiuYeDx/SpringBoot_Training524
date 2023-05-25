package com.example.training524.service;

import com.example.training524.common.utils.UUIDUtil;
import com.example.training524.dao.UserEntityMapper;
import com.example.training524.dao.entity.UserEntity;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @Author 白子涵
 * @Date 2023/5/25 10:08
 * @Description 计算机实训第一次迭代
 */

@Service
//@MapperScan(value = "com.example.training524.dao")
public class UserService {
    @Autowired
    private UserEntityMapper userEntityMapper;

    /**
     * 查询用户列表
     */
    public List<UserEntity> queryUserList(UserEntity userEntity){
        List<UserEntity> result = userEntityMapper.queryUserList(userEntity);
        return result;
    }

    /**
     * 登录
     */
    public List<UserEntity> selectUserInfo(UserEntity userEntity){
        List<UserEntity> result = userEntityMapper.selectUserInfo(userEntity);
        return result;
    }

    /**
     * 创建用户
     */
    public int addUserInfo(UserEntity userEntity){
        userEntity.setId(UUIDUtil.getOneUUID());
        userEntity.setStatus("1");
        int userResult = userEntityMapper.insert(userEntity);
        if(userResult != 0){
            return 3; // 数字3代表用户存在
        }else{
            return userResult;
        }
    }

    /**
     * 修改用户信息
     */
    public int modifyUserInfo(UserEntity userEntity){
        int userResult = userEntityMapper.updateByPrimaryKeySelective(userEntity);
        return userResult;
    }

    /**
     * 根据ID删除用户信息
     */
    public int deleteUserById(UserEntity userEntity){
        int userResult = userEntityMapper.deleteUserById(userEntity);
        return userResult;
    }

    /**
     * 根据username删除用户信息
     */
    public int deleteUserByName(UserEntity userEntity){
        int userResult = userEntityMapper.deleteUserByName(userEntity);
        return userResult;
    }

}
