(function (root) {
  'use strict';
  var R = String.raw;

  /* ===== 中文 · 课程文本 ===== */
  var ZH_LESSONS = {
    l1: {
      title: "断言是什么?位置侦探登场", short: "断言是什么?位置侦探登场", summary: "认识\"零宽\"——断言匹配的不是字符,而是缝隙。",
      body: R`
<div class="story"><b>🧪 灰原的笔记:</b>普通正则像抓人的警察,抓到谁就带走谁。断言不一样——它只确认“这个位置前后是什么样”,然后什么都不拿走。……别指望我讲得多温柔,认真听就行。</div>
<h2>零宽:匹配"缝隙"而不是"字符"</h2>
<p>字符串 <code>cat</code> 里有 4 个位置(缝隙):<code>|c|a|t|</code>。断言匹配的就是这些缝隙,所以它的匹配结果长度为 <b>0</b>,叫做<b>零宽断言</b>。下面试验场里,青色竖线 <span class="hl"><span class="zw"></span></span> 就代表一个零宽匹配。</p>
<h2>最先认识的四位"老牌断言"</h2>
<table class="t"><tr><th>断言</th><th>含义</th><th>形象比喻</th></tr>
<tr><td><code>^</code></td><td>字符串开头(加 <code>m</code> 标志则为每行开头)</td><td>起跑线</td></tr>
<tr><td><code>$</code></td><td>字符串结尾(加 <code>m</code> 则为每行结尾)</td><td>终点线</td></tr>
<tr><td><code>\b</code></td><td>单词边界:一侧是 <code>\w</code>,另一侧不是</td><td>单词的"围栏"</td></tr>
<tr><td><code>\B</code></td><td>非单词边界</td><td>单词的"内部"</td></tr></table>
<div class="tip"><b>💡</b>试验场里把 <code>\bcat\b</code> 改成 <code>cat</code>,看看 <code>concat</code> 里的 cat 会不会被"误伤"。</div>
<div class="note"><b>📝</b>注意:JS 里 <code>\w</code> 只含 <code>[A-Za-z0-9_]</code>,所以中文字符两侧不会被 <code>\b</code> 当作单词边界(中文都算"非单词字符")。</div>`,
      ex: {
        "e1-1": { title: "只要独立的 cat", desc: "匹配单独成词的 <code>cat</code>,<code>concat</code>、<code>cats</code> 里的不要。", hint: "在两侧都加上单词边界 <code>\\b</code>。" },
        "e1-2": { title: "整行都是数字", desc: "用多行模式,匹配<b>整行</b>只由数字组成的行。", hint: "<code>^</code> 和 <code>$</code> 把一整行\"夹\"起来。" },
        "e1-3": { title: "藏在单词中间的 cat", desc: "只匹配\"不在单词开头\"的 <code>cat</code>(例如 concat 里的),<code>cat</code>、<code>category</code> 开头的不要。", hint: "<code>\\B</code> 表示\"不是单词边界\",放在 cat 前面。" }
      }
    },
    l2: {
      title: "正向先行断言 (?=…):向前看一眼", short: "正向先行断言 ", summary: "\"我要找 X,但 X 后面必须跟着 Y。\"",
      body: R`
<div class="story"><b>🧪 灰原的笔记:</b>你想买“后面标着<b>元</b>的数字”,却不想把“元”也带回家。<code>(?=元)</code> 就是先瞄一眼:瞄完,位置原地不动。侦探总说“真相只有一个”,断言只负责确认,不负责拿走。</div>
<h2>语法</h2>
<div class="codeblock"><pre>X(?=Y)    匹配 X,前提是 X 后面紧跟 Y(Y 不会被匹配进结果)</pre></div>
<p>例:<code>\d+(?=元)</code> 作用于 <code>苹果5元</code> → 结果只有 <code>5</code>,"元"仍留在原处,等待后续匹配。</p>
<h2>它为什么叫"零宽"?</h2>
<p>因为 <code>(?=元)</code> 检查完后,匹配位置并没有前进。所以 <code>a(?=b)b</code> 能匹配 <code>ab</code>——b 被"看"了一次,又被"吃"了一次。</p>
<div class="tip"><b>💡</b>对比 <code>\d+元</code>:结果会包含"元"。需要只拿数字、又要保证后面是"元"时,就用先行断言。</div>`,
      ex: {
        "e2-1": { title: "只取\"元\"前面的数字", desc: "从文本中取出后面紧跟\"元\"的数字(不含\"元\")。", hint: "<code>\\d+(?=元)</code> 的格式。" },
        "e2-2": { title: "Java 还是 JavaScript?", desc: "只匹配\"后面跟着 Script\"的 <code>Java</code>(结果只有 Java 四个字母)。", hint: "<code>Java(?=Script)</code>" }
      }
    },
    l3: {
      title: "负向先行断言 (?!…):前方禁止通行", short: "负向先行断言 ", summary: "\"X 后面不能是 Y。\"",
      body: R`
<div class="story"><b>🧪 灰原的笔记:</b>“可以进,但后面不能跟着 bar。”这就是 <code>(?!…)</code>。组织里的守卫也是这么放人的——只是我们这里不会有人被灭口。</div>
<h2>语法</h2>
<div class="codeblock"><pre>X(?!Y)    匹配 X,前提是 X 后面<b>不是</b> Y</pre></div>
<h2>杀手锏:整行排除</h2>
<p>把 <code>^(?!…)</code> 放在行首,可以表达"整行里<b>不能出现</b>某内容":</p>
<div class="codeblock"><pre>^(?!.*\.exe$).+$      匹配所有不以 .exe 结尾的行</pre></div>
<p>读法:从行首出发,先向前看——"从这里往后,任意长度的内容再加 <code>.exe</code> 结尾"成立吗?成立就一票否决;否则放行,用 <code>.+</code> 取走整行。</p>
<div class="warn"><b>⚠️</b>负向断言能读到的只有"位置之后的内容"。<code>^(?!.*x)</code> 里的 <code>.*</code> 是为了让它能看到整行,别忘了。</div>`,
      ex: {
        "e3-1": { title: "不跟 bar 的 foo", desc: "匹配后面<b>不是</b> <code>bar</code> 的 <code>foo</code>。", hint: "<code>foo(?!bar)</code>" },
        "e3-2": { title: "排除 .exe 文件", desc: "多行模式下,匹配所有<b>不以 .exe 结尾</b>的整行。", hint: "行首 <code>^</code> 后接 <code>(?!.*\\.exe$)</code>,最后 <code>.+$</code>。" }
      }
    },
    l4: {
      title: "正向后行断言 (?<=…):回头看一眼", short: "正向后行断言 ", summary: "\"我要找 X,但 X 前面必须是 Y。\"",
      body: R`
<div class="story"><b>🧪 灰原的笔记:</b>先行是向前看,后行就是<b>回头看</b>。想拿到 <code>$</code> 后面的金额,又不想把 <code>$</code> 一起拿走,就先回头确认一眼。过去的事,看一眼就够了。</div>
<h2>语法</h2>
<div class="codeblock"><pre>(?&lt;=Y)X    匹配 X,前提是 X 前面紧挨着 Y</pre></div>
<table class="t"><tr><th></th><th>肯定(必须有)</th><th>否定(不能有)</th></tr>
<tr><td>向前看</td><td><code>(?=…)</code></td><td><code>(?!…)</code></td></tr>
<tr><td>回头看</td><td><code>(?&lt;=…)</code></td><td><code>(?&lt;!…)</code></td></tr></table>
<p>记忆口诀:<b>多一个 <code>&lt;</code> 就是"向后看"</b>(箭头指向左边),<code>=</code> 是肯定,<code>!</code> 是否定。</p>
<div class="note"><b>📝</b>现代浏览器(Chrome 62+、Firefox 78+、Safari 16.4+)和 Node 都支持后行断言。<b>注意</b>:放在后行断言里的是"到当前位置为止的前文"。</div>
<div class="warn"><b>⚠️</b><code>(?&lt;=\$)\d+</code> 的写法里,<code>$</code> 需要转义成 <code>\$</code>,否则它是"行尾"。</div>`,
      ex: {
        "e4-1": { title: "拿到美元金额", desc: "提取紧跟在 <code>$</code> 后面的数字(可含小数,结果不含 <code>$</code>)。", hint: "<code>(?&lt;=\\$)\\d+(\\.\\d+)?</code>" },
        "e4-2": { title: "提取话题标签", desc: "提取 <code>#</code> 后面的单词(不含 <code>#</code>)。", hint: "<code>(?&lt;=#)\\w+</code>" }
      }
    },
    l5: {
      title: "负向后行断言 (?<!…):身后不许有", short: "负向后行断言 ", summary: "\"X 前面不能是 Y\"——以及一个经典大坑。",
      body: R`
<div class="story"><b>🧪 灰原的笔记:</b>检票:“<b>身后不能站着</b>黄牛。”<code>(?&lt;!Y)X</code> 匹配前面不是 Y 的 X。接下来这个坑,九成的人都会掉进去,别说我没提醒你。</div>
<h2>语法</h2>
<div class="codeblock"><pre>(?&lt;!Y)X    匹配 X,前提是 X 前面<b>不是</b> Y</pre></div>
<h2>🕳️ 经典大坑:数字会被"切开"</h2>
<p>想匹配"前面不是 <code>$</code> 的数字",你可能写 <code>(?&lt;!\$)\d+</code>。对 <code>$30</code> 试试?结果会得到 <code>0</code>!因为 <code>3</code> 前面是 <code>$</code> 被拒,但 <code>0</code> 前面是 <code>3</code>,通过了。</p>
<p>修复:让回头看的范围扩大——<code>(?&lt;![$\d])\d+</code>:前面既不能是 <code>$</code>,也不能是数字。在试验场验证一下!</p>
<div class="tip"><b>💡</b>通用心法:断言只检查"一个位置"。如果被匹配内容本身可以分段,就要想想"从中间切入"的情况。</div>`,
      ex: {
        "e5-1": { title: "不是价格的数字", desc: "匹配\"不属于美元价格\"的完整数字。小心大坑!", hint: "前面既不能是 <code>$</code> 也不能是数字:<code>(?&lt;![$\\d])\\d+</code>。" },
        "e5-2": { title: "不是 Java 的 script", desc: "匹配前面不是 <code>java</code> 的 <code>script</code>(小写)。", hint: "<code>(?&lt;!java)script</code>" }
      }
    },
    l6: {
      title: "断言叠叠乐:多条件同时满足", short: "断言叠叠乐", summary: "把多个断言排在同一个位置,就是逻辑\"且\"。",
      body: R`
<div class="story"><b>🧪 灰原的笔记:</b>三个守卫站成一排:查数字、查大写、查小写。<b>三个都点头</b>才放行。他们都只看不抓,站在同一个位置,互不干扰——就像一个靠谱的搭档。</div>
<h2>密码强度检查模板</h2>
<div class="codeblock"><pre>^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$</pre></div>
<ul>
<li><code>^</code>:站在开头</li>
<li><code>(?=.*\d)</code>:往后找,必须有数字</li>
<li><code>(?=.*[a-z])</code>:必须有小写</li>
<li><code>(?=.*[A-Z])</code>:必须有大写</li>
<li><code>.{8,}$</code>:全部通过后,真正"吃下"至少 8 个字符</li></ul>
<p>"且"可以靠叠加,"非"靠 <code>(?!…)</code>,"或"靠 <code>|</code>。三者组合,几乎任何字符串规则都能表达。</p>
<div class="tip"><b>💡</b>每个断言都是从<b>同一个位置</b>出发的,顺序无关。</div>`,
      ex: {
        "e6-1": { title: "合格密码", desc: "匹配合格的行:至少 8 位,且含数字、小写、大写字母。", hint: "三个 <code>(?=.*…)</code> 叠在 <code>^</code> 后面。" },
        "e6-2": { title: "合格用户名", desc: "4~8 位字母或数字(不分大小写),且<b>不能以数字开头</b>。匹配整行。", hint: "<code>^(?!\\d)[a-z\\d]{4,8}$</code>" },
        "e6-3": { title: "同时含 a 和 e 的单词", desc: "匹配同时包含字母 <code>a</code> 和 <code>e</code> 的完整单词。", hint: "<code>\\b(?=\\w*a)(?=\\w*e)\\w+\\b</code>" }
      }
    },
    l7: {
      title: "在缝隙里动手术:零宽替换", short: "在缝隙里动手术", summary: "用断言匹配\"位置\",再用 replace 往位置里插东西。",
      body: R`
<div class="story"><b>🧪 灰原的笔记:</b>断言找到的是缝隙,那就可以往缝隙里<b>塞东西</b>。把零宽匹配替换成逗号,等于在这个位置插入一个逗号。这个技巧,比 APTX4869 的配方简单多了。</div>
<h2>案例:千分位</h2>
<p><code>1234567</code> → <code>1,234,567</code>。思路:找到"后面的数字个数恰好是 3 的倍数"的位置。</p>
<div class="codeblock"><pre>\B(?=(\d{3})+(?!\d))</pre></div>
<ul><li><code>\B</code>:不在数字串最前面(否则开头会多出逗号)</li>
<li><code>(?=(\d{3})+(?!\d))</code>:后面是若干组三位数字,一直到数字结束</li></ul>
<h2>案例:驼峰变下划线</h2>
<p><code>(?&lt;=[a-z])(?=[A-Z])</code>:前面是小写、后面是大写的那条缝——后行 + 先行<b>同时</b>站岗。</p>
<div class="tip"><b>💡</b>下面练习模式是"替换":你的正则会对输入执行 <code>text.replace(正则, 替换串)</code>,结果要与期望一致。</div>`,
      ex: {
        "e7-1": { title: "千分位格式化", desc: "把数字每三位插入一个逗号。替换为 <code>,</code>", hint: "<code>\\B(?=(\\d{3})+(?!\\d))</code>" },
        "e7-2": { title: "驼峰转下划线", desc: "在\"小写字母后跟大写字母\"的缝隙插入 <code>_</code>。(只插入,不改大小写)", hint: "<code>(?&lt;=[a-z])(?=[A-Z])</code>" },
        "e7-3": { title: "给叠字之间划线", desc: "在两个<b>相同字符</b>之间插入 <code>|</code>。提示:断言里也可以用反向引用 <code>\\1</code>。", hint: "<code>(?&lt;=(.))(?=\\1)</code>" }
      }
    },
    l8: {
      title: "JS 的独门绝技:可变长度后行", short: "JS 的独门绝技", summary: "很多语言要求后行断言定长,JS 不用。",
      body: R`
<div class="story"><b>🧪 灰原的笔记:</b>在 Java、Python 里,回头看的“步数”必须固定。JavaScript 的断言可以<b>倒着跑</b>,所以后行断言里可以放 <code>*</code>、<code>+</code>、<code>|</code>。这点,算它聪明。</div>
<h2>示例</h2>
<div class="codeblock"><pre>(?&lt;=price:\s*)\d+</pre></div>
<p>无论冒号后面有几个空格,都能取到价格。在 Python 的 <code>re</code> 里这会报错。</p>
<h2>后行断言的"倒着匹配"</h2>
<p>JS 在后行断言内部是<b>从右往左</b>匹配的,所以这些情况需要小心:</p>
<ul><li>捕获组的反向引用,如 <code>(?&lt;=\1(.))</code>:引用必须写在组的<b>左侧</b></li>
<li>贪婪量词在回头看时的顺序也相反,但最终是否匹配通常不受影响</li></ul>
<div class="warn"><b>⚠️</b>如果要兼容 Safari 16.4 之前的旧浏览器,就不能用后行断言——请改用捕获组。</div>
<div class="tip"><b>💡</b>比较:"<code>(?&lt;=ab|c)x</code>"也完全合法,不同长度的分支可以混用。</div>`,
      ex: {
        "e8-1": { title: "价格不管空几格", desc: "取出 <code>price:</code> 后面(中间可有任意个空格)的数字。", hint: "<code>(?&lt;=price:\\s*)\\d+</code>" },
        "e8-2": { title: "引号里的单词", desc: "取出被双引号紧紧包住的单词(<code>\\w+</code>),引号本身不要。", hint: "前后各放一个断言:<code>(?&lt;=\")\\w+(?=\")</code>" },
        "e8-3": { title: "货币单位前缀", desc: "取出前面是 <code>USD</code>、<code>EUR</code> 或 <code>¥</code>(允许后面跟空格)的数字。", hint: "<code>(?&lt;=USD|EUR|¥)</code> 后面再加一个 <code>\\s*</code>。" }
      }
    },
    l9: {
      title: "终极挑战:综合实战与陷阱", short: "终极挑战", summary: "把所有断言组合起来,并认识它们的\"性格缺陷\"。",
      body: R`
<div class="story"><b>🧪 灰原的笔记:</b>最后一章。把工具箱里的东西全用上,同时记住几个“性格缺陷”。……能走到这里,说明你并不是我想的那么笨。</div>
<h2>五个要点</h2>
<ol>
<li><b>断言内的捕获组可以用</b>,而且会保存:<code>(?=(\d+))</code> 能"偷看"并保存内容,而不消耗字符。</li>
<li><b>否定断言里的捕获组永远是 undefined</b>:因为否定成功恰恰意味着里面没匹配到。</li>
<li><b>断言不会"回溯进去"</b>:断言一旦成功,里面的选择就被锁定(类似原子组)。</li>
<li><b>性能</b>:<code>(?=.*x)</code> 会扫描整行,多个叠加时要小心超长文本。</li>
<li><b>可读性</b>:复杂断言请拆开写、加注释。三个月后的你会感谢现在的你。</li></ol>
<h2>断言模式速查</h2>
<table class="t"><tr><th>需求</th><th>写法</th></tr>
<tr><td>整词匹配</td><td><code>\bword\b</code></td></tr>
<tr><td>后面是 / 不是</td><td><code>X(?=Y)</code> / <code>X(?!Y)</code></td></tr>
<tr><td>前面是 / 不是</td><td><code>(?&lt;=Y)X</code> / <code>(?&lt;!Y)X</code></td></tr>
<tr><td>整串含有 A 且含有 B</td><td><code>^(?=.*A)(?=.*B)</code></td></tr>
<tr><td>整串不含 A</td><td><code>^(?!.*A)</code></td></tr>
<tr><td>夹在 A 与 B 之间</td><td><code>(?&lt;=A).+?(?=B)</code></td></tr></table>
<div class="tip"><b>💡</b>做完下面三题,你就是断言宗师啦。</div>`,
      ex: {
        "e9-1": { title: "方括号里的内容", desc: "取出每一对 <code>[ ]</code> 中间的内容(不含括号,不能跨对)。", hint: "<code>(?&lt;=\\[).+?(?=\\])</code>" },
        "e9-2": { title: "含 error 但没有 ignore 的行", desc: "匹配包含 <code>error</code> 但<b>不含</b> <code>ignore</code> 的整行。", hint: "<code>^(?=.*error)(?!.*ignore).*$</code>" },
        "e9-3": { title: "手机号脱敏", desc: "把 11 位手机号中间 4 位换成 <code>*</code>:匹配\"前面有 3 位数字、后面有 4 位数字\"的 4 位数。替换为 <code>****</code>。", hint: "<code>(?&lt;=\\b\\d{3})\\d{4}(?=\\d{4}\\b)</code>" }
      }
    }
  };

  /* ===== 中文 · 界面文本 ===== */
  var ZH_UI = {
    langName: '中文', docTitle: 'LookaroundLab · 正则断言实验室',
    metaDesc: '从零开始,在实验室里玩转正则表达式的断言:先行、后行、肯定、否定。',
    menu: '打开目录', navLabel: '章节目录', langLabel: '语言', themeLabel: '主题', themeAuto: '🖥️ 跟随系统', themeLight: '☀️ 亮色', themeDark: '🌙 暗色',
    ranks: ['路人甲', '少年侦探团见习', '帝丹小学的天才', '组织前科学家', '灰色的头脑 🏆'],
    navStart: '开始', navHome: '🏠 首页', navTools: '工具', navLab: '🧪 自由实验室', navCheat: '📋 速查表',
    navSettings: '设置', navReset: '🗑️ 重置进度', resetConfirm: '确定清空所有学习进度吗?',
    levelHeads: ['', '初级 · 入门', '中级 · 进阶', '高级 · 精通'], levelShort: ['', '初级', '中级', '高级'],
    regexLabel: '正则表达式', flagsLabel: '标志', textLabel: '测试文本',
    matchCount: '共 {n} 处匹配', zwNote: '(其中 {z} 处零宽,以青色竖线标出)',
    heroLead: '正则断言实验室 —— “别问我为什么懂这么多,先把题做了。”',
    homeStory: '断言(Lookaround)是正则里最安静的一族:它们<b>只看,不拿</b>。和我有点像。这里有 {n} 个章节、{m} 道练习题,从 <code>\\b</code> 一路到千分位和手机号脱敏。进度会保存在浏览器里——别随便清缓存,我不会帮你重做。',
    progress: '当前进度:<b>{a} / {b}</b>({p}%) · 称号:<b>{r}</b>',
    start: '🚀 开始学习', cont: '▶ 继续学习', review: '🔁 回顾第一章', cardCount: '{d}/{t} 题 · {lv}',
    chapterOf: '第 {i} / {n} 章', labH2: '🧪 试验场', labSub: '随便改改,看看高亮怎么变', exH2: '🎯 练习题', toCheat: '查看速查表 →',
    exHead: '✏️ 练习 {i}:{title}', exDone: '✔ 已完成', flagsLine: '标志:', replaceLine: ' · 替换为:', answerPlaceholder: '在这里写你的正则', answerLabel: '你的答案',
    inputText: '输入文本', expMatch: '期望匹配', gotMatch: '你的匹配', expOut: '期望输出', gotOut: '你的输出', noMatch: '(无匹配)', empty: '(空)',
    run: '▶ 运行检查', hintBtn: '💡 提示', ansBtn: '🔑 查看答案', ansLocked: '尝试 3 次后解锁', ansPrefix: '🔑 参考答案:',
    passed: '……全部通过。勉强算你及格。', errEmpty: '什么都没写,是想让我替你做吗?', errSyntax: '正则有语法错误:{e}',
    errNeed: '本题要求用到断言 {n} 。想绕过去?我看得出来。', errFail: '还没通过。仔细看红框里的差异,线索都摆在那里。',
    labPageH1: '🧪 自由实验室', labPageLead: '想试什么就试什么,青色竖线表示零宽匹配。',
    cheatH1: '📋 断言速查表', cheatLead: '看一眼就能想起来。',
    cheat: R`<table class="t"><tr><th>语法</th><th>名称</th><th>含义</th><th>示例</th></tr>
<tr><td><code>^</code> <code>$</code></td><td>行首 / 行尾</td><td>加 <code>m</code> 标志按行匹配</td><td><code>^\d+$</code></td></tr>
<tr><td><code>\b</code> <code>\B</code></td><td>单词边界 / 非边界</td><td>\w 与 \W 之间的位置</td><td><code>\bcat\b</code></td></tr>
<tr><td><code>(?=…)</code></td><td>肯定先行</td><td>后面必须是…</td><td><code>\d+(?=元)</code></td></tr>
<tr><td><code>(?!…)</code></td><td>否定先行</td><td>后面不能是…</td><td><code>foo(?!bar)</code></td></tr>
<tr><td><code>(?&lt;=…)</code></td><td>肯定后行</td><td>前面必须是…</td><td><code>(?&lt;=\$)\d+</code></td></tr>
<tr><td><code>(?&lt;!…)</code></td><td>否定后行</td><td>前面不能是…</td><td><code>(?&lt;!java)script</code></td></tr></table>
<h2>常用套路</h2><table class="t"><tr><th>需求</th><th>写法</th></tr>
<tr><td>同时满足多个条件</td><td><code>^(?=.*A)(?=.*B).*$</code></td></tr>
<tr><td>整行不含 A</td><td><code>^(?!.*A).*$</code></td></tr>
<tr><td>千分位</td><td><code>\B(?=(\d{3})+(?!\d))</code></td></tr>
<tr><td>驼峰分词</td><td><code>(?&lt;=[a-z])(?=[A-Z])</code></td></tr>
<tr><td>括号内内容</td><td><code>(?&lt;=\[).+?(?=\])</code></td></tr></table>`
  };

  /* ===== English · lessons ===== */
  var EN_LESSONS = {
    l1: {
      title: 'What is an assertion? Enter the position detective', short: 'What is an assertion?',
      summary: 'Meet "zero-width": assertions match the gaps, not the characters.',
      body: R`
<div class="story"><b>🧪 Haibara's notes:</b> A normal regex is a cop who arrests whoever he catches (characters get consumed). An <b>assertion</b> only checks "what surrounds this position", nods or shakes its head, and takes nothing away. Don't expect gentle explanations. Just listen.</div>
<h2>Zero-width: matching gaps, not characters</h2>
<p><code>cat</code> has 4 positions: <code>|c|a|t|</code>. Assertions match these gaps, so their match has length <b>0</b>, hence "zero-width assertions". In the playground below, a cyan vertical bar stands for a zero-width match.</p>
<h2>The four classic assertions</h2>
<table class="t"><tr><th>Assertion</th><th>Meaning</th><th>Metaphor</th></tr>
<tr><td><code>^</code></td><td>Start of string (of each line with the <code>m</code> flag)</td><td>Starting line</td></tr>
<tr><td><code>$</code></td><td>End of string (of each line with <code>m</code>)</td><td>Finish line</td></tr>
<tr><td><code>\b</code></td><td>Word boundary: <code>\w</code> on one side, not on the other</td><td>The fence around a word</td></tr>
<tr><td><code>\B</code></td><td>Non-word-boundary</td><td>Inside a word</td></tr></table>
<div class="tip"><b>💡</b> Change <code>\bcat\b</code> to <code>cat</code> in the playground and see whether the cat in <code>concat</code> gets caught.</div>
<div class="note"><b>📝</b> In JS, <code>\w</code> is only <code>[A-Za-z0-9_]</code>, so CJK characters are never treated as word characters by <code>\b</code>.</div>`
      , ex: {
        'e1-1': { title: 'Only the standalone cat', desc: 'Match <code>cat</code> only as a whole word. Not the ones in <code>concat</code> or <code>cats</code>.', hint: 'Put the word boundary <code>\\b</code> on both sides.' },
        'e1-2': { title: 'Lines made only of digits', desc: 'In multiline mode, match whole lines consisting only of digits.', hint: '<code>^</code> and <code>$</code> sandwich a whole line.' },
        'e1-3': { title: 'cat hiding inside a word', desc: 'Match only a <code>cat</code> that is <b>not at the start of a word</b> (like the one in concat). Not <code>cat</code> or <code>category</code>.', hint: '<code>\\B</code> means "not a word boundary". Put it before cat.' }
      }
    },
    l2: {
      title: 'Positive lookahead (?=…): peek ahead', short: 'Positive lookahead',
      summary: '"I want X, but X must be followed by Y."',
      body: R`
<div class="story"><b>🧪 Haibara's notes:</b> You want numbers followed by <b>元</b> but don't want to carry the 元 home. <code>(?=元)</code> is that quick peek: afterwards the position stays put. The detective says "there's only one truth"; an assertion only confirms it, it doesn't take it.</div>
<h2>Syntax</h2>
<div class="codeblock"><pre>X(?=Y)    match X, provided X is immediately followed by Y (Y is not part of the result)</pre></div>
<p>Example: <code>\d+(?=元)</code> on <code>苹果5元</code> gives only <code>5</code>. The "元" stays in place for later matching.</p>
<h2>Why "zero-width"?</h2>
<p>After <code>(?=元)</code> checks, the position hasn't advanced. So <code>a(?=b)b</code> matches <code>ab</code>: b is "seen" once and "eaten" once.</p>
<div class="tip"><b>💡</b> Compare <code>\d+元</code>: its result includes 元. Use a lookahead when you want only the digits but need to be sure 元 follows.</div>`
      , ex: {
        'e2-1': { title: 'Digits before 元 only', desc: 'Extract numbers immediately followed by "元" (without the "元").', hint: 'The shape is <code>\\d+(?=元)</code>.' },
        'e2-2': { title: 'Java or JavaScript?', desc: 'Match only a <code>Java</code> that is followed by <code>Script</code> (the result is just the four letters Java).', hint: '<code>Java(?=Script)</code>' }
      }
    },
    l3: {
      title: 'Negative lookahead (?!…): no entry ahead', short: 'Negative lookahead',
      summary: '"X must not be followed by Y."',
      body: R`
<div class="story"><b>🧪 Haibara's notes:</b> "You may pass, but <b>not if bar follows you</b>." That's <code>(?!…)</code>. The guards in the Organization let people through the same way, except nobody gets silenced here.</div>
<h2>Syntax</h2>
<div class="codeblock"><pre>X(?!Y)    match X, provided X is <b>not</b> followed by Y</pre></div>
<h2>The killer move: excluding a whole line</h2>
<p>Put <code>^(?!…)</code> at the start of a line to say "this line <b>must not contain</b> something":</p>
<div class="codeblock"><pre>^(?!.*\.exe$).+$      match every line that doesn't end in .exe</pre></div>
<p>Read it as: from the line start, look ahead: "does anything followed by <code>.exe</code> at the end exist?" If yes, veto. Otherwise let it through and take the line with <code>.+</code>.</p>
<div class="warn"><b>⚠️</b> A negative assertion only sees what comes after the position. The <code>.*</code> in <code>^(?!.*x)</code> lets it see the whole line. Don't forget it.</div>`
      , ex: {
        'e3-1': { title: 'foo not followed by bar', desc: 'Match <code>foo</code> that is <b>not</b> followed by <code>bar</code>.', hint: '<code>foo(?!bar)</code>' },
        'e3-2': { title: 'Exclude .exe files', desc: 'In multiline mode, match every whole line that does <b>not end with .exe</b>.', hint: 'After <code>^</code> put <code>(?!.*\\.exe$)</code>, then <code>.+$</code>.' }
      }
    },
    l4: {
      title: 'Positive lookbehind (?<=…): look back', short: 'Positive lookbehind',
      summary: '"I want X, but X must be preceded by Y."',
      body: R`
<div class="story"><b>🧪 Haibara's notes:</b> Lookahead looks forward; lookbehind <b>looks back</b>. To get the amount after <code>$</code> without taking the <code>$</code>, glance back first. The past only deserves one look.</div>
<h2>Syntax</h2>
<div class="codeblock"><pre>(?&lt;=Y)X    match X, provided X is immediately preceded by Y</pre></div>
<table class="t"><tr><th></th><th>Positive (must be)</th><th>Negative (must not be)</th></tr>
<tr><td>Look ahead</td><td><code>(?=…)</code></td><td><code>(?!…)</code></td></tr>
<tr><td>Look back</td><td><code>(?&lt;=…)</code></td><td><code>(?&lt;!…)</code></td></tr></table>
<p>Mnemonic: <b>an extra <code>&lt;</code> means "look backward"</b> (the arrow points left); <code>=</code> is positive, <code>!</code> is negative.</p>
<div class="note"><b>📝</b> Lookbehind works in modern browsers (Chrome 62+, Firefox 78+, Safari 16.4+) and Node.</div>
<div class="warn"><b>⚠️</b> In <code>(?&lt;=\$)\d+</code> the <code>$</code> must be escaped as <code>\$</code>, otherwise it means "end of line".</div>`
      , ex: {
        'e4-1': { title: 'Get the dollar amounts', desc: 'Extract numbers immediately after <code>$</code> (decimals allowed, without the <code>$</code>).', hint: '<code>(?&lt;=\\$)\\d+(\\.\\d+)?</code>' },
        'e4-2': { title: 'Extract hashtags', desc: 'Extract the word after <code>#</code> (without the <code>#</code>).', hint: '<code>(?&lt;=#)\\w+</code>' }
      }
    },
    l5: {
      title: 'Negative lookbehind (?<!…): nobody behind you', short: 'Negative lookbehind',
      summary: '"X must not be preceded by Y", plus a classic trap.',
      body: R`
<div class="story"><b>🧪 Haibara's notes:</b> Ticket check: "<b>No scalpers standing behind you.</b>" <code>(?&lt;!Y)X</code> matches X not preceded by Y. About nine in ten people fall into the next trap. Don't say I didn't warn you.</div>
<h2>Syntax</h2>
<div class="codeblock"><pre>(?&lt;!Y)X    match X, provided X is <b>not</b> preceded by Y</pre></div>
<h2>🕳️ The classic trap: digits get sliced</h2>
<p>To match "digits not preceded by <code>$</code>" you might write <code>(?&lt;!\$)\d+</code>. Try it on <code>$30</code>: you get <code>0</code>! The <code>3</code> is rejected because of the <code>$</code>, but the <code>0</code> is preceded by <code>3</code>, which passes.</p>
<p>Fix: widen the look-back: <code>(?&lt;![$\d])\d+</code>. Not <code>$</code>, and not a digit. Verify it in the playground.</p>
<div class="tip"><b>💡</b> Rule of thumb: an assertion checks only one position. If the thing you match can be entered mid-way, think about that case.</div>`
      , ex: {
        'e5-1': { title: 'Numbers that are not prices', desc: 'Match complete numbers that don\'t belong to a dollar price. Mind the trap!', hint: 'Neither <code>$</code> nor a digit may precede: <code>(?&lt;![$\\d])\\d+</code>.' },
        'e5-2': { title: 'script not preceded by java', desc: 'Match <code>script</code> (lowercase) not preceded by <code>java</code>.', hint: '<code>(?&lt;!java)script</code>' }
      }
    },
    l6: {
      title: 'Assertion stacking: multiple conditions at once', short: 'Assertion stacking',
      summary: 'Several assertions at one position act as logical AND.',
      body: R`
<div class="story"><b>🧪 Haibara's notes:</b> Three guards stand in a row: one checks for a digit, one for uppercase, one for lowercase. <b>All three must nod</b>. They only look, never grab, and stand at the same position without disturbing each other. Like a reliable partner.</div>
<h2>Password strength template</h2>
<div class="codeblock"><pre>^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$</pre></div>
<ul>
<li><code>^</code>: stand at the start</li>
<li><code>(?=.*\d)</code>: look ahead, a digit must exist</li>
<li><code>(?=.*[a-z])</code>: a lowercase letter must exist</li>
<li><code>(?=.*[A-Z])</code>: an uppercase letter must exist</li>
<li><code>.{8,}$</code>: once all pass, actually consume at least 8 characters</li></ul>
<p>AND comes from stacking, NOT from <code>(?!…)</code>, OR from <code>|</code>. Combine them and nearly any string rule can be expressed.</p>
<div class="tip"><b>💡</b> Every assertion starts from the <b>same position</b>, so order doesn't matter.</div>`
      , ex: {
        'e6-1': { title: 'A valid password', desc: 'Match valid lines: at least 8 characters, containing a digit, a lowercase and an uppercase letter.', hint: 'Stack three <code>(?=.*…)</code> after <code>^</code>.' },
        'e6-2': { title: 'A valid username', desc: '4 to 8 letters or digits (case-insensitive), and it <b>must not start with a digit</b>. Match the whole line.', hint: '<code>^(?!\\d)[a-z\\d]{4,8}$</code>' },
        'e6-3': { title: 'Words with both a and e', desc: 'Match whole words containing both the letter <code>a</code> and <code>e</code>.', hint: '<code>\\b(?=\\w*a)(?=\\w*e)\\w+\\b</code>' }
      }
    },
    l7: {
      title: 'Surgery in the gaps: zero-width replacement', short: 'Zero-width replacement',
      summary: 'Match positions with assertions, then insert things with replace.',
      body: R`
<div class="story"><b>🧪 Haibara's notes:</b> Assertions find gaps, so you can <b>stuff something into them</b>. Replace a zero-width match with a comma and you've inserted a comma at that spot. This is simpler than the APTX4869 formula.</div>
<h2>Case: thousands separators</h2>
<p><code>1234567</code> becomes <code>1,234,567</code>. Idea: find positions where the number of digits after is a multiple of 3.</p>
<div class="codeblock"><pre>\B(?=(\d{3})+(?!\d))</pre></div>
<ul><li><code>\B</code>: not at the very start of the digit string (otherwise a leading comma appears)</li>
<li><code>(?=(\d{3})+(?!\d))</code>: followed by groups of three digits until the digits end</li></ul>
<h2>Case: camelCase to snake_case</h2>
<p><code>(?&lt;=[a-z])(?=[A-Z])</code>: lowercase before, uppercase after. Lookbehind and lookahead guard the <b>same</b> gap.</p>
<div class="tip"><b>💡</b> The exercises here use "replace" mode: your regex runs as <code>text.replace(regex, replacement)</code> and the result must equal the expected output.</div>`
      , ex: {
        'e7-1': { title: 'Thousands separators', desc: 'Insert a comma every three digits. Replacement: <code>,</code>', hint: '<code>\\B(?=(\\d{3})+(?!\\d))</code>' },
        'e7-2': { title: 'camelCase to underscores', desc: 'Insert <code>_</code> in gaps between a lowercase letter and an uppercase one. (Insert only, don\'t change case.)', hint: '<code>(?&lt;=[a-z])(?=[A-Z])</code>' },
        'e7-3': { title: 'Line between doubled letters', desc: 'Insert <code>|</code> between two <b>identical characters</b>. Hint: assertions can use backreferences like <code>\\1</code>.', hint: '<code>(?&lt;=(.))(?=\\1)</code>' }
      }
    },
    l8: {
      title: 'A JS specialty: variable-length lookbehind', short: 'Variable-length lookbehind',
      summary: 'Many languages require fixed-length lookbehind. JS does not.',
      body: R`
<div class="story"><b>🧪 Haibara's notes:</b> In Java and Python, the "number of steps" you look back must be fixed. JavaScript's guard can <b>run backwards</b>, so lookbehind may contain <code>*</code>, <code>+</code> and <code>|</code>. I'll admit that's clever.</div>
<h2>Example</h2>
<div class="codeblock"><pre>(?&lt;=price:\s*)\d+</pre></div>
<p>No matter how many spaces follow the colon, the price is found. In Python's <code>re</code> this is an error.</p>
<h2>Lookbehind matches backwards</h2>
<p>Inside a lookbehind, JS matches <b>right to left</b>, so mind these:</p>
<ul><li>Backreferences to capture groups: the reference must be written to the <b>left</b> of the group.</li>
<li>Greedy quantifiers run in reverse order, but the match result is usually unaffected.</li></ul>
<div class="warn"><b>⚠️</b> To support browsers older than Safari 16.4 you can't use lookbehind. Use capture groups instead.</div>
<div class="tip"><b>💡</b> Even "<code>(?&lt;=ab|c)x</code>" is legal; branches of different lengths can be mixed.</div>`
      , ex: {
        'e8-1': { title: 'Any number of spaces after price', desc: 'Extract numbers after <code>price:</code> (any number of spaces between).', hint: '<code>(?&lt;=price:\\s*)\\d+</code>' },
        'e8-2': { title: 'Words in quotes', desc: 'Extract words (<code>\\w+</code>) tightly wrapped in double quotes, without the quotes.', hint: 'One assertion on each side: <code>(?&lt;=")\\w+(?=")</code>' },
        'e8-3': { title: 'Currency prefixes', desc: 'Extract numbers preceded by <code>USD</code>, <code>EUR</code> or <code>¥</code> (spaces allowed in between).', hint: 'Put <code>(USD|EUR|¥)</code> then <code>\\s*</code> inside the lookbehind.' }
      }
    },
    l9: {
      title: 'Final challenge: practice and pitfalls', short: 'Final challenge',
      summary: 'Combine every assertion and learn their character flaws.',
      body: R`
<div class="story"><b>🧪 Haibara's notes:</b> The last chapter. Use everything in your toolbox, and remember a few "character flaws". Getting this far means you're not as dull as I thought.</div>
<h2>Five key points</h2>
<ol>
<li><b>Capture groups work inside assertions</b> and are kept: <code>(?=(\d+))</code> can peek and save without consuming.</li>
<li><b>Groups inside a negative assertion are always undefined</b>: success means the inside did not match.</li>
<li><b>Assertions don't backtrack into themselves</b>: once an assertion succeeds, its internal choices are locked in (like an atomic group).</li>
<li><b>Performance</b>: <code>(?=.*x)</code> scans the whole line. Be careful when stacking on very long text.</li>
<li><b>Readability</b>: split complex assertions and comment them. You'll thank yourself in three months.</li></ol>
<h2>Assertion pattern cheat list</h2>
<table class="t"><tr><th>Need</th><th>Pattern</th></tr>
<tr><td>Whole word</td><td><code>\bword\b</code></td></tr>
<tr><td>Followed by / not followed by</td><td><code>X(?=Y)</code> / <code>X(?!Y)</code></td></tr>
<tr><td>Preceded by / not preceded by</td><td><code>(?&lt;=Y)X</code> / <code>(?&lt;!Y)X</code></td></tr>
<tr><td>Contains both A and B</td><td><code>^(?=.*A)(?=.*B)</code></td></tr>
<tr><td>Doesn't contain A</td><td><code>^(?!.*A)</code></td></tr>
<tr><td>Between A and B</td><td><code>(?&lt;=A).+?(?=B)</code></td></tr></table>
<div class="tip"><b>💡</b> Finish these three and you're an assertion master.</div>`
      , ex: {
        'e9-1': { title: 'Content inside brackets', desc: 'Extract what lies between each pair of <code>[ ]</code> (without brackets, not crossing pairs).', hint: '<code>(?&lt;=\\[).+?(?=\\])</code>' },
        'e9-2': { title: 'error but not ignore', desc: 'Match whole lines containing <code>error</code> but <b>not</b> <code>ignore</code>.', hint: '<code>^(?=.*error)(?!.*ignore).*$</code>' },
        'e9-3': { title: 'Mask phone numbers', desc: 'Replace the middle 4 digits of an 11-digit phone number with <code>*</code>: match 4 digits preceded by 3 digits and followed by 4. Replacement: <code>****</code>.', hint: '<code>(?&lt;=\\b\\d{3})\\d{4}(?=\\d{4}\\b)</code>' }
      }
    }
  };

  /* ===== English · UI ===== */
  var EN_UI = {
    langName: 'English', docTitle: 'LookaroundLab · Regex Lookaround Lab',
    metaDesc: 'Learn regex assertions from scratch in the lab: lookahead, lookbehind, positive and negative.',
    menu: 'Open menu', navLabel: 'Chapters', langLabel: 'Language', themeLabel: 'Theme', themeAuto: '🖥️ Auto (system)', themeLight: '☀️ Light', themeDark: '🌙 Dark',
    ranks: ['Bystander', 'Junior Detective Trainee', 'Teitan Elementary Genius', 'Former Organization Scientist', 'The Gray Mind 🏆'],
    navStart: 'START', navHome: '🏠 Home', navTools: 'TOOLS', navLab: '🧪 Free lab', navCheat: '📋 Cheat sheet',
    navSettings: 'SETTINGS', navReset: '🗑️ Reset progress', resetConfirm: 'Clear all learning progress?',
    levelHeads: ['', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'], levelShort: ['', 'Beginner', 'Intermediate', 'Advanced'],
    regexLabel: 'Regular expression', flagsLabel: 'Flags', textLabel: 'Test text',
    matchCount: '{n} match(es)', zwNote: ' ({z} zero-width, shown as cyan bars)',
    heroLead: 'Regex lookaround lab: "Don\'t ask why I know this much. Do the exercises first."',
    homeStory: 'Assertions (lookarounds) are the quietest family in regex: they <b>look, but never take</b>. A bit like me. There are {n} chapters and {m} exercises, from <code>\\b</code> all the way to thousands separators and phone-number masking. Progress is saved in your browser. Don\'t clear the cache carelessly; I won\'t redo it for you.',
    progress: 'Progress: <b>{a} / {b}</b> ({p}%) · Title: <b>{r}</b>',
    start: '🚀 Start learning', cont: '▶ Continue', review: '🔁 Review chapter 1', cardCount: '{d}/{t} done · {lv}',
    chapterOf: 'Chapter {i} / {n}', labH2: '🧪 Playground', labSub: 'Tinker freely and watch the highlights change', exH2: '🎯 Exercises', toCheat: 'Open cheat sheet →',
    exHead: '✏️ Exercise {i}: {title}', exDone: '✔ Done', flagsLine: 'Flags: ', replaceLine: ' · Replace with: ', answerPlaceholder: 'Write your regex here', answerLabel: 'Your answer',
    inputText: 'Input text', expMatch: 'Expected matches', gotMatch: 'Your matches', expOut: 'Expected output', gotOut: 'Your output', noMatch: '(no match)', empty: '(empty)',
    run: '▶ Run check', hintBtn: '💡 Hint', ansBtn: '🔑 Show answer', ansLocked: 'Unlocks after 3 attempts', ansPrefix: '🔑 Reference answer: ',
    passed: '...All passed. Barely acceptable.', errEmpty: 'You wrote nothing. Expecting me to do it for you?', errSyntax: 'Regex syntax error: {e}',
    errNeed: 'This exercise requires the assertion {n}. Trying to get around it? I can tell.', errFail: 'Not passing yet. Look at the differences in the red boxes; the clues are right there.',
    labPageH1: '🧪 Free lab', labPageLead: 'Try whatever you like. Cyan bars mark zero-width matches.',
    cheatH1: '📋 Assertion cheat sheet', cheatLead: 'One glance and it comes back.',
    cheat: R`<table class="t"><tr><th>Syntax</th><th>Name</th><th>Meaning</th><th>Example</th></tr>
<tr><td><code>^</code> <code>$</code></td><td>Line start / end</td><td>With the <code>m</code> flag, per line</td><td><code>^\d+$</code></td></tr>
<tr><td><code>\b</code> <code>\B</code></td><td>Word boundary / non-boundary</td><td>Position between \w and \W</td><td><code>\bcat\b</code></td></tr>
<tr><td><code>(?=…)</code></td><td>Positive lookahead</td><td>Must be followed by…</td><td><code>\d+(?=元)</code></td></tr>
<tr><td><code>(?!…)</code></td><td>Negative lookahead</td><td>Must not be followed by…</td><td><code>foo(?!bar)</code></td></tr>
<tr><td><code>(?&lt;=…)</code></td><td>Positive lookbehind</td><td>Must be preceded by…</td><td><code>(?&lt;=\$)\d+</code></td></tr>
<tr><td><code>(?&lt;!…)</code></td><td>Negative lookbehind</td><td>Must not be preceded by…</td><td><code>(?&lt;!java)script</code></td></tr></table>
<h2>Common recipes</h2><table class="t"><tr><th>Need</th><th>Pattern</th></tr>
<tr><td>Satisfy several conditions</td><td><code>^(?=.*A)(?=.*B).*$</code></td></tr>
<tr><td>Line without A</td><td><code>^(?!.*A).*$</code></td></tr>
<tr><td>Thousands separators</td><td><code>\B(?=(\d{3})+(?!\d))</code></td></tr>
<tr><td>Split camelCase</td><td><code>(?&lt;=[a-z])(?=[A-Z])</code></td></tr>
<tr><td>Content in brackets</td><td><code>(?&lt;=\[).+?(?=\])</code></td></tr></table>`
  };

  /* ===== 日本語 · レッスン ===== */
  var JA_LESSONS = {
    l1: {
      title: 'アサーションとは?位置の探偵、登場', short: 'アサーションとは',
      summary: '「ゼロ幅」を知ろう。アサーションは文字ではなく“すき間”にマッチする。',
      body: R`
<div class="story"><b>🧪 灰原のメモ:</b>普通の正規表現は、捕まえた相手を連れていく警察。<b>アサーション</b>は「この位置の前後はどうなっているか」を確認してうなずくだけで、何も持っていかない。優しい説明は期待しないで。ちゃんと聞いて。</div>
<h2>ゼロ幅:文字ではなく“すき間”にマッチ</h2>
<p><code>cat</code> には 4 つの位置があります:<code>|c|a|t|</code>。アサーションはこのすき間にマッチするので、結果の長さは <b>0</b>。だから「ゼロ幅アサーション」と呼びます。下の実験場では、水色の縦線がゼロ幅マッチを表します。</p>
<h2>定番の 4 つ</h2>
<table class="t"><tr><th>記号</th><th>意味</th><th>たとえ</th></tr>
<tr><td><code>^</code></td><td>文字列の先頭(<code>m</code> フラグなら各行の先頭)</td><td>スタートライン</td></tr>
<tr><td><code>$</code></td><td>文字列の末尾(<code>m</code> なら各行の末尾)</td><td>ゴールライン</td></tr>
<tr><td><code>\b</code></td><td>単語境界:片側が <code>\w</code>、もう片側が違う</td><td>単語の柵</td></tr>
<tr><td><code>\B</code></td><td>単語境界でない位置</td><td>単語の内側</td></tr></table>
<div class="tip"><b>💡</b>実験場で <code>\bcat\b</code> を <code>cat</code> に変えて、<code>concat</code> の cat が巻き込まれるか見てみて。</div>
<div class="note"><b>📝</b>JS の <code>\w</code> は <code>[A-Za-z0-9_]</code> だけなので、日本語や中国語の文字の両側は <code>\b</code> では境界になりません。</div>`
      , ex: {
        'e1-1': { title: '単独の cat だけ', desc: '単語として独立した <code>cat</code> だけにマッチ。<code>concat</code> や <code>cats</code> の中は除外。', hint: '両側に単語境界 <code>\\b</code> を付ける。' },
        'e1-2': { title: '数字だけの行', desc: '複数行モードで、<b>行全体</b>が数字だけの行にマッチ。', hint: '<code>^</code> と <code>$</code> で行全体を挟む。' },
        'e1-3': { title: '単語の途中にいる cat', desc: '<b>単語の先頭ではない</b> <code>cat</code>(concat の中など)だけにマッチ。<code>cat</code> や <code>category</code> の先頭は除外。', hint: '<code>\\B</code> は「単語境界ではない」。cat の前に置く。' }
      }
    },
    l2: {
      title: '肯定先読み (?=…):先をちらっと見る', short: '肯定先読み',
      summary: '「X を探したい。ただし X の後ろに Y があること。」',
      body: R`
<div class="story"><b>🧪 灰原のメモ:</b>「後ろに<b>元</b>が付く数字」だけ欲しいけれど、「元」まで持ち帰りたくない。<code>(?=元)</code> は先をちらっと見る動作で、見終わっても位置は<b>動かない</b>。探偵は「真実はいつもひとつ」と言うけれど、アサーションは確認するだけで持ち去らない。</div>
<h2>構文</h2>
<div class="codeblock"><pre>X(?=Y)    X にマッチ。ただし X の直後が Y(Y は結果に含まれない)</pre></div>
<p>例:<code>苹果5元</code> に <code>\d+(?=元)</code> を使うと、結果は <code>5</code> だけ。「元」はその場に残ります。</p>
<h2>なぜ「ゼロ幅」?</h2>
<p><code>(?=元)</code> は確認しても位置が進みません。だから <code>a(?=b)b</code> は <code>ab</code> にマッチします。b は一度「見られ」、一度「食べられ」ます。</p>
<div class="tip"><b>💡</b><code>\d+元</code> だと結果に「元」が入ります。数字だけ欲しくて、後ろが「元」だと保証したいなら先読みを使います。</div>`
      , ex: {
        'e2-1': { title: '「元」の前の数字だけ', desc: '直後が「元」の数字を取り出す(「元」は含めない)。', hint: '形は <code>\\d+(?=元)</code>。' },
        'e2-2': { title: 'Java か JavaScript か', desc: '後ろに <code>Script</code> が付く <code>Java</code> だけにマッチ(結果は Java の 4 文字だけ)。', hint: '<code>Java(?=Script)</code>' }
      }
    },
    l3: {
      title: '否定先読み (?!…):前方通行止め', short: '否定先読み',
      summary: '「X の後ろに Y があってはいけない。」',
      body: R`
<div class="story"><b>🧪 灰原のメモ:</b>「通っていい。ただし<b>後ろに bar が付いていなければ</b>ね。」これが <code>(?!…)</code>。組織の見張りもこんなふうに人を通していた。ここでは誰も消されないけど。</div>
<h2>構文</h2>
<div class="codeblock"><pre>X(?!Y)    X にマッチ。ただし X の直後が Y <b>ではない</b></pre></div>
<h2>決め技:行全体の除外</h2>
<p>行頭に <code>^(?!…)</code> を置くと「この行に何かが<b>含まれていてはいけない</b>」を表せます:</p>
<div class="codeblock"><pre>^(?!.*\.exe$).+$      .exe で終わらない行すべてにマッチ</pre></div>
<p>読み方:行頭から先読みして「何かの後に <code>.exe</code> で終わる」が成り立つなら拒否。成り立たなければ通して、<code>.+</code> で行全体を取る。</p>
<div class="warn"><b>⚠️</b>否定アサーションが見られるのは位置より後ろだけ。<code>^(?!.*x)</code> の <code>.*</code> は行全体を見るためのもの。忘れずに。</div>`
      , ex: {
        'e3-1': { title: 'bar が続かない foo', desc: '後ろが <code>bar</code> <b>ではない</b> <code>foo</code> にマッチ。', hint: '<code>foo(?!bar)</code>' },
        'e3-2': { title: '.exe ファイルを除外', desc: '複数行モードで、<b>.exe で終わらない</b>行全体にマッチ。', hint: '<code>^</code> の後に <code>(?!.*\\.exe$)</code>、最後に <code>.+$</code>。' }
      }
    },
    l4: {
      title: '肯定後読み (?<=…):振り返って見る', short: '肯定後読み',
      summary: '「X を探したい。ただし X の前に Y があること。」',
      body: R`
<div class="story"><b>🧪 灰原のメモ:</b>先読みが前を見るなら、後読みは<b>振り返る</b>こと。<code>$</code> の後ろの金額だけ欲しくて <code>$</code> は要らないなら、先に振り返って確認する。過去は、一度見れば十分。</div>
<h2>構文</h2>
<div class="codeblock"><pre>(?&lt;=Y)X    X にマッチ。ただし X の直前が Y</pre></div>
<table class="t"><tr><th></th><th>肯定(あること)</th><th>否定(ないこと)</th></tr>
<tr><td>先を見る</td><td><code>(?=…)</code></td><td><code>(?!…)</code></td></tr>
<tr><td>振り返る</td><td><code>(?&lt;=…)</code></td><td><code>(?&lt;!…)</code></td></tr></table>
<p>覚え方:<b><code>&lt;</code> が付けば「後ろを見る」</b>(矢印が左向き)。<code>=</code> は肯定、<code>!</code> は否定。</p>
<div class="note"><b>📝</b>後読みは最近のブラウザ(Chrome 62+、Firefox 78+、Safari 16.4+)と Node で使えます。</div>
<div class="warn"><b>⚠️</b><code>(?&lt;=\$)\d+</code> の <code>$</code> は <code>\$</code> とエスケープが必要。そうしないと「行末」の意味になります。</div>`
      , ex: {
        'e4-1': { title: 'ドル金額を取り出す', desc: '<code>$</code> の直後の数字を取り出す(小数可、<code>$</code> は含めない)。', hint: '<code>(?&lt;=\\$)\\d+(\\.\\d+)?</code>' },
        'e4-2': { title: 'ハッシュタグを抽出', desc: '<code>#</code> の後ろの単語を取り出す(<code>#</code> は含めない)。', hint: '<code>(?&lt;=#)\\w+</code>' }
      }
    },
    l5: {
      title: '否定後読み (?<!…):背後に誰もいない', short: '否定後読み',
      summary: '「X の前に Y があってはいけない」と、定番の落とし穴。',
      body: R`
<div class="story"><b>🧪 灰原のメモ:</b>コンサートの検札:「<b>背後にダフ屋が立っていないこと</b>。」<code>(?&lt;!Y)X</code> は直前が Y ではない X にマッチ。次の落とし穴には 10 人中 9 人がはまる。忠告しなかったとは言わせないわよ。</div>
<h2>構文</h2>
<div class="codeblock"><pre>(?&lt;!Y)X    X にマッチ。ただし X の直前が Y <b>ではない</b></pre></div>
<h2>🕳️ 定番の落とし穴:数字が切られる</h2>
<p>「<code>$</code> が前にない数字」を <code>(?&lt;!\$)\d+</code> と書きたくなりますが、<code>$30</code> に使うと結果は <code>0</code>!<code>3</code> は直前が <code>$</code> なので拒否されますが、<code>0</code> の直前は <code>3</code> なので通ってしまいます。</p>
<p>対策:振り返る範囲を広げる。<code>(?&lt;![$\d])\d+</code>。直前が <code>$</code> でも数字でもないこと。実験場で確かめてみて。</p>
<div class="tip"><b>💡</b>心得:アサーションが見るのは「ひとつの位置」だけ。マッチ対象が途中から始められるなら、その場合も考えること。</div>`
      , ex: {
        'e5-1': { title: '価格ではない数字', desc: 'ドル価格に属さない数字全体にマッチ。落とし穴に注意!', hint: '直前が <code>$</code> でも数字でもない:<code>(?&lt;![$\\d])\\d+</code>。' },
        'e5-2': { title: 'java の後ろではない script', desc: '直前が <code>java</code> ではない <code>script</code>(小文字)にマッチ。', hint: '<code>(?&lt;!java)script</code>' }
      }
    },
    l6: {
      title: 'アサーション重ね:複数条件を同時に', short: 'アサーション重ね',
      summary: '同じ位置に複数のアサーションを並べると、論理 AND になる。',
      body: R`
<div class="story"><b>🧪 灰原のメモ:</b>3 人の見張りが一列に並ぶ。数字、大文字、小文字を確認する係。<b>3 人全員がうなずいて</b>初めて通れる。みんな見るだけで掴まず、同じ位置に立って互いに邪魔しない。頼れる相棒みたいにね。</div>
<h2>パスワード強度テンプレート</h2>
<div class="codeblock"><pre>^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$</pre></div>
<ul>
<li><code>^</code>:先頭に立つ</li>
<li><code>(?=.*\d)</code>:先を探して数字が必須</li>
<li><code>(?=.*[a-z])</code>:小文字が必須</li>
<li><code>(?=.*[A-Z])</code>:大文字が必須</li>
<li><code>.{8,}$</code>:全員通過したら、実際に 8 文字以上を「食べる」</li></ul>
<p>AND は重ねる、NOT は <code>(?!…)</code>、OR は <code>|</code>。組み合わせれば、ほとんどの文字列ルールが書けます。</p>
<div class="tip"><b>💡</b>すべてのアサーションは<b>同じ位置</b>から始まるので、順序は関係ありません。</div>`
      , ex: {
        'e6-1': { title: '合格パスワード', desc: '合格の行にマッチ:8 文字以上で、数字・小文字・大文字を含む。', hint: '<code>^</code> の後に <code>(?=.*…)</code> を 3 つ重ねる。' },
        'e6-2': { title: '合格ユーザー名', desc: '英数字 4〜8 文字(大文字小文字無視)で、<b>数字で始まらない</b>。行全体にマッチ。', hint: '<code>^(?!\\d)[a-z\\d]{4,8}$</code>' },
        'e6-3': { title: 'a と e の両方を含む単語', desc: '文字 <code>a</code> と <code>e</code> を両方含む単語全体にマッチ。', hint: '<code>\\b(?=\\w*a)(?=\\w*e)\\w+\\b</code>' }
      }
    },
    l7: {
      title: 'すき間で手術:ゼロ幅置換', short: 'ゼロ幅置換',
      summary: 'アサーションで位置にマッチし、replace で何かを差し込む。',
      body: R`
<div class="story"><b>🧪 灰原のメモ:</b>アサーションが見つけるのはすき間。なら、そこに<b>何かを詰める</b>こともできる。ゼロ幅マッチをカンマに置換すれば、その位置にカンマを挿入したことになる。APTX4869 の調合より簡単よ。</div>
<h2>例:桁区切り</h2>
<p><code>1234567</code> → <code>1,234,567</code>。考え方:「後ろの数字の個数がちょうど 3 の倍数」になる位置を探す。</p>
<div class="codeblock"><pre>\B(?=(\d{3})+(?!\d))</pre></div>
<ul><li><code>\B</code>:数字列の先頭ではない(先頭にカンマが付くのを防ぐ)</li>
<li><code>(?=(\d{3})+(?!\d))</code>:後ろが 3 桁の組の繰り返しで、数字の終わりまで続く</li></ul>
<h2>例:キャメルケースからスネークケースへ</h2>
<p><code>(?&lt;=[a-z])(?=[A-Z])</code>:前が小文字、後ろが大文字のすき間。後読みと先読みが<b>同じ</b>すき間を見張ります。</p>
<div class="tip"><b>💡</b>この章の練習は「置換」モード:あなたの正規表現は <code>text.replace(正規表現, 置換文字列)</code> として実行され、結果が期待出力と一致する必要があります。</div>`
      , ex: {
        'e7-1': { title: '桁区切り', desc: '3 桁ごとにカンマを挿入。置換文字列は <code>,</code>', hint: '<code>\\B(?=(\\d{3})+(?!\\d))</code>' },
        'e7-2': { title: 'キャメルケースを下線に', desc: '「小文字の次が大文字」のすき間に <code>_</code> を挿入。(挿入のみ、大文字小文字は変えない)', hint: '<code>(?&lt;=[a-z])(?=[A-Z])</code>' },
        'e7-3': { title: '重なった文字の間に線', desc: '<b>同じ文字</b>が 2 つ並ぶ間に <code>|</code> を挿入。ヒント:アサーションの中でも <code>\\1</code> のような後方参照が使える。', hint: '<code>(?&lt;=(.))(?=\\1)</code>' }
      }
    },
    l8: {
      title: 'JS の得意技:可変長の後読み', short: '可変長の後読み',
      summary: '多くの言語は後読みを固定長に限る。JS は違う。',
      body: R`
<div class="story"><b>🧪 灰原のメモ:</b>Java や Python では、振り返る「歩数」は固定でなければならない。JavaScript の見張りは<b>後ろ向きに走れる</b>から、後読みの中に <code>*</code>、<code>+</code>、<code>|</code> を置ける。……まあ、賢いと認めてあげる。</div>
<h2>例</h2>
<div class="codeblock"><pre>(?&lt;=price:\s*)\d+</pre></div>
<p>コロンの後ろに空白がいくつあっても価格が取れます。Python の <code>re</code> ではエラーになります。</p>
<h2>後読みは「後ろ向きにマッチ」</h2>
<p>JS では後読みの内部を<b>右から左へ</b>マッチするので、次の点に注意:</p>
<ul><li>キャプチャグループの後方参照:参照はグループの<b>左側</b>に書く。</li>
<li>貪欲な量指定子も逆順に動くが、最終的なマッチ可否にはたいてい影響しない。</li></ul>
<div class="warn"><b>⚠️</b>Safari 16.4 より前の古いブラウザに対応するなら後読みは使えません。代わりにキャプチャグループを使います。</div>
<div class="tip"><b>💡</b>「<code>(?&lt;=ab|c)x</code>」も正当です。長さの違う選択肢を混ぜられます。</div>`
      , ex: {
        'e8-1': { title: '空白の数は問わない価格', desc: '<code>price:</code> の後ろ(間に空白がいくつあってもよい)の数字を取り出す。', hint: '<code>(?&lt;=price:\\s*)\\d+</code>' },
        'e8-2': { title: '引用符の中の単語', desc: 'ダブルクォートにぴったり囲まれた単語(<code>\\w+</code>)を、引用符なしで取り出す。', hint: '両側にアサーション:<code>(?&lt;=")\\w+(?=")</code>' },
        'e8-3': { title: '通貨の接頭辞', desc: '直前が <code>USD</code>、<code>EUR</code>、<code>¥</code>(間に空白可)の数字を取り出す。', hint: '後読みの中に <code>(USD|EUR|¥)</code> と <code>\\s*</code> を入れる。' }
      }
    },
    l9: {
      title: '最終課題:総合演習と落とし穴', short: '最終課題',
      summary: 'すべてのアサーションを組み合わせ、その“性格の欠点”を知る。',
      body: R`
<div class="story"><b>🧪 灰原のメモ:</b>最終章。道具箱の中身を全部使って。それから、いくつかの「性格の欠点」も覚えておくこと。ここまで来たなら、思ったほど鈍くはないようね。</div>
<h2>5 つの要点</h2>
<ol>
<li><b>アサーション内でもキャプチャグループは使える</b>し、保存される:<code>(?=(\d+))</code> は文字を消費せずに覗いて保存できる。</li>
<li><b>否定アサーション内のグループは常に undefined</b>:否定が成功するとは、中身がマッチしなかったということだから。</li>
<li><b>アサーションは内側へバックトラックしない</b>:成功したら内部の選択は固定される(アトミックグループのように)。</li>
<li><b>性能</b>:<code>(?=.*x)</code> は行全体を走査する。長いテキストで重ねるときは注意。</li>
<li><b>可読性</b>:複雑なアサーションは分けて書き、コメントを付ける。3 か月後の自分が感謝する。</li></ol>
<h2>アサーションのパターン早見</h2>
<table class="t"><tr><th>やりたいこと</th><th>書き方</th></tr>
<tr><td>単語全体</td><td><code>\bword\b</code></td></tr>
<tr><td>後ろが〜 / 〜でない</td><td><code>X(?=Y)</code> / <code>X(?!Y)</code></td></tr>
<tr><td>前が〜 / 〜でない</td><td><code>(?&lt;=Y)X</code> / <code>(?&lt;!Y)X</code></td></tr>
<tr><td>A も B も含む</td><td><code>^(?=.*A)(?=.*B)</code></td></tr>
<tr><td>A を含まない</td><td><code>^(?!.*A)</code></td></tr>
<tr><td>A と B の間</td><td><code>(?&lt;=A).+?(?=B)</code></td></tr></table>
<div class="tip"><b>💡</b>この 3 問が終われば、あなたはアサーションの達人よ。</div>`
      , ex: {
        'e9-1': { title: '角括弧の中身', desc: '<code>[ ]</code> の各ペアの中身を取り出す(括弧は含めず、ペアをまたがない)。', hint: '<code>(?&lt;=\\[).+?(?=\\])</code>' },
        'e9-2': { title: 'error を含み ignore を含まない行', desc: '<code>error</code> を含み、<code>ignore</code> は<b>含まない</b>行全体にマッチ。', hint: '<code>^(?=.*error)(?!.*ignore).*$</code>' },
        'e9-3': { title: '電話番号のマスク', desc: '11 桁の電話番号の真ん中 4 桁を <code>*</code> にする:前に 3 桁、後ろに 4 桁ある 4 桁の数字にマッチ。置換文字列は <code>****</code>。', hint: '<code>(?&lt;=\\b\\d{3})\\d{4}(?=\\d{4}\\b)</code>' }
      }
    }
  };

  /* ===== 日本語 · UI ===== */
  var JA_UI = {
    langName: '日本語', docTitle: 'LookaroundLab · 正規表現アサーション実験室',
    metaDesc: '正規表現のアサーション(先読み・後読み・肯定・否定)をゼロから実験室で学ぼう。',
    menu: 'メニューを開く', navLabel: '章の一覧', langLabel: '言語', themeLabel: 'テーマ', themeAuto: '🖥️ システムに合わせる', themeLight: '☀️ ライト', themeDark: '🌙 ダーク',
    ranks: ['通りすがりの人', '少年探偵団の見習い', '帝丹小学校の天才', '元組織の科学者', '灰色の頭脳 🏆'],
    navStart: 'スタート', navHome: '🏠 ホーム', navTools: 'ツール', navLab: '🧪 自由実験室', navCheat: '📋 早見表',
    navSettings: '設定', navReset: '🗑️ 進捗をリセット', resetConfirm: '学習の進捗をすべて消しますか?',
    levelHeads: ['', '初級 · 入門', '中級 · 応用', '上級 · 達人'], levelShort: ['', '初級', '中級', '上級'],
    regexLabel: '正規表現', flagsLabel: 'フラグ', textLabel: 'テスト文字列',
    matchCount: '{n} 件マッチ', zwNote: '(うち {z} 件はゼロ幅、水色の縦線で表示)',
    heroLead: '正規表現アサーション実験室 —— 「なぜ詳しいかなんて聞かないで。先に問題を解きなさい。」',
    homeStory: 'アサーション(Lookaround)は正規表現で一番静かな一族。<b>見るだけで、持ち去らない</b>。ちょっと私に似ているわね。全 {n} 章、{m} 問。<code>\\b</code> から桁区切り、電話番号のマスクまで進みます。進捗はブラウザに保存されるわ。キャッシュを軽々しく消さないこと。やり直しは手伝わないから。',
    progress: '進捗:<b>{a} / {b}</b>({p}%) · 称号:<b>{r}</b>',
    start: '🚀 学習をはじめる', cont: '▶ 続きから', review: '🔁 第 1 章を復習', cardCount: '{d}/{t} 問 · {lv}',
    chapterOf: '第 {i} / {n} 章', labH2: '🧪 実験場', labSub: '自由にいじって、ハイライトの変化を見てみよう', exH2: '🎯 練習問題', toCheat: '早見表を見る →',
    exHead: '✏️ 練習 {i}:{title}', exDone: '✔ 完了', flagsLine: 'フラグ:', replaceLine: ' · 置換文字列:', answerPlaceholder: 'ここに正規表現を書く', answerLabel: 'あなたの答え',
    inputText: '入力文字列', expMatch: '期待するマッチ', gotMatch: 'あなたのマッチ', expOut: '期待する出力', gotOut: 'あなたの出力', noMatch: '(マッチなし)', empty: '(空)',
    run: '▶ 実行してチェック', hintBtn: '💡 ヒント', ansBtn: '🔑 答えを見る', ansLocked: '3 回挑戦すると解放', ansPrefix: '🔑 参考解答:',
    passed: '……全部通過。ぎりぎり合格にしてあげる。', errEmpty: '何も書いてないじゃない。私に代わりにやらせる気?', errSyntax: '正規表現の構文エラー:{e}',
    errNeed: 'この問題ではアサーション {n} を使うこと。ごまかそうとしても、お見通しよ。', errFail: 'まだ通っていないわ。赤枠の差をよく見て。手がかりはそこにある。',
    labPageH1: '🧪 自由実験室', labPageLead: '何でも試して。水色の縦線がゼロ幅マッチ。',
    cheatH1: '📋 アサーション早見表', cheatLead: '一目見れば思い出せる。',
    cheat: R`<table class="t"><tr><th>構文</th><th>名前</th><th>意味</th><th>例</th></tr>
<tr><td><code>^</code> <code>$</code></td><td>行頭 / 行末</td><td><code>m</code> フラグで行ごと</td><td><code>^\d+$</code></td></tr>
<tr><td><code>\b</code> <code>\B</code></td><td>単語境界 / 非境界</td><td>\w と \W の間の位置</td><td><code>\bcat\b</code></td></tr>
<tr><td><code>(?=…)</code></td><td>肯定先読み</td><td>後ろが〜であること</td><td><code>\d+(?=元)</code></td></tr>
<tr><td><code>(?!…)</code></td><td>否定先読み</td><td>後ろが〜でないこと</td><td><code>foo(?!bar)</code></td></tr>
<tr><td><code>(?&lt;=…)</code></td><td>肯定後読み</td><td>前が〜であること</td><td><code>(?&lt;=\$)\d+</code></td></tr>
<tr><td><code>(?&lt;!…)</code></td><td>否定後読み</td><td>前が〜でないこと</td><td><code>(?&lt;!java)script</code></td></tr></table>
<h2>よく使う型</h2><table class="t"><tr><th>やりたいこと</th><th>書き方</th></tr>
<tr><td>複数条件を同時に満たす</td><td><code>^(?=.*A)(?=.*B).*$</code></td></tr>
<tr><td>行に A を含まない</td><td><code>^(?!.*A).*$</code></td></tr>
<tr><td>桁区切り</td><td><code>\B(?=(\d{3})+(?!\d))</code></td></tr>
<tr><td>キャメルケースの分割</td><td><code>(?&lt;=[a-z])(?=[A-Z])</code></td></tr>
<tr><td>括弧の中身</td><td><code>(?&lt;=\[).+?(?=\])</code></td></tr></table>`
  };
  ZH_UI.sep = ':'; EN_UI.sep = ': '; JA_UI.sep = ':';

  /* ===== 语言管理 ===== */
  var DATA = {
    zh: { ui: ZH_UI, lessons: ZH_LESSONS },
    ja: { ui: JA_UI, lessons: JA_LESSONS },
    en: { ui: EN_UI, lessons: EN_LESSONS }
  };
  var LANGS = ['zh', 'ja', 'en'];
  var STORE = 'lookaroundlab.lang';
  var current = 'zh';

  /* 根据 navigator 判断语言;无法判断时默认中文 */
  function detect(nav) {
    var list = [];
    try {
      nav = nav || (typeof navigator !== 'undefined' ? navigator : null);
      if (nav) {
        if (nav.languages && nav.languages.length) list = Array.prototype.slice.call(nav.languages);
        else if (nav.language) list = [nav.language];
        else if (nav.userLanguage) list = [nav.userLanguage];
      }
    } catch (e) { list = []; }
    for (var i = 0; i < list.length; i++) {
      var c = String(list[i] || '').toLowerCase().slice(0, 2);
      if (LANGS.indexOf(c) >= 0) return c;
    }
    return 'zh';
  }

  function init() {
    var saved = null;
    try { saved = root.localStorage.getItem(STORE); } catch (e) { saved = null; }
    current = LANGS.indexOf(saved) >= 0 ? saved : detect();
    return current;
  }
  function setLang(l) {
    if (LANGS.indexOf(l) < 0) return;
    current = l;
    try { root.localStorage.setItem(STORE, l); } catch (e) { /* 忽略 */ }
  }
  function getLang() { return current; }

  /* 取文本:{name} 占位符替换;缺失时回退到中文 */
  function t(key, vars) {
    var s = DATA[current].ui[key];
    if (s === undefined) s = DATA.zh.ui[key];
    if (s === undefined) return key;
    if (vars && typeof s === 'string') s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : m; });
    return s;
  }
  function lessonText(id) { return DATA[current].lessons[id] || DATA.zh.lessons[id]; }

  root.LL_I18N = { LANGS: LANGS, detect: detect, init: init, setLang: setLang, getLang: getLang, t: t, lessonText: lessonText, names: LANGS.map(function (l) { return { code: l, name: DATA[l].ui.langName }; }) };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.LL_I18N;
})(typeof window !== 'undefined' ? window : globalThis);
