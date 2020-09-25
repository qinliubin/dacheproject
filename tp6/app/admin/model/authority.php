<?php

//权限表
namespace app\admin\model;
use think\model;


class authority extends model
{
    protected $table = "DD_authority";//表名
    protected $pk = "au_id";//主键
}
