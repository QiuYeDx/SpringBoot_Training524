package com.example.training524.service;


import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

import java.util.ArrayList;
import java.util.List;

public class ShiroRealm extends AuthorizingRealm {

    /**
     * 授权(只有当需要检测用户权限的时候才会调用此方法)
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        //获取权限对象
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();

        //获取用户的主身份信息，
        String userName = (String) principals.getPrimaryPrincipal();


        //基于角色的访问控制
        //此处查询数据库，获取当前用户的角色
        List<String> Roles = new ArrayList<>();
        //将数据库中查询出来的所有角色赋值给 simpleAuthorizationInfo 权限对象
        simpleAuthorizationInfo.addRoles(Roles);

        //基于权限的访问控制
        //此处查询数据库，获取当前用户的角色权限
        List<String> permissions = new ArrayList<>();
        //将数据库中查询出来的所有角色权限赋值给 simpleAuthorizationInfo 权限对象
        simpleAuthorizationInfo.addStringPermissions(permissions);


        return simpleAuthorizationInfo;
    }

    /**
     * 登录认证
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        //数据库操作，获取用户信息，此处不演示
        String name="zs";
        String password="123456";

        //从token中获取登录方法传递过来的用户名
        String principal = (String) authenticationToken.getPrincipal();

        //判断用户是否存在
        if(!principal.equals(name)){
            //返回空则默认抛出（UnknownAccountException）用户不存在的异常
            return null;
        }
        //认证密码
        // 参数1：数据库中用户名  参数2：数据库中密码  参数3：realmName，系统运行时会自动生成，通过父类的方法获取realmName
        return new SimpleAuthenticationInfo(name,password,this.getName());
    }

}
