<?php
/**
 * 简洁获取注释文档类
 * User: hello
 * Date: 2017/5/8
 * Time: 14:22
 */
namespace App\Library;

class PHPDoc
{

    // 路径
    public $path = [];

    // 所有类列表
    private $class = [];

    //api文档结果
    public $api = [];

    // 错误信息
    public $error = '';

    // 传入路径，命名空间数组
    public function __construct($filePath)
    {
        $this->path = $filePath;
    }

    /**
     * 获取Api接口
     *
     * @param int $type 解析类型 1公共方法，2表示公共和保护 3表示全部
     * @return array|bool
     */
    public function getApi($type = 1)
    {
        $this->class = $this->getAllPathFile();
        if (!$this->class) {
            $this->error = '未获取到相关类文件';
            return false;
        }

        foreach ($this->class as $one) {
            $class = $this->getInstance($one);
            if (!$class) {
                continue;
            }

            $this->getFunctionDoc($class, $type);
        }

        return $this->api;
    }

    /**
     * 获取传入的文件路径对应的每个类
     *
     * @return array 带命名空间的类名
     */
    public function getAllPathFile()
    {
        foreach ($this->path as $key => $one) {

            if (isset($one['path']) && is_dir($one['path'])) {
                // 解析对应路径内所有文件夹下文件,文件夹暂不重复
                if ($dh = opendir($one['path'])) {
                    while (($file = readdir($dh)) !== false) {
                        if ($file !== '.' && $file !== '..' && is_file($one['path'] . '/' . $file)) {
                            $this->class[] = $one['namespace'] . '\\' . basename($file, '.php');
                        }
                    }
                    closedir($dh);
                }
            } elseif (isset($one['path']) && is_file($one['path'])) {
                $this->class[] = $one['namespace'] . '\\' . basename($one['path'], '.php');
            }
        }
        return $this->class ? array_unique($this->class) : [];
    }

    /**
     * 获取反射类
     *
     * @param string $class
     * @return bool|\ReflectionClass|string
     */
    private function getInstance($class = '')
    {
        try {
            $class = new \ReflectionClass($class);
            return $class;
        } catch (\Exception $e) {
            $this->error = $e->getMessage();
            return false;
        }
    }

    /**
     * 获取一个类中方法对应的注释
     *
     * @param class $instance 反射类
     * @param int $type 1 公共方法，2表示公共和保护 3表示全部
     * @return bool
     */
    private function getFunctionDoc($instance = null, $type = 1)
    {
        if ($type == 1) {
            $methods = $instance->getMethods(\ReflectionMethod::IS_PUBLIC);
        } elseif ($type == 2) {
            $methods = $instance->getMethods(\ReflectionMethod::IS_PUBLIC + \ReflectionMethod::IS_PROTECTED);
        } elseif ($type == 3) {
            $methods = $instance->getMethods(
                \ReflectionMethod::IS_PUBLIC
                + \ReflectionMethod::IS_PROTECTED
                + \ReflectionMethod::IS_PRIVATE
            );
        }

        if (!$methods) {
            return false;
        }
        foreach ($methods as $method) {
            if (!($apiRes = $this->analysis($method))) {
                continue;
            }
            $this->api[$apiRes['group']][] = $apiRes;
        }
    }

    /**
     * 解析一个注释块并加入到文档数组中
     *
     * @param $method 方法对象
     * @return array|bool
     */
    private function analysis($method)
    {
        $doc = $method->getDocComment();

        // 匹配不同参数
        $has = preg_match_all('/@([\S]{1,})\s([\S]{1,})\s([\S]{0,})\s([\S]{0,})/', $doc, $result);

        if (!$has) {
            return false;
        }

        if (!in_array('route', $result[1])) {
            return false;
        }

        $route = '';
        $group = 'api_other';
        $name = '';
        $desc = '';
        $return = [];
        $params = [];
        $request = '';
        foreach ($result[1] as $key => $lable) {
            if ($lable == 'group') {
                $group = $result[2][$key];
            }
            if ($lable == 'route') {
                $route = $result[2][$key];
            }
            if ($lable == 'request') {
                $request = $result[2][$key];
            }
            if ($lable == 'desc') {
                $desc = $result[2][$key];
            }
            if ($lable == 'name') {
                $name = $result[2][$key];
            }
            if ($lable == 'param') {
                $paramType = $result[2][$key];
                $paramArg = $result[3][$key];
                $paramDesc = $result[4][$key];
                if (!$paramArg) {
                    continue;
                }

                $paramArg = explode('.', $paramArg);
                $params = $this->analysisParam($paramArg, $paramType, $paramDesc, $params);

            }
            if ($lable == 'return') {
                $returnType = $result[2][$key];
                $returnArg = $result[3][$key];
                $returnDesc = $result[4][$key];
                if (!$returnArg) {
                    continue;
                }

                $returnArg = explode('.', $returnArg);
                $return = $this->analysisParam($returnArg, $returnType, $returnDesc, $return);
            }

        }

        $data = [
            'group' => $group,
            'route' => $route,
            'request' => $request,
            'name' => $name,
            'desc' => $desc,
            'returns' => $return,
            'args' => $params,
        ];

        return $data;

    }

    /**
     * 递归设置参数属性
     *
     * @param $paramArg 参数数组
     * @param $type 底层参数类型
     * @param $desc 底层参数描述
     * @param $result 结果数组
     * @return array 结果数组
     */
    public function analysisParam($paramArg, $type, $desc, $result)
    {
        $name = array_shift($paramArg);
        if (substr($name, 0, 1) == '$') {
            $name = substr($name, 1);
        }

        if (count($paramArg)) {
            $result[$name]['detail'] = $this->analysisParam($paramArg, $type, $desc,isset($result[$name]['detail'])?$result[$name]['detail']:[]);
        } else {

            $result[$name] = ['type' => $type, 'desc' => $desc];

            return $result;
        }

        return $result;
    }

    public function test()
    {
    }

}