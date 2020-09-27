<?php
namespace app\admin\controller;
//namespace 引入包名
//收费管理
use app\admin\model\Admin;
use app\admin\model\charges;
use app\admin\model\Dictionary;
use think\facade\Request;
use think\facade\Db;
use think\facade\View;
class ChargesManagement{
    //所有计费规则
    public function allcharges(charges $charges){
        $res=$charges->db()->leftJoin('DD_Dictionary di','di.di_id= DD_billing.di_id')->order(['di.di_id','DD_billing.bi_type'=>'desc'])->select();
        $count =count($res);
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
        return json($data);
    }
    //所有查询选项
    public function allselect(Dictionary $dic){
        $res1=$dic->db()->where('ParentID',1)->select();//车辆类型
        $charges=new charges();
        $res2=$charges->db()->group('bi_type')->select();//是否优享型和普通型
        $res3=$charges->db()->group('bi_weather')->select();//天气
        $res4=$charges->db()->group('bi_fastigium')->select();//是否高峰
        $data=array('code'=>'50001',"data"=>$res1,"data1"=>$res2,"data2"=>$res3,"data3"=>$res4);
        return json($data);
    }
    //修改计费规则
    public function resetCharges(charges $charges){
        $bi_flag=Request::param('bi_flag');
        $bi_money=Request::param('bi_money');
        $bi_startKilometre=Request::param('bi_startKilometre');
        $bi_id=Request::param('bi_id');
        $res=$charges->Db()->where('bi_id',$bi_id)->update(['bi_flag'=>$bi_flag,'bi_money'=>$bi_money,'bi_startKilometre'=>$bi_startKilometre]);
        if ($res){
            return json(array('code'=>'30001','data'=>$res));
        }else{
            return json(array('code'=>'30002'));
        }
    }
    //删除某一条计费规则
    public function del(charges $charges){
        $bi_id=Request::param('bi_id');
        $res=$charges->Db()->delete($bi_id);
        if ($res){
            return json(array('code'=>'40001','msg'=>'删除成功'));
        }
    }
    //查询
    public function search(charges $charges){
        $selectvalueCar=Request::param('selectvalueCar');
        $selectvalueType=Request::param('selectvalueType');
        $selectvalueWeather=Request::param('selectvalueWeather');
        $selectvalueGaofeng=Request::param('selectvalueGaofeng');
        if($selectvalueCar=='') {
            if ($selectvalueType == '') {
                if ($selectvalueWeather == '') {
                    $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('bi_fastigium', $selectvalueGaofeng)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                    $count = count($res);
                }else{
                    if($selectvalueGaofeng==''){
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('bi_weather', $selectvalueWeather)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }
                    else{
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('bi_weather', $selectvalueWeather)->where('bi_fastigium', $selectvalueGaofeng)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }
                }
            }else{
                if($selectvalueWeather == ''){
                    if($selectvalueGaofeng==''){
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('bi_type', $selectvalueType)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }else{
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('bi_type', $selectvalueType)->where('bi_fastigium', $selectvalueGaofeng)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }
                }else{
                    if($selectvalueGaofeng==''){
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('bi_type', $selectvalueType)->where('bi_weather', $selectvalueWeather)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }else{
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('bi_type', $selectvalueType)->where('bi_fastigium', $selectvalueGaofeng)->where('bi_weather', $selectvalueWeather)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }
                }
            }
        }else{
            if ($selectvalueType == '') {
                if ($selectvalueWeather == '') {
                    if($selectvalueGaofeng=='') {
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('DD_billing.di_id', $selectvalueCar)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }else{
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('DD_billing.di_id', $selectvalueCar)->where('bi_fastigium', $selectvalueGaofeng)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }
                }else{
                    if($selectvalueGaofeng==''){
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('DD_billing.di_id', $selectvalueCar)->where('bi_weather', $selectvalueWeather)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }
                    else{
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('DD_billing.di_id', $selectvalueCar)->where('bi_weather', $selectvalueWeather)->where('bi_fastigium', $selectvalueGaofeng)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }
                }
            }else{
                if($selectvalueWeather == ''){
                    if($selectvalueGaofeng==''){
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('DD_billing.di_id', $selectvalueCar)->where('bi_type', $selectvalueType)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }else{
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('DD_billing.di_id', $selectvalueCar)->where('bi_type', $selectvalueType)->where('bi_fastigium', $selectvalueGaofeng)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }
                }else{
                    if($selectvalueGaofeng==''){
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('DD_billing.di_id', $selectvalueCar)->where('bi_type', $selectvalueType)->where('bi_weather', $selectvalueWeather)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }else{
                        $res = $charges->db()->leftJoin('DD_Dictionary di', 'di.di_id= DD_billing.di_id')->where('DD_billing.di_id', $selectvalueCar)->where('bi_type', $selectvalueType)->where('bi_fastigium', $selectvalueGaofeng)->where('bi_weather', $selectvalueWeather)->order(['di.di_id', 'DD_billing.bi_type' => 'desc'])->select();
                        $count = count($res);
                    }
                }
            }

        }
        $data=array("count"=>$count,'currage'=>1,"data"=>$res);
        return json($data);
    }
}
