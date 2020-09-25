<?php

//收费表
namespace app\admin\model;
use think\model;

class charges extends model
{
    protected $table = "DD_billing";//表名
    protected $pk = "bi_id";//主键
}
