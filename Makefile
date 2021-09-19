GO_PACKAGE_PATH := github.com/sysfun-ai/dada
GIT_TAG := $(shell git describe)
GIT_HEAD := $(shell git rev-parse --short HEAD)
BUILD_LDFLAGS := "-X $(GO_PACKAGE_PATH)/app.Version=$(GIT_TAG) -X $(GO_PACKAGE_PATH)/app.GitRev=$(GIT_HEAD)"
SOURCE_DIR := ./cmd/dada
BUILD_DIR := ./build
BUILD_APP := dada
OUTPUT := $(BUILD_DIR)/$(BUILD_APP)

PHONE: tidy
tidy:
	$(info checking golang package dependencies...)
	@go mod tidy

PHONY: build
build: tidy
	$(info start building...)
	@cd $(SOURCE_DIR) && go build -ldflags $(BUILD_LDFLAGS) -o ./$(BUILD_APP)
	@mv $(SOURCE_DIR)/$(BUILD_APP) $(OUTPUT)

PHONE: ver
ver:
	$(info generating version info...)
	@npx standard-version

PHONY: release
release: ver build
