SHELL := /bin/bash

validate: ## Validate a given endpoint request or response
	@node compiler/run-validations.js --api $(api) --type $(type) --stack-version $(stack-version)

validate-no-cache: ## Validate a given endpoint request or response without local cache
	@node compiler/run-validations.js --api $(api) --type $(type) --stack-version $(stack-version) --no-cache

license-check:	## Add the license headers to the files
	@echo ">> checking license headers .."
	.github/check-license-headers.sh

license-add:	## Add the license headers to the files
	@echo ">> adding license headers .."
	.github/add-license-headers.sh

spec-format-check:	## Check specification formatting rules
	@npm run format:check --prefix compiler

spec-format-fix:	## Format/fix the specification according to the formatting rules
	@npm run format:fix --prefix compiler

spec-generate:	  ## Generate the output spec
	@echo ">> generating the spec .."
	@npm run generate-schema --prefix compiler
	@npm run start --prefix typescript-generator

spec-compile:	## Compile the specification
	@npm run compile:specification --prefix compiler

spec-imports-fix:	## Fix the TypeScript imports
	@npm run imports:fix --prefix compiler -- --rebuild

spec-dangling-types:	## Generate the dangling types rreport
	@npm run generate-dangling --prefix compiler

setup:	## Install dependencies for contrib target
	@make clean-dep
	@npm install --prefix compiler
	@npm install --prefix typescript-generator

clean-dep:	## Clean npm dependencies
	@rm -rf compiler/node_modules
	@rm -rf typescript-generator/node_modules

contrib: | spec-generate license-check spec-format-fix 	## Pre contribution target

help:  ## Display help
	@awk 'BEGIN {FS = ":.*##"; printf "Usage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
#------------- <https://suva.sh/posts/well-documented-makefiles> --------------

.DEFAULT_GOAL := help
