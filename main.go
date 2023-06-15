package main

import (
	"test/tmp"
)

func main() {
	env := "dev"
	if env != "prod" {
		tmp.Test("aaaa")
		return
	}
}
