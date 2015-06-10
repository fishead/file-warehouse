## Host
> http://map-store.jcbel.com

## 注册
### 获取注册页面
```
Get /sign
```
> 实际URL为 http://map-store.jcbel.com/sign, 下同  


## 获取Token
```
Post /token
```
### 参数
- username
- password

### 返回值
```json
{
    "token": "token-string"
}
```

## 使用Token
- 附加到HTTP Header,字段名`wormtoken`
- 附加到Get请求的Query String，同时Get请求也可以使用上一种方式
```
Get /maps/mapname?wormtoken=token-string
```

## Map
- upload
```
Post /maps
```
> 参数为一个文件表单，字段名随意，服务器会使用上传的文件的文件名存放文件

- download
```
Get /maps/FILENAME
```
> FILENAME 替换为上传的文件名

## RouteData
- upload
```
Post /routedatas
```
> 参数形式同map上传

- download
```
Get /routedatas/FILENAME
```
> 同map下载
