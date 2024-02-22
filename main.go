package main

import (
	// beego "beego/server/web"
	// _ "test/routers"
	"test/example/tmp"
)

func main() {

	// beego.Run("127.0.0.1:8090")
	env := "dev"
	if env != "prod" {
		tmp.Test("aaaa")
		//tmp.Routine4()
		return
	}

}
