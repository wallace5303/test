package main

import (
	"test/tmp"
)

func main() {
	env := "dev"
	if env != "prod" {
		tmp.Test("aaaa")
		//pkg.Test("aaaa")
		tmp.Routine8()
		return
	}
}
