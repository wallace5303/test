<?php
/**
 * 时间工具类
 * User: hello
 * Date: 2017/6/1
 * Time: 19:48
 */

namespace App\Utils;


use App\Enums\TimeSpanType;
use function GuzzleHttp\Psr7\str;

class TimeHelper
{
    private static $instance;

    public static function getInstance()
    {
        if (!isset (self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function getTimeSpan($type, $time = 0)
    {
        $time = $this->strToTime($time);
        $endTime = 0;
        switch ($type) {
            case TimeSpanType::DAY_END :
                $endTime = strtotime(date('Y-m-d 00:00:00', strtotime("+1 days")));
                break;
            case TimeSpanType::WEEK_END :
                $w = date('w', $time);
                if($w == 0){
                    $days = 1;
                } else {
                    $days = 7 - $w + 1;
                }
                $endTime = strtotime(date('Y-m-d 0:0:0', strtotime("+$days days", $time)));
                break;
            case TimeSpanType::MONTH_END :
                $endTime = strtotime(date('Y-m-1 00:00:00', strtotime("+1 months")));
                break;
            case TimeSpanType::YEAR_END :
                $endTime = strtotime(date('Y-1-1 00:00:00', strtotime("+1 yes")));
                break;

        }
        return $endTime > 0 ? $endTime - $time :0;
    }

    public function strToTime($time)
    {
        if (is_string($time)) {
            $time = strtotime($time);
        }
        $time = $time == 0 ? time() : $time;
        return $time;
    }

    /**
     * 获取本周一的日期
     *
     * @param $time
     * @return false|string
     */
    public function getMondayDate($time = '')
    {
        if (!$time) {
            $time = time();
        }
        if (is_string($time)) {
            $time = strtotime($time);
        }

        $w = date('w', $time);
        $w = $w - 1;
        $w = $w < 0 ? 6 : $w;
        return date('Y-m-d', $time - 86400 * $w);
    }

    /**
     * 获取第几周
     *
     * @param string $time
     * @return false|string
     */
    public function getWeekOfYear($time = '')
    {
        if (!$time) {
            $time = time();
        }
        if (is_string($time)) {
            $time = strtotime($time);
        }
        return date('W', $time);
    }

    /**
     * 获取积分周期名
     *
     * @param string $time
     * @return false|string
     */
    public function getMonthPeriodName($time = '')
    {
        $time = $this->strToTime($time);
        $lastSunday = $this->getLastSundayOfMonth($time);
        if ($time > $lastSunday) {
            return date('Ym', strtotime('+1 months', $time));
        }
        return date('Ym', $time);
    }

    /**
     * 获取当月最后一个星期天
     *
     * @param string $time
     * @return false|int
     */
    public function getLastSundayOfMonth($time = '')
    {
        $time = $this->strToTime($time);
        $time = strtotime('last sunday of ' . date('F', $time));
        return $this->strToTime(date('Y-m-d 23:59:59', $time));
    }
}