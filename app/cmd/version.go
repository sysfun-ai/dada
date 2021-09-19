package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
	"github.com/sysfun-ai/dada/app"
)

func init() {
	rootCmd.AddCommand(versionCmd)
}

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version number of Dada",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("dada " + app.Version + " (" + app.GitRev + ")")
	},
}
