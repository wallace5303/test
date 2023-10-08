<?php
/**
 * redis处理接口
 * User: hello
 * Date: 2017/5/4
 * Time: 21:39
 */

namespace App\Services;

use App\Enums\ErrorCode;
use App\Enums\RedisKey;
use App\Utils\RedisHelper;

class RedisService
{
    private static $instance;
    protected $redis;

    public static function getInstance() {
        if (! isset ( self::$instance )) {
            self::$instance = new self ();
        }

        return self::$instance;
    }

    public function __construct()
    {
        $this->redis = RedisHelper::getInstance();
    }


}