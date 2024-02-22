package tmp

import (
	"fmt"
	"os"
	//jsoniter "github.com/json-iterator/go"
)

type Saiyan struct {
	Name  string
	Power int
}

type person struct {
	name string
	city string
	age  int8
}

type People struct {
	Name string
	City string
	Age  int8
}

// Sayer 接口
type Sayer interface {
	say()
	run()
}

type dog struct{}

type cat struct{}

// dog实现了Sayer接口
func (d dog) say() {
	fmt.Println("汪汪汪")
}

// cat实现了Sayer接口
func (c cat) say() {
	fmt.Println("喵喵喵")
}

func (c cat) run() {
	fmt.Println("cat 跑了")
}

type User struct {
	ID   string `json:"json_id" bson:"bson_id" custom:"my_id"`
	Name string `json:"json_name" bson:"bson_name" custom:"my_name"`
}

type Product struct {
	Name      string  `json:"name"`
	ProductID int64   `json:"product_id,string"`
	Number    int     `json:"number,string"`
	Price     float64 `json:"price,string"`
	IsOnSale  bool    `json:"is_on_sale,string"`
	Test      string  `json:"-"`
	OMTest    string  `json:"om_test,omitempty"`
}

type b struct {
	a string
	c bool
	m int
}

func newPerson(name, city string, age int8) *person {
	return &person{
		name: name,
		city: city,
		age:  age,
	}
}

func Test(str string) {
	pid := os.Getpid()
	fmt.Printf("进程 PID: %d \n", pid)

	// Go语言中有个判断map中键是否存在的特殊写法，格式如下
	// value, ok := map[key]
	var lmap = make(map[string]func(ctx *person))
	lmap["f1"] = func(pInfo *person) {
		fmt.Printf("pInfo: %v \n", pInfo)
	}
	eventFn, err := lmap["f1"]
	p1 := newPerson("gsx", "shanghai", 12)
	fmt.Printf("err: %v \n", err)
	eventFn(p1)

	//canshu("aaa", 2, 4, 6)

	// bb := &b{
	// 	a: "gsx2",
	// 	c: true,
	// 	m: pid,
	// }
	// ff := b{
	// 	a: "gsx2",
	// 	c: false,
	// 	m: pid,
	// }
	// fmt.Printf("type:%T value:%+v\n", bb, bb)
	// fmt.Printf("type:%T value:%+v\n", ff, ff)

	// time
	// start := time.Now()
	// changed := time.Time{}
	// fmt.Println("start:", start)
	// fmt.Println("changed:", changed)
	// fmt.Println("changed IsZero:", changed.IsZero())

	// reflect
	// var x float32 = 3.14
	// v := reflect.ValueOf(x)
	// fmt.Println("type:", reflect.TypeOf(x))
	// fmt.Println("vlaue:", v)
	// fmt.Println("type:", v.Type())
	// fmt.Println("Kind:", v.Kind())
	// var x uint8 = 'x'
	// fmt.Println("vlaue:", x)
	// v := reflect.ValueOf(x)
	// fmt.Println("type:", v.Type())
	// fmt.Println("kind is uint8:", v.Kind() == reflect.Uint8)
	// x = uint8(v.Uint())
	// fmt.Println("x:", x)

	// var aa float32 = 3.14
	// v := reflect.ValueOf(aa)
	// y := v.Interface().(float32)
	// fmt.Println("y:", y)

	// env
	//util.GetEnv()

	//result := "ok"

	// for
	// i := 1
	// for {
	// 	i++
	// 	fmt.Println(i)
	// }
	// for {
	// 	bb := &b{
	// 		a: "sdfasdf",
	// 		c: "sdfasdflsdlf",
	// 		m: pid,
	// 	}
	// 	fmt.Println(bb)
	// 	time.Sleep(100 * time.Millisecond)
	// }

	// map
	// data := make(map[string]*People)
	// data["a"] = &People{
	// 	Name: "gsx1",
	// 	City: "sh",
	// 	Age:  11,
	// }
	// data["b"] = &People{
	// 	Name: "gsx2",
	// 	City: "sh",
	// 	Age:  12,
	// }
	// fmt.Println(data)
	// fmt.Println(len(data))

	// json
	// jsonFile, err := os.Open("user.json")
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// fmt.Println("successfully Opened users.json")
	// defer jsonFile.Close()
	// confPath := filepath.Join("./test/user.json")
	// fmt.Println("confPath:", confPath)
	//byteValue, _ := os.ReadFile("./test/user.json")

	// fmt.Println(byteValue)
	// fmt.Println(string(byteValue))

	//var result map[string]interface{}
	// var json = jsoniter.ConfigCompatibleWithStandardLibrary
	// json.Unmarshal(byteValue, &result)
	// fmt.Println(result)
	// fmt.Println(result["users"])

	// jsoniter.Unmarshal(byteValue, &result)
	// fmt.Println(result)

	// json
	// str1 := `{"name":"test","product_id":"1","number":"110011","price":"0.01","is_on_sale":"true"}`
	// p := Product{}
	// jsonitor.Unmarshal([]byte(str1), &p)
	// fmt.Println(&p)
	// fmt.Printf("type:%T value:%+v\n", p, p)
	//var p interface{}
	//json.Unmarshal([]byte(str1), &p)
	// 现在我们需要从这个interface{}解析出里面的数据
	//m := p.(map[string]interface{})
	// for k, v := range m {
	// 	switch vv := v.(type) {
	// 	case string:
	// 	 fmt.Printf("%s is string, value: %s\n", k, vv)
	// 	case int:
	// 	 fmt.Printf("%s is int, value: %d\n", k, vv)
	// 	case int64:
	// 	 fmt.Printf("%s is int64, value: %d\n", k, vv)
	// 	case bool:
	// 	 fmt.Printf("%s is bool, vaule: %v", k, vv)
	// 	default:
	// 	 fmt.Printf("%s is unknow type\n", k)
	// 	}
	// }

	// fmt.Println(m)
	// fmt.Printf("%+v", m)
	// fmt.Printf("%#v", m)

	// json
	// p := People{Name: "gsx", City: "shanghai", Age: 12}
	// jsonU, _ := json.Marshal(p)
	// fmt.Println(string(jsonU))
	// u := &User{ID: "user001", Name: "tom"}
	// t := reflect.TypeOf(u)
	// // 获取第一个字段的Struct Tag的值
	// f0 := t.Elem().Field(0)
	// fmt.Println(f0.Tag.Get("json"))
	// fmt.Println(f0.Tag.Get("bson"))
	// fmt.Println(f0.Tag.Get("custom"))

	// interface
	// var w io.Writer
	// w = os.Stdout
	// w = new(bytes.Buffer)
	// w = nil
	// fmt.Println(w)

	// 定义一个空接口x
	// var x interface{}
	// s := "pprof.cn"
	// x = s
	// fmt.Printf("type:%T value:%v\n", x, x)
	// i := 100
	// x = i
	// fmt.Printf("type:%T value:%v\n", x, x)
	// b := true
	// x = b
	// fmt.Printf("type:%T value:%v\n", x, x)
	// 空接口作为map值
	// var studentInfo = make(map[string]interface{})
	// studentInfo["name"] = "李白"
	// studentInfo["age"] = 18
	// studentInfo["married"] = false
	// fmt.Println(studentInfo)

	// var x Sayer
	// a := cat{}
	// b := dog{}
	// x = a
	// x.say()
	// x.run()
	// a.run()
	// x = b
	// x.say()

	// map
	// var sliceMap = make(map[string][]string, 3)
	// fmt.Println(sliceMap)
	// fmt.Println("after init")
	// key := "中国"
	// value, ok := sliceMap[key]
	// if !ok {
	// 	value = make([]string, 0, 2)
	// }
	// value = append(value, "北京", "上海")
	// sliceMap[key] = value
	// fmt.Println(sliceMap)

	// map
	// var mapSlice = make([]map[string]string, 3)
	// for index, value := range mapSlice {
	// 	fmt.Printf("index:%d value:%v\n", index, value)
	// }
	// fmt.Println("after init")
	// // 对切片中的map元素进行初始化
	// mapSlice[0] = make(map[string]string, 10)
	// mapSlice[0]["name"] = "王五"
	// mapSlice[0]["password"] = "123456"
	// mapSlice[0]["address"] = "红旗大街"
	// for index, value := range mapSlice {
	// 	fmt.Printf("index:%d value:%v\n", index, value)
	// }

	// map
	// scoreMap := make(map[string]int, 2)
	// scoreMap["张三"] = 90
	// scoreMap["小明"] = 100
	// scoreMap["李四"] = 80
	// fmt.Println("scoreMap:", scoreMap)

	// byte
	//var lines [][]byte
	// var str1 string = "test"
	// fmt.Println("str1:", str1)
	// var data []byte = []byte(str1)
	// fmt.Println("data:", data)

	// var data2 [10]byte = [10]byte{3: 'x', 4: 'y'}
	// data2[0] = 'T'
	// data2[1] = 'E'
	// var str2 string = string(data2[:4])
	// fmt.Println("str2:", str2)
	// fmt.Println("data2:", data2)

	//utils
	// str1 := utils.RandStr(31)
	// fmt.Println("str:", str1)

	// NewTicker
	//t1 := time.NewTicker(1 * time.Second)

	// struct
	// var p1 person
	// p1.name = "pprof.cn"
	// p1.city = "北京"
	// p1.age = 18
	// fmt.Printf("%v\n", p1)
	// var p2 = new(person)
	// fmt.Printf("%T\n", p2)
	// fmt.Printf("p2=%#v\n", p2)
	// p3 := p1
	// p3.age = 11
	// fmt.Printf("%T\n", p3)
	// fmt.Printf("%v\n", p3)
	// fmt.Printf("%v\n", p1)

	// defer
	// var whatever [5]struct{}
	// for i := range whatever {
	// 	defer fmt.Println(i)
	// }
	// for i := range whatever {
	// 	defer func() { fmt.Println(i) }()
	// }

	// for range
	// s := "abc"
	// for i, v := range s {
	// 	fmt.Println("i:", i, " v:", v)
	// 	ctype := reflect.TypeOf(v)
	// 	fmt.Println("ctype:", ctype)
	// 	fmt.Println("v:", string(v))
	// }
	// m := map[string]int{"a": 1, "b": 2}
	// for k, v := range m {
	// 	println(k, v)
	// }

	// a := 123
	// fmt.Println(a)
	// var b *int
	// b = &a
	// *b = 666
	// fmt.Println(a, &a, b, *b, &*b)
	// fmt.Printf("str:%v", str)
	// fmt.Println("Get path error: ", str, "  ", str)
	//fmt.Println("========")

	// s := "abc"
	// for i, n := 0, len(s); i < n; i++ {
	// 	println(i, n, s[i])
	// }

	// fmt.Println("s:", time.Second)
	// time.Sleep(time.Second)

	// s := "abc"
	// n := len(s)
	// for n > 0 { // 替代 while (n > 0) {}
	// 	println(s[n-1]) // 替代 for (; n > 0;) {}
	// 	n--
	// }

	//return result
}

func canshu(str string, args ...int) {
	fmt.Println(str)
	fmt.Println(args)
	//args2 := []int{1, 3, 5}
	s1 := append(args, 8)
	fmt.Println(s1)
	canshu2("bbb", args...)
}

func canshu2(str string, args ...int) {
	fmt.Println(str)
	fmt.Println(args)
}

func StructDemo() string {
	// a := 10
	// b := &a
	// fmt.Println("&a", &a)
	// fmt.Println("*a", *a)
	// fmt.Println("b", b)
	// fmt.Println("&b", &b)
	// fmt.Println("*b", *b)
	// fmt.Println("========")
	//goku1 := Saiyan{"Power", 8000}
	// goku2 := &Saiyan{"Power", 9000}
	// fmt.Println("goku2: ", goku2)
	// // Super1(goku1)
	// // fmt.Println("goku1.Power: ", goku1.Power)

	// Super2(goku2)
	// fmt.Println("goku2.Power: ", goku2.Power)

	// t := time.Now()
	// t1 := time.Now().UnixNano()
	// fmt.Println("t: ", t)
	// fmt.Println("t1: ", t1)
	// scoreMap := make(map[string]int)
	// scoreMap["张三"] = 90
	// scoreMap["张三"] = 100
	// scoreMap["王五"] = 60
	// for k, v := range scoreMap {
	// 	fmt.Println(k, v)
	// }
	// value := rand.Intn(100)
	// fmt.Println("value: ", value)

	// var arr0 [5]int = [5]int{1, 2, 3}
	// var arr1 = [5]int{1, 2, 3, 4, 5}
	// var arr2 = [...]int{1, 2, 3, 4, 5, 6}
	// var str = [5]string{3: "hello world", 4: "tom"}

	// a := [3]int{1, 2}           // 未初始化元素值为 0。
	// b := [...]int{1, 2, 3, 4}   // 通过初始化值确定数组长度。
	// c := [5]int{2: 100, 4: 200} // 使用引号初始化元素。
	// d := [...]struct {
	// 	name string
	// 	age  uint8
	// }{
	// 	{"user1", 10}, // 可省略元素类型。
	// 	{"user2", 20}, // 别忘了最后一行的逗号。
	// }
	// fmt.Println(arr0, arr1, arr2, str)
	// fmt.Println(a, b, c, d)

	//var arr0 [5]int = [5]int{1, 2, 3}
	// var s1 []int
	// s2 := []int{}
	// var s3 []int = make([]int, 0)
	// fmt.Println(s1, s2, s3)
	// // 4.初始化赋值
	// var s4 []int = make([]int, 0, 0)
	// fmt.Println(s4)
	// s5 := []int{1, 2, 3}
	// fmt.Println(s5)
	// // 5.从数组切片
	// arr := [5]int{1, 2, 3, 4, 5}
	// var s6 []int
	// // 前包后不包
	// s6 = arr[1:4]
	// fmt.Println(s6)

	// var sliceMap = make(map[string][]string, 3)
	// fmt.Println(sliceMap)
	// fmt.Println("after init")
	// key := "中国"
	// value, ok := sliceMap[key]
	// fmt.Println(value, ok)
	// if !ok {
	// 	value = make([]string, 0, 2)
	// }
	// value = append(value, "北京", "上海")
	// sliceMap[key] = value
	// fmt.Println(sliceMap)

	// var arr [4]int
	// arr[2] = 9
	// PrintArr(&arr)
	// fmt.Println("a11: ", arr)

	// data := [...]int{0, 1, 2, 3, 4, 5}
	// s := data[2:4]
	// fmt.Printf("s %T \n", s)
	// fmt.Println("s len:", len(s), " cap:", cap(s))
	// fmt.Println("data len:", len(data), " cap:", cap(data))
	// s[0] += 100
	// s[1] += 200
	// fmt.Println(s)
	// fmt.Println(data)

	// data := [...]int{0, 1, 2, 3, 4, 10: 1}
	// s := data[2:4:5]
	// // s[0] = 90
	// // fmt.Println(s, data)
	// fmt.Println(data, len(data), cap(data))
	// fmt.Println(s, len(s), cap(s))
	// s = append(s, 100, 200) // 一次 append 两个值，超出 s.cap 限制。
	// fmt.Println("s:", s, len(s), cap(s))
	// fmt.Println(s, data)         // 重新分配底层数组，与原数组无关。
	// fmt.Println(&s[0], &data[0]) // 比对底层数组起始指针。

	// s1 := []int{1, 2, 3, 4, 5}
	// fmt.Printf("slice s1 : %v\n", s1)
	// s2 := make([]int, 10)
	// fmt.Printf("slice s2 : %v\n", s2)
	// copy(s2, s1)
	// //copy(s1, s2)
	// fmt.Printf("copied slice s1 : %v\n", s1)
	// fmt.Printf("copied slice s2 : %v\n", s2)

	result := "ddd"
	return result
}

func PrintArr(a *[4]int) {
	a[1] = 3
	fmt.Printf("a:%p \n", a)
	fmt.Println("a: ", a)
}

func Super1(s Saiyan) {
	s.Power += 10000
	//fmt.Println("s.Power: ", s.Power)
}

func Super2(s *Saiyan) {
	s.Power += 10000
	fmt.Println("s: ", s)
}

func Os() string {
	fmt.Println("DevNull：", os.DevNull)
	fmt.Println("Args: ", os.Args)
	// if len(os.Args) != 2 {
	// 	os.Exit(1)
	// }
	//fmt.Println("Environ: ", os.Environ())
	fmt.Println("Environ: ", os.Getuid())
	fmt.Println("Environ: ", os.Geteuid())
	fmt.Println("Environ: ", os.Getgid())
	fmt.Println("Environ: ", os.Getegid())
	fmt.Println("Environ: ", os.Getpid())

	result := "ok"
	return result
}

func Fmt(str string) string {
	fmt.Printf("str:%v", str)
	fmt.Println("========")

	api := "/path"
	number := 21
	fmt.Println("Get path api: ", api, "  number:", number)
	result := "ddd"
	var (
		name    string
		age     int
		married bool
	)
	fmt.Scan(&name, &age, &married)
	fmt.Printf("扫描结果 name:%s age:%d married:%t \n", name, age, married)
	return result
}
