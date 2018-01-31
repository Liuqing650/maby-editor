SPEC_FLAGS=-R spec
COVERAGE_FLAGS=-R mocha-text-cov
WEBPACK=./node_modules/.bin/webpack
WEBPACK_DEV_SERVER=./node_modules/.bin/webpack-dev-server
SOURCE=./src
LIB=./lib

dev:
	@$(WEBPACK_DEV_SERVER) --config webpack.dev.js --open
	@mkdir -p $(LIB)
	@cp -Rfv $(SOURCE)/* $(LIB)

build:
	@$(WEBPACK) --config webpack.prod.js
	@mkdir -p $(LIB)
	@cp -Rfv $(SOURCE)/* $(LIB)

watch:
	@$(WEBPACK) --watch --config webpack.dev.js

clean:
	@if [ -d dist ]; then rm -r dist; fi
	@if [ -d lib ]; then rm -r lib; fi

.PHONY: dev build watch clean