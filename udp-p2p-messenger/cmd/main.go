package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"udptr"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Println("Usage: cmd [srv|cli]")
		os.Exit(1)
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	var err error
	switch os.Args[1] {
	case "srv":
		err = udptr.RunServer(ctx)
	case "cli":
		err = udptr.RunClient(ctx)
	default:
		fmt.Println("Invalid role. Use 'srv' or 'cli'")
		os.Exit(1)
	}

	if err != nil {
		log.Fatal(err)
	}
}
