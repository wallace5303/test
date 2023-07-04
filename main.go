package main

import (
	"test/pkg"
	"test/tmp"
)

func main() {
	env := "dev"
	if env != "prod" {
		tmp.Test("aaaa")
		pkg.Test("aaaa")
		//go tmp.Routine()
		return
	}
}
