<?php
/**
 * 阿里云短信相关
 */
namespace app\applet\controller;

use AlibabaCloud\Client\AlibabaCloud;
use AlibabaCloud\Client\Exception\ClientException;
use AlibabaCloud\Client\Exception\ServerException;
use think\Request;
// Download：https://github.com/aliyun/openapi-sdk-php
// Usage：https://github.com/aliyun/openapi-sdk-php/blob/master/README.md



class aliyun
{

    public static function aliyun()
    {
//        $phone=Request::post("phone");
        $rode=rand(1000,9999);
//        echo json($rode);
        AlibabaCloud::accessKeyClient('LTAI4G5z3RqihKhQWk14mZhq', 'iQVxuYZLRrmfl0pCz91omgx5i9iNK3')
            ->regionId('cn-hangzhou')
            ->asDefaultClient();

        try {
            $result = AlibabaCloud::rpc()
                ->product('Dysmsapi')
                // ->scheme('https') // https | http
                ->version('2017-05-25')
                ->action('SendSms')
                ->method('POST')
                ->host('dysmsapi.aliyuncs.com')
                ->options([
                    'query' => [
                        'RegionId' => "cn-hangzhou",
                        'PhoneNumbers' => "15659599586",
                        'SignName' => "番茄打车",
                        'TemplateCode' => "SMS_202808596",
                        'TemplateParam' => "{\"code\":\"$rode\"}",
                    ],
                ])
                ->request();
//            print_r($result->toArray());
        } catch (ClientException $e) {
            echo $e->getErrorMessage() . PHP_EOL;
        } catch (ServerException $e) {
            echo $e->getErrorMessage() . PHP_EOL;
        }

    }
}