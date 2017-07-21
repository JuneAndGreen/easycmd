# easycmd

一个简单的命令行信息生成辅助工具。

> PS：暂时不支持子命令。

## 安装

```bash
npm install --save easycmd
```

## 使用方式

```javascript
const Eazycmd = require('../index');

let eazycmd = new Eazycmd({
    version: '0.0.1',
    help: `
        Usage: test [options] <filePath>

        Options:
            -h, --help                   输出使用指南
            -v, --version                输出版本信息
            -p, --proxy <proxy>          http代理
            -o <dirPath>                 自定义输出目录，默认为process.pwd()
            -r                           执行测试
            --xxx                        你别管我，快走！
            --yyy <name>                 我还有救，快去叫大夫！
    `,
    options: [
        { alias: 'p', name: 'proxy', hasParam: true },
        { alias: 'o', hasParam: true },
        { alias: 'r' },
        { name: 'xxx' },
        { name: 'yyy', hasParam: true },
    ]
});

eazycmd.run(['-v']); // 输出版本号
eazycmd.run(['-h']); // 输出帮助信息

console.log(eazycmd.run(['123', '--proxy', 'http://xxxx', '--xxx']));
/**
 * 输出内容如下：
 * 
 * {
 *      params: [ '123' ], // 命令外参数
 *      cmds: {
 *          p: 'http://xxxx', // 命中的命令别名，带参数
 *          proxy: 'http://xxxx', // 命中的命令名字，带参数
 *          xxx: true, // 命中的命令名字，无别名，不带参数
 *      }
 * }
 */
```

## 协议

MIT
