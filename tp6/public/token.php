<?php 
// ini_set("display_errors",On);
//处理菜单
// error_reporting(E_ALL);

$appid= 'wx25d3183d3443f269';
$appsecret= '2e6e06d368f21ab527cf70027600af4d';
$appurl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='.$appid.'&secret='.$appsecret;

$info = json_decode(https_get($appurl));
// var_dump($info);
$access_token = $info->access_token;

$menuUrl='https://api.weixin.qq.com/cgi-bin/menu/create?access_token='.$access_token;

$data = '{
    "button": [
        {
            "type": "view", 
            "name": "戳一下", 
            "key": "ddd", 
            "url": "http://www.chuanyikeji.com/hx2003/hx200309/holle.php"
        }, 
        {
            "type": "view", 
            "name": "鞭挞下", 
            "key": "鞭挞下", 
            "url": "http://www.baidu.com"
        }, 
        {
            "name": "甩一下", 
            "sub_button": [
                {
                    "type": "view", 
                    "name": "反手一耳光", 
                    "url": "http://49.234.64.182:86/index.php/index/login"
                }, 
                {
                    "type": "click", 
                    "name": "再来一耳光", 
                    "key": "zan"
                }
            ]
        }
    ]
}';

$result = https_request($menuUrl,$data);
var_dump($result);
function https_request($url,$data = null){
    $curl = curl_init();//初始化
    curl_setopt($curl, CURLOPT_URL, $url);//提交的url地址
//    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
//    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
    if (!empty($data)){
        curl_setopt($curl, CURLOPT_POST, 1);//使用post方式提交
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);//提交的数据
    }
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//接收服务端范围的html代码而不是直接浏览器输出
    $output = curl_exec($curl);//执行操作
    curl_close($curl);
    return $output;
}
/**
 * curl get方式
 */
function https_get($url){
	$ch = curl_init();
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	$outopt = curl_exec($ch);
	curl_close($ch);
	return $outopt;
}

?>