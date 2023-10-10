/**
  feat:新增功能
  fix:修复bug
  docs:文档更新
  style: 代码格式修改
  refactor: 重构代码
  test: 测试用例修改
  build: 构建系统或包依赖修改
  ci: CI/CD 配置修改
  chore: 其他杂项修改
  revert: 回滚到上一版本
  perf: 性能优化
 */

module.exports = {

    // 使用 @commitlint/config-conventional规则
    extends: ['@commitlint/config-conventional'],

    // 定义验证规则
    // rules: {

    //     // header最大94字符
    //     'header-max-length': [0, 'always', 94],

    //     // subject不能为空
    //     'subject-empty': [2, 'never'],

    //     // type的类型必须在指定范围内
    //     'type-enum': [
    //         2,
    //         'always',
    //         ['build', 'ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']
    //     ],

    //     // type不能为空
    //     "type-empty": [2, 'never'],

    //     // type必须小写
    //     "type-case": [2, "always", 'lowerCase'],

    //     // scope 不能为空
    //     "scope-empty": [0, "never"],

    //     // scope 必须小写
    //     "scope-case": [2, "always", "lowerCase"],

    //     // scope 不限制类型
    //     "scope-enum": [2, "always", []]

    // }

};
