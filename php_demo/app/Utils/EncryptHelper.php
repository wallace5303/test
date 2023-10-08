<?php
/**
 * 加密工具
 * User: hello
 * Date: 2017/5/5
 * Time: 17:45
 */
namespace App\Utils;

use Vinkla\Hashids\Facades\Hashids;
class EncryptHelper
{
    const SALT = 'D@A2(F8*6~E';//默认加密秘钥

    private static $instance = null;

    const RANGE = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    public static function getInstance($salt = null, $range = null, $length = 0){
        $input_salt = $salt ? $salt : self::SALT;
        $range = $range ? $range : self::RANGE;
        if (!self::$instance[$input_salt]) {
            self::$instance[$input_salt] = new \Hashids\Hashids($input_salt, $length, $range);//候选字符串不出现数字，避免加密完后还是数字的情况
        }
        return self::$instance[$input_salt];
    }

    public static function encrypt($number, $length = 0){
        $salt = '4X7H@[RA:6KU_.3';
        $range = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return self::getInstance($salt, $range, $length)->encode($number);
    }

    public static function decrypt($number){
        $salt = '4X7H@[RA:6KU_.3';
        $range = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return self::getInstance($salt, $range)->decode($number)[0];
    }

    public static function encryptStr($number, $length = 0){
        $salt = '3TZ7*9+9{&Z4Z#';
        $range = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return self::getInstance($salt, $range, $length)->encode($number);
    }

    public static function encryptStrAndInt($number, $length = 0){
        $salt = '3TZ7*9+9{&Z4Z#';
        $range = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return self::getInstance($salt, $range, $length)->encode($number);
    }



}