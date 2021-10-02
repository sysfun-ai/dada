package main

import (
	"github.com/sysfun-ai/dada/app"
	"github.com/sysfun-ai/dada/app/cmd"
)

var (
	version = "dev"
	commit  = "none"
)

func main() {
	app.SetVersion(version)
	app.SetGitRev(commit)
	cmd.Execute()
}
