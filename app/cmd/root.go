package cmd

import (
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "dada",
	Short: "Dada is a react project generator",
	Long: `Dada

A modern react project generator, with optimized webpack5 configuration.
Complete documentation is available at https://dada.sysfun.com`,
	Run: func(cmd *cobra.Command, args []string) {
		_ = cmd.Help()
	},
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}
