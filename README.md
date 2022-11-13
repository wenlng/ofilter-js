<div align="center">
<h1>OfilterJS</h1>
<p>Data filter processor of Javascript object{}</p>
 <a href="https://www.npmjs.com/package/ofilterjs"><img src="https://img.shields.io/npm/v/ofilterjs.svg" alt="Downloads"></a>
 <a href="https://npmcharts.com/compare/ofilterjs?minimal=true"><img src="https://img.shields.io/npm/dm/ofilterjs.svg?sanitize=true" alt="Downloads"></a>
<a href="https://github.com/wenlng/ofilter-js/blob/master/LICENSE"><img src="https://img.shields.io/github/license/wenlng/ofilter-js.svg"/></a>
<a href="https://github.com/wenlng/ofilter-js"><img src="https://img.shields.io/github/stars/wenlng/ofilter-js.svg"/></a>
<a href="https://github.com/wenlng/ofilter-js"><img src="https://img.shields.io/github/last-commit/wenlng/ofilter-js.svg"/></a>
</div>

<br/>

> English | [中文](README_zh.md)
<p>🖖 OfilterJs is a data object {} filter processor for Javascript, which provides simpler, more convenient and more efficient data operations for development. </p>

<p> ⭐️ If it helps you, please give a star.</p>
<br/>

### Supported languages
- Javascript
- TypeScript

### Methods
- 🍑 filterValue
- 🍐 getValue
- 🍎 resetValue


### Install Module
``` shell
$ npm i ofilterjs
```
Or pnpm, Or cnpm, Or yarn ...
``` shells
$ pnpm i ofilterjs
```
<br/>

### Import Module
``` ts
 import ofjs from 'ofilterjs'
 
 // const ofjs = require('ofilterjs')
```
<br/>

### 1. Data Filter
filterValue([Object{}], [Config], ...[extraData])
#### 1.1 Filter or Recombine for data
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version_number: 10001
        }
    }
}

const newData = ofjs.filterValue(data, {
    name: 'lib.pkg.name',
    versionNumber: 'lib.pkg.version_number',
})
console.log(newData)

/** result
   newData = {
        name: 'ofilterjs',
        versionNumber: 10001
   } 
*/
```
<br/>

#### 1.2 Set value
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version_number: 10001
        }
    }
}

const newData = ofjs.filterValue(data, {
    name: 'lib.pkg.name',
    type: {
        value: 'type value'
    }
})
console.log(newData)

/** result
   newData = {
        name: 'ofilterjs',
        type: 'type value'
   } 
*/
```
<br/>

#### 1.3 Set default value
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version_number: 10001
        }
    }
}

const newData = ofjs.filterValue(data, {
    name: 'lib.pkg.name',
    alias: {
        key: 'lib.pkg.alias',
        default: 'Default alias'
    },
    type: {
        key: 'lib.pkg.type',
        default: 'Npm pkg'
    }
})
console.log(newData)

/** result
   newData = {
        name: 'ofilterjs',
        alias: 'Default alias',
        type: 'Npm pkg'
   } 
*/
```
<br/>

#### 1.4 Custom filter callback
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version_number: 10001
        }
    }
}

const newData = ofjs.filterValue(data, {
    name: 'lib.pkg.name',
    alias: {
        key: 'lib.pkg.alias',
        filter: (value, source) => {
            if (value !== '') return value
            return 'This is ' + (source?.lib?.pkg?.name || 'unknown')
        }
    },
    type: {
        key: 'lib.pkg.type',
        filter: (value, source) => {
            return 'Filter npm'
        }
    }
})
console.log(newData)

/** result
   newData = {
        name: 'ofilterjs',
        alias: 'This is ofilterjs',
        type: 'Filter npm'
   } 
*/
```
<br/>

#### 1.5 Merge data of filter return to result
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version_number: 10001
        }
    }
}

const newData = ofjs.filterValue(data, {
    name: 'lib.pkg.name',
    _: {
        merge: true,
        filter: (_, source) => {
            if (source.lib.pkg.name === 'ofilterjs') {
                return {
                   support: ['js', 'ts', 'es']
                }
            }
            return {}
        }
    },
    _1: {
        merge: true,
        filter: (_, source) => {
            return { more: 'more data ...' }
        }
    },
  }
})
console.log(newData)

/** result
   newData = {
        name: 'ofilterjs',
        support: ['js', 'ts', 'es'],
        more: 'more data ...'
   } 
*/
```
<br/>

#### 1.6 Merge extra data to result
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version_number: 10001
        }
    }
}

const newData = ofjs.filterValue(data, {
    name: 'lib.pkg.name'
  }
}, {
    name1: 'ofilter'
}, {
    name2: 'object filter'
})
console.log(newData)

/** result
   newData = {
        name: 'ofilterjs',
        name1: 'ofilter',
        name2: 'object filter'
   } 
*/
```
<br/>

### 2. Read Data
getValue([nameStr], [defaultValue])
#### 2.1 Read Value / Deep Read for value
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            version: 10001
        },
        support: ['js', 'ts', 'es']
    }
}

const name = ofjs.getValue('data.lib.pkg.name', 'unknown')
console.log(name)   // ofilterjs
```
<br/>

#### 2.2 Priority reading value
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version: 10001
        },
        support: ['js', 'ts', 'es']
    }
}

const alias = ofjs.getValue('data.lib.pkg.alias|data.lib.pkg.name', 'unknown')
console.log(name)   // ofilterjs
```

<br/>

#### 2.3 Array index read
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version: 10001
        },
        support: ['js', 'ts', 'es']
    }
}

const su = ofjs.getValue('data.lib.support.0', 'unknown')
console.log(su)   // js
```
<br/>

### 3. Reset Data
resetValue([Object{}], [Config,?Optional])
#### 3.1 Auto set at data type
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version: 10001
        },
        support: ['js', 'ts', 'es']
    }
}

ofjs.resetValue(data)

/**  result
const data = {
    lib: {
        pkg: {
            name: '',
            alias: '',
            version: 0
        },
        support: []
    }
}
*/
```
<br/>

#### 3.2 Configuration reset field
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version: 10001
        },
        support: ['js', 'ts', 'es']
    }
}

ofjs.resetValue(data, [
    'lib.pkg.name',
    'lib.pkg.version'
])

/**  result
const data = {
    lib: {
        pkg: {
            name: '',
            alias: '',
            version: 0
        },
        support: ['js', 'ts', 'es']
    }
}
*/
```
<br/>

#### 3.3 Configuration set data
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version: 10001
        },
        support: ['js', 'ts', 'es']
    }
}

// us ofilterjs
ofjs.resetValue(data, {
    'lib.pkg.name': 'newname',
    'lib.pkg.version': 10002
})

/** result
const data = {
    lib: {
        pkg: {
            name: 'newname',
            alias: '',
            version: 10002
        },
        support: ['js', 'ts', 'es']
    }
}
*/
```
<br/>

> Buy the author coffee: [http://witkeycode.com/sponsor](http://witkeycode.com/sponsor)
<br/>

## LICENSE
    MIT