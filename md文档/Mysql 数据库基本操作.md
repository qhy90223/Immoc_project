## Mysql 数据库基本操作

### 增加

```sql
insert into users (username,'password',realname) values ('zhangsan','123','张三');
```

### 选择

```sql
select * from users;
select id,username from users;
select * from username where username='zhangsan'
--与或非查询条件
select * from users where username='zhangsan' and `password`='123';
select * from users where username='zhangsan' or `password`='123';
select * from users where state <>'0'; 

---模糊查询与排序
select * from users where username like '%zhang%';  
select * from users where password like '%1%' order by id desc; 


```

### 更新

> mysql安全模式报错
>
> SET SQL_SAFE_UPDATES=0

``` sql 
update users set realname ='李四2' where username='lisi';
```

### 删除

```sql
delete from users where username ='lisi'；
```

<u>***！项目中使用软删除，增加state列，控制状态，不是真正删除的***</u>

```sql
select * from users where state ='1';
update users set state='0' whrer username ='lisi'
```

### 内连接 inner jon

取交集

```sql
select id,username form users inner join blogs on users username=blogs author  
```

