package app

var (
	Version = ""
	GitRev  = ""
)

func SetVersion(v string) {
	Version = v
}

func SetGitRev(v string) {
	GitRev = v
}
