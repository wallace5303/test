<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class BaseController extends Controller
{
    protected $pageNum = 15;
    protected $request;

    public function __construct(Request $request)
    {
        header('Access-Control-Allow-Origin:*');
        $this->request = $request;
    }

    /**
     * 请求参数处理
     * @param array $arr
     * @return array|string
     */
    public function getParam($getVal, $default = '', $raw = false)
    {
        $value = $this->request->input($getVal, $default);
        if ($raw) {
            return strip_tags($value);
        }
        if (is_array ( $value )) {
            return $this->recursiveHtmlspecialchars ( $value );
        } else {
            return htmlspecialchars ( trim ( $value ) );
        }
    }

    /**
     * 递归的htmlspecialchars给定的数据元素
     * @param array $arr
     * @return array
     */
    private function recursiveHtmlspecialchars(array $arr)
    {
        $arrTemp = array ();
        foreach ( $arr as $k => $v ) {
            $vTemp = '';
            if (is_array ( $v )) {
                $vTemp = $this->recursiveHtmlspecialchars ( $v );
            } else {
                $vTemp = htmlspecialchars ( trim ( $v ) );
            }
            $arrTemp [$k] = $vTemp;
        }
        return $arrTemp;
    }

    /**
     * ajax信息
     *
     * @param  bool   $data
     * @param  string $message
     * @param  int    $code
     * @return array
     */
    protected function ajaxMessage($data = false, $message = '', $code = 0)
    {
        $messageInfo = [
            'code'    => $code,
            'message' => $message,
            'data'    => $data,
        ];
        return response()->json($messageInfo);
    }

    /**
     * 返回json数据
     *
     * @param int $code
     * @param string $message
     * @param array $data
     * @return \Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function returnJson($succ = true, $data = [], $code = 0, $message = '')
    {
        $messageData = [
            'succ' => $succ,
            'code' => $code,
            'message' => $message,
            'data' => $data,
            'timestamp' => time()
        ];

        return response()->json($messageData);
    }

    /**
     * 导出csv
     * @param string $filename [名称]
     * @param mixed  $data     [二维数组 or 格式化的字符串]
     * @param string $head     [头部标题]
     * @param array  $fields   [导出的字段]
     * @param array  $map      [隐射的数组 key => array()]
     */
    protected function exportCsv($filename = 'export.csv', $data = '', $head = '', $fields = [], $map = [])
    {
        $str = $head ? iconv('utf-8', 'gb2312', $head) : '';
        if (is_array($data)) {
            $map_key = (!empty($map) && is_array($map)) ? array_keys($map) : [];
//            $data = isset($data[0]) ? $data : [$data];
            if (empty($fields)) { //默认导出数组中的全部字段
                foreach ($data as &$lv) {
                    foreach ($lv as $sk => $sv) {
                        $tmp = in_array($sk, $map_key) ? (isset($map[$sk][$sv]) ? $map[$sk][$sv] : 'UNKNOW: ' . $sv) : $sv;
                        $str .= sprintf('"%s",', iconv('utf-8', 'gbk//ignore', htmlspecialchars($tmp)));
                        $str = htmlspecialchars_decode($str);
                    }
                    $str = rtrim($str, ',') . "\n";
                }
            } else {
                foreach ($data as &$lv) {
                    foreach ($fields as $fv) {
                        $tmp = in_array($fv, $map_key) ? (isset($map[$fv][$lv[$fv]]) ? $map[$fv][$lv[$fv]] : 'UNKNOW: ' . $lv[$fv]) : $lv[$fv];
                        $str .= sprintf('"%s",', iconv('utf-8', 'gbk//ignore', htmlspecialchars($tmp))); // 忽略不能转义的数据
                        $str = htmlspecialchars_decode($str);
                    }
                    $str = rtrim($str, ',') . "\n";
                }
            }
        } else {
            $str .= $data;
        }
        header("Content-type:text/csv");
        header("Content-Disposition:attachment;filename=" . $filename);
        header('Cache-Control:must-revalidate,post-check=0,pre-check=0');
        header('Expires:0');
        header('Pragma:public');
        echo $str;
    }

    /**
     * 验证
     * @param $request
     * @param $args
     */
    protected function validator($request, $args, $tips = '')
    {
        $tips = '' == $tips ? [
            'required'    => ':attribute是必填项',
            'integer'     => ':attribute必须为数字',
            'date_format' => ':attribute不符合日期格式',
            'date'        => ':attribute不符合日期格式',
            'alpha'       => ':attribute必须为字母',
            'string'      => ':attribute必须为字符串',
            'array'       => ':attribute必须为数组',
            'regex'       => ':attribute不符合正则规范',
            'in'          => ':attribute不在规定范围内',
            'min'         => ':attribute长度不够',
            'max'         => ':attribute长度超过限制',
            'unique'      => ':attribute必须唯一，:attribute已存在',
        ] : $tips;
        // 验证传递的参数
        $validator = Validator::make($request->all(),
            $args,
            $tips
        );
        if ($validator->fails()) {
            return $validator->errors()->first();
        }
    }

    /**
     * 返回分页的page格式
     * @param  int   $page
     * @param  int   $count
     * @return array
     */
    protected function page($page, $count)
    {
        return [
            'curpage' => intval($page),
            'pcount'  => ceil($count / $this->pageNum),
            'perpage' => $this->pageNum,
            'rcount'  => $count,
        ];
    }

    /**
     * 格式化成分页所需的数据格式
     * @param  [object] $obj    分页对象
     * @param  bool     $tojson 是否转成json
     * @return array    $data   数组
     */
    public function formatPageDate($obj, $tojson = false)
    {
        $list = $obj->toArray();
        $page = [
            'rcount'  => $obj->total(), // 总条数
            'pcount'  => $obj->lastPage(), // 总页数
            'curpage' => $obj->currentPage(), // 当前页数
            'perpage' => $obj->perPage(), // 每页显示条数
        ];
        $data = [
            'page' => $tojson ? json_encode($page, JSON_UNESCAPED_UNICODE) : $page,
            'list' => $tojson ? json_encode($list['data'], JSON_UNESCAPED_UNICODE) : $list['data'],
        ];
        return $data;
    }

    /**
     * 格式化搜索条件
     *
     * @param  array  $criteria
     * @return string $where
     */
    public static function formatSql(array $criteria)
    {
        $where = [];
        $optmap = array(
            'gte'    => ' >= ',
            'gt'     => ' > ',
            'lte'    => ' <= ',
            'lt'     => ' < ',
            'ne'     => ' != ',
            'in'     => ' in ( %s ) ',
            'like'   => ' like ',
            'isnull' => ' = ""',
        );
        foreach ((array)$criteria as $row => $value) {
            if ($value !== false) {
                // 转化字符串
                if (!empty($value)) {
                    if (is_array($value)) {
                        $value = array_map(function ($a) {
                            return is_numeric($a) ? $a : '"' . $a . '"';
                        }, $value);
                    } else {
                        $value = is_numeric($value) ? $value : '"' . $value . '"';
                    }
                }

                // 逻辑判断
                if (strstr($row, '__')) {
                    list($row, $rule) = explode('__', $row);
                    //in 特殊处理
                    if (is_array($value) && !empty($value) && $rule == 'in') {
                        $qstr = implode(',', $value);
                        $where [] = $row . sprintf($optmap[$rule], $qstr);
                    } else if ($rule == 'like' && !empty($value)) {
                        $where [] = $row . $optmap[$rule] . '"%' . trim($value, '"') . '%"';
                    } else if ($rule == 'isnull') {
                        $where [] = $row . $optmap[$rule];
                    } else if (!empty($value) || $value === 0) {
                        $where [] = $row . $optmap[$rule] . $value;
                    }
                } else if (!empty($value) || $value === 0) {
                    $where [] = $row . ' = ' . $value;
                }
            }
        }

        if (!empty($where)) {
            $where = implode(' and ', $where);
        }
        return $where;
    }

    /**
     * 格式化成分页所需的数据格式
     * @param  [object] $obj    分页数组
     * @param  bool     $tojson 是否转成json
     * @return array    $data   数组
     */
    final public function dealPageDate($data, $tojson = false)
    {
        if (is_object($data)) {
            $data = $data->toArray();
        }
        $page = [
            'rcount'  => $data['total'], // 总条数
            'pcount'  => $data['last_page'], // 总页数
            'curpage' => $data['current_page'], // 当前页数
            'perpage' => $data['per_page'], // 每页显示条数
        ];
        $data['page'] = $tojson ? json_encode($page, JSON_UNESCAPED_UNICODE) : $page;
        $data['list'] = $tojson ? json_encode($data['data'], JSON_UNESCAPED_UNICODE) : $data['data'];
        unset($data['data'], $data['total'], $data['per_page'], $data['current_page'], $data['last_page'], $data['next_page_url'], $data['prev_page_url'], $data['from'], $data['to']);
        return $data;
    }

    /**
     * 电话号码、身份证号码处理
     * @param string $number 处理前
     * @param int $type 类型
     * @return string $number 处理后
     */
    public function formatNumber($number, $type)
    {
        switch ($type) {
            case 'mobile':
                if (!$this->seeMobile) {
                    $number = strlen($number) == 11 ? substr_replace($number, '****', 3, 4) : '';
                }
                break;
            case 'id_card':
                $length = strlen($number);
                $number = $length >= 12 ? str_pad(substr($number, 0, 3), $length - 7, '*') . substr($number, $length - 4) : '';
                break;
            default:
                break;
        }
        return $number;
    }

    /**
     * 时间状态判断
     *
     * @param int $start 开始时间戳
     * @param int $end 结束时间戳
     * @return int $status 时间状态:0-未开始;1-进行中;2-已结束
     */
    public function dealTime($start, $end)
    {
        $time = time();
        $startFlag = $time - $start;
        $endFlag = $time - $end;

        if ($startFlag < 0) {
            $status = 0;
        } elseif ($endFlag > 0) {
            $status = 2;
        } else {
            $status = 1;
        }

        return $status;
    }

    function guid(){
        if (function_exists('com_create_guid')){
            return com_create_guid();
        }else{
            mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
            $charid = strtoupper(md5(uniqid(rand(), true)));
            $hyphen = chr(45);// "-"
            $uuid = chr(123)// "{"
                .substr($charid, 0, 8).$hyphen
                .substr($charid, 8, 4).$hyphen
                .substr($charid,12, 4).$hyphen
                .substr($charid,16, 4).$hyphen
                .substr($charid,20,12)
                .chr(125);// "}"
            return $uuid;
        }
    }
}
