<?php

namespace App\Http\Controllers\Api;

use App\Enums\RedisKey;
use App\User;
use App\Http\Controllers\BaseController;
use App\Utils\RedisHelper;
use App\Utils\StringHelper;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

class TestController extends BaseController
{
    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function index()
    {
        die('sssss');
//        $res = FaceType::find(64);
//
//        print_r($res);exit;
//        die("dd");
        //$id = $this->getParam('id', 0);
//        $location = GeoIP::getLocation();
        //echo Date::now()->format('l j F Y H:i:s');

        $key = RedisKey::TEST_KEY . "1";
        $res = RedisHelper::getInstance()->setex($key, 60, "ok");
        print_r($res);exit;
        print_r(PHP_EOL . "OK");exit;
        //echo phpinfo();
    }

    public function upload()
    {
        $client = new Client();
        $response = $client->request('POST', 'https://sm.ms/api/upload', [
            'multipart' => [
                [
                    'name'     => 'smfile',
                    'contents' => fopen('D:/soft/xampp/htdocs/source/20171010033840.png', 'r')
                ],
            ]
        ]);
        $result = $response->getBody()->getContents();
        print_r($result);exit;
    }

    /**
     *
     * @name 上传图片、视频接口、文档
     * @group 广告配置
     * @route adsystem/ad/upload_img
     * @method post
     * @param file ad_img 图片文件
     * @return string url 图片资源链接
     */
    public function uploadImg()
    {
//        $imagePath = 'D:/soft/xampp/htdocs/source/20171010033840.png';
//        $extension = StringHelper::getInstance()->getPostfix($imagePath);
//        $content = file_get_contents($imagePath);
//        $filename = '' . uniqid() . '.' . $extension;
//
//        $res = Storage::put($filename, $content);
//        print_r($res);

        $img = $this->request->file('ad_img', '');

        // 图片上传阿里云OSS
        if (!$img || !$img->isValid()) {
            return $this->sendFail(ErrorCode::SHOP_GOODS_UPLOAD_ERROR);
        }

        $allowedImgExt = ['png', 'jpg', 'jpeg', 'gif'];
        $allowedVideoExt = ['mp4', 'flv', 'avi'];
        $allowedFileExt = ['txt'];
        $extension  = $img->getClientOriginalExtension();
        if (!in_array($extension, $allowedImgExt) && !in_array($extension, $allowedVideoExt) && !in_array($extension, $allowedFileExt)) {
            return $this->sendFailMessage(sprintf("不支持的文件格式[%s]!", $extension));
        }

        $size = $img->getClientSize();
        if (in_array($extension, $allowedImgExt) && $size > 1048576) { // 1M
            return $this->sendFail(ErrorCode::UPLOAD_SIZE_ERROR);
        }
        if (in_array($extension, $allowedVideoExt) && $size > 104857600) { // 100M
            return $this->sendFail(ErrorCode::UPLOAD_SIZE_ERROR);
        }

        $originalName = $img->getClientOriginalName();
        $imagePath = $img->getRealPath();
        $content = file_get_contents($imagePath);
        $filename = '/uploads/live/ad/' . uniqid() . '.' . $extension;

        $res = Storage::put($filename, $content);
        if (!$res) {
            return $this->sendFail(ErrorCode::SHOP_GOODS_UPLOAD_OSS_ERROT);
        }

        $host = app('config')['filesystems']['ftp_file_host'];
        $remotePath = $host . $filename;
        return $this->sendSuccess('OK', ['url' => $remotePath]);
    }
}
