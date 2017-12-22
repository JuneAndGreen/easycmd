'use strict';

const Easycmd = require('../index');

let easycmd = new Easycmd({
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

console.log('----------------------【1】----------------------');
console.log(easycmd.run([]));
console.log('----------------------【2】----------------------');
console.log(easycmd.run(['-v']));
console.log('----------------------【3】----------------------');
console.log(easycmd.run(['--version']));
console.log('----------------------【4】----------------------');
console.log(easycmd.run(['-h', '--xxx']));
console.log('----------------------【5】----------------------');
console.log(easycmd.run([['123', '342'], '-p', 'http://xxxx', '542']));
console.log('----------------------【6】----------------------');
console.log(easycmd.run(['123', '--proxy', 'http://xxxx', '-o', './']));
console.log('----------------------【7】----------------------');
console.log(easycmd.run(['-p', 'http://xxxx', '-o', './', '--xxx', '--yyy', 'june']));
console.log('----------------------【8】----------------------');
console.log(easycmd.run(['123123']));