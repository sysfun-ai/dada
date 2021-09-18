### Define

PROJECT = smk-ec

SSH = root@common004.sysfun.cn
KEY = ~/Documents/keys/sysfunazure.pem
OUTPUT_DIR = ./build
CONFIG_DIR = ./conf
REMOTE_DIR = ~/jmart
REMOTE_CONFIG_DIR = $(REMOTE_DIR)/conf
REMOTE_WEBSITE_DIR = $(REMOTE_DIR)/ec-old

CONFIG_TARGET = $(SSH):$(REMOTE_CONFIG_DIR)
WEBSITE_TARGET = $(SSH):$(REMOTE_WEBSITE_DIR)

### Commands

.PHONY: build
build: clear
	$(info [ make ] 正在构建生产模式 $(PROJECT))
	@yarn build

.PHONY: dev
dev:
	$(info [ make ] 正在启动开发模式 $(PROJECT))
	@yarn start

.PHONY: devcl
devcl: clear
	$(info [ make ] 正在启动开发模式 - 重建缓存 $(PROJECT))
	@yarn start

.PHONY: clear
clear:
	$(info [ make ] 正在清理缓存文件夹 [ .linaria, node_modules/.cache ])
	@rm -rf ./.linaria-cache
	@rm -rf ./node_modules/.cache

.PHONY: conf
conf:
	$(info [ make ] 正在向服务器 $(CONFIG_TARGET) 传输 $(PROJECT) 配置文件)
	@rsync -av -e 'ssh -i $(KEY)' $(CONFIG_DIR)/* $(CONFIG_TARGET)

.PHONY: update
update: build
	$(info [ make ] 正在向服务器 $(WEBSITE_TARGET) 传输 $(PROJECT))
	@ssh -i $(KEY) $(SSH) "rm -rf $(REMOTE_WEBSITE_DIR) && mkdir -p '$(REMOTE_WEBSITE_DIR)'"
	@rsync -av -e 'ssh -i $(KEY)' $(OUTPUT_DIR)/* $(WEBSITE_TARGET)
