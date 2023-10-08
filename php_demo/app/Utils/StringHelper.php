<?php
/**
 * 字符串处理
 * User: hello
 * Date: 2017/5/19
 * Time: 13:36
 */

namespace App\Utils;


class StringHelper
{
    private static $instance;

    public static function getInstance()
    {
        if (!isset (self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function mobileHidePart($phone)
    {
        if (strlen($phone) != 11) {
            return '';
        }
        return substr_replace($phone, '****', 3, 4);
    }

    public function idCardHidePart($id)
    {
        $len = strlen($id);
        if ($len < 12) {
            return '';
        }
        return str_pad(substr($id, 0, 3), $len - 7, '*') . substr($id, $len - 4);
    }

    /**
     * @desc  得到文件后缀名
     * @param str $file
     * @return string
     */
    public function getPostfix($file)
    {
        $temp = explode('/', $file);
        $file = $temp[count($temp) - 1];
        $arr = explode('.', $file);
        if (count($arr) > 1) {
            return $arr[count($arr) - 1];
        } else {
            return '';
        }
    }
}