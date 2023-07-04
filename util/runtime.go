package util

import (
	"time"

	"github.com/88250/gulu"
)

func Test(str string) {

}

func RandomSleep(minMills, maxMills int) {
	r := gulu.Rand.Int(minMills, maxMills)
	time.Sleep(time.Duration(r) * time.Millisecond)
}
