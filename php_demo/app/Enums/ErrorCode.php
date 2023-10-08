<?php
namespace App\Enums;
/**
 * 错误码
 * 说明：说明：错误码由2部分构成：模块+具体错误，比如20001，2表示用户模块，01表示具体错误
 * User: hello
 * created: 2017/5/3 15:17
 */
class ErrorCode
{
    const SUCCESS = 0; // ok

    // 系统模块
    const SYS_NO_SCOPES = 10001; // 没有应用作用域
    const SYS_CHANNEL_NOT_EXIST = 10002; // 没有对应的频道信息
    const SYS_MESSING_PARAMS = 10003; // 前端参数缺失
    const SYS_OPERATION_FAILED = 10004; // 操作失败
    const SYS_INVALID_PARAM = 10005; // 前端传的参数无效
    const SYS_NO_EXPORT_DATA = 10006; // 没有导出数据
    const SYS_OPERATION_CONFIRM = 10007; // 请确认操作
    const SYS_DATA_NOT_FOUND = 10008; //没有数据
    const SYS_INSERT_FAILED = 10009; //插入数据失败
    const SYS_SERVER_ERROR = 10010; // 服务错误
    const SYS_SERVER_BUSY = 10011; // 服务器繁忙
    const SYS_CACHE_BUSY = 10012; // 服务繁忙
    const SYS_OVER_FREQ = 10013; // 操作频繁，请稍后重试
    const SYS_ERROR_CHANNEL_STATUS = 10014; // 频道状态错误
    const SYS_CHANNEL_LOCK = 10015; // 频道已全局锁定积分
    const SYS_CHANNEL_UNLOCK = 10016; // 频道未全局锁定积分
    const SYS_OPERATION_NOT_ALLOW = 10017; // 无权限操作
    const SYS_COMMENT_CLOSE = 100018; // 评论区已关闭
    const SYS_COMMENT_OPEN = 100019; // 评论区已开启
    const SYS_UPDATE_ERROR = 100020; // 更新数据失败

    // 公共
    const UPLOAD_FILE_MESSING = 20001; // 上传文件缺失
    const UPLOAD_FILE_INVALID = 20002; // 上传文件无效
    const UPLOAD_EXT_ERROR = 20003; // 上传文件的格式错误
    const UPLOAD_SIZE_ERROR = 20004; // 上传文件的大小超出
    const UPLOAD_FAILED = 20005; // 上传失败
    const UPLOAD_TYPE_UNKNOW = 20006; // 上传文件类型错误
    const UPLOAD_FILE_NOT_EXIST = 20007; // 上传文件不存在
    const UPLOAD_FILE_CONTENT_UNKNOW = 20008; // 上传的文件内容不符合要求




    // 短信模块
    const SMS_OVER_FREQ = 20100; // 短信验证码发送频率过快
    const SMS_REDIS = 20101; // 短信redis服务异常
    const SMS_APIHUB = 20102; // apihub通道异常
    const SMS_ERROR = 20103; // 短信验证码错误
    const SMS_ERROR_FREQ = 20104; // 短信验证码错误次数超限
}