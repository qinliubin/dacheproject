<?php
/**
 * wechat php test
 */

header('Content-type:text/html;charset=utf-8');
define("TOKEN", "weixinCourse");//定义token

$wechatObj = new wechatCallbackapiTest();
//判断是否需要token验证，如果需要则进行验证，如果不需要则进行消息回复
if(isset($_GET["echostr"])){
  $wechatObj->valid();
}else{
  $wechatObj->responseMsg();
}

class wechatCallbackapiTest
{
  public function valid()
  {
    $echoStr = $_GET["echostr"];

        //valid signature , option
    if($this->checkSignature()){
      echo $echoStr;
      exit;
    }
  }
    //检验签名是否是来自微信服务器
  private function checkSignature()
  {
        // 检测是否已经有定义了token的常量，如果没定义则抛出错误，告知未定义token
    if (!defined("TOKEN")) {
      throw new Exception('TOKEN is not defined!');
    }

        $signature = $_GET["signature"];//获取前面
        $timestamp = $_GET["timestamp"];//获取时间戳
        $nonce = $_GET["nonce"];//获取随机数

        $token = TOKEN;
        $tmpArr = array($token, $timestamp, $nonce);//组成数组
        // use SORT_STRING rule
        sort($tmpArr, SORT_STRING);//对新数组进行排序
        $tmpStr = implode( $tmpArr );//将数组组成字符串
        $tmpStr = sha1( $tmpStr );//对字符串进行shal加密

        if( $tmpStr == $signature ){
          return true;
        }else{
          return false;
        }
      }


      public function responseMsg()
      {
       $postStr = isset($GLOBALS['HTTP_RAW_POST_DATA']) ? $GLOBALS['HTTP_RAW_POST_DATA'] : file_get_contents("php://input");
       if (!empty($postStr)){
         $postObj = simplexml_load_string($postStr,'simpleXMLElement',LIBXML_NOCDATA);
         file_put_contents('./data.log', json_encode($postObj),FILE_APPEND);
         $msgType=$postObj->MsgType;
         switch ($msgType) {
          case 'text':
          $this->responsetext($postObj);
          break;
          case "event":
          $this->responseEventMsg($postObj);
          break;
        }
      }
    }
    public function responsetext($postObj){
      $usersaid = $postObj->Content;
      switch ($usersaid) {

        case '问卷':
        $content='防火调查？
        A、没什么意识？
        B、还好
        C、会使用喷火器
        D、没遇到过火';
        break;
        case 'A': case 'a':
        $content='那您可得好好补习补习了';
        break;
        case 'B': case 'b':
        $content='哎呦不错哦';
        break;
        case 'C': case 'c':
        $content='真棒那';
        break;
        case 'D': case 'd':
        $content='运气真好';
        break;
        default:
        $content='我有点不理解呢';
        break;
      }
      $this->replayMsg($postObj,$content);
    }

    //响应事件消息
    public function responseEventMsg($postObj){
      $content = "";
      if($postObj->Event == "subscribe"){
            //触发关注事件
        $content = "你好，谢谢关注！\r\n请按菜单进行操作么么哒";
      }else if($postObj->Event == "unsubscribe"){
            //触发取消关注事件
        $content = "Why you do not like me ???";
      }else if($postObj->Event == "CLICK"){
            //触发菜单点击事件
        $key = $postObj->EventKey;
        if($key=="mindex"){
         $content = "谢谢亲的支持~";
       }
     }
     $this->replayMsg($postObj,$content);
   }



    //回复文本消息
   public function replayMsg($postObj,$content){
        //获取发送者
    $fromUsername = $postObj->FromUserName;
        //获取接收者
    $toUsername = $postObj->ToUserName;
        //获取消息发送的时间戳
    $time = time();
        //xml格式：我们要回复的内容
    $textTpl = "<xml>
    <ToUserName><![CDATA[%s]]></ToUserName>
    <FromUserName><![CDATA[%s]]></FromUserName>
    <CreateTime>%s</CreateTime>
    <MsgType><![CDATA[%s]]></MsgType>
    <Content><![CDATA[".$content."]]></Content>
    <FuncFlag>0</FuncFlag>
    </xml>";
    $msgType = "text";
    $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $content);
    echo $resultStr;
  }

}

?>