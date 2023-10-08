#!/bin/bash
sleep 10 &
sleep 5&
wait $! #$!表示上个子进程的进程号，wait等待一个子进程，等待5秒后，退出