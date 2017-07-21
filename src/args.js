'use strict';

class Args {
    constructor(config = {}) {
        this.options = config.options || [];
        this.cmds = [];
        this.params = [];

        // 检查帮助信息和版本信息
        if (!config.help && typeof config.help !== 'string') {
            throw new Error('help is required');
        }

        if (!config.version && typeof config.version !== 'string') {
            throw new Error('version is required');
        }

        this.helpInfo = config.help;
        this.versionInfo = config.version;
    }

    // 执行
    run(args) {
        // 参数必须是数组
        if (!args || !Array.isArray(args)) {
            throw new Error('args is required and it must be an array');
        }

        this.cmds = [];
        this.params = [];

        if(!args.length) {
            this.help();
        } else if(args.length >= 1) {
            for (let i = 0, len = args.length; i < len; i++) {
                let arg = args[i];

                if (typeof arg === 'string') {
                    arg = arg.trim();

                    if (/\-{1,2}[a-zA-Z]/.test(arg)) {
                        // 配置参数
                        let useNextArg = this.setArg(arg, args[i + 1]);
                        if (useNextArg) i++;
                    } else {
                        // 非配置参数
                        this.params.push(arg);
                    }
                } else if (arg instanceof Array) {
                    // 非配置参数
                    this.params = this.params.concat(arg);
                }
            }
        }

        if (this.printHelp) {
            this.help();
        } else if (this.printVersion) {
            this.version();
        }

        return {
            params: [].concat(this.params),
            cmds: [].concat(this.cmds)
        };
    }

    // 设置指令和参数
    setArg(arg, nextArg) {
        let useNextArg = false;

        if (arg === '-h' || arg === '--help') {
            // 帮助信息
            this.cmds.push({ name: 'help', alias: 'h' });
            this.printHelp = true;
        } else if (arg === '-v' || arg === '--version') {
            // 版本信息
            this.cmds.push({ name: 'version', alias: 'v' });
            this.printHelp = true;
        } else {
            // 其他配置参数
            let options = this.options;
            let hitOption;

            // 查找命中配置参数
            for (let option of options) {
                let alias = option.alias; // 别名
                let name = option.name; // 正式名称

                if ((alias && arg === ('-' + alias)) || (name && arg === ('--' + name))) {
                    hitOption = option;
                    break;
                }
            }

            if (hitOption) {
                let value = hitOption.hasParam ? nextArg : true;
                useNextArg = hitOption.hasParam; // 标记是否使用了下一个参数

                let copyOption = Object.assign({}, hitOption);
                copyOption.value = value;
                this.cmds.push(copyOption);
            }
        }

        return useNextArg;
    }

    // 帮助信息
    help() {
        console.log(this.helpInfo);
    }

    // 版本信息
    version() {
        console.log(this.versionInfo);
    }

}

module.exports = Args;
