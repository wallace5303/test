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
	"testing"

	"github.com/88250/lute"
)

var supsubTests = []parseTest{

	{"9", "foo~-bar~baz", "<p>foo<sub>-bar</sub>baz</p>\n"},
	{"8", "foo~-~", "<p>foo<sub>-</sub></p>\n"},
	{"7", "foo~+~", "<p>foo<sub>+</sub></p>\n"},
	{"6", "foo^-^", "<p>foo<sup>-</sup></p>\n"},
	{"5", "foo^+^", "<p>foo<sup>+</sup></p>\n"},
	{"4", "foo^b~ar^ba~z", "<p>foo<sup>b~ar</sup>ba~z</p>\n"},
	{"3", "foo^barbaz", "<p>foo^barbaz</p>\n"},
	{"2", "foo*^bar^*baz", "<p>foo*<sup>bar</sup>*baz</p>\n"},
	{"1", "foo^*bar*^baz", "<p>foo^<em>bar</em>^baz</p>\n"},
	{"0", "foo^bar^baz~bazz~", "<p>foo<sup>bar</sup>baz<sub>bazz</sub></p>\n"},
}

func TestSupSub(t *testing.T) {
	luteEngine := lute.New()
	luteEngine.ParseOptions.Sup = true
	luteEngine.ParseOptions.Sub = true

	for _, test := range supsubTests {
		html := luteEngine.MarkdownStr(test.name, test.from)
		if test.to != html {
			t.Fatalf("test case [%s] failed\nexpected\n\t%q\ngot\n\t%q\noriginal markdown text\n\t%q", test.name, test.to, html, test.from)
		}
	}
}
