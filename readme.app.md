# API接口设计（app端）

## 系统基本信息
- 域名: `http://sanya-api.jcbel.com/`
- 版本: `v1`

> 完整URL为域名 + 版本 + 路径，忽略版本号则默认为最新版本，比如用户注册：  
> `http://sanya-api.jcbel.com/v1/tourists.app`  
> `http://sanya-api.jcbel.com/tourists.app`

> 返回字段说明  
>  `status:请求状态（1为业务逻辑错误，-1为系统内部错误，0为正常返回）`
>  `msg:错误信息（正常情况是为空）`

## 游客用户系统

### 游客注册获取验证码

#### 基本信息
- 路径: `/tourists.app/verificationCode`
- 方法: `Post`

#### 请求参数
- `phone`: String，电话号码（必传）
- `type`: String，验证码类型（register:注册；forget：忘记密码，如果不传的话默认为注册）

#### 请求示例
`post /tourists.app/verificationCode`

#### 响应数据
data为验证码

#### 响应示例
```javascript
{
   status: 0,
   msg: '发送成功'
   data：'2345'
}
```

### 游客注册验证验证码

#### 基本信息
- 路径: `/tourists.app/verify`
- 方法: `Post`

#### 请求参数
- `phone`: String，电话号码（必传）
- `code`: String，验证码（必传）
- `type`: String，验证码类型（register:注册；forget：忘记密码，如果不传的话默认为注册）

#### 请求示例
`post /tourists.app/verify`

#### 响应数据
无

#### 响应示例
```javascript
{
   status: 0,
   msg: '验证成功'
}
```

### 游客注册

#### 基本信息
- 路径: `/tourists.app`
- 方法: `Post`

#### 请求参数
- `phone`: String，电话号码（必传）
- `nickname`: String，昵称
- `password`: String，密码（必传）
- `email`: String，电子邮件
- `age`:String， 年龄
- `gender`:String， 性别
- `hometown`:String， 家乡
- `WeChatID`:String， 微信号
- `avatar`:String， 用户头像


#### 请求示例
`post /tourists.app`

#### 响应数据
无

#### 响应示例
```javascript
{
   status: 0,
   msg: '注册成功'
}
```



### 游客登陆（获取Token）

#### 基本信息
- 路径: `/auth.app/token`
- 方法: `Post`

#### 请求参数
- `phone`: String，电话号码（必传）
- `password`: String，密码（必传）

#### 请求示例
`post /auth.app/token`

#### 响应数据
data为token的值

#### 响应示例
```javascript
{
   status: 0,
   msg: '',
   data: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1NWFlMDQwZDViOTIzNj
   k0MWE1NWYyMGYiLCJwaG9uZSI6IjE1MjEzMzQxMzg5IiwiaWF0IjoxNDM3NTI4MTQ3LCJleHAiOjE0Mz
   c3NDQxNDcsImF1ZCI6Imh0dHA6Ly90aWFueWEtaGFpamlhby5qY2JlbC5jb20iLCJpc3MiOiJ0b3VyaX
   N0IGF1dGggc3lzdGVtIiwic3ViIjoiZnZneWJoIn0.gGpotC_XswLdpTHIiM6_j3YURWmTpuCkecV2SL
   8-XH4'
}
```

### 游客微信快速登陆（获取Token）

#### 基本信息
- 路径: `/auth.app/token/wechat`
- 方法: `Post`

#### 请求参数
获取到的用户的所有微信信息

#### 请求示例
`post /auth.app/token/wechat`

#### 响应数据
data为token的值

#### 响应示例
```javascript
{
   status: 0,
   msg: '',
   data: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1NWFlMDQwZDViOTIzNj
   k0MWE1NWYyMGYiLCJwaG9uZSI6IjE1MjEzMzQxMzg5IiwiaWF0IjoxNDM3NTI4MTQ3LCJleHAiOjE0Mz
   c3NDQxNDcsImF1ZCI6Imh0dHA6Ly90aWFueWEtaGFpamlhby5qY2JlbC5jb20iLCJpc3MiOiJ0b3VyaX
   N0IGF1dGggc3lzdGVtIiwic3ViIjoiZnZneWJoIn0.gGpotC_XswLdpTHIiM6_j3YURWmTpuCkecV2SL
   8-XH4'
}
```

### 游客QQ快速登陆（获取Token）

#### 基本信息
- 路径: `/auth.app/token/qq`
- 方法: `Post`

#### 请求参数
获取到的用户的所有qq信息

#### 请求示例
`post /auth.app/token/qq`

#### 响应数据
data为token的值

#### 响应示例
```javascript
{
   status: 0,
   msg: '',
   data: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1NWFlMDQwZDViOTIzNj
   k0MWE1NWYyMGYiLCJwaG9uZSI6IjE1MjEzMzQxMzg5IiwiaWF0IjoxNDM3NTI4MTQ3LCJleHAiOjE0Mz
   c3NDQxNDcsImF1ZCI6Imh0dHA6Ly90aWFueWEtaGFpamlhby5qY2JlbC5jb20iLCJpc3MiOiJ0b3VyaX
   N0IGF1dGggc3lzdGVtIiwic3ViIjoiZnZneWJoIn0.gGpotC_XswLdpTHIiM6_j3YURWmTpuCkecV2SL
   8-XH4'
}
```

### 获取账户信息（需要Token，下方接口除非特别注明都需要Token)

#### 基本信息
- 路径: `/auth.app/profile`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`get /auth.app/profile`

#### 响应数据
- `_id`: String，用户ID
- `username`: String，用户名
- `nickname`: String，昵称
- `email`: String，电子邮件
- `phone`: String，电话
- `age`: Number，年纪
- `gender`: String，性别
- `hometown`: String，家乡
- `WeChatID`: String，微信号
- `score`: Number，积分
- `avatar`: String，头像地址
- `registerAt`: String，注册时间
- `updateAt`: String，修改时间
- `createdAt`: String，创建时间
- `groupIds`: Array，群ID

#### 响应示例
```javascript
{
     status: 0,
     msg: '',
     data:
      {
        _id: '55ae040d5b9236941a55f20f',
        username: '15213341389',
        nickname: 'momo',
        email: '825210792@qq.com',
        phone: '15213341389',
        age: 16,
        gender: 'female',
        hometown: '重庆',
        WeChatID: 'momo',
        score: 0,
        avatar: '',
        registerAt: '2015-07-21 04:34:21',
        updateAt: '2015-07-21 04:34:21',
        createdAt: '2015-07-21 04:34:21',
        groupIds: []  
      }
}
```

### 修改账户信息

#### 基本信息
- 路径: `/tourists.app/update`
- 方法: `Post`

#### 请求参数
- `phone`: String，电话号码
- `nickname`: String，昵称
- `password`: String，密码
- `email`: String，电子邮件
- `age`:String， 年龄
- `gender`:String， 性别
- `hometown`:String， 家乡
- `WeChatID`:String， 微信号
- `avatar`:String， 用户头像

#### 请求示例
`post /tourists.app/update`

#### 响应数据
- `_id`: String，用户ID
- `username`: String，用户名
- `nickname`: String，昵称
- `email`: String，电子邮件
- `phone`: String，电话
- `age`: Number，年纪
- `gender`: String，性别
- `hometown`: String，家乡
- `WeChatID`: String，微信号
- `score`: Number，积分
- `avatar`: String，头像地址
- `registerAt`: String，注册时间
- `updateAt`: String，修改时间
- `createdAt`: String，创建时间
- `groupIds`: Array，群ID

#### 响应示例
```javascript
{
 status: 0,
 msg: '修改成功',
 data:
       {
         _id: '55ae040d5b9236941a55f20f',
         username: '15213341389',
         nickname: 'momo',
         email: '825210792@qq.com',
         phone: '15213341389',
         age: 16,
         gender: 'female',
         hometown: '重庆',
         WeChatID: 'momo',
         score: 0,
         avatar: '',
         registerAt: '2015-07-21 04:34:21',
         updateAt: '2015-07-21 04:34:21',
         createdAt: '2015-07-21 04:34:21',
         groupIds: []
       }
}
```

### 修改账户密码

#### 基本信息
- 路径: `/tourists.app/updatePwd`
- 方法: `Post`

#### 请求参数
- `oldPassword`: String，原密码
- `password`: String，新密码
- `type`: String，验证码类型（update:修改密码；forget：忘记密码，如果不传的话默认为修改密码）


#### 请求示例
`post /tourists.app/updatePwd`

#### 响应数据
- `_id`: String，用户ID
- `username`: String，用户名
- `nickname`: String，昵称
- `email`: String，电子邮件
- `phone`: String，电话
- `age`: Number，年纪
- `gender`: String，性别
- `hometown`: String，家乡
- `WeChatID`: String，微信号
- `score`: Number，积分
- `avatar`: String，头像地址
- `registerAt`: String，注册时间
- `updateAt`: String，修改时间
- `createdAt`: String，创建时间
- `groupIds`: Array，群ID

#### 响应示例
```javascript
{
 status: 0,
 msg: '修改成功',
}
```

### 找回账户密码

#### 基本信息
- 路径: `/tourists.app/password-recovery`
- 方法: `Post`

#### 请求参数
- `phone`: String，手机号
- `verificationCode`: String，验证码
- `newPassword`: String，新密码

#### 请求示例
`post /tourists.app/password-recovery`

#### 响应示例
```javascript
{
 status: 0,
 msg: '修改成功',
}
```


## 群组系统

### 创建群

#### 基本信息
- 路径: `/groups.app`
- 方法: `Post`

#### 请求参数
- `name`: String，群名称（必传）
- `descripton`: String，描述
- `icon`: String，群头像

#### 请求示例
`post /groups.app`

#### 响应数据
无

#### 响应示例
```javascript
{
  status: 0,
  msg: '创建成功！',
  data:{
          code: group.code,// 群号
          name: group.name, // 群名称
          descripton: group.descripton, // 群简介
          icon: group.icon, // 群头像
          maxUser: group.maxUser, // 最大人数
          userNum: group.userNum, // 已有人数
          createUserId: group.createUserId, //创建者id
          memberIds: group.memberIds,//群成员ID
          createdAt: group.createdAt
  }
}
```

### 获取登录用户下的群信息

#### 基本信息
- 路径: `/groups.app`
- 方法: `get`

#### 请求参数
无

#### 请求示例
`get /groups.app`

#### 响应数据
- `code`: String，群号
- `name`: String，群名称
- `descripton`: String，群描述
- `icon`: String，群头像地址
- `maxUser`: number，最大成员数
- `userNum`: number，已加入人员数
- `createUserId`: String，创建者ID

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data:
   [ { code: group.code,
       name: group.name,
       descripton: group.descripton,
       icon: group.icon,
       maxUser: group.maxUser,
       userNum: group.userNum,
       createUserId: group.createUserId },
     { code: group.code,
       name: group.name,
       descripton: group.descripton,
       icon: group.icon,
       maxUser: group.maxUser,
       userNum: group.userNum,
       createUserId: group.createUserId }
   ]
}
```

### 获取群详细信息

#### 基本信息
- 路径: `/groups.app/:groupId`
- 方法: `get`

#### 请求参数
无

#### 请求示例
`get /groups.app/28688089`

#### 响应数据
- `code`: String，群号
- `name`: String，群名称
- `descripton`: String，群描述
- `icon`: String，群头像地址
- `maxUser`: number，最大成员数
- `userNum`: number，已加入人员数
- `createUserId`: number，创建人
- `createdAt`: number，创建时间

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data:
    { code: '28688089',
      name: 'name1',
      icon: '',
      maxUser: 100,
      userNum: 1,
      createUserId: '55af51322c0d0598209aa0a5',
      createdAt: '2015-07-23T03:31:27.937Z' }
}
```

### 获取群成员信息

#### 基本信息
- 路径: `/groups.app/:groupId/members`
- 方法: `get`

#### 请求参数
无

#### 请求示例
`get /groups.app/28688089/members`

#### 响应数据
- `_id`: String，用户ID
- `username`: String，用户名
- `nickname`: String，昵称
- `avatar`: String，头像地址

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data:
     [ { userId: '55af51322c0d0598209aa0a5',
         username: '13062113098',
         nickname: 'coco',
         avatar: ''},
       { _id: '55b089ae79944da38f8dc7ab',
         username: '15213341389',
         nickname: 'momo',
         avatar: ''
       } ]
}
```

<!--
### 修改群信息

#### 基本信息
- 路径: `/groups.app/:groupId`
- 方法: `Post`

#### 请求参数
- `name`: String，群名称
- `descripton`: String，描述
- `icon`: String，群头像

#### 请求示例
`post /groups.app/36428368`

#### 响应数据
无

#### 响应示例
```javascript
{
  status: 0,
  msg: '修改成功！'
}
```
-->

### 群添加成员
> 可用于创建者添加或游客主动加入

#### 基本信息
- 路径: `/groups.app/:groupId/joining`
- 方法: `Post`

#### 请求参数
- `groupId`: String，群号

#### 请求示例
`post /groups.app/36428368/joining`

#### 响应数据
无

#### 响应示例
```javascript
{
  status: 0,
  msg: '你已经成功加入该群！'
}
```

### 群移除成员
> 可用于创建者移除或游客主动离开, 创建者离开会导致群被解散

#### 基本信息
- 路径: `/groups.app/:groupId/leaving`
- 方法: `Post`

#### 请求参数
- `userId`: String，用户Id（必传）

#### 请求示例
`post /groups.app/:groupId/leaving`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '成功'
}
```

### 解散群
> 只有群创建者有权限

#### 基本信息
- 路径: `/groups.app/:groupId/disbandment`
- 方法: `Post`

#### 请求参数
- `无`

#### 请求示例
`post /groups.app/:groupId/disbandment`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '成功'
}
```
<!--
### 推送消息给所有群成员

#### 基本信息
- 路径: `/groups.app/:groupId/messages`
- 方法: `Post`

#### 请求参数
- `subject`: String，主题
- `content`: String，内容
- `type`: String，内容
- `source`: String，来源（群Id）

#### 请求示例
`post /groups.app/:groupId/messages`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '发送成功！'
}
```
-->

### 获取群信息列表

#### 基本信息
- 路径: `/groups.app/:groupId/messages`
- 方法: `get`

#### 请求参数
- `groupId`: String，群号

#### 请求示例
`get /groups.app/28688089/messages`

#### 响应数据
- `_id`: String，消息ID

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data:
     [ { _id: message._id,
         subject: message.subject, //消息标题
         content: message.content, // 消息内容
         senderId: message.senderId, //发送者ID
         sendername: user.username,//发送者的用户名
         sendernickname: user.nickname,发送者的昵称
         avatar: url.format({
                 protocol: config.misc.protocol,
                 host: config.misc.host,
                 pathname: '/tourists.app/' + user._id + '/avatar'
         }),//发送者的头像
         createdAt: message.createdAt,
         status: messageBox.status},
       { _id: message._id,
         subject: message.subject, //消息标题
         content: message.content, // 消息内容
         senderId: message.senderId, //发送者ID
         sendername: user.username,
         sendernickname: user.nickname,
         avatar: url.format({
                 protocol: config.misc.protocol,
                 host: config.misc.host,
                 pathname: '/tourists.app/' + user._id + '/avatar'
         }),
         createdAt: message.createdAt,
         status: messageBox.status
       } ]
}
```

### 获取群信息未读条数

#### 基本信息
- 路径: `/groups.app/:groupId/message-ping`
- 方法: `get`

#### 请求参数
- `groupId`: String，群号

#### 请求示例
`get /groups.app/28688089/message-ping`

#### 响应数据
data的值为条数，如果为0就说明没有未读信息

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data:3
}
```


## 消息系统

### 发送消息

#### 基本信息
- 路径: `/messages.app`
- 方法: `Post`

#### 请求参数
- `subject`: String，主题   必传
- `content`: String，内容
- `type`: String，类型   group【群消息】，whisper【私聊】 必传
- `source`: String，来源（群Id）
- `recipientId`: String，接收者ID

#### 请求示例
`post /messages.app`

#### 响应数据
无

#### 响应示例
```javascript
{
  status: 0,
  msg: '发送成功！'
}
```

### 获取消息
> > category: 消息类别
> > - all: 所有消息，默认
> > - system: 系统类消息
> > - group: 群消息
> > - whisper: 来自其他游客的私聊消息

#### 基本信息
- 路径: `/messages.app`
- 方法: `Get`

#### 请求参数
- `category`: String，消息类别

#### 请求示例
`Get /messages.app`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: ''
  data:
   [ { _id: '55b1db57323822201da6cde9',
       subject: 'dfdfdfdfdggggggg',
       content: 'ddfdfdf',
       type: 'group',
       senderId: '55b089ae79944da38f8dc7ab',
       createdAt: '2015-07-24T06:29:43.310Z',
       source: '28688089' },
     { _id: '55b1dfe6ea1c17c813b8acc3',
       subject: 'dfdfdfdfdggggggg',
       content: 'ddfdfdf',
       type: 'group',
       senderId: '55b089ae79944da38f8dc7ab',
       createdAt: '2015-07-24T06:49:10.764Z',
       source: '28688089' } ]
}
```

### 获取用户未读消息条数
> > category: 消息类别
> > - all: 所有消息，默认
> > - system: 系统类消息
> > - group: 群消息
> > - whisper: 来自其他游客的私聊消息

#### 基本信息
- 路径: `/messages.app/message-ping`
- 方法: `get`

#### 请求参数
- `category`: String，消息类别

#### 请求示例
`get /messages.app/message-ping`

#### 响应数据
data的值为条数，如果为0就说明没有未读信息

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data:3
}
```


## 反馈系统

### 创建反馈

#### 基本信息
- 路径: `/feedbacks.app`
- 方法: `Post`

#### 请求参数
- `categoryId`: String，分类ID
- `detail`: String，反馈信息
- `screenshot`: String，图片
- `contact`: String，联系方式

#### 请求示例
`post /feedbacks.app`

#### 响应数据
无

#### 响应示例
```javascript
{
  status: 0,
  msg: '反馈信息已成功提交，谢谢你的支持！'
}
```


## 反馈分类系统

### 获取反馈分类

#### 基本信息
- 路径: `/feedback_categories.app`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`Get /feedback_categories.app`

#### 响应数据
- `_id`: String，分类ID
- `name`: String，分类名称
- `createdAt`: String，创建时间

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: [
   { _id: '55b1f086be8101842079cf4e',
     name: '饮食类',
     createdAt: '2015-07-24T08:00:06.455Z' }
  ]
}
```

<!--
## 区域系统
### 查看所有区域
> Get /areas.app(暂时没有开发)


## 宝箱系统

### 查看用户下的所有宝箱

#### 基本信息
- 路径: `/chests.app`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`Get /chests.app`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: []
}
```

### 查看宝箱详情

#### 基本信息
- 路径: `/chests.app/:chestId`
- 方法: `Get`

#### 请求参数
- `chestId`:string 宝箱Id

#### 请求示例
`Get /chests.app/:chestId`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: []
}
```
 -->

## 商家评论系统

### 发表评论

#### 基本信息
- 路径: `/comments.app`
- 方法: `post`

#### 请求参数
- `content`: String，评论内容
- `score`: String，评论内容
- `shopId`: String，商家Id

#### 请求示例
`post /comments.app`

#### 响应数据
无

#### 响应示例
```javascript
{
  status: 0,
  msg: '评论成功！'
}
```

### 查看这个商铺的所有评论

#### 基本信息
- 路径: `/comments.app`
- 方法: `get`

#### 请求参数
- `shopId`:string 商家Id
- `page`:string 当前页数
- `pageSize`:string 每页的数据条数

#### 请求示例
`Get /comments.app`

#### 响应数据
- `_id`: String，评论ID
- `content`: String，评论内容
- `shopId`: String，商家Id
- `userId`: String，发表评论者Id
- `updateAt`: String，更新时间
- `createdAt`: String，创建时间

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: [
   { userId: user._id,
     nickname: user.nickname,
     score: comment.score,
     content: comment.content,
     createdAt: dateformat(comment.createdAt, 'yyyy-mm-dd hh:MM:ss')},
   { userId: user._id,
     nickname: user.nickname,
     score: comment.score,
     content: comment.content,
     createdAt: dateformat(comment.createdAt, 'yyyy-mm-dd hh:MM:ss') }
  ]
}
```

<!--
## 评论回复系统

### 对评论进行回复

#### 基本信息
- 路径: `/comments.app/commentId`
- 方法: `Post`

#### 请求参数
- `content`: String，评论内容
- `commentId`: String，评论ID
- `receiverId`: String，接收者ID

#### 请求示例
`post /comments.app/commentId`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '回复成功！'
}
```

### 查看这个评论下的所有回复

#### 基本信息
- 路径: `/commentReply.app`
- 方法: `Get`

#### 请求参数
- `commentId`:string 评论Id

#### 请求示例
`Get /commentReply.app`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: []
}
```
 -->

## 奖品系统
### 查看所有奖品

#### 基本信息
- 路径: `/prize-types.app`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`Get /prize-types.app`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
status: 0
msg: ""
data:
  {
_id: "55c4766b240ca7cb69e28fe6"
name: "hehe"
icon: "http://sanya-api.jcbel.com/prize-types.app/55c4766b240ca7cb69e28fe6/icon"
validFrom: "2015-08-07T09:12:11.257Z"
exchangeCost: 10
}
  {
_id: "55c47796f565c828b528fd26"
name: "fasdgfasdfs"
icon: "http://sanya-api.jcbel.com/prize-types.app/55c47796f565c828b528fd26/icon"
validFrom: "2015-08-07T09:17:10.643Z"
exchangeCost: 10
}
  {
_id: "55c47dc8e79628e3e111b2b1"
name: "tfvgybhunj"
icon: "http://sanya-api.jcbel.com/prize-types.app/55c47dc8e79628e3e111b2b1/icon"
validFrom: "2015-08-07T09:43:36.929Z"
exchangeCost: 234
}
}
```

### 查看单个奖品

#### 基本信息
- 路径: `/prize-types.app/:prizeTypeId`
- 方法: `Get`

#### 请求参数
- `prizeTypeId`:string 奖品类型ID

#### 请求示例
`Get /prize-types.app/55c4766b240ca7cb69e28fe6`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data:
  {
  _id: "55c4766b240ca7cb69e28fe6"
  name: "hehe"
  icon: "http://sanya-api.jcbel.com/prize-types.app/55c4766b240ca7cb69e28fe6/icon"
  validFrom: "2015-08-07T09:12:11.257Z"
  exchangeCost: 10
  }
}
```


### 兑换奖品

#### 基本信息
- 路径: `/prize-types.app/:prizeTypeId/exchange`
- 方法: `Get`

#### 请求参数
- `prizeTypeId`:string 奖品类型ID

#### 请求示例
`Get /prize-types.app/55c4766b240ca7cb69e28fe6/exchange`

#### 响应数据
JSON格式

#### 响应示例
```javascript
{
  status: 0,
  msg: '兑换成功',
}


## 寻宝奖品系统

### 查看所有奖品

#### 基本信息
- 路径: `/prizes.app`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`Get /prizes.app`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: []
}
```

### 查看单个奖品

#### 基本信息
- 路径: `/prizes.app/:prizeId`
- 方法: `Get`

#### 请求参数
- `prizeId`:string 奖券ID

#### 请求示例
`Get /prizes.app/:prizeId`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: {}
}
```

### 兑换奖品

#### 基本信息
- 路径: `/prizes.app/:prizeId/consumption`
- 方法: `Post`

#### 请求参数
- `prizeId`:string 奖券ID

#### 请求示例
`post /prizes.app/:prizeId/consumption`

#### 响应数据
data为兑奖二维码图片地址

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: '55b7480fdb5d505c206e9568.png'
}
```


## 寻宝模式

### 查看寻宝活动信息

#### 基本信息
- 路径: `/treasure_games.app`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`get /treasure_games.app`

#### 响应数据
JSON格式

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: {}
}
```

### 查看寻宝活动详细信息(暂不使用)

#### 基本信息
- 路径: `/treasure_games.app/:treasureGameId`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`get /treasure_games.app/:treasureGameId`

#### 响应数据
JSON格式

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: {}
}
```

### 查看寻宝区域信息(暂不使用)

#### 基本信息
- 路径: `/treasure-game-maps.app`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`get /treasure-game-maps.app`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: []
}
```

### 查看寻宝活动区域详细信息(暂不使用)

#### 基本信息
- 路径: `/treasure-game-maps.app/:treasureMapId`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`get /treasure_games.app/:treasureMapId`

#### 响应数据
JSON格式

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: {}
}
```

### 拾取寻宝模式海螺

#### 基本信息
- 路径: `/treasure_games.app/loot`
- 方法: `Post`

#### 请求参数
- `major`:string 信标uuid(必传)
- `minor`:string 信标uuid(必传)

#### 请求示例
`post /treasure_games.app/loot`

#### 响应数据
- `_id`:string 记录ID
- `touristId`:string 海螺所有者ID
- `treasureTypeId`:string 海螺ID
- `amount`:number 数量
- `validFrom`:string
- `validTo`:string
- `status`:string 海螺状态
#### 响应示例
```javascript
{
  status: 0,
  msg: '恭喜您获得一个海螺！',
  data: {
      _id:'',
      touristId:'' ,
      treasureTypeId:'' ,
      amount: 1,
      validFrom:'',
      validTo: '',
      status:'valid'
  }
}
```

### 查看用户海螺列表

#### 基本信息
- 路径: `/treasures.app`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`get /treasures.app`

#### 响应数据


#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: [{
        touristId, //所有者ID
        treasureType, // 海螺信息
        amount, // 数量
        validFrom,//海螺有效期开始时间
        validTo, // 海螺有效期截至时间
        status//状态
  }]
}
```


## 圆盘抽奖

### 查看用户是否能抽奖,并返回圆盘抽奖活动的详细信息

#### 基本信息
- 路径: `/roulette_games.app`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`get roulette_games.app`

#### 响应数据
JSON格式

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: {
      _id: rouletteGame._id,//活动ID
      name: rouletteGame.name, //活动名称
      description: rouletteGame.description, //活动介绍
      cost: rouletteGame.cost, // 消耗积分（海螺）数量
      times: times, // 用户还能参加几次活动
      firstClass: { // 一等奖
           prizeTypeId: rouletteGame.prizeTypeId,  // 奖品类型Id
           prizeTypeName: first,// 奖品名称
           prizeAmount: rouletteGame.prizeAmount // 奖励数量
      },
      secondClass: { // 二等奖
           prizeTypeId: rouletteGame.prizeTypeId,  // 奖品类型Id
           prizeTypeName: second,// 奖品名称
           prizeAmount: rouletteGame.prizeTypeId // 奖励数量
      },
      thirdClass: { //三等奖
           prizeTypeId: rouletteGame.prizeTypeId,  // 奖品类型Id
           prizeTypeName: third,// 奖品名称
           prizeAmount: rouletteGame.prizeAmount // 奖励数量
      }
  }
}
```

### 用户抽奖

#### 基本信息
- 路径: `/roulette_games.app/raffle`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`get /roulette_games.app/raffle`

#### 响应数据
JSON格式

#### 响应示例
```javascript
{
  status: 0,
  msg: '恭喜您，获得了三等奖！',
  data: {
      _id: prize._id,
      type: type,//获得了几等奖（first：一等奖，second：二等奖，third：等奖）
      touristId: prize, // 持有奖品的游客Id
      prizeTypeId: prize.prizeTypeId, // 包含的奖品类型Id
      name: prizetype.name // 奖品名称
  }
}
```


<!--
## 关卡系统

### 查看所有关卡

#### 基本信息
- 路径: `/level.app`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`Get /level.app`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: []
}
```

### 查看关卡详情

#### 基本信息
- 路径: `/level.app/:levelId`
- 方法: `Get`

#### 请求参数
- `levelId`:string 关卡ID

#### 请求示例
`Get /level.app/:levelId`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: {}
}


## 任务模式
### 查看寻宝活动信息

#### 基本信息
- 路径: `/questing_games.app`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`get /questing_games.app`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: []
}
```

### 查看任务模式关卡

#### 基本信息
- 路径: `/questing_games.app/checkpoints`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`get /questing_games.app/checkpoints`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: []
}
```

### 查看下一关
> Get /questing_games.app/checkpoints?q=next

### 完成任务模式关卡

#### 基本信息
- 路径: `/questing_games.app/checkpoints/:checkpointId/arrival`
- 方法: `Post`

#### 请求参数
- `checkpointId`:关卡Id

#### 请求示例
`get /questing_games.app/checkpoints/:checkpointId/arrival`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: []
}
```
-->


## 商铺系统

### 查看所有商铺

#### 基本信息
- 路径: `/shops.app`
- 方法: `get`

#### 请求参数
- `无`

#### 请求示例
`Get /shops.app`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: []
}
```

### 查看商铺详情

#### 基本信息
- 路径: `/shops.app/:shopId`
- 方法: `Get`

#### 请求参数
- `shopId`:string 商铺ID

#### 请求示例
`Get /shops.app/:shopId`

#### 响应数据
JSON格式数组

#### 响应示例
```javascript
{
  status: 0,
  msg: '',
  data: {}
}
```


## 景区信息模块
### 获取公共设施
> Get /infrastructures.app

#### 查询参数
- category: 类别参数，可以是以下值
    {
        name: '手机充电站',
        code: 'charging-station'
    },
    {
        name: '餐饮服务',
        code: 'food'
    },
    {
        name: '观光车站',
        code: 'rubberneck-bus-station'
    },
    {
        name: '天明码头',
        code: 'dawn-dock'
    },
    {
        name: '服务点',
        code: 'service-point'
    },
    {
        name: '卫生间',
        code: 'toilet'
    },
    {
        name: '公交站',
        code: 'bus-station'
    },
    {
        name: '景区大门',
        code: 'big-gate'
    },
    {
        name: 'ATM',
        code: 'atm'
    },
    {
        name: '婚拍接待点',
        code: 'wedding-photography'
    },
    {
        name: '医疗点',
        code: 'medical-point'
    },
]
- q: 关键字参数

#### 返回结果
```javascript
[
    {
        id: 1,
        name: '公厕',
        category: 'toilet',
        location:[123.2323  123.2323],
        createdAt:
    }
]
```


### 上报用户当前位置

#### 基本信息
- 路径: `/tourist-track.app`
- 方法: `Post`

#### 请求参数
- `longitude`: Double, 经度
- `latitude`: Double, 纬度

#### 请求示例
略

#### 响应数据
- `status`: Integer, 请求状态

#### 响应示例
```javascript
{
  status: 0
}
```


### 查询附近游客（缘分天空 & 呼唤老乡）

#### 基本信息
- 路径: `/tourist-track.app`
- 方法: `Get`

#### 查询参数
- `type`: String, 不使用这个字段就是查询缘分天空，使用就是呼唤老乡
    - `homie`: 老乡, 如果type为homie但是游客未设置家乡则会报错
- `longitude`: Double, 游客经度
- `latitude`: Double, 游客纬度
- `distance`: Integer, 搜索范围，单位米，默认20米
- `pageSize`: Integer, 返回结果数量，默认50个

#### 请求示例
> Get /tourist-track.app?type=homie&longitude=108.5678&latitude=18.4567&distance=30&ppageSize=10

#### 响应数据
附近游客信息的数组，包含与查询者的距离
- distance: Double, 距离

#### 响应示例
```javascript
[
    {
        username: 'tfvgybhnuji',
        nickname: 'ghjj678',
        //...
        distance: 18
    }, {
        //...
    }
]
```


## 许愿墙系统

### 发表许愿

#### 基本信息
- 路径: `/wishing_walls.app`
- 方法: `post`

#### 请求参数
- `content`: String，内容
- `pic`: String，图片
- `long`: String，图片长度
- `wide`: String，图片宽度

#### 请求示例
`post /wishing_walls.app`

#### 响应数据
无

#### 响应示例
```javascript
{
  status: 0,
  msg: '许愿成功！'
}
```

### 查看所有愿望

   #### 基本信息
   - 路径: `/wishing_walls.app`
   - 方法: `Get`

   #### 请求参数
   - `无`

   #### 请求示例
   `Get /wishing_walls.app`

   #### 响应数据

   #### 响应示例
   ```javascript
   {
     status: 0,
     msg: '',
     data: [
      {    _id: wishingWall._id,
           userId: wishingWall.userId,
           username: wishingWall.username,
           avter: avterurl,
           content: wishingWall.content,
           praiseNum: wishingWall.praiseUserIds.length,
           picUrl: picurl,
           long:123,
           wide:123.
           createdAt: dateformat(wishingWall.createdAt, 'yyyy-mm-dd hh:MM:ss'),
           updateAt: dateformat(wishingWall.updateAt, 'yyyy-mm-dd hh:MM:ss') },
      {    _id: wishingWall._id,
           userId: wishingWall.userId,
           username: wishingWall.username,
           avter: avterurl,
           content: wishingWall.content,
           praiseNum: wishingWall.praiseUserIds.length,
           picUrl: picurl,
           long:123,
           wide:123.
           createdAt: dateformat(wishingWall.createdAt, 'yyyy-mm-dd hh:MM:ss'),
           updateAt: dateformat(wishingWall.updateAt, 'yyyy-mm-dd hh:MM:ss') }
     ]
   }
   ```

### 点赞

#### 基本信息
- 路径: `/wishing_walls.app/wishingWallId/praise`
- 方法: `Get`

#### 请求参数
- `无`

#### 请求示例
`Get /wishing_walls.app/55b2067c73f516881ade9a7a/praise`

#### 响应数据
无

#### 响应示例
```javascript
{
  status: 0,
  msg: '点赞成功'
}
```
