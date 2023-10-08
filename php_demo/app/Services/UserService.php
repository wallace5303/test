<?php
/**
 * User
 * User: hello
 * Date: 2017/5/4
 * Time: 21:39
 */

namespace App\Services;

use App\Enums\ErrorCode;
use App\Models\User;
use App\Utils\RedisHelper;
use App\Enums\RedisKey;

class UserService
{
    private static $instance;

    public static function getInstance() {
        if (! isset ( self::$instance )) {
            self::$instance = new self ();
        }

        return self::$instance;
    }


}