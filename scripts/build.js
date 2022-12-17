const args = require('minimist')(process.argv.slice(2))
const {resolve} = require('path')
const {build} = require('esbuild')

const pkg = require(resolve(__dirname, `../package.json`))
const pkgName =  pkg.name || 'ofilterjs'
const target = args._[0] || pkgName
const format = args.f || 'global'


// iife 立即执行函数              (function(){})()
// cjs  node中的模块              module.exports
// esm  浏览器中的esModule模块     import
const outputFormat = format.startsWith('global') ? 'iife' : format === 'cjs' ? 'cjs' : 'esm'

const outfile = resolve(__dirname, `../dist/${target}.${format}.js`)
build({
    entryPoints: [resolve(__dirname, `../lib/index.js`)],
    outfile,
    bundle: true,
    sourcemap: true,
    format: outputFormat,
    globalName: pkgName,
    platform: format === 'cjs' ? 'node' : 'browser'
}).then(() => {
    console.log(`>>>> ${pkgName} [${outputFormat}] build done ~~~`)
})

const outfileMin = resolve(__dirname, `../dist/${target}.${format}.min.js`)
build({
    entryPoints: [resolve(__dirname, `../lib/index.js`)],
    outfile: outfileMin,
    bundle: true,
    sourcemap: false,
    format: outputFormat,
    globalName: pkgName,
    platform: format === 'cjs' ? 'node' : 'browser',
    minify: true
}).then(() => {
    console.log(`>>>> ${pkgName} [${outputFormat}] min build done ~~~`)
})
