<?php
namespace App\Library;

use Qiniu\Auth;
use Qiniu\Storage\UploadManager;
/*
 * qiniu
 * 
 */

class QiNiu {
	
	private static $instance;
	public static function &instance() {
		if (! isset ( self::$instance )) {
			self::$instance = new QiNiu ();
		}
	
		return self::$instance;
	}
	public function __construct() {
		

	}
		
	public function upload($filePath="",$key="", $bucket=""){
	
		//$filePath 要上传文件的本地路径
		//$key 上传到七牛后保存的文件名
		//$bucket 要上传的空间
		if(empty($filePath) || empty($key) || empty($bucket)){
			return false;
		}
		// 引入鉴权类
		//use Qiniu\Auth;
	
		// 引入上传类
		//use Qiniu\Storage\UploadManager;
	
		// 需要填写你的 Access Key 和 Secret Key
		$accessKey = 'YPhPppmuD_ppVLZhluzpiOCBm92AQn-nEcksudDk';
		$secretKey = 't91qUINkNONn5STrEJYYsLVH8d8KbfTOSuk9fDHn';
	
		// 构建鉴权对象
		$auth = new Auth($accessKey, $secretKey);

		// 生成上传 Token
		$token = $auth->uploadToken($bucket);
	
		// 初始化 UploadManager 对象并进行文件的上传。
		$uploadMgr = new UploadManager();
		list($ret, $err) = $uploadMgr->putFile($token, $key, $filePath);
		
		if ($err !== null) {			
			return $err;
		} else {			
			return $ret;
		}
	    
	}
	

}