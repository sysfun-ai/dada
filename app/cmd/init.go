package cmd

import (
	"fmt"
	"log"
	"os/exec"

	"github.com/spf13/cobra"
)

func init() {
	rootCmd.AddCommand(initCmd)
}

var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Generate react project by dada template",
	Run: func(cmd *cobra.Command, args []string) {
		// clone dada repo
		fmt.Println("🏀 Downloading template...")
		if err := exec.Command("git", "clone", "https://github.com/sysfun-ai/dada.git").Run(); err != nil {
			log.Fatalln(err)
		}
		// copy template
		fmt.Println("🏀 Generating react project...")
		if err := exec.Command("cp", "-Rp", "./dada/template.react/", ".").Run(); err != nil {
			log.Fatalln(err)
		}
		// delete dada
		fmt.Println("🏀 Cleaning temp data...")
		if err := exec.Command("rm", "-rf", "./dada").Run(); err != nil {
			log.Fatalln(err)
		}
		// yarn install
		fmt.Println("🏀 Syncing npm packages...")
		if err := exec.Command("yarn").Run(); err != nil {
			log.Fatalln(err)
		}
		// notice
		fmt.Println("✅ Done!")
		fmt.Println("🚀 Thanks for using Dada 🐶, use `yarn start` to launch your project")
	},
}
