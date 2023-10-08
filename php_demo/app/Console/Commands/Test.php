<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use QL\QueryList;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:command {gid}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'test';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $arguments = $this->argument();
        $gid = $arguments['gid'];

        $data = QueryList::get('http://www.anzhuotan.com/mj/8828/')->find('.col-md-6 img')->attrs('src');
        //打印结果
        print_r($data->all());



        echo $gid;
    }
}
