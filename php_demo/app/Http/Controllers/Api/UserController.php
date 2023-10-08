<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseController;

class UserController extends BaseController
{
    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function index()
    {
        $id = $this->getParam('id', 0);
//        $key = RedisKey::TEST_KEY . "1";
//        $res = RedisHelper::getInstance()->setex($key, 60, "ok");

        //echo phpinfo();
    }


}
