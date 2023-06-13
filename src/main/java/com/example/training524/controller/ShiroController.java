package com.example.training524.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Arrays;

@CrossOrigin(origins = "*")
public class ShiroController {

    @RequestMapping(value = "/toLogin", method = RequestMethod.POST, headers = "Accept=application/json")
    public String toLogin(){
        //通过 SecurityUtils 工具类 获取当前的用户(Subject)
        Subject subject= SecurityUtils.getSubject();
        //封装用户的登录数据
        String username = "";
        String password = "";
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);

        /*
           认证用户身份,此操作将转移到 自定义 realm对象类中的认证方法中
           认证失败则会抛出如下异常
        */
        try{
            subject.login(token);
        }catch (UnknownAccountException e){
            System.out.println("用户不存在");
        }catch (IncorrectCredentialsException e){
            System.out.println("密码错误");
        }catch (LockedAccountException e){
            System.out.println("账户被锁定");
        }

        //1、使用 基于角色的访问控制 的授权方式
        // 认证通过之后对用户进行授权
        //单角色
        if(subject.hasRole("admin")){ // 此处将进入自定义 realm对象中的doGetAuthorizationInfo方法中进行验证
        }

        //多角色
        if(subject.hasAllRoles(Arrays.asList("admin","user"))){ // 此处将进入自定义 realm对象中的doGetAuthorizationInfo方法中进行验证
        }

        //是否具有其中一个角色
        boolean[] tmp_arr = subject.hasRoles(Arrays.asList("admin","user"));

        //使用 基于资源的访问控制 的授权方式
        boolean hasPermission = subject.isPermitted("user:*:*");

        return "";
    }
}
