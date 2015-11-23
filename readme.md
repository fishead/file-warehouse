# API接口设计

## 系统基本信息
- 域名: `http://file-warehouse-api.jcbel.com/`


### 上传文件

#### 基本信息
- 路径: `/:bucketName/:fileName`
- 方法: `post`

#### 请求参数
- `single`: 文件域名称（必传）

#### 请求示例
`post http://file-warehouse-api.jcbel.com/liuxiaoyi/sanya/jingdian/icon.jpg`

/liuxiaoyi/sanya/jingdian/icon.jpg就是文件存放的路径，也为文件下载的地址，
以斜线分割的第一部分即liuxiaoyi为bucketName ，且如果bucketName已被其他用户占用就不能在使用此bucketName，
其余部分可自定义，如果多次上传到相同的路径，以最后上传的文件为准。

#### 响应数据
返回“上传成功”



### 下载文件

#### 基本信息
- 路径: `/:bucketName/:fileName`
- 方法: `get`

#### 请求参数
无

#### 请求示例
`get http://file-warehouse-api.jcbel.com/liuxiaoyi/sanya/jingdian/icon.jpg`
此为文件下载的地址，与文件上传地址一致

#### 响应数据
文件内容


### 删除文件

#### 基本信息
- 路径: `/:bucketName/:fileName`
- 方法: `delete`

#### 请求参数
无

#### 请求示例
`delete http://file-warehouse-api.jcbel.com/liuxiaoyi/sanya/jingdian/icon.jpg`

与文件上传地址和下载地址保持一致

#### 响应数据
返回“删除成功”
