package com.example.training524.service;

import com.example.training524.common.utils.UUIDUtil;
import com.example.training524.dao.UserEntityMapper;
import com.example.training524.dao.entity.UserEntity;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

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
    @Autowired
    private RedisTemplate redisTemplate;

//    /**
//     * 查询用户列表
//     */
//    public List<UserEntity> queryUserList(UserEntity userEntity){
//        List<UserEntity> result = userEntityMapper.queryUserList(userEntity);
//        return result;
//    }

    /**
     * 查询用户列表
     */
    public List<UserEntity> queryUserList(UserEntity userEntity){
        String key = "user_list";
        Boolean hasKey = redisTemplate.hasKey(key);

        ValueOperations operations = redisTemplate.opsForValue();

        if (hasKey) {
            String redisList = (String) operations.get(key);

            Type type = new TypeToken<List<UserEntity>>() {}.getType();
            List<UserEntity> list =  new Gson().fromJson(redisList,type);

            assert list != null;
//            System.out.println("UserService.queryUserList() : 从缓存取得数据，条数：" + list.size());
            return list;
        }
        List<UserEntity> list = userEntityMapper.queryUserList(userEntity);
        String toJson = new Gson().toJson(list);
        // 存在到缓存中
        operations.set(key, toJson, 2, TimeUnit.MINUTES);
        return list;
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
        String key = "user_list";
        Boolean hasKey = redisTemplate.hasKey(key);

        ValueOperations operations = redisTemplate.opsForValue();

        if (hasKey) {
            redisTemplate.delete(key);
//            System.out.println("UserService.deleteUserById() : 从缓存中删除UserList >> ");
        }

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
        String key = "user_list";
        Boolean hasKey = redisTemplate.hasKey(key);

        ValueOperations operations = redisTemplate.opsForValue();

        if (hasKey) {
            redisTemplate.delete(key);
//            System.out.println("UserService.modifyUserInfo() : 从缓存中删除UserList >> ");
        }

        int userResult = userEntityMapper.updateByPrimaryKeySelective(userEntity);
        return userResult;
    }

    /**
     * 根据ID删除用户信息
     */
    public int deleteUserById(UserEntity userEntity){
        String key = "user_list";
        Boolean hasKey = redisTemplate.hasKey(key);

        ValueOperations operations = redisTemplate.opsForValue();

        if (hasKey) {
            redisTemplate.delete(key);
            System.out.println("UserService.deleteUserById() : 从缓存中删除UserList >> ");
        }

        int userResult = userEntityMapper.deleteUserById(userEntity);
        return userResult;
    }

    /**
     * 根据username删除用户信息
     */
    public int deleteUserByName(UserEntity userEntity){
        String key = "user_list";
        Boolean hasKey = redisTemplate.hasKey(key);

        ValueOperations operations = redisTemplate.opsForValue();

        if (hasKey) {
            redisTemplate.delete(key);
//            System.out.println("UserService.deleteUserByName() : 从缓存中删除UserList >> ");
        }

        int userResult = userEntityMapper.deleteUserByName(userEntity);
        return userResult;
    }

}
