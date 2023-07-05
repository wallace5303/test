// Lute - 一款结构化的 Markdown 引擎，支持 Go 和 JavaScript
// Copyright (c) 2019-present, b3log.org
//
// Lute is licensed under Mulan PSL v2.
// You can use this software according to the terms and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//         http://license.coscl.org.cn/MulanPSL2
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.

package test

import (
	"bytes"
	"fmt"
	"testing"

	"github.com/alecthomas/chroma/quick"
)

func TestChroma(t *testing.T) {
	java := `
	@RequestProcessing("/")
	public void index(final RequestContext context) {
		context.setRenderer(new SimpleFMRenderer("index.ftl"));
		final Map<String, Object> dataModel = context.getRenderer().getRenderDataModel();
		dataModel.put("greeting", "Hello, Latke!");
	}`

	writer := bytes.Buffer{}
	err := quick.Highlight(&writer, java, "java", "html", "github")
	if nil != err {
		t.Fatalf(err.Error())
	}
	if output := writer.String(); expected != output {
		fmt.Println("unexpected output:\n" + output)
		t.Fail()
	}
}

var expected = `<html>
<style type="text/css">
/* Background */ .bg { background-color: #ffffff }
/* PreWrapper */ .chroma { background-color: #ffffff; }
/* Error */ .chroma .err { color: #a61717; background-color: #e3d2d2 }
/* LineTableTD */ .chroma .lntd { vertical-align: top; padding: 0; margin: 0; border: 0; }
/* LineTable */ .chroma .lntable { border-spacing: 0; padding: 0; margin: 0; border: 0; }
/* LineHighlight */ .chroma .hl { background-color: #e5e5e5 }
/* LineNumbersTable */ .chroma .lnt { white-space: pre; user-select: none; margin-right: 0.4em; padding: 0 0.4em 0 0.4em;color: #7f7f7f }
/* LineNumbers */ .chroma .ln { white-space: pre; user-select: none; margin-right: 0.4em; padding: 0 0.4em 0 0.4em;color: #7f7f7f }
/* Line */ .chroma .line { display: flex; }
/* Keyword */ .chroma .k { color: #000000; font-weight: bold }
/* KeywordConstant */ .chroma .kc { color: #000000; font-weight: bold }
/* KeywordDeclaration */ .chroma .kd { color: #000000; font-weight: bold }
/* KeywordNamespace */ .chroma .kn { color: #000000; font-weight: bold }
/* KeywordPseudo */ .chroma .kp { color: #000000; font-weight: bold }
/* KeywordReserved */ .chroma .kr { color: #000000; font-weight: bold }
/* KeywordType */ .chroma .kt { color: #445588; font-weight: bold }
/* NameAttribute */ .chroma .na { color: #008080 }
/* NameBuiltin */ .chroma .nb { color: #0086b3 }
/* NameBuiltinPseudo */ .chroma .bp { color: #999999 }
/* NameClass */ .chroma .nc { color: #445588; font-weight: bold }
/* NameConstant */ .chroma .no { color: #008080 }
/* NameDecorator */ .chroma .nd { color: #3c5d5d; font-weight: bold }
/* NameEntity */ .chroma .ni { color: #800080 }
/* NameException */ .chroma .ne { color: #990000; font-weight: bold }
/* NameFunction */ .chroma .nf { color: #990000; font-weight: bold }
/* NameLabel */ .chroma .nl { color: #990000; font-weight: bold }
/* NameNamespace */ .chroma .nn { color: #555555 }
/* NameTag */ .chroma .nt { color: #000080 }
/* NameVariable */ .chroma .nv { color: #008080 }
/* NameVariableClass */ .chroma .vc { color: #008080 }
/* NameVariableGlobal */ .chroma .vg { color: #008080 }
/* NameVariableInstance */ .chroma .vi { color: #008080 }
/* LiteralString */ .chroma .s { color: #dd1144 }
/* LiteralStringAffix */ .chroma .sa { color: #dd1144 }
/* LiteralStringBacktick */ .chroma .sb { color: #dd1144 }
/* LiteralStringChar */ .chroma .sc { color: #dd1144 }
/* LiteralStringDelimiter */ .chroma .dl { color: #dd1144 }
/* LiteralStringDoc */ .chroma .sd { color: #dd1144 }
/* LiteralStringDouble */ .chroma .s2 { color: #dd1144 }
/* LiteralStringEscape */ .chroma .se { color: #dd1144 }
/* LiteralStringHeredoc */ .chroma .sh { color: #dd1144 }
/* LiteralStringInterpol */ .chroma .si { color: #dd1144 }
/* LiteralStringOther */ .chroma .sx { color: #dd1144 }
/* LiteralStringRegex */ .chroma .sr { color: #009926 }
/* LiteralStringSingle */ .chroma .s1 { color: #dd1144 }
/* LiteralStringSymbol */ .chroma .ss { color: #990073 }
/* LiteralNumber */ .chroma .m { color: #009999 }
/* LiteralNumberBin */ .chroma .mb { color: #009999 }
/* LiteralNumberFloat */ .chroma .mf { color: #009999 }
/* LiteralNumberHex */ .chroma .mh { color: #009999 }
/* LiteralNumberInteger */ .chroma .mi { color: #009999 }
/* LiteralNumberIntegerLong */ .chroma .il { color: #009999 }
/* LiteralNumberOct */ .chroma .mo { color: #009999 }
/* Operator */ .chroma .o { color: #000000; font-weight: bold }
/* OperatorWord */ .chroma .ow { color: #000000; font-weight: bold }
/* Comment */ .chroma .c { color: #999988; font-style: italic }
/* CommentHashbang */ .chroma .ch { color: #999988; font-style: italic }
/* CommentMultiline */ .chroma .cm { color: #999988; font-style: italic }
/* CommentSingle */ .chroma .c1 { color: #999988; font-style: italic }
/* CommentSpecial */ .chroma .cs { color: #999999; font-weight: bold; font-style: italic }
/* CommentPreproc */ .chroma .cp { color: #999999; font-weight: bold; font-style: italic }
/* CommentPreprocFile */ .chroma .cpf { color: #999999; font-weight: bold; font-style: italic }
/* GenericDeleted */ .chroma .gd { color: #000000; background-color: #ffdddd }
/* GenericEmph */ .chroma .ge { color: #000000; font-style: italic }
/* GenericError */ .chroma .gr { color: #aa0000 }
/* GenericHeading */ .chroma .gh { color: #999999 }
/* GenericInserted */ .chroma .gi { color: #000000; background-color: #ddffdd }
/* GenericOutput */ .chroma .go { color: #888888 }
/* GenericPrompt */ .chroma .gp { color: #555555 }
/* GenericStrong */ .chroma .gs { font-weight: bold }
/* GenericSubheading */ .chroma .gu { color: #aaaaaa }
/* GenericTraceback */ .chroma .gt { color: #aa0000 }
/* GenericUnderline */ .chroma .gl { text-decoration: underline }
/* TextWhitespace */ .chroma .w { color: #bbbbbb }
body { background-color: #ffffff; }
</style><body class="bg">
<pre tabindex="0" class="chroma"><code><span class="line"><span class="cl">
</span></span><span class="line"><span class="cl">	<span class="nd">@RequestProcessing</span><span class="o">(</span><span class="s">&#34;/&#34;</span><span class="o">)</span>
</span></span><span class="line"><span class="cl">	<span class="kd">public</span> <span class="kt">void</span> <span class="nf">index</span><span class="o">(</span><span class="kd">final</span> <span class="n">RequestContext</span> <span class="n">context</span><span class="o">)</span> <span class="o">{</span>
</span></span><span class="line"><span class="cl">		<span class="n">context</span><span class="o">.</span><span class="na">setRenderer</span><span class="o">(</span><span class="k">new</span> <span class="n">SimpleFMRenderer</span><span class="o">(</span><span class="s">&#34;index.ftl&#34;</span><span class="o">));</span>
</span></span><span class="line"><span class="cl">		<span class="kd">final</span> <span class="n">Map</span><span class="o">&lt;</span><span class="n">String</span><span class="o">,</span> <span class="n">Object</span><span class="o">&gt;</span> <span class="n">dataModel</span> <span class="o">=</span> <span class="n">context</span><span class="o">.</span><span class="na">getRenderer</span><span class="o">().</span><span class="na">getRenderDataModel</span><span class="o">();</span>
</span></span><span class="line"><span class="cl">		<span class="n">dataModel</span><span class="o">.</span><span class="na">put</span><span class="o">(</span><span class="s">&#34;greeting&#34;</span><span class="o">,</span> <span class="s">&#34;Hello, Latke!&#34;</span><span class="o">);</span>
</span></span><span class="line"><span class="cl">	<span class="o">}</span></span></span></code></pre>
</body>
</html>
`
