<?php
namespace app\admin\controller;
use app\admin\model\News;
use think\facade\Db;
use think\facade\Filesystem;
use think\facade\View;
use think\facade\Request;

class PressReleases
{
    //发布新闻
    public function Press(){
        $file=Request::file('n_img');
        $path=Filesystem::disk('public')->putFile('img',$file);
        $news =new News();
        $n_title=Request::param('n_title');
        $n_time=Request::param('n_time');
        $n_content=Request::param('n_content');
        $fname = "http://tp6.com/static/admin/".$path;
//        $ans=move_uploaded_file($_FILES["n_img"]["tmp_name"],iconv("UTF-8","gb2312",$fname));
//        if ($ans){
            $res=$news->Db()->insert(['n_title'=>$n_title,'n_time'=>$n_time,'n_img'=>$fname,'n_content'=>$n_content]);
            return json(array('code'=>'40001','msg'=>'添加成功'));
//        }

    }
}
