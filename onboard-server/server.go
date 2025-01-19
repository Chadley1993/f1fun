package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"measure-it.com/central-server/controllers"
)

func main() {
	fmt.Println("Starting server...")
	router := gin.Default()

	router.GET("/carData", controllers.GetCarData)
	router.POST("/sensorData", controllers.PostSensorData)

	router.POST("/simulator", controllers.PostStartSimulator)
	router.PATCH("/simulator", controllers.PatchSimulator)
	router.DELETE("/simulator", controllers.DeleteSimulator)

	router.Run("localhost:8080")
}
