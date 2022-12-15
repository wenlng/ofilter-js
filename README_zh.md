<div align="center">
<img width="120" style="padding-top: 50px" src="http://47.104.180.148/ofilterjs/ofilterjs_logo.svg"/>
<h1 style="margin: 0; padding: 0">OfilterJS</h1>
<p>Javascript 数据对象过滤处理器</p>
 <a href="https://www.npmjs.com/package/ofilterjs" alt="Version"><img src="https://img.shields.io/npm/v/ofilterjs.svg" alt="Downloads"></a>
 <a href="https://npmcharts.com/compare/ofilterjs?minimal=true"><img src="https://img.shields.io/npm/dm/ofilterjs.svg?sanitize=true" alt="Downloads"></a>
<a href="https://github.com/wenlng/ofilter-js/blob/master/LICENSE"><img src="https://img.shields.io/github/license/wenlng/ofilter-js.svg"/></a>
<a href="https://github.com/wenlng/ofilter-js"><img src="https://img.shields.io/github/stars/wenlng/ofilter-js.svg"/></a>
<a href="https://github.com/wenlng/ofilter-js"><img src="https://img.shields.io/github/last-commit/wenlng/ofilter-js.svg"/></a>
</div>

<br/>

> [English](README.md) | 中文
<p>🖖 <a href="https://github.com/wenlng/ofilter-js">OfilterJs</a> 是一个用于 Javascript 的数据对象{}过滤处理器，为开发提供更简单、便捷、高效的数据操作。</p>

<p> ⭐️ 如果能够帮助到你，记得随手点一个star。</p>

- [https://github.com/wenlng/ofilter-js](https://github.com/wenlng/ofilter-js)

### 支持语言
- Javascript
- TypeScript

### 功能
- 🍑 filterValue 过滤数据
- 🍐 getValue 读取数据
- 🍎 resetValue 重置数据

### 安装模块
``` shell
$ npm i ofilterjs
```
或其他 pnpm、cnpm、yarn ...
``` shell
$ pnpm i ofilterjs
```
<br/>

### 引入模块
``` ts
 import ofjs from 'ofilterjs'
 
 // const ofjs = require('ofilterjs')
```
<br/>

### 一、数据过滤
> filterValue([数据对象], [配置项], ...[扩展数据])

#### 1.1 过滤/重组数据
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

/** 结果
   newData = {
        name: 'ofilterjs',
        versionNumber: 10001
   } 
*/
```
<br/>

#### 1.2 直接指定值
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

/** 结果
   newData = {
        name: 'ofilterjs',
        type: 'type value'
   } 
*/
```
<br/>

#### 1.3 设置默认值
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

/** 结果
   newData = {
        name: 'ofilterjs',
        alias: 'Default alias',
        type: 'Npm pkg'
   } 
*/
```
<br/>

#### 1.4 自定义过滤回调
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

/** 结果
   newData = {
        name: 'ofilterjs',
        alias: 'This is ofilterjs',
        type: 'Filter npm'
   } 
*/
```
<br/>

#### 1.5 合并到结果集
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
            if (source?.lib?.pkg?.name === 'ofilterjs') {
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

/** 结果
   newData = {
        name: 'ofilterjs',
        support: ['js', 'ts', 'es'],
        more: 'more data ...'
   } 
*/
```
<br/>

#### 1.6 合并扩展数据
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

/** 结果
   newData = {
        name: 'ofilterjs',
        name1: 'ofilter',
        name2: 'object filter'
   } 
*/
```
<br/>

### 二、数据读取
> getValue([名称访问字符串], [默认值])

#### 2.1 值读取 / 深度读取
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

// 原始方式
const name = data && data['lib'] && data['lib']['name'] && data['lib']['pkg']['name'] || 'unknown'
console.log(name)   // ofilterjs

// es6的 ?. 方式
const name = data?.lib?.pkg?.name || 'unknown'
console.log(name)   // ofilterjs

// 使用 ofilterjs 方式
const name = ofjs.getValue(data, 'lib.pkg.name', 'unknown')
console.log(name)   // ofilterjs
```
<br/>

#### 2.2 优先读取值
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

// 原始方式
const currnet = data && data['lib'] && data['lib']['pkg'] || {}
const alias = currnet['alias'] || currnet['name'] || 'unknown'
console.log(alias)   // ofilterjs

// es6的 ?. 方式
const alias = data?.lib?.pkg?.alias || data?.lib?.pkg?.name || 'unknown'
console.log(alias)   // ofilterjs

// 使用 ofilterjs 方式
const alias = ofjs.getValue(data, 'lib.pkg.alias|lib.pkg.name', 'unknown')
console.log(name)   // ofilterjs
```

<br/>

#### 2.3 数组索引下标读取
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

// 原始方式
const support = data && data['lib'] && data['lib']['support'] || {}
const su = support[0] || 'unknown'
console.log(su)   // js

// es6的 ?. 方式
const su = data?.lib?.support?.[0] || 'unknown'
console.log(su)   // js

// 使用 ofilterjs 方式
const su = ofjs.getValue(data, 'lib.support.0', 'unknown')
console.log(su)   // js
```
<br/>

### 三、数据重置
> resetValue([数据对象], [配置，可选])

Tip: 默认情况下属性名带有 '_' 前缀的将不会参与自动重置，但可以使用手动配置指定.

#### 3.1 自动识别值类型重置值
浅重置（第一层有效）
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version: 10001
        },
        support: ['js', 'ts', 'es'],
        _private: 'private attr' 
    },
    lib2: {
        pkg: {}
    }
}

ofjs.resetValue(data, false)

/**  结果
const data = {
    lib: {},
    lib2: {}
}
*/
```

深重置（默认所有层有效）
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version: 10001
        },
        support: ['js', 'ts', 'es'],
        _private: 'private attr' 
    },
    lib2 : {
        pkg: {
            name: 'ofilter'
        }
    }
}

ofjs.resetValue(data, true)

/**  结果
const data = {
    lib: {
        pkg: {
            name: '',
            alias: '',
            version: 0
        },
        support: [],
        _private: 'private attr' 
    },
    lib2 : {
        pkg: {
            name: ''
        }
    }
}
*/
```

深重置 - 指定深度层数，不指定起始位置（默认从0开始）
``` ts
const data = {
    // 0层
    name: 'lib_list',
    lib: {
        // 1层
        type: 'npm',
        pkg: {
            // 2层
            name: 'ofilterjs',
            alias: '',
            version: 10001
        },
        support: {
            'js' : 'javascript',
            'ts' : 'typescript'
        },
        _private: 'private attr' 
    },
    lib2 : {
        type: 'npm',
        pkg: {
            name: 'ofilter'
        }
    }
}

// 2代表深度为2个层数，表示：0 ~ (0+2)，不包含(0+2)
ofjs.resetValue(data, true, 2)

/**  结果
const data = {
    // 0层
    name: '',   // 被重置
    lib: {
        // 1层
        type: '',   // 被重置
        pkg: {
            // 2层
            name: 'ofilterjs',
            alias: '',
            version: 10001
        },
        support: {
            'js' : 'javascript',
            'ts' : 'typescript'
        },
        _private: 'private attr' 
    },
    lib2 : {
        type: '',   // 被重置
        pkg: {
            name: 'ofilter'
        }
    }
}
*/
```


深重置 - 指定深度层数，也指定起始位置
``` ts
const data = {
    // 0层
    name: 'lib_list',
    lib: {
        // 1层
        type: 'npm',
        pkg: {
            // 2层
            name: 'ofilterjs',
            alias: '',
            version: 10001,
            support: {
                 // 3层
                'js' : 'javascript',
                'ts' : 'typescript'
            }
        },
        _private: 'private attr' 
    },
    lib2 : {
        type: 'npm',
        pkg: {
            name: 'ofilter'
        }
    }
}

// 2代表深度为2个层数，表示：1 ~ (1+2)，不包含(1+2)
ofjs.resetValue(data, true, 2, 1)

/**  结果
const data = {
    // 0层
    name: 'lib_list',
    lib: {
        // 1层
        type: '',   // 被重置
        pkg: {
            // 2层
            name: '',   // 被重置
            alias: '',  // 被重置
            version: 0, // 被重置
            support: {
                 // 3层
                'js' : 'javascript',
                'ts' : 'typescript'
            }
        },
        _private: 'private attr' 
    },
    lib2 : {
        type: '',   // 被重置
        pkg: {
            name: ''    // 被重置
        }
    }
}
*/
```
<br/>

#### 3.2 手动指定重置字段
``` ts
const data = {
    lib: {
        pkg: {
            name: 'ofilterjs',
            alias: '',
            version: 10001
        },
        support: ['js', 'ts', 'es'],
        _private: 'private attr' 
    }
}

ofjs.resetValue(data, [
    'lib.pkg.name',
    'lib.pkg.version',
    'lib.pkg._private'
])

/**  结果
const data = {
    lib: {
        pkg: {
            name: '',
            alias: '',
            version: 0
        },
        support: ['js', 'ts', 'es'],
        _private: '' 
    }
}
*/
```
<br/>

#### 3.3 手动配置字段设置指定的值
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

ofjs.resetValue(data, {
    'lib.pkg.name': 'newname',
    'lib.pkg.version': 10002
})

/** 结果
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

> 请作者喝杯咖啡: [http://witkeycode.com/sponsor](http://witkeycode.com/sponsor)
<br/>

## LICENSE
    MIT