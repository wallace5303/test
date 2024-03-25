package main

import (
	"fmt"
	"test/example/tmp"
)

func main() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered in main", r)
		}
	}()
	// beego.Run("127.0.0.1:8090")
	env := "dev"
	if env != "prod" {
		//tmp.Test("aaaa")
		tmp.Routine9()
		//return
	}
}
