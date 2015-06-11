# 甲虫地图仓库
- URL: http://map-warehouse.jcbel.com
- Version: v1


## 注册
### ~~获取注册页面~~
### 注册成为甲虫开发者 http://bootcamp.fishead.io


## 获取Token
```
Post /auth/token
```
> 实际URL为 http://map-warehouse.jcbel.com/v1/auth/token, 下同  

### 参数
- username, 甲虫开发者帐号（email）
- password，甲虫开发者密码

### 返回值
```json
{
    "token": "token-string"
}
```


## 使用Token
- 附加到HTTP Header,字段名`Authorization`，字段值为`Bearer token-string`
- ~~附加到Get请求的Query String，同时Get请求也可以使用上一种方式~~
```
Get /maps/FILENAME
```
> 实际URL为 http://map-warehouse.jcbel.com/v1/maps/FILENAME  


## Map
### 上传
```
Post /maps
```
#### 参数
 - map, 文件表单
> 参数为一个文件表单，表单名为`map`，服务器会使用上传的文件的文件名存放文件

### 下载
```
Get /maps/FILENAME
```
> FILENAME 替换为上传的文件名  


## RouteData
### 上传
```
Post /routedatas
```
#### 参数
 - routedata，文件表单
> 参数形式同map上传

### 下载
```
Get /routedatas/FILENAME
```
> 同map下载
