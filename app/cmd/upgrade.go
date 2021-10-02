package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
	"github.com/sysfun-ai/dada/app"
)

func init() {
	rootCmd.AddCommand(upgradeCmd)
}

var upgradeCmd = &cobra.Command{
	Use:   "upgrade",
	Short: "Print the upgrade number of Dada",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("dada " + app.Version + " (" + app.GitRev + ")")
	},
}
