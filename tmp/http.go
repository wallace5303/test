package tmp

import (
	"fmt"
	"log"
	"net/http"
)

func HttpTest() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Hello, GopherCon SG")
	})
	fmt.Println("1111111111")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
	fmt.Println("222222")
}
