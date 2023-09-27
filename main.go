package main

import (
	_ "test/routers"

	beego "bee/server/web"
)

func main() {
	// env := "dev"
	// if env != "prod" {
	// 	tmp.Test("aaaa")
	// 	return
	// }
	beego.Run()
}
