package routers

import (
	"test/controllers"

	beego "beego/server/web"
)

func init() {
	beego.Router("/", &controllers.MainController{})
}
