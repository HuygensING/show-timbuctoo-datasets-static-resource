#!/bin/sh
NODE_ENV="${NODE_ENV:-development}"
echo "env=$NODE_ENV"
echo "server=$server"

if [ "$1" = "--watch" ]; then
	cmd="watchify"
	styluswatch="--watch"
else
	cmd="browserify"
	styluswatch=""
fi


mkdir -p "build/${NODE_ENV}/js"
cp -R src/static/* "build/${NODE_ENV}/"


node_modules/.bin/browserify \
	--transform [ envify --NODE_ENV="${NODE_ENV}" ] \
	--require react \
	--require react-dom > "build/${NODE_ENV}/js/react-graph-libs.js"

node_modules/.bin/$cmd src/index.js \
	--debug \
	--outfile "build/${NODE_ENV}/js/graph-index.js" \
	--external react \
	--external react-dom \
	--standalone ExcelImportMock \
	--transform [ babelify --presets [ es2015 react ] --plugins [ transform-es2015-destructuring transform-object-rest-spread transform-object-assign] ] \
	--transform [ envify --NODE_ENV="${NODE_ENV}" --server="$server" ] \
	--verbose
