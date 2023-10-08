<?php
/**
 * redis分布式锁
 * User: hello
 * Date: 2017/5/6
 * Time: 14:33
 */

namespace App\Utils;

use App\Library\RedLock;

class RedisLockHelper
{
    private static $instance;

    public static function getInstance($retryDelay = 200, $retryCount = 3) {
        if (!isset(self::$instance)) {
            self::$instance = new RedLock(ConfigHelper::getInstance()->read('redis.php_redis'), $retryDelay, $retryCount);
        }

        return self::$instance;
    }

    public function __construct()
    {

    }
}