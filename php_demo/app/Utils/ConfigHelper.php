<?php
/**
 * 配置读取帮助类
 * User: hello
 * Date: 2017/5/8
 * Time: 18:09
 */

namespace App\Utils;


class ConfigHelper
{
    private static $instance;

    public static function getInstance() {
        if (! isset ( self::$instance )) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * 读取配置文件
     *
     * @param $key
     * @return array|mixed
     */
    public function read($key)
    {
        if (!$key) {
            return [];
        }
        return config($key);
    }
}