<?php
namespace app\admin\model;
use think\model;

class User extends model{
    protected $table = "DD_user";//表名
    protected $pk = "u_id";//主键
}
