## 六、Mysql函数

#### 1、字符函数

```mysql
-- 合并字符
SELECT CONCAT('immoc','-','mysql')
SELECT CONCAT_WS('|','immoc','mysql')
SELECT CONCAT_WS('-',goods_id,goods_name,goods_price) AS goods_info FROM tdb_goods;

-- 千分位格式化FORMAT(X,D[,locale]) 
SELECT FORMAT(12345.12345,1)

-- 从左、右获取字符
SELECT LEFT('MYSQL',2)
SELECT RIGHT('MYSQL',2)

-- 大小写格式化
SELECT LOWER('MYsql')
SELECT UPPER('MYsql')

-- 查询长度 LENGTH(str)
SELECT LENGTH('mysqlab')


-- 去掉空格TRIM(),LTRIM(),RTRIM()
SELECT TRIM('   mysql??  ')

-- 截取字符 SUBSTRING(str FROM pos FOR len)
SELECT SUBSTRING('  M Y S Q L mysql',3,5)

-- 替换字符REPLACE(str,from_str,to_str)
SELECT REPLACE('mysql','y','qhyqhy')

-- 模糊查询、通配符匹配 [NOT]LIKE,%代表任意个字符,_表示一个字符
SELECT * FROM tdb_goods WHERE goods_name LIKE '%1%%' ESCAPE '1'



```

#### 2、数值运算符与函数

```mysql
-- 进一取整 
SELECT CEIL(3.01);
-- 舍一取整
SELECT FLOOR(3.99);
-- 取余数  
SELECT MOD(32,5)
-- 幂运算 
SELECT POWER(3,4)
-- 数字截取 ,第二个参数为正，截取小数点后面，如果为负数，截取小数点左边，并补零
select TRUNCATE(125.758,-1)
```

#### 3、比较运算符与函数

```mysql
-- [不]在范围内      [NOT] BETWWEN...AND
SELECT 23 BETWEEN 21 AND 23
-- [不]在列出值范围内 [NOT] IN()
SELECT 25 IN (15,25,35)
-- [不]为空       IS [NOT] NULL 
SELECT NULL IS NULL
```

#### 4、日期时间函数

```mysql
-- 现在
SELECT NOW()
-- 现在的日期
SELECT CURDATE()
-- 现在时间
SELECT CURTIME()
-- 日期相加
SELECT DATE_ADD(NOW(),INTERVAL -1 YEAR)
SELECT DATE_ADD(NOW(),INTERVAL +1 WEEK)
SELECT DATE_ADD(NOW(),INTERVAL -1 DAY)
-- 日期差值
SELECT DATEDIFF(NOW(),DATE_ADD(NOW(), INTERVAL 1 WEEK))
-- 日期格式化
SELECT DATE_FORMAT(NOW(),'%m/%d/%Y')
```

#### 5、信息函数

```mysql
-- 查看链接线程的ID
SELECT CONNECTION_ID()
-- 查看当前连接的数据库
SELECT DATABASE()
-- 查看最后写入的id号（如果同时插入多条，结果为本次插入的第一条）
SELECT LAST_INSERT_ID()
-- 查看mysql登录用户
SELECT USER()
-- 查看mysql版本
SELECT VERSION()
```

#### 6、聚合函数(返回值为一个数)

```mysql
-- 聚合函数
-- 平均 
SELECT ROUND(AVG(goods_price),2) as avg FROM tdb_goods 
-- 计数 
SELECT COUNT(goods_id) from tdb_goods 
-- 最大最小 
SELECT MIN(goods_price) FROM tdb_goods
SELECT MAX(goods_price) FROM tdb_goods
-- 求和
SELECT ROUND(SUM(goods_price),2) from tdb_goods
```

#### 7、加密函数

```mysql
-- 用户网页加密
SELECT MD5('A') as ac
-- 用于修改用户密码(8.0.15版本报错)
SELECT PASSWORD('admin')
```



## 七、自定义函数

```mysql
CREATE FUNCTION function_name
RETURNS
{STRING|INTEGER|REAL|DECIMAL}
routine_body
```

> ***注：创建函数会报1418错误（这个是创建函数功能未开），在客户端输入***
>
> `show variables like '%func%';`
>
> `set global log_bin_trust_function_creators =1;`
>
> `commit;`
>
> ***即可重新创建***

```mysql
-- 无参数函数创建
CREATE FUNCTION f1() RETURNS VARCHAR(30) 
RETURN DATE_FORMAT(NOW(),'%Y年%m月%d日 %H时%m分%s秒')
-- 调用
SELECT f1()

-- 有参数函数创建
CREATE FUNCTION f2(num1 SMALLINT UNSIGNED,num2 SMALLINT UNSIGNED) 
RETURNS FLOAT(10,2) UNSIGNED
RETURN (num1+num2)/2;


-- 复合函数
-- 使用DELIMITER // 将结束符改为//,可以自定义,8.0.15(不用次步骤)

CREATE FUNCTION f3(username VARCHAR(20)) 
RETURNS INT UNSIGNED
BEGIN
INSERT create_fn_test (username) VALUES(username);
RETURN LAST_INSERT_ID();
END

-- 删除函数
DROP FUNCTION [IF EXISTS] function_name;
```

