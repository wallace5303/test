<?php
/**
 * user
 * User: hello
 * Date: 2017/5/5
 * Time: 18:24
 */

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $connection = 'mysql';
    protected $table      = 'user';
    protected $primaryKey = 'id';
    protected $guarded    = [];
    public    $timestamps = true;
}