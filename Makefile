SPEC_FLAGS=-R spec
COVERAGE_FLAGS=-R mocha-text-cov
BABEL=./node_modules/.bin/babel
WEBPACK=./node_modules/.bin/webpack
WEBPACK_DEV_SERVER=./node_modules/.bin/webpack-dev-server
SOURCE=./src
LIB=./lib

dev:
	@$(WEBPACK_DEV_SERVER) --config webpack.config.js --open

build:
	@$(WEBPACK) --config webpack.config.js --define process.env.NODE_ENV="'production'"

publish:
	@$(WEBPACK) --config webpack.config.js --define process.env.NODE_ENV="'production'"
	@mkdir -p $(LIB)
	@cp -Rfv $(SOURCE)/index.less $(LIB)
	@$(BABEL) src --out-dir lib

watch:
	@$(WEBPACK_DEV_SERVER) --config webpack.config.js --open

clean:
	@if [ -d dist ]; then rm -r dist; fi
	@if [ -d lib ]; then rm -r lib; fi

.PHONY: dev build watch clean