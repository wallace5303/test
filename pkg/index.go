package pkg

import (
	"fmt"
	"test/util"
)

func Test(str string) {
	util.RandomSleep(50, 100)
	fmt.Println("hello")
}
