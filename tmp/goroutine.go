package tmp

import (
	"context"
	"fmt"
	"runtime"
	"sync"
	"time"
)

var wg sync.WaitGroup

func RoutineIndex() {
	Routine10()
}

func Routine10() {
	int_chan := make(chan int)
	string_chan := make(chan string, 1)

	go func() {
		time.Sleep(3 * time.Second)
		int_chan <- 3
		fmt.Println("f1 done")
	}()

	go func() {
		for {
			time.Sleep(6 * time.Second)
			string_chan <- "hello"
			fmt.Println("f2 done")
		}
	}()

	// 只会执行1次
	select {
	case v1 := <-int_chan:
		fmt.Println("int:", v1)
	case v2 := <-string_chan:
		// 上面那个执行了，这个就不执行
		fmt.Println("string:", v2)
	}

	for {
		fmt.Println("current --- NumGoroutine:", runtime.NumGoroutine())
		time.Sleep(1 * time.Second)
	}

	// for {
	// 	select {
	// 	case v1 := <-int_chan:
	// 		fmt.Println("int:", v1)
	// 	case v2 := <-string_chan:
	// 		fmt.Println("string:", v2)
	// 		// default:
	// 		// 	fmt.Println("default")
	// 	}
	// 	fmt.Println("current --- NumGoroutine:", runtime.NumGoroutine())
	// }
}

func Routine9() {
	// 创建一个子节点的context,3秒后自动超时
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*3)

	go watch(ctx, "监控1")
	go watch(ctx, "监控2")

	fmt.Println("现在开始等待8秒,time=", time.Now().Unix())
	time.Sleep(8 * time.Second)

	fmt.Println("等待8秒结束,准备调用cancel()函数，发现两个子协程已经结束了，time=", time.Now().Unix())
	cancel()
}

// 单独的监控协程
func watch(ctx context.Context, name string) {
	for {
		select {
		case <-ctx.Done():
			fmt.Println(name, "收到信号，监控退出,time=", time.Now().Unix())
			return
		default:
			fmt.Println(name, "goroutine监控中,time=", time.Now().Unix())
			time.Sleep(1 * time.Second)
		}
	}
}

func Time1() {
	//1.timer基本使用
	timer1 := time.NewTimer(2 * time.Second)
	t1 := time.Now()
	fmt.Printf("t1:%v\n", t1)
	t2 := <-timer1.C
	fmt.Printf("t2:%v\n", t2)
}

// 崩溃时需要传递的上下文信息
type panicContext struct {
	function string // 所在函数
}

// 保护方式允许一个函数
func ProtectRun(entry func()) {
	// 延迟处理的函数
	defer func() {
		// 发生宕机时，获取panic传递的上下文并打印
		err := recover()
		//fmt.Println("err:", err.(type))
		switch err.(type) {
		case runtime.Error: // 运行时错误
			fmt.Println("runtime error:", err)
		default: // 非运行时错误
			fmt.Println("error:", err)
			str := err.(*panicContext)
			fmt.Println("str:", *str)
		}
	}()
	entry()
}

func Routine8() {
	fmt.Println("运行前")
	// 允许一段手动触发的错误
	ProtectRun(func() {
		fmt.Println("手动宕机前")
		// 使用panic传递上下文
		panic(&panicContext{
			"手动触发panic",
		})
		fmt.Println("手动宕机后")
	})
	// 故意造成空指针访问错误
	ProtectRun(func() {
		fmt.Println("赋值宕机前")
		var a *int
		*a = 1
		fmt.Println("赋值宕机后")
	})
	fmt.Println("运行后")
}

func Routine7() {
	ch1 := make(chan int)
	ch2 := make(chan int)
	// 开启goroutine将0~100的数发送到ch1中
	go func() {
		for i := 1; i < 100; i++ {
			ch1 <- i
		}
		close(ch1)
	}()
	// 开启goroutine从ch1中接收值，并将该值的平方发送到ch2中
	go func() {
		for {
			i, ok := <-ch1 // 通道关闭后再取值ok=false
			fmt.Println("ch1 i:", i)
			if !ok {
				break
			}
			ch2 <- i * i
		}
		//time.Sleep(10 * time.Second)
		close(ch2)
	}()

	// 在主goroutine中从ch2中接收值打印

	for i := range ch2 {
		fmt.Println(i)
	}
}

func Routine6() {
	// 创建2个管道
	int_chan := make(chan int)
	string_chan := make(chan string, 1)
	go func() {
		time.Sleep(2 * time.Second)
		fmt.Println("NumGoroutine:", runtime.NumGoroutine())
		time.Sleep(3 * time.Second)

		int_chan <- 3
		// time.Sleep(2 * time.Second)
		// int_chan <- 4
		// close(int_chan)
	}()
	go func() {
		//time.Sleep(2 * time.Second)
		string_chan <- "hello"
	}()
	for {
		select {
		case v1 := <-int_chan:
			fmt.Println("int:", v1)
		case v2 := <-string_chan:
			fmt.Println("string:", v2)
			// default:
			// 	fmt.Println("default")
		}
		// time.Sleep(10 * time.Second)
		// break
	}

}

func Routine5() {
	c := make(chan int)
	go func() {
		for i := 0; i < 4; i++ {
			fmt.Println("i:", i)
			c <- i
		}
		close(c)
	}()

	for {
		data, ok := <-c
		fmt.Println(data, ok)
		if ok {
			fmt.Println("--")
		} else {
			break
		}
	}
	fmt.Println("main结束")
}

func recv(c chan int) {
	ret := <-c
	fmt.Println("接收成功", ret)
	// <-c
	// fmt.Println("接收成功")
}

func Routine4() {
	ch := make(chan int)
	go recv(ch) // 启用goroutine从通道接收值
	ch <- 10
	fmt.Println("发送成功")
}

func Routine3() {
	fmt.Println("s:", time.Second)
	time.Sleep(time.Second)

	go func() {
		defer fmt.Println("A.defer")
		func() {
			defer fmt.Println("B.defer")
			// 结束协程
			runtime.Goexit()
			defer fmt.Println("C.defer")
			fmt.Println("B")
		}()
		fmt.Println("A")
	}()

}

func Routine2() {
	go func(s string) {
		for i := 0; i < 2; i++ {
			fmt.Println(s)
		}
	}("world")
	// 主协程
	for i := 0; i < 2; i++ {
		// 切一下，再次分配任务
		runtime.Gosched()
		fmt.Println("hello")
	}
}

func Routine() string {
	// go hello()
	fmt.Println("main goroutine done!")
	for i := 0; i < 10; i++ {
		wg.Add(1) // 启动一个goroutine就登记+1
		go hello(i)
	}
	wg.Wait()
	fmt.Println("main all done!")
	return "ok"
}

func hello(i int) {
	defer wg.Done()
	fmt.Println("Hello Goroutine!", i)
}
