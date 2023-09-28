package main

import (
	beego "bee/server/web"
	_ "test/routers"
)

func main() {
	// env := "dev"
	// if env != "prod" {
	// 	tmp.Test("aaaa")
	// 	return
	// }
	beego.Run()
}
