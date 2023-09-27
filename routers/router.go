package routers

import (
	"test/controllers"

	beego "bee/server/web"
)

func init() {
	beego.Router("/", &controllers.MainController{})
}
