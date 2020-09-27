<?php
namespace app\admin\controller;


use app\admin\model\Ordermanagement;
use think\facade\Db;
use think\facade\View;
use think\facade\Request;
class Order
{
    //打印订单表格
    public function Order(){
        $Order=new Ordermanagement();
        $res=$Order->Db()
            ->alias('o')
            ->join('DD_RMATION R','o.rm_id = R.rm_id')
            ->join('DD_user u','o.u_id = u.u_id')
            ->join('DD_driver d','o.d_id = d.d_id')
            ->select();
        $count =count($res);
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
        return json($data);
    }
    //    查询订单
    public function CheckOrder(){
        $u_name=Request::param('u_name');
        $Order=new Ordermanagement();
        $res=$Order->Db()
            ->alias('o')
            ->join('DD_RMATION R','o.rm_id = R.rm_id')
            ->join('DD_user u','o.u_id = u.u_id')
            ->join('DD_driver d','o.d_id = d.d_id')
            ->where([["u.u_name","like","%".$u_name."%"]])
            ->select();
        $count =count($res);
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
        return json($data);
    }
    //删除订单
    public function DelOrder(){
        $o_id=Request::param('o_id');
        $Order=new Ordermanagement();
        $res=$Order->Db()->delete($o_id);
        if ($res){
            return json(array('code'=>'50001','msg'=>'删除成功'));
        }
    }
    //批量删除订单
    public function allDelOrder(){
        $multipleSelection=Request::param('multipleSelection');
        $Order=new Ordermanagement();
        for ($i=0;$i<count($multipleSelection);$i++){
            $o_id=$multipleSelection[$i]["o_id"];
            $res=$Order->Db()->where('o_id',$o_id)->delete();
        }
        return json(array('code'=>'50002','msg'=>'删除成功'));
    }
}
