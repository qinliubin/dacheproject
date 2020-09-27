<?php
namespace app\admin\controller;
use app\admin\model\News;
use think\facade\Db;
use think\facade\View;
use think\facade\Request;
class ManagementNews
{
    //打印所有新闻
    public function Viewnews(){
        $news =new News();
        $res=$news->Db()->select();
        $count =count($res);
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
        return json($data);
    }
    //    删除新闻
    public function Delnews(){
        $n_id=Request::param('n_id');
        $news =new News();
        $res=$news->Db()->delete($n_id);
        if ($res){
            return json(array('code'=>'50001','msg'=>'删除成功'));
        }
    }
    //批量删除新闻
    public function allDelnews(){
        $multipleSelection=Request::param('multipleSelection');
        $news =new News();
        for ($i=0;$i<count($multipleSelection);$i++){
            $n_id=$multipleSelection[$i]["n_id"];
            $res=$news->Db()->where('n_id',$n_id)->delete();
        }
        return json(array('code'=>'50002','msg'=>'删除成功'));
    }
    //    查询新闻
    public function Checknews(){
        $n_title=Request::param('n_title');
        $news =new News();
        $res=$news->Db()->where([["n_title","like","%".$n_title."%"]])->select();
        $count =count($res);
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
        return json($data);
    }
    //编辑新闻
    public function editnuws(){
        $n_id=Request::param('n_id');
        $n_title=Request::param('n_title');
        $n_content=Request::param('n_content');
        $n_time=Request::param('n_time');
        $news =new News();
        $res=$news->Db()->where('n_id',$n_id)->update(['n_title'=>$n_title,'n_content'=>$n_content,'n_time'=>$n_time]);
        if ($res){
            return json(array('code'=>'60001','msg'=>'修改成功'));
        }
    }
}
