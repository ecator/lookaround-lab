# AGENTS.md

## 项目背景

**LookaroundLab** 是一个面向初学者到进阶用户的正则表达式**断言(Lookaround)**学习网页应用,只讲断言相关内容:`^ $ \b \B`、`(?=)`、`(?!)`、`(?<=)`、`(?<!)`、断言叠加、零宽替换等。

- 纯静态站点:无构建、无框架、**不引用任何外部包或 CDN**,直接打开 `index.html` 即可运行。
- 界面支持中文 / 日语 / 英语,支持亮色 / 暗色 / 跟随系统主题。
- 文案风格为“灰原哀”:冷淡、略带毒舌;配色为深灰蓝加赤褐色。
- 共 9 章、23 道练习题,由浅入深,每章含讲解、可编辑的试验场和练习。

## 文件结构

| 文件 | 职责 |
| --- | --- |
| `index.html` | 页面骨架;内联脚本在渲染前设置主题以避免闪烁;依次加载 `locales.js`、`lib.js` |
| `style.css` | 全部样式;颜色均为 CSS 变量,`:root` 为暗色,`:root[data-theme="light"]` 覆盖为亮色 |
| `locales.js` | 所有语言相关文本(界面文字、各章讲解、练习题题面和提示、速查表)及语言检测,暴露 `window.LL_I18N` |
| `lib.js` | 与语言无关的课程数据(正则、测试用例、标准答案)、判题逻辑、进度存储、UI 渲染、路由、主题切换 |
| `favicon.svg` | 站点图标 |

## 架构要点

- **课程数据与文案分离**:`lib.js` 的 `LESSONS` 只保存 `id / emoji / level / demo / exercises`(含 `flags`、`cases`、`solution`、`need`、可选 `replace`)。文案放在 `locales.js` 的 `{ZH,JA,EN}_LESSONS[章节id]` 里,练习文案以练习 `id` 为键(`ex[exId] = {title, desc, hint}`)。
- **判题**:`checkExercise(ex, pattern)` 在每个用例上运行用户正则。匹配模式比较全部匹配结果数组;替换模式(有 `replace` 字段)比较 `text.replace(re, replace)` 的输出。`need` 列出必须出现在答案里的断言语法。返回错误时只给出 `{key, vars}`,由界面按当前语言翻译。
- **i18n**:`LL_I18N.t(key, vars)` 支持 `{name}` 占位符,缺失时回退到中文。语言优先读 localStorage,其次 `navigator.languages`,都无法判断时用中文。
- **路由**:基于 hash(`#/`、`#/lesson/<id>`、`#/lab`、`#/cheat`),`route()` 负责整页重绘。
- **主题**:模式为 `auto | light | dark`,通过 `<html data-theme>` 切换;`auto` 监听 `prefers-color-scheme`。
- **兼容 Node**:`lib.js` 和 `locales.js` 在 Node 下可 `require`(UI 部分在无 `document` 时不执行),便于脚本化验证。

## localStorage 键

- `lookaroundlab.progress.v1`:`{done, read, answers, tries}`,按练习 id 记录完成情况、已写答案、失败次数
- `lookaroundlab.lang`:`zh | ja | en`
- `lookaroundlab.theme`:`auto | light | dark`

## 修改约定

- 新增或修改练习后,必须验证所有 `solution` 都能通过自己的用例:

  ```
  node -e "const L=require('./lib.js');for(const l of L.LESSONS)for(const e of l.exercises)if(!L.checkExercise(e,e.solution).ok)console.log('FAIL',e.id)"
  ```

- 新增章节或练习时,**三种语言都要补齐文本**,章节 id、练习 id 在各语言中必须一致。
- 新增界面文字请加到三份 `*_UI` 中,不要在 `lib.js` 里写死。
- 颜色请使用 CSS 变量,不要写死色值,以保证两套主题都正常。
- 练习的测试文本(如 `苹果 5元`、`USD 30`)是判题数据的一部分,各语言下保持原样,不要翻译。
- 保持零外部依赖;`lib.js` 使用 ES5 风格的 `var` 和函数,但后行断言等正则特性要求现代浏览器(Safari 16.4+)。
