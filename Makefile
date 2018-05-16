SPEC_FLAGS=-R spec
COVERAGE_FLAGS=-R mocha-text-cov
BABEL=./node_modules/.bin/babel
LESSC=./node_modules/.bin/lessc
WEBPACK=./node_modules/.bin/webpack
WEBPACK_DEV_SERVER=./node_modules/.bin/webpack-dev-server
SOURCE=./src
LIB=./lib

dev:
	@mkdir -p $(LIB)
	@cp -Rfv $(SOURCE)/* $(LIB)
	@$(WEBPACK_DEV_SERVER) --config webpack.dev.js --open

build:
	@$(WEBPACK) --config webpack.build.js

publish:
	@$(WEBPACK) --config webpack.prod.js
	@mkdir -p $(LIB)
	@mkdir -p $(LIB)/styles
	@$(LESSC) $(SOURCE)/index.css $(LIB)/index.css
	@cp -Rfv $(SOURCE)/styles/*.css $(LIB)/styles
	@$(BABEL) src -d lib --no-comments

watch:
	@$(WEBPACK_DEV_SERVER) --config webpack.dev.js --open

clean:
	@if [ -d dist ]; then rm -r dist; fi
	@if [ -d lib ]; then rm -r lib; fi

.PHONY: dev build watch clean