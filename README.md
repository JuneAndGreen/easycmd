# easycmd

一个简单的命令行信息生成辅助工具。

> PS：暂时不支持子命令。

## 安装

```bash
npm install --save easycmd
```

## 使用方式

```javascript
const Easycmd = require('easycmd');

let easycmd = new Easycmd({
    version: '0.0.1', // 版本信息
    help: `
        Usage: abc [options] <cba>

        Options:
            -h, --help                   输出使用指南
            -v, --version                输出版本信息
            -p, --proxy <proxy>          aaa
            -o <dirPath>                 bbb
            -r                           ccc
            --xxx                        ddd
            --yyy <name>                 eee
    `, // 帮助信息
    options: [
        // alias - 命令别名
        // name - 命令名字
        // hasParam - 是否带参数
        { alias: 'p', name: 'proxy', hasParam: true },
        { alias: 'o', hasParam: true },
        { alias: 'r' },
        { name: 'xxx' },
        { name: 'yyy', hasParam: true },
    ]
});

easycmd.run(['-v']); // 输出版本号
easycmd.run(['-h']); // 输出帮助信息

let result = easycmd.run(['123', '--proxy', 'http://xxxx', '--xxx']);
/**
 * result内容如下：
 * 
 * {
 *      params: [ '123' ], // 命令外参数
 *      cmds: [
 *          {
 *              alias: 'p',
 *              name: 'proxy',
 *              hasParam: true,
 *              value: 'http://xxxx', // 命中的命令别名，带参数
 *          },
 *          {
 *              name: 'xxx',
 *              value: true,
 *          }
 *      ]
 * }
 */
```

## 协议

MIT
