(() => {
    var e = {
            747: function(e, t, n) {
                var o, i, r;
                ! function(a, s) {
                    "use strict";
                    i = [n(18)], void 0 === (r = "function" == typeof(o = function(e) {
                        var t = /(^|@)\S+:\d+/,
                            n = /^\s*at .*(\S+:\d+|\(native\))/m,
                            o = /^(eval@)?(\[native code])?$/;
                        return {
                            parse: function(e) {
                                if (void 0 !== e.stacktrace || void 0 !== e["opera#sourceloc"]) return this.parseOpera(e);
                                if (e.stack && e.stack.match(n)) return this.parseV8OrIE(e);
                                if (e.stack) return this.parseFFOrSafari(e);
                                throw new Error("Cannot parse given Error object")
                            },
                            extractLocation: function(e) {
                                if (-1 === e.indexOf(":")) return [e];
                                var t = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e.replace(/[()]/g, ""));
                                return [t[1], t[2] || void 0, t[3] || void 0]
                            },
                            parseV8OrIE: function(t) {
                                return t.stack.split("\n").filter((function(e) {
                                    return !!e.match(n)
                                }), this).map((function(t) {
                                    t.indexOf("(eval ") > -1 && (t = t.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, ""));
                                    var n = t.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, ""),
                                        o = n.match(/ (\(.+\)$)/);
                                    n = o ? n.replace(o[0], "") : n;
                                    var i = this.extractLocation(o ? o[1] : n),
                                        r = o && n || void 0,
                                        a = ["eval", "<anonymous>"].indexOf(i[0]) > -1 ? void 0 : i[0];
                                    return new e({
                                        functionName: r,
                                        fileName: a,
                                        lineNumber: i[1],
                                        columnNumber: i[2],
                                        source: t
                                    })
                                }), this)
                            },
                            parseFFOrSafari: function(t) {
                                return t.stack.split("\n").filter((function(e) {
                                    return !e.match(o)
                                }), this).map((function(t) {
                                    if (t.indexOf(" > eval") > -1 && (t = t.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1")), -1 === t.indexOf("@") && -1 === t.indexOf(":")) return new e({
                                        functionName: t
                                    });
                                    var n = /((.*".+"[^@]*)?[^@]*)(?:@)/,
                                        o = t.match(n),
                                        i = o && o[1] ? o[1] : void 0,
                                        r = this.extractLocation(t.replace(n, ""));
                                    return new e({
                                        functionName: i,
                                        fileName: r[0],
                                        lineNumber: r[1],
                                        columnNumber: r[2],
                                        source: t
                                    })
                                }), this)
                            },
                            parseOpera: function(e) {
                                return !e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length ? this.parseOpera9(e) : e.stack ? this.parseOpera11(e) : this.parseOpera10(e)
                            },
                            parseOpera9: function(t) {
                                for (var n = /Line (\d+).*script (?:in )?(\S+)/i, o = t.message.split("\n"), i = [], r = 2, a = o.length; r < a; r += 2) {
                                    var s = n.exec(o[r]);
                                    s && i.push(new e({
                                        fileName: s[2],
                                        lineNumber: s[1],
                                        source: o[r]
                                    }))
                                }
                                return i
                            },
                            parseOpera10: function(t) {
                                for (var n = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, o = t.stacktrace.split("\n"), i = [], r = 0, a = o.length; r < a; r += 2) {
                                    var s = n.exec(o[r]);
                                    s && i.push(new e({
                                        functionName: s[3] || void 0,
                                        fileName: s[2],
                                        lineNumber: s[1],
                                        source: o[r]
                                    }))
                                }
                                return i
                            },
                            parseOpera11: function(n) {
                                return n.stack.split("\n").filter((function(e) {
                                    return !!e.match(t) && !e.match(/^Error created at/)
                                }), this).map((function(t) {
                                    var n, o = t.split("@"),
                                        i = this.extractLocation(o.pop()),
                                        r = o.shift() || "",
                                        a = r.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || void 0;
                                    r.match(/\(([^)]*)\)/) && (n = r.replace(/^[^(]+\(([^)]*)\)$/, "$1"));
                                    var s = void 0 === n || "[arguments not available]" === n ? void 0 : n.split(",");
                                    return new e({
                                        functionName: a,
                                        args: s,
                                        fileName: i[0],
                                        lineNumber: i[1],
                                        columnNumber: i[2],
                                        source: t
                                    })
                                }), this)
                            }
                        }
                    }) ? o.apply(t, i) : o) || (e.exports = r)
                }()
            },
            18: function(e, t) {
                var n, o, i;
                ! function(r, a) {
                    "use strict";
                    o = [], void 0 === (i = "function" == typeof(n = function() {
                        function e(e) {
                            return e.charAt(0).toUpperCase() + e.substring(1)
                        }

                        function t(e) {
                            return function() {
                                return this[e]
                            }
                        }
                        var n = ["isConstructor", "isEval", "isNative", "isToplevel"],
                            o = ["columnNumber", "lineNumber"],
                            i = ["fileName", "functionName", "source"],
                            r = n.concat(o, i, ["args"], ["evalOrigin"]);

                        function a(t) {
                            if (t)
                                for (var n = 0; n < r.length; n++) void 0 !== t[r[n]] && this["set" + e(r[n])](t[r[n]])
                        }
                        a.prototype = {
                            getArgs: function() {
                                return this.args
                            },
                            setArgs: function(e) {
                                if ("[object Array]" !== Object.prototype.toString.call(e)) throw new TypeError("Args must be an Array");
                                this.args = e
                            },
                            getEvalOrigin: function() {
                                return this.evalOrigin
                            },
                            setEvalOrigin: function(e) {
                                if (e instanceof a) this.evalOrigin = e;
                                else {
                                    if (!(e instanceof Object)) throw new TypeError("Eval Origin must be an Object or StackFrame");
                                    this.evalOrigin = new a(e)
                                }
                            },
                            toString: function() {
                                var e = this.getFileName() || "",
                                    t = this.getLineNumber() || "",
                                    n = this.getColumnNumber() || "",
                                    o = this.getFunctionName() || "";
                                return this.getIsEval() ? e ? "[eval] (" + e + ":" + t + ":" + n + ")" : "[eval]:" + t + ":" + n : o ? o + " (" + e + ":" + t + ":" + n + ")" : e + ":" + t + ":" + n
                            }
                        }, a.fromString = function(e) {
                            var t = e.indexOf("("),
                                n = e.lastIndexOf(")"),
                                o = e.substring(0, t),
                                i = e.substring(t + 1, n).split(","),
                                r = e.substring(n + 1);
                            if (0 === r.indexOf("@")) var s = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(r, ""),
                                c = s[1],
                                l = s[2],
                                u = s[3];
                            return new a({
                                functionName: o,
                                args: i || void 0,
                                fileName: c,
                                lineNumber: l || void 0,
                                columnNumber: u || void 0
                            })
                        };
                        for (var s = 0; s < n.length; s++) a.prototype["get" + e(n[s])] = t(n[s]), a.prototype["set" + e(n[s])] = function(e) {
                            return function(t) {
                                this[e] = Boolean(t)
                            }
                        }(n[s]);
                        for (var c = 0; c < o.length; c++) a.prototype["get" + e(o[c])] = t(o[c]), a.prototype["set" + e(o[c])] = function(e) {
                            return function(t) {
                                if (n = t, isNaN(parseFloat(n)) || !isFinite(n)) throw new TypeError(e + " must be a Number");
                                var n;
                                this[e] = Number(t)
                            }
                        }(o[c]);
                        for (var l = 0; l < i.length; l++) a.prototype["get" + e(i[l])] = t(i[l]), a.prototype["set" + e(i[l])] = function(e) {
                            return function(t) {
                                this[e] = String(t)
                            }
                        }(i[l]);
                        return a
                    }) ? n.apply(t, o) : n) || (e.exports = i)
                }()
            },
            700: function(e, t, n) {
                var o;
                ! function(i, r) {
                    "use strict";
                    var a = "function",
                        s = "undefined",
                        c = "object",
                        l = "string",
                        u = "model",
                        d = "name",
                        p = "type",
                        f = "vendor",
                        m = "version",
                        h = "architecture",
                        b = "console",
                        w = "mobile",
                        g = "tablet",
                        v = "smarttv",
                        y = "wearable",
                        E = "embedded",
                        _ = "Amazon",
                        C = "Apple",
                        A = "ASUS",
                        x = "BlackBerry",
                        T = "Google",
                        N = "Huawei",
                        S = "LG",
                        k = "Microsoft",
                        P = "Motorola",
                        I = "Samsung",
                        R = "Sharp",
                        O = "Sony",
                        L = "Xiaomi",
                        D = "Zebra",
                        M = "Facebook",
                        j = "Chromium OS",
                        G = "Mac OS",
                        B = function(e) {
                            for (var t = {}, n = 0; n < e.length; n++) t[e[n].toUpperCase()] = e[n];
                            return t
                        },
                        U = function(e, t) {
                            return typeof e === l && -1 !== V(t).indexOf(V(e))
                        },
                        V = function(e) {
                            return e.toLowerCase()
                        },
                        F = function(e, t) {
                            if (typeof e === l) return e = e.replace(/^\s\s*/, ""), typeof t === s ? e : e.substring(0, 350)
                        },
                        K = function(e, t) {
                            for (var n, o, i, s, l, u, d = 0; d < t.length && !l;) {
                                var p = t[d],
                                    f = t[d + 1];
                                for (n = o = 0; n < p.length && !l && p[n];)
                                    if (l = p[n++].exec(e))
                                        for (i = 0; i < f.length; i++) u = l[++o], typeof(s = f[i]) === c && s.length > 0 ? 2 === s.length ? typeof s[1] == a ? this[s[0]] = s[1].call(this, u) : this[s[0]] = s[1] : 3 === s.length ? typeof s[1] !== a || s[1].exec && s[1].test ? this[s[0]] = u ? u.replace(s[1], s[2]) : r : this[s[0]] = u ? s[1].call(this, u, s[2]) : r : 4 === s.length && (this[s[0]] = u ? s[3].call(this, u.replace(s[1], s[2])) : r) : this[s] = u || r;
                                d += 2
                            }
                        },
                        $ = function(e, t) {
                            for (var n in t)
                                if (typeof t[n] === c && t[n].length > 0) {
                                    for (var o = 0; o < t[n].length; o++)
                                        if (U(t[n][o], e)) return "?" === n ? r : n
                                } else if (U(t[n], e)) return "?" === n ? r : n;
                            return e
                        },
                        Y = {
                            ME: "4.90",
                            "NT 3.11": "NT3.51",
                            "NT 4.0": "NT4.0",
                            2e3: "NT 5.0",
                            XP: ["NT 5.1", "NT 5.2"],
                            Vista: "NT 6.0",
                            7: "NT 6.1",
                            8: "NT 6.2",
                            8.1: "NT 6.3",
                            10: ["NT 6.4", "NT 10.0"],
                            RT: "ARM"
                        },
                        q = {
                            browser: [
                                [/\b(?:crmo|crios)\/([\w\.]+)/i],
                                [m, [d, "Chrome"]],
                                [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                                [m, [d, "Edge"]],
                                [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],
                                [d, m],
                                [/opios[\/ ]+([\w\.]+)/i],
                                [m, [d, "Opera Mini"]],
                                [/\bopr\/([\w\.]+)/i],
                                [m, [d, "Opera"]],
                                [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i],
                                [d, m],
                                [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                                [m, [d, "UCBrowser"]],
                                [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i],
                                [m, [d, "WeChat(Win) Desktop"]],
                                [/micromessenger\/([\w\.]+)/i],
                                [m, [d, "WeChat"]],
                                [/konqueror\/([\w\.]+)/i],
                                [m, [d, "Konqueror"]],
                                [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                                [m, [d, "IE"]],
                                [/yabrowser\/([\w\.]+)/i],
                                [m, [d, "Yandex"]],
                                [/(avast|avg)\/([\w\.]+)/i],
                                [
                                    [d, /(.+)/, "$1 Secure Browser"], m
                                ],
                                [/\bfocus\/([\w\.]+)/i],
                                [m, [d, "Firefox Focus"]],
                                [/\bopt\/([\w\.]+)/i],
                                [m, [d, "Opera Touch"]],
                                [/coc_coc\w+\/([\w\.]+)/i],
                                [m, [d, "Coc Coc"]],
                                [/dolfin\/([\w\.]+)/i],
                                [m, [d, "Dolphin"]],
                                [/coast\/([\w\.]+)/i],
                                [m, [d, "Opera Coast"]],
                                [/miuibrowser\/([\w\.]+)/i],
                                [m, [d, "MIUI Browser"]],
                                [/fxios\/([-\w\.]+)/i],
                                [m, [d, "Firefox"]],
                                [/\bqihu|(qi?ho?o?|360)browser/i],
                                [
                                    [d, "360 Browser"]
                                ],
                                [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                                [
                                    [d, /(.+)/, "$1 Browser"], m
                                ],
                                [/(comodo_dragon)\/([\w\.]+)/i],
                                [
                                    [d, /_/g, " "], m
                                ],
                                [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],
                                [d, m],
                                [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i],
                                [d],
                                [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
                                [
                                    [d, M], m
                                ],
                                [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i],
                                [d, m],
                                [/\bgsa\/([\w\.]+) .*safari\//i],
                                [m, [d, "GSA"]],
                                [/headlesschrome(?:\/([\w\.]+)| )/i],
                                [m, [d, "Chrome Headless"]],
                                [/ wv\).+(chrome)\/([\w\.]+)/i],
                                [
                                    [d, "Chrome WebView"], m
                                ],
                                [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                                [m, [d, "Android Browser"]],
                                [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
                                [d, m],
                                [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                                [m, [d, "Mobile Safari"]],
                                [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                                [m, d],
                                [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                                [d, [m, $, {
                                    "1.0": "/8",
                                    1.2: "/1",
                                    1.3: "/3",
                                    "2.0": "/412",
                                    "2.0.2": "/416",
                                    "2.0.3": "/417",
                                    "2.0.4": "/419",
                                    "?": "/"
                                }]],
                                [/(webkit|khtml)\/([\w\.]+)/i],
                                [d, m],
                                [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                                [
                                    [d, "Netscape"], m
                                ],
                                [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                                [m, [d, "Firefox Reality"]],
                                [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i],
                                [d, m],
                                [/(cobalt)\/([\w\.]+)/i],
                                [d, [m, /master.|lts./, ""]]
                            ],
                            cpu: [
                                [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                                [
                                    [h, "amd64"]
                                ],
                                [/(ia32(?=;))/i],
                                [
                                    [h, V]
                                ],
                                [/((?:i[346]|x)86)[;\)]/i],
                                [
                                    [h, "ia32"]
                                ],
                                [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                                [
                                    [h, "arm64"]
                                ],
                                [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                                [
                                    [h, "armhf"]
                                ],
                                [/windows (ce|mobile); ppc;/i],
                                [
                                    [h, "arm"]
                                ],
                                [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                                [
                                    [h, /ower/, "", V]
                                ],
                                [/(sun4\w)[;\)]/i],
                                [
                                    [h, "sparc"]
                                ],
                                [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],
                                [
                                    [h, V]
                                ]
                            ],
                            device: [
                                [/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
                                [u, [f, I],
                                    [p, g]
                                ],
                                [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i],
                                [u, [f, I],
                                    [p, w]
                                ],
                                [/\((ip(?:hone|od)[\w ]*);/i],
                                [u, [f, C],
                                    [p, w]
                                ],
                                [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i],
                                [u, [f, C],
                                    [p, g]
                                ],
                                [/(macintosh);/i],
                                [u, [f, C]],
                                [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                                [u, [f, R],
                                    [p, w]
                                ],
                                [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
                                [u, [f, N],
                                    [p, g]
                                ],
                                [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],
                                [u, [f, N],
                                    [p, w]
                                ],
                                [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],
                                [
                                    [u, /_/g, " "],
                                    [f, L],
                                    [p, w]
                                ],
                                [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                                [
                                    [u, /_/g, " "],
                                    [f, L],
                                    [p, g]
                                ],
                                [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],
                                [u, [f, "OPPO"],
                                    [p, w]
                                ],
                                [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
                                [u, [f, "Vivo"],
                                    [p, w]
                                ],
                                [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                                [u, [f, "Realme"],
                                    [p, w]
                                ],
                                [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],
                                [u, [f, P],
                                    [p, w]
                                ],
                                [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                                [u, [f, P],
                                    [p, g]
                                ],
                                [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
                                [u, [f, S],
                                    [p, g]
                                ],
                                [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i],
                                [u, [f, S],
                                    [p, w]
                                ],
                                [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],
                                [u, [f, "Lenovo"],
                                    [p, g]
                                ],
                                [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
                                [
                                    [u, /_/g, " "],
                                    [f, "Nokia"],
                                    [p, w]
                                ],
                                [/(pixel c)\b/i],
                                [u, [f, T],
                                    [p, g]
                                ],
                                [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                                [u, [f, T],
                                    [p, w]
                                ],
                                [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
                                [u, [f, O],
                                    [p, w]
                                ],
                                [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                                [
                                    [u, "Xperia Tablet"],
                                    [f, O],
                                    [p, g]
                                ],
                                [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
                                [u, [f, "OnePlus"],
                                    [p, w]
                                ],
                                [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i],
                                [u, [f, _],
                                    [p, g]
                                ],
                                [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                                [
                                    [u, /(.+)/g, "Fire Phone $1"],
                                    [f, _],
                                    [p, w]
                                ],
                                [/(playbook);[-\w\),; ]+(rim)/i],
                                [u, f, [p, g]],
                                [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                                [u, [f, x],
                                    [p, w]
                                ],
                                [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
                                [u, [f, A],
                                    [p, g]
                                ],
                                [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                                [u, [f, A],
                                    [p, w]
                                ],
                                [/(nexus 9)/i],
                                [u, [f, "HTC"],
                                    [p, g]
                                ],
                                [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],
                                [f, [u, /_/g, " "],
                                    [p, w]
                                ],
                                [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                                [u, [f, "Acer"],
                                    [p, g]
                                ],
                                [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                                [u, [f, "Meizu"],
                                    [p, w]
                                ],
                                [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i],
                                [f, u, [p, w]],
                                [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i],
                                [f, u, [p, g]],
                                [/(surface duo)/i],
                                [u, [f, k],
                                    [p, g]
                                ],
                                [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                                [u, [f, "Fairphone"],
                                    [p, w]
                                ],
                                [/(u304aa)/i],
                                [u, [f, "AT&T"],
                                    [p, w]
                                ],
                                [/\bsie-(\w*)/i],
                                [u, [f, "Siemens"],
                                    [p, w]
                                ],
                                [/\b(rct\w+) b/i],
                                [u, [f, "RCA"],
                                    [p, g]
                                ],
                                [/\b(venue[\d ]{2,7}) b/i],
                                [u, [f, "Dell"],
                                    [p, g]
                                ],
                                [/\b(q(?:mv|ta)\w+) b/i],
                                [u, [f, "Verizon"],
                                    [p, g]
                                ],
                                [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                                [u, [f, "Barnes & Noble"],
                                    [p, g]
                                ],
                                [/\b(tm\d{3}\w+) b/i],
                                [u, [f, "NuVision"],
                                    [p, g]
                                ],
                                [/\b(k88) b/i],
                                [u, [f, "ZTE"],
                                    [p, g]
                                ],
                                [/\b(nx\d{3}j) b/i],
                                [u, [f, "ZTE"],
                                    [p, w]
                                ],
                                [/\b(gen\d{3}) b.+49h/i],
                                [u, [f, "Swiss"],
                                    [p, w]
                                ],
                                [/\b(zur\d{3}) b/i],
                                [u, [f, "Swiss"],
                                    [p, g]
                                ],
                                [/\b((zeki)?tb.*\b) b/i],
                                [u, [f, "Zeki"],
                                    [p, g]
                                ],
                                [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                                [
                                    [f, "Dragon Touch"], u, [p, g]
                                ],
                                [/\b(ns-?\w{0,9}) b/i],
                                [u, [f, "Insignia"],
                                    [p, g]
                                ],
                                [/\b((nxa|next)-?\w{0,9}) b/i],
                                [u, [f, "NextBook"],
                                    [p, g]
                                ],
                                [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                                [
                                    [f, "Voice"], u, [p, w]
                                ],
                                [/\b(lvtel\-)?(v1[12]) b/i],
                                [
                                    [f, "LvTel"], u, [p, w]
                                ],
                                [/\b(ph-1) /i],
                                [u, [f, "Essential"],
                                    [p, w]
                                ],
                                [/\b(v(100md|700na|7011|917g).*\b) b/i],
                                [u, [f, "Envizen"],
                                    [p, g]
                                ],
                                [/\b(trio[-\w\. ]+) b/i],
                                [u, [f, "MachSpeed"],
                                    [p, g]
                                ],
                                [/\btu_(1491) b/i],
                                [u, [f, "Rotor"],
                                    [p, g]
                                ],
                                [/(shield[\w ]+) b/i],
                                [u, [f, "Nvidia"],
                                    [p, g]
                                ],
                                [/(sprint) (\w+)/i],
                                [f, u, [p, w]],
                                [/(kin\.[onetw]{3})/i],
                                [
                                    [u, /\./g, " "],
                                    [f, k],
                                    [p, w]
                                ],
                                [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                                [u, [f, D],
                                    [p, g]
                                ],
                                [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                                [u, [f, D],
                                    [p, w]
                                ],
                                [/smart-tv.+(samsung)/i],
                                [f, [p, v]],
                                [/hbbtv.+maple;(\d+)/i],
                                [
                                    [u, /^/, "SmartTV"],
                                    [f, I],
                                    [p, v]
                                ],
                                [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
                                [
                                    [f, S],
                                    [p, v]
                                ],
                                [/(apple) ?tv/i],
                                [f, [u, "Apple TV"],
                                    [p, v]
                                ],
                                [/crkey/i],
                                [
                                    [u, "Chromecast"],
                                    [f, T],
                                    [p, v]
                                ],
                                [/droid.+aft(\w)( bui|\))/i],
                                [u, [f, _],
                                    [p, v]
                                ],
                                [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                                [u, [f, R],
                                    [p, v]
                                ],
                                [/(bravia[\w ]+)( bui|\))/i],
                                [u, [f, O],
                                    [p, v]
                                ],
                                [/(mitv-\w{5}) bui/i],
                                [u, [f, L],
                                    [p, v]
                                ],
                                [/Hbbtv.*(technisat) (.*);/i],
                                [f, u, [p, v]],
                                [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],
                                [
                                    [f, F],
                                    [u, F],
                                    [p, v]
                                ],
                                [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                                [
                                    [p, v]
                                ],
                                [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                                [f, u, [p, b]],
                                [/droid.+; (shield) bui/i],
                                [u, [f, "Nvidia"],
                                    [p, b]
                                ],
                                [/(playstation [345portablevi]+)/i],
                                [u, [f, O],
                                    [p, b]
                                ],
                                [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                                [u, [f, k],
                                    [p, b]
                                ],
                                [/((pebble))app/i],
                                [f, u, [p, y]],
                                [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
                                [u, [f, C],
                                    [p, y]
                                ],
                                [/droid.+; (glass) \d/i],
                                [u, [f, T],
                                    [p, y]
                                ],
                                [/droid.+; (wt63?0{2,3})\)/i],
                                [u, [f, D],
                                    [p, y]
                                ],
                                [/(quest( 2| pro)?)/i],
                                [u, [f, M],
                                    [p, y]
                                ],
                                [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                                [f, [p, E]],
                                [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
                                [u, [p, w]],
                                [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
                                [u, [p, g]],
                                [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                                [
                                    [p, g]
                                ],
                                [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
                                [
                                    [p, w]
                                ],
                                [/(android[-\w\. ]{0,9});.+buil/i],
                                [u, [f, "Generic"]]
                            ],
                            engine: [
                                [/windows.+ edge\/([\w\.]+)/i],
                                [m, [d, "EdgeHTML"]],
                                [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                                [m, [d, "Blink"]],
                                [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i],
                                [d, m],
                                [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                                [m, d]
                            ],
                            os: [
                                [/microsoft (windows) (vista|xp)/i],
                                [d, m],
                                [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],
                                [d, [m, $, Y]],
                                [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                                [
                                    [d, "Windows"],
                                    [m, $, Y]
                                ],
                                [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i],
                                [
                                    [m, /_/g, "."],
                                    [d, "iOS"]
                                ],
                                [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
                                [
                                    [d, G],
                                    [m, /_/g, "."]
                                ],
                                [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                                [m, d],
                                [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i],
                                [d, m],
                                [/\(bb(10);/i],
                                [m, [d, x]],
                                [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                                [m, [d, "Symbian"]],
                                [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],
                                [m, [d, "Firefox OS"]],
                                [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                                [m, [d, "webOS"]],
                                [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
                                [m, [d, "watchOS"]],
                                [/crkey\/([\d\.]+)/i],
                                [m, [d, "Chromecast"]],
                                [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
                                [
                                    [d, j], m
                                ],
                                [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i],
                                [d, m],
                                [/(sunos) ?([\w\.\d]*)/i],
                                [
                                    [d, "Solaris"], m
                                ],
                                [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, /(unix) ?([\w\.]*)/i],
                                [d, m]
                            ]
                        },
                        z = function(e, t) {
                            if (typeof e === c && (t = e, e = r), !(this instanceof z)) return new z(e, t).getResult();
                            var n = typeof i !== s && i.navigator ? i.navigator : r,
                                o = e || (n && n.userAgent ? n.userAgent : ""),
                                u = n && n.userAgentData ? n.userAgentData : r,
                                d = t ? function(e, t) {
                                    var n = {};
                                    for (var o in e) t[o] && t[o].length % 2 == 0 ? n[o] = t[o].concat(e[o]) : n[o] = e[o];
                                    return n
                                }(q, t) : q;
                            return this.getBrowser = function() {
                                var e, t = {};
                                return t.name = r, t.version = r, K.call(t, o, d.browser), t.major = typeof(e = t.version) === l ? e.replace(/[^\d\.]/g, "").split(".")[0] : r, n && n.brave && typeof n.brave.isBrave == a && (t.name = "Brave"), t
                            }, this.getCPU = function() {
                                var e = {};
                                return e.architecture = r, K.call(e, o, d.cpu), e
                            }, this.getDevice = function() {
                                var e = {};
                                return e.vendor = r, e.model = r, e.type = r, K.call(e, o, d.device), !e.type && u && u.mobile && (e.type = w), "Macintosh" == e.model && n && typeof n.standalone !== s && n.maxTouchPoints && n.maxTouchPoints > 2 && (e.model = "iPad", e.type = g), e
                            }, this.getEngine = function() {
                                var e = {};
                                return e.name = r, e.version = r, K.call(e, o, d.engine), e
                            }, this.getOS = function() {
                                var e = {};
                                return e.name = r, e.version = r, K.call(e, o, d.os), !e.name && u && "Unknown" != u.platform && (e.name = u.platform.replace(/chrome os/i, j).replace(/macos/i, G)), e
                            }, this.getResult = function() {
                                return {
                                    ua: this.getUA(),
                                    browser: this.getBrowser(),
                                    engine: this.getEngine(),
                                    os: this.getOS(),
                                    device: this.getDevice(),
                                    cpu: this.getCPU()
                                }
                            }, this.getUA = function() {
                                return o
                            }, this.setUA = function(e) {
                                return o = typeof e === l && e.length > 350 ? F(e, 350) : e, this
                            }, this.setUA(o), this
                        };
                    z.VERSION = "1.0.34", z.BROWSER = B([d, m, "major"]), z.CPU = B([h]), z.DEVICE = B([u, f, p, b, w, v, g, y, E]), z.ENGINE = z.OS = B([d, m]), typeof t !== s ? (e.exports && (t = e.exports = z), t.UAParser = z) : n.amdO ? (o = function() {
                        return z
                    }.call(t, n, t, e)) === r || (e.exports = o) : typeof i !== s && (i.UAParser = z);
                    var H = typeof i !== s && (i.jQuery || i.Zepto);
                    if (H && !H.ua) {
                        var W = new z;
                        H.ua = W.getResult(), H.ua.get = function() {
                            return W.getUA()
                        }, H.ua.set = function(e) {
                            W.setUA(e);
                            var t = W.getResult();
                            for (var n in t) H.ua[n] = t[n]
                        }
                    }
                }("object" == typeof window ? window : this)
            }
        },
        t = {};

    function n(o) {
        var i = t[o];
        if (void 0 !== i) return i.exports;
        var r = t[o] = {
            exports: {}
        };
        return e[o].call(r.exports, r, r.exports, n), r.exports
    }
    n.amdO = {}, (() => {
        "use strict";
        const e = "product_added_to_cart";

        function t() {
            return window
        }
        let o, i, r, a, s, c, l, u, d, p, f = "OFF";

        function m(e, n, o) {
            const {
                jQuery: i
            } = t();
            i && i(e).bind ? i(e).bind(n, o) : e.addEventListener && e.addEventListener(n, o)
        }

        function h(e, t) {
            "ON" === f && console && console.warn && console.warn(`[pixel_shop_events_listener] Error in ${e}:  ${t.message}`)
        }

        function b(e) {
            m(window, "load", (() => {
                for (const t of document.forms) e(t)
            }))
        }

        function w(e, t, n) {
            if (t.length !== n.length) throw Error("Payload body and response have different number of items");
            t.forEach(((t, o) => {
                let i = 1;
                try {
                    i = parseInt(n[o].quantity, 10) || 1
                } catch (r) {
                    h("handleBulkItemCartAddResponse", r)
                }
                g(e, t, i)
            }))
        }

        function g(n, o, i) {
            const r = ((null === (c = null === (l = t()) || void 0 === l ? void 0 : l.ShopifyAnalytics) || void 0 === c ? void 0 : c.meta) || {}).currency,
                a = {
                    id: String(o.id),
                    image: {
                        src: o.image
                    },
                    price: {
                        amount: o.price / 100,
                        currencyCode: r
                    },
                    product: {
                        id: String(o.product_id),
                        title: o.title,
                        vendor: o.vendor,
                        type: o.product_type,
                        untranslatedTitle: o.untranslated_product_title
                    },
                    sku: o.sku,
                    title: o.variant_title,
                    untranslatedTitle: o.untranslated_variant_title
                },
                s = {
                    cost: {
                        totalAmount: {
                            amount: a.price.amount * i,
                            currencyCode: r
                        }
                    },
                    merchandise: a,
                    quantity: i
                };
            var c, l;
            n(e, {
                cartLine: s
            })
        }

        function v(e) {
            if (!e) return 1;
            try {
                return JSON.parse(e).quantity || 1
            } catch (t) {
                if (e instanceof FormData) {
                    if (e.has("quantity")) return Number(e.get("quantity"))
                } else {
                    const t = e.split("&");
                    for (const e of t) {
                        const t = e.split("=");
                        if ("quantity" === t[0]) return Number(t[1])
                    }
                }
            }
            return 1
        }
        class y {
            static handleXhrOpen() {}
            static handleXhrDone(e) {
                try {
                    const t = document.createElement("a");
                    t.href = e.url;
                    const n = t.pathname ? t.pathname : e.url;
                    y.ADD_TO_CART_REGEX.test(n) && y.parsePayloadResponse(e, (t => {
                        const n = Object.keys(t);
                        if (1 === n.length && "items" === n[0]) {
                            const n = t.items;
                            let i;
                            try {
                                i = JSON.parse(e.body).items
                            } catch (o) {
                                i = function(e, t) {
                                    const n = new Array(t);
                                    for (let o = 0; o < t; o++) n[o] = {};
                                    for (const o of decodeURI(e).split("&")) {
                                        const e = o.split("="),
                                            t = e[0].match(/items\[(\d+)\]\[(\w+)\].*/);
                                        if (t) {
                                            const o = Number(t[1]),
                                                i = t[2];
                                            "quantity" === i ? n[o].quantity = e[1] : "id" === i && (n[o].id = e[1])
                                        }
                                    }
                                    return n
                                }(e.body, n.length)
                            }
                            w(e.publish, n, i)
                        } else g(e.publish, t, v(e.body))
                    }))
                } catch (t) {
                    h("handleXhrDone", t)
                }
            }
            static parseBlobToJson(e, t) {
                const n = new FileReader;
                n.addEventListener("loadend", (() => {
                    t(JSON.parse(String.fromCharCode(...new Uint8Array(n.result))))
                })), n.readAsArrayBuffer(e)
            }
            static parsePayloadResponse(e, t) {
                e.xhr.response instanceof Blob ? y.parseBlobToJson(e.xhr.response, t) : e.xhr.responseText && t(JSON.parse(e.xhr.responseText))
            }
            constructor(e, t, n, o, i) {
                this.oldOnReadyStateChange = void 0, this.xhr = void 0, this.url = void 0, this.method = void 0, this.body = void 0, this.publish = void 0, this.xhr = e, this.url = t, this.method = n, this.body = o, this.publish = i
            }
            onReadyStateChange() {
                this.xhr.readyState === XMLHttpRequest.DONE && y.handleXhrDone({
                    method: this.method,
                    url: this.url,
                    body: this.body,
                    xhr: this.xhr,
                    publish: this.publish
                }), this.oldOnReadyStateChange && this.oldOnReadyStateChange.call(this.xhr, new Event("oldOnReadyStateChange"))
            }
        }

        function E(n, o) {
            ! function(e, t) {
                const n = e.prototype.open,
                    o = e.prototype.send;
                e.prototype.open = function(e, t) {
                    this._url = t, this._method = e, n.apply(this, arguments)
                }, e.prototype.send = function(e) {
                    if (!(e instanceof Document)) {
                        const n = new y(this, this._url, this._method, e || "", t);
                        this.addEventListener ? this.addEventListener("readystatechange", n.onReadyStateChange.bind(n), !1) : (n.oldOnReadyStateChange = this.onreadystatechange, this.onreadystatechange = n.onReadyStateChange)
                    }
                    o.call(this, e)
                }
            }(XMLHttpRequest, n),
            function(e, t) {
                const n = e.fetch;

                function o(e, n) {
                    e.clone().json().then((e => {
                        const o = n.items,
                            i = e.items;
                        return w(t, i, o), e
                    })).catch(r)
                }

                function i(e, n) {
                    const o = v(n);
                    e.clone().json().then((e => g(t, e, o))).catch(r)
                }

                function r(e) {
                    h("handleFetchRequest", e)
                }
                "function" == typeof n && (e.fetch = function(...e) {
                    return n.apply(this, Array.prototype.slice.call(e)).then((e => {
                        if (!e.ok) return e;
                        const t = document.createElement("a");
                        t.href = e.url;
                        const n = t.pathname ? t.pathname : e.url;
                        try {
                            if (y.ADD_TO_CART_REGEX.test(n)) {
                                try {
                                    const t = JSON.parse(arguments[1].body);
                                    if (Object.keys(t).includes("items")) return o(e, t), e
                                } catch (a) {
                                    r(a)
                                }
                                i(e, arguments[1].body)
                            }
                        } catch (a) {
                            r(a)
                        }
                        return e
                    }))
                })
            }(t(), n), b((t => {
                const i = t.getAttribute("action");
                i && i.indexOf("/cart/add") >= 0 && m(t, "submit", (t => {
                    ! function(t, n, o) {
                        const i = n || window.event;
                        if (i.defaultPrevented || i.isDefaultPrevented && i.isDefaultPrevented()) return;
                        const r = i.currentTarget || i.srcElement;
                        if (r && r instanceof Element && (r.getAttribute("action") || r.getAttribute("href"))) try {
                            const n = function(e) {
                                let t;
                                const n = e.querySelector('[name="id"]');
                                return n instanceof HTMLSelectElement && n.options ? t = n.options[n.selectedIndex] : (n instanceof HTMLOptionElement || n instanceof HTMLInputElement) && (t = n), t
                            }(r);
                            if (!n) return;
                            const i = n.value,
                                a = function(e) {
                                    const t = e.querySelector('[name="quantity"]');
                                    return t instanceof HTMLInputElement ? Number(t.value) : 1
                                }(r),
                                s = function(e, t) {
                                    var n;
                                    let o;
                                    const i = null === (n = t.productVariants) || void 0 === n ? void 0 : n.filter((t => t.id === e));
                                    if (!i || !i.length) throw new Error("Product variant not found");
                                    return o = { ...i[0]
                                    }, o
                                }(i, o),
                                c = {
                                    cost: {
                                        totalAmount: {
                                            amount: s.price.amount * a,
                                            currencyCode: s.price.currencyCode
                                        }
                                    },
                                    merchandise: s,
                                    quantity: a
                                };
                            t(e, {
                                cartLine: c
                            })
                        } catch (a) {
                            h("handleSubmitCartAdd", a)
                        }
                    }(n, t, o)
                }))
            }))
        }

        function _(e, t, n) {
            var o;
            null != n && n.logLevel && (o = n.logLevel, f = o), E(e, t),
                function(e, t) {
                    b((n => {
                        const o = n.querySelector('[name="previous_step"]');
                        o && o instanceof HTMLInputElement && "payment_method" === o.value && m(document.body, "submit", (n => {
                            ! function(e, t, n) {
                                const o = t || window.event,
                                    i = o.target || o.srcElement;
                                if (i && i instanceof HTMLFormElement && i.getAttribute("action") && null !== i.getAttribute("data-payment-form")) try {
                                    const t = n.checkout;
                                    if (!t) throw new Error("Checkout data not found");
                                    e("payment_info_submitted", {
                                        checkout: t
                                    })
                                } catch (r) {
                                    h("handleSubmitToPaymentAdd", r)
                                }
                            }(e, n, t)
                        }))
                    }))
                }(e, t)
        }
        var C, A, x, T, N, S;
        y.ADD_TO_CART_REGEX = /^(?:\/[a-zA-Z]+(?:-[a-zA-Z]+)?)?\/cart\/add(?:\.js|\.json)?$/,
            function(e) {
                e.TRACKING_ACCEPTED = "trackingConsentAccepted", e.TRACKING_DECLINED = "trackingConsentDeclined", e.FIRST_PARTY_MARKETING_ACCEPTED = "firstPartyMarketingConsentAccepted", e.THIRD_PARTY_MARKETING_ACCEPTED = "thirdPartyMarketingConsentAccepted", e.ANALYTICS_ACCEPTED = "analyticsConsentAccepted", e.PREFERENCES_ACCEPTED = "preferencesConsentAccepted", e.FIRST_PARTY_MARKETING_DECLINED = "firstPartyMarketingConsentDeclined", e.THIRD_PARTY_MARKETING_DECLINED = "thirdPartyMarketingConsentDeclined", e.ANALYTICS_DECLINED = "analyticsConsentDeclined", e.PREFERENCES_DECLINED = "preferencesConsentDeclined", e.CONSENT_COLLECTED = "visitorConsentCollected"
            }(o || (o = {})), (S = i || (i = {})).V2_0 = "2.0", S.V2_1 = "2.1",
            function(e) {
                e.ACCEPTED = "yes", e.DECLINED = "no", e.NO_INTERACTION = "no_interaction", e.NO_VALUE = ""
            }(r || (r = {})), (N = a || (a = {})).NO_VALUE = "", N.ACCEPTED = "1", N.DECLINED = "0", (T = s || (s = {})).GDPR = "GDPR", T.CCPA = "CCPA", T.NO_VALUE = "",
            function(e) {
                e.PREFERENCES = "p", e.ANALYTICS = "a", e.FIRST_PARTY_MARKETING = "m", e.THIRD_PARTY_MARKETING = "t"
            }(c || (c = {})), (x = l || (l = {})).CCPA_BLOCK_ALL = "CCPA_BLOCK_ALL", x.GDPR = "GDPR", x.GDPR_BLOCK_ALL = "GDPR_BLOCK_ALL", x.CCPA = "CCPA", (A = u || (u = {})).MARKETING = "m", A.ANALYTICS = "a", A.PREFERENCES = "p", A.GPC = "g", A.SALE_OF_DATA = "s",
            function(e) {
                e.MARKETING = "m", e.ANALYTICS = "a", e.PREFERENCES = "p", e.GPC = "g", e.SALE_OF_DATA = "s"
            }(d || (d = {})), (C = p || (p = {})).MARKETING = "marketing", C.ANALYTICS = "analytics", C.PREFERENCES = "preferences", C.GPC = "gpc", C.SALE_OF_DATA = "sale_of_data";
        const k = ["lim", "v", "con", "reg"];
        let P = {};

        function I(e) {
            if (e in P) return P[e];
            const t = document.cookie ? document.cookie.split("; ") : [];
            P[e] = void 0;
            for (let n = 0; n < t.length; n++) {
                const [o, i] = t[n].split("=");
                if (e === decodeURIComponent(o)) {
                    P[e] = JSON.parse(decodeURIComponent(i));
                    break
                }
            }
            return P[e]
        }

        function R() {
            P = {}
        }

        function O(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }))), n.push.apply(n, o)
            }
            return n
        }

        function L(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? O(Object(n), !0).forEach((function(t) {
                    D(e, t, n[t])
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : O(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }))
            }
            return e
        }

        function D(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function M() {
            const e = I("_tracking_consent");
            if (void 0 !== e && (t = e, [i.V2_0, i.V2_1].includes(t.v) && function(e, t) {
                    const n = t.slice().sort();
                    return e.length === t.length && e.slice().sort().every(((e, t) => e === n[t]))
                }(Object.keys(t).filter((e => "region" !== e)), k))) return e;
            var t
        }

        function j() {
            try {
                let e = M();
                if (!e) return;
                return e.v === i.V2_0 ? function(e) {
                    const t = e.con || {};
                    return {
                        con: {
                            CMP: {
                                [d.MARKETING]: t.GDPR || a.NO_VALUE,
                                [u.ANALYTICS]: t.GDPR || a.NO_VALUE,
                                [u.PREFERENCES]: t.GDPR || a.NO_VALUE,
                                [u.GPC]: a.NO_VALUE,
                                [u.SALE_OF_DATA]: t.CCPA || a.NO_VALUE
                            }
                        },
                        reg: e.reg,
                        v: i.V2_1,
                        lim: e.lim
                    }
                }(e) : e
            } catch (e) {
                return
            }
        }

        function G() {
            return {
                m: V(d.MARKETING),
                a: V(d.ANALYTICS),
                p: V(d.PREFERENCES),
                s: V(d.SALE_OF_DATA),
                g: V(d.GPC)
            }
        }

        function B() {
            return G()[d.SALE_OF_DATA]
        }

        function U(e = null) {
            return null === e && (e = j()), void 0 === e
        }

        function V(e) {
            if (e == d.GPC) return me.isGPCSignalPresent() ? me.isGPCOptOutPresent() ? a.DECLINED : a.ACCEPTED : a.NO_VALUE;
            const t = j();
            if (!t) return a.NO_VALUE;
            const n = t.con.CMP;
            return n ? n[e] : a.NO_VALUE
        }

        function F() {
            return I("_cmp_a")
        }

        function K(e) {
            const t = F();
            if (!t) return !0;
            const n = t.purposes[e];
            return "boolean" != typeof n || n
        }

        function $() {
            return K(c.PREFERENCES)
        }

        function Y() {
            return K(c.ANALYTICS)
        }

        function q() {
            return K(c.FIRST_PARTY_MARKETING)
        }

        function z() {
            return K(c.THIRD_PARTY_MARKETING)
        }
        const H = {
            "": [],
            GDPR: [l.GDPR, l.GDPR_BLOCK_ALL],
            CCPA: [l.CCPA_BLOCK_ALL, l.CCPA]
        };

        function W(e, t) {
            document.dispatchEvent(new CustomEvent(e, {
                detail: t || {}
            }))
        }

        function X(e) {
            !0 === e[c.FIRST_PARTY_MARKETING] ? W(o.FIRST_PARTY_MARKETING_ACCEPTED) : !1 === e[c.FIRST_PARTY_MARKETING] && W(o.FIRST_PARTY_MARKETING_DECLINED), !0 === e[c.THIRD_PARTY_MARKETING] ? W(o.THIRD_PARTY_MARKETING_ACCEPTED) : !1 === e[c.THIRD_PARTY_MARKETING] && W(o.THIRD_PARTY_MARKETING_DECLINED), !0 === e[c.ANALYTICS] ? W(o.ANALYTICS_ACCEPTED) : !1 === e[c.ANALYTICS] && W(o.ANALYTICS_DECLINED), !0 === e[c.PREFERENCES] ? W(o.PREFERENCES_ACCEPTED) : !1 === e[c.PREFERENCES] && W(o.PREFERENCES_DECLINED);
            const t = function(e) {
                return {
                    firstPartyMarketingAllowed: e[c.FIRST_PARTY_MARKETING],
                    thirdPartyMarketingAllowed: e[c.THIRD_PARTY_MARKETING],
                    analyticsAllowed: e[c.ANALYTICS],
                    preferencesAllowed: e[c.PREFERENCES]
                }
            }(e);
            W(o.CONSENT_COLLECTED, t)
        }

        function J(e, t, n) {
            const i = new XMLHttpRequest,
                r = JSON.stringify(e);
            i.open("POST", "/set_tracking_consent.json", !0), i.setRequestHeader("Content-Type", "application/json"), i.onreadystatechange = function() {
                if (4 !== i.readyState) return;
                R();
                const r = function(e) {
                    try {
                        return JSON.parse(e)
                    } catch (t) {
                        return {
                            error: "Unknown error"
                        }
                    }
                }(i.responseText);
                var a;
                0 === (a = i.status) || 200 >= a && a < 400 ? (function(e, t) {
                    void 0 !== e.consent ? (!0 === e.consent ? W(o.TRACKING_ACCEPTED) : W(o.TRACKING_DECLINED), t && X({
                        [c.PREFERENCES]: e.consent,
                        [c.ANALYTICS]: e.consent,
                        [c.FIRST_PARTY_MARKETING]: e.consent,
                        [c.THIRD_PARTY_MARKETING]: e.consent
                    })) : void 0 !== e.granular_consent && X({
                        [c.PREFERENCES]: $(),
                        [c.ANALYTICS]: Y(),
                        [c.FIRST_PARTY_MARKETING]: q(),
                        [c.THIRD_PARTY_MARKETING]: z()
                    })
                }(e, n), t(null, r)) : t(r)
            }, i.send(r)
        }

        function Q() {
            if (U()) return r.NO_VALUE;
            const e = G();
            return e[u.MARKETING] === a.ACCEPTED && e[u.ANALYTICS] === a.ACCEPTED ? r.ACCEPTED : e[u.MARKETING] === a.DECLINED || e[u.ANALYTICS] === a.DECLINED ? r.DECLINED : r.NO_INTERACTION
        }

        function Z() {
            const e = function() {
                const e = j();
                return U(e) ? s.NO_VALUE : e.reg
            }();
            return e in s ? e : s.NO_VALUE
        }

        function ee() {
            return function() {
                const e = j();
                return U(e) ? {
                    limit: []
                } : {
                    limit: e.lim
                }
            }()
        }

        function te(e) {
            return ce(l.GDPR_BLOCK_ALL) && e ? ie() ? document.referrer : "" : null
        }

        function ne(e) {
            return ce(l.GDPR_BLOCK_ALL) && e ? ie() ? window.location.pathname + window.location.search : "/" : null
        }

        function oe() {
            return "string" == typeof navigator.globalPrivacyControl ? "1" === navigator.globalPrivacyControl : Boolean(navigator.globalPrivacyControl)
        }

        function ie() {
            if ("" === document.referrer) return !0;
            const e = document.createElement("a");
            return e.href = document.referrer, window.location.hostname != e.hostname
        }

        function re() {
            return ce(l.GDPR) || ce(l.GDPR_BLOCK_ALL)
        }

        function ae() {
            const e = Z();
            if (e === s.NO_VALUE) return !1;
            const t = ee();
            return 0 !== t.limit.length && t.limit.some((t => function(e, t) {
                return H[e].includes(t)
            }(e, t)))
        }

        function se() {
            return !!U() || function() {
                if (!re()) return !0;
                const e = G();
                return e[u.MARKETING] === a.ACCEPTED && e[u.ANALYTICS] === a.ACCEPTED || e[u.MARKETING] !== a.DECLINED && e[u.ANALYTICS] !== a.DECLINED && Z() !== s.GDPR
            }()
        }

        function ce(e) {
            return ee().limit.includes(e)
        }

        function le() {
            return Z() === s.CCPA && !!ce(l.CCPA) && oe()
        }

        function ue() {
            return !le() && (!!U() || !1 !== se() && (ce(l.CCPA_BLOCK_ALL) ? Z() !== s.CCPA : !ce(l.CCPA) || B() !== a.DECLINED))
        }

        function de() {
            return le() ? r.DECLINED : (e = B(), U() ? r.NO_VALUE : e === a.NO_VALUE ? r.NO_INTERACTION : function(e) {
                switch (e) {
                    case a.ACCEPTED:
                        return r.ACCEPTED;
                    case a.DECLINED:
                        return r.DECLINED;
                    default:
                        return r.NO_VALUE
                }
            }(e));
            var e
        }

        function pe(e) {
            if (!re()) return !0;
            const t = G();
            return t[e] === a.ACCEPTED || t[e] !== a.DECLINED && Z() !== s.GDPR
        }

        function fe() {
            return function() {
                const e = M();
                switch (null == e ? void 0 : e.v) {
                    case "2.0":
                        return i.V2_0;
                    case "2.1":
                        return i.V2_1;
                    default:
                        return
                }
            }() === i.V2_1
        }
        const me = {
            getTrackingConsent: Q,
            setTrackingConsent: function(e, t) {
                if (U()) {
                    const e = "Shop is not configured to block privacy regulation in online store settings.";
                    return console.warn(e), t({
                        error: e
                    })
                }
                if (function(e) {
                        if (fe()) {
                            if ("boolean" != typeof e && "object" != typeof e) throw TypeError("setTrackingConsent must be called with a boolean or object consent value");
                            if ("object" == typeof e) {
                                const t = Object.keys(e);
                                if (0 === t.length) throw TypeError("The submitted consent object is empty.");
                                const n = [p.MARKETING, p.ANALYTICS, p.PREFERENCES, p.SALE_OF_DATA];
                                for (const e of t)
                                    if (!n.includes(e)) throw TypeError(`The submitted consent object should only contain the following keys: ${n.join(", ")}.`)
                            }
                        } else if ("boolean" != typeof e) throw TypeError("setTrackingConsent must be called with a boolean consent value")
                    }(e), "function" != typeof t) throw TypeError("setTrackingConsent must be called with a callback function");
                if ("object" == typeof e) {
                    const n = te(e.analytics),
                        o = ne(e.analytics);
                    return J(L(L({
                        granular_consent: e
                    }, null !== n && {
                        referrer: n
                    }), null !== o && {
                        landing_page: o
                    }), t, fe())
                } {
                    const n = te(e),
                        o = ne(e);
                    return J(L(L({
                        consent: e
                    }, null !== n && {
                        referrer: n
                    }), null !== o && {
                        landing_page: o
                    }), t, fe())
                }
            },
            userCanBeTracked: se,
            getRegulation: Z,
            isRegulationEnforced: ae,
            getShopPrefs: ee,
            shouldShowGDPRBanner: function() {
                return Z() === s.GDPR && ae() && Q() === r.NO_INTERACTION
            },
            userDataCanBeSold: ue,
            setCCPAConsent: function(e, t) {
                if ("boolean" != typeof e) throw TypeError("setCCPAConsent must be called with a boolean consent value");
                if ("function" != typeof t) throw TypeError("setCCPAConsent must be called with a callback function");
                return J({
                    ccpa_consent: e
                }, t, fe())
            },
            getCCPAConsent: de,
            shouldShowCCPABanner: function() {
                return Z() === s.CCPA && ee().limit.includes(l.CCPA) && de() === r.NO_INTERACTION
            },
            haveAnalyticsConsent: function() {
                return fe() ? Y() : pe(u.ANALYTICS)
            },
            havePreferencesConsent: function() {
                return fe() ? $() : pe(u.PREFERENCES)
            },
            haveFirstPartyMarketingConsent: function() {
                return fe() ? q() : pe(u.MARKETING)
            },
            haveThirdPartyMarketingConsent: function() {
                return fe() ? z() : !!pe(u.MARKETING) && !!ue()
            },
            getCCPAConsentValue: B,
            merchantEnforcingRegulationLimit: ce,
            isGPCSignalPresent: function() {
                return void 0 !== navigator.globalPrivacyControl
            },
            isGPCOptOutPresent: oe,
            isValidGPCSignalOptOutPresent: le,
            exposeBetaFunctionality: fe,
            shouldShowBanner: function() {
                return fe() && function() {
                    const e = F();
                    return !!e && "boolean" == typeof e.display_banner && e.display_banner
                }() && V(d.ANALYTICS) === a.NO_VALUE && V(d.MARKETING) === a.NO_VALUE && V(d.PREFERENCES) === a.NO_VALUE
            },
            saleOfDataRegion: function() {
                return fe() && function() {
                    const e = F();
                    return e && e.sale_of_data_region || !1
                }()
            }
        };

        function he() {
            return me.userCanBeTracked()
        }
        const be = new Set;
        var we = function(e) {
                (e || []).forEach((e => be.add(e)))
            },
            ge = function(e) {
                return be.has(e)
            };
        const ve = "production",
            ye = "0.0.301",
            Ee = "modern",
            _e = "6d6339c0w77483ddapdc20cb53m2575a67f",
            Ce = "web_pixels_prefetch_assets",
            Ae = {
                test: "edge_test_click/1.0",
                load: "web_pixels_manager_load/3.1",
                init: "web_pixels_manager_init/3.2",
                register: "web_pixels_manager_pixel_register/3.5",
                subscriberEventEmit: "web_pixels_manager_subscriber_event_emit/3.3",
                eventPublish: "web_pixels_manager_event_publish/1.5",
                consentAccepted: "web_pixels_manager_consent_accepted/1.2",
                unload: "web_pixels_manager_unload/1.1"
            };

        function xe(e, t) {
            return {
                schemaId: Ae[e],
                payload: t
            }
        }
        const Te = {
            randomUUID: "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto)
        };
        let Ne;
        const Se = new Uint8Array(16);

        function ke() {
            if (!Ne && (Ne = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Ne)) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
            return Ne(Se)
        }
        const Pe = [];
        for (let n = 0; n < 256; ++n) Pe.push((n + 256).toString(16).slice(1));
        const Ie = function(e, t, n) {
            if (Te.randomUUID && !t && !e) return Te.randomUUID();
            const o = (e = e || {}).random || (e.rng || ke)();
            if (o[6] = 15 & o[6] | 64, o[8] = 63 & o[8] | 128, t) {
                n = n || 0;
                for (let e = 0; e < 16; ++e) t[n + e] = o[e];
                return t
            }
            return function(e, t = 0) {
                return (Pe[e[t + 0]] + Pe[e[t + 1]] + Pe[e[t + 2]] + Pe[e[t + 3]] + "-" + Pe[e[t + 4]] + Pe[e[t + 5]] + "-" + Pe[e[t + 6]] + Pe[e[t + 7]] + "-" + Pe[e[t + 8]] + Pe[e[t + 9]] + "-" + Pe[e[t + 10]] + Pe[e[t + 11]] + Pe[e[t + 12]] + Pe[e[t + 13]] + Pe[e[t + 14]] + Pe[e[t + 15]]).toLowerCase()
            }(o)
        };
        let Re;

        function Oe() {
            return Re || (Re = function() {
                let e;
                try {
                    var t, n;
                    e = null !== (t = window.Shopify) && void 0 !== t && t.evids ? null === (n = window.Shopify) || void 0 === n ? void 0 : n.evids("session_started", {
                        analyticsFramework: "wpm"
                    }) : Ie()
                } catch (o) {
                    e = Ie()
                }
                return e
            }()), Re
        }

        function Le(e) {
            return e.replace(/\/$/, "")
        }
        const De = {},
            Me = {
                "pixel:register": {
                    start: {
                        name: "pixel:register:started",
                        params: {
                            pixelId: "",
                            source: ""
                        }
                    },
                    end: {
                        name: "pixel:register:completed",
                        params: {
                            pixelId: "",
                            source: ""
                        }
                    }
                },
                "page:session": {
                    start: {
                        name: "start",
                        params: De
                    },
                    end: {
                        name: "page:unload",
                        params: De
                    }
                },
                completed: {
                    start: {
                        name: "start",
                        params: De
                    },
                    end: {
                        name: "pixels:resolved",
                        params: De
                    }
                }
            };

        function je(e, t = De) {
            const n = Ge(e, "end", t),
                o = function(e, t) {
                    try {
                        const n = Be(e, "start", t),
                            o = Be(e, "end", t),
                            i = function(e, t) {
                                return Ue(e, t)
                            }(e, t);
                        return self.performance.measure(i, n, o)
                    } catch (n) {
                        return null
                    }
                }(e, t);
            return {
                mark: n,
                measurement: o
            }
        }

        function Ge(e, t, n) {
            try {
                const o = Be(e, t, n);
                return self.performance.mark(o), {
                    name: o,
                    params: n
                }
            } catch (o) {
                return {
                    name: null,
                    params: n
                }
            }
        }

        function Be(e, t, n) {
            return Ue(Me[e][t].name, n)
        }

        function Ue(e, t) {
            const n = ["wpm", e];
            return t && Object.keys(t).forEach((e => {
                n.push(t[e])
            })), n.join(":")
        }

        function Ve(e) {
            const t = {};
            for (const n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    const o = n.replace(/[A-Z]/g, (e => `_${e}`)).toLowerCase(),
                        i = e[n];
                    t[o] = null !== i && "object" == typeof i ? Ve(i) : i
                }
            return t
        }
        var Fe = n(700),
            Ke = n(747);
        class $e extends Error {
            constructor(...e) {
                super(...e), Error.captureStackTrace && Error.captureStackTrace(this, $e)
            }
        }
        class Ye extends Error {
            constructor(...e) {
                super(...e), this.message = "Excessive Stacktrace: May indicate infinite loop forming"
            }
        }
        const qe = {
                development: "https://web-pixels-manager.myshopify.io/bugsnag",
                production: "https://notify.bugsnag.com",
                test: "https://localhost"
            },
            ze = (e, t) => {
                try {
                    var n, o, i;
                    if (null != t && null !== (n = t.options) && void 0 !== n && n.sampleRate && ! function(e) {
                            if (e <= 0 || e > 100) throw new Error("Invalid sampling percent");
                            return 100 * Math.random() <= e
                        }(t.options.sampleRate)) return;
                    const s = {
                            severity: "error",
                            context: "",
                            unhandled: !0,
                            library: "browser",
                            ...t
                        },
                        c = function(t) {
                            try {
                                return new Fe(t).getResult()
                            } catch (e) {
                                return {
                                    ua: "",
                                    browser: {
                                        name: "",
                                        version: "",
                                        major: ""
                                    },
                                    engine: {
                                        name: "",
                                        version: ""
                                    },
                                    os: {
                                        name: "",
                                        version: ""
                                    },
                                    device: {
                                        model: "",
                                        type: "",
                                        vendor: ""
                                    },
                                    cpu: {
                                        architecture: ""
                                    }
                                }
                            }
                        }(s.userAgent || (null === (o = self.navigator) || void 0 === o ? void 0 : o.userAgent));
                    let l = {
                        errorClass: null == e ? void 0 : e.name,
                        message: null == e ? void 0 : e.message,
                        stacktrace: [],
                        type: "browserjs"
                    };
                    try {
                        l = function(e) {
                            if (t = e, !Boolean(t) || !(Boolean(t.stack) || Boolean(t.stacktrace) || Boolean(t["opera#sourceloc"])) || "string" != typeof(t.stack || t.stacktrace || t["opera#sourceloc"]) || t.stack === `${t.name}: ${t.message}`) throw new Error("Error incompatible with error-stack-parser");
                            var t;
                            const n = Ke.parse(e).reduce(((e, t) => {
                                const n = function(e) {
                                    const t = {
                                        file: e.fileName,
                                        method: (n = e.functionName, /^global code$/i.test(n || "") ? "global code" : n),
                                        lineNumber: e.lineNumber,
                                        columnNumber: e.columnNumber
                                    };
                                    var n;
                                    return t.lineNumber && t.lineNumber > -1 && !t.file && !t.method && (t.file = "global code"), t
                                }(t);
                                try {
                                    return "{}" === JSON.stringify(n) ? e : e.concat(n)
                                } catch (o) {
                                    return e
                                }
                            }), []);
                            return {
                                errorClass: null == e ? void 0 : e.name,
                                message: null == e ? void 0 : e.message,
                                stacktrace: n,
                                type: "browserjs"
                            }
                        }(e)
                    } catch (r) {
                        try {
                            l = function(e, t) {
                                let n = "";
                                const o = {
                                    lineNumber: "1",
                                    columnNumber: "1",
                                    method: t.context,
                                    file: "https://cdn.shopify.com/b6d6339c0w77483ddapdc20cb53m2575a67fm.js"
                                };
                                if (e.stackTrace || e.stack || e.description) {
                                    n = e.stack.split("\n")[0];
                                    const t = e.stack.match(/([0-9]+):([0-9]+)/);
                                    if (t && t.length > 2 && (o.lineNumber = t[1], o.columnNumber = t[2], parseInt(o.lineNumber, 10) > 1e5)) throw new Ye
                                }
                                return {
                                    errorClass: (null == e ? void 0 : e.name) || n,
                                    message: (null == e ? void 0 : e.message) || n,
                                    stacktrace: [o],
                                    type: "browserjs"
                                }
                            }(e, s)
                        } catch (a) {
                            if (a instanceof Ye) return
                        }
                    }
                    const u = qe[ve];
                    if (!u) return;
                    fetch(u, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Bugsnag-Api-Key": "bcbc9f6762da195561967577c2d74ff8",
                            "Bugsnag-Payload-Version": "5"
                        },
                        body: JSON.stringify({
                            payloadVersion: 5,
                            notifier: {
                                name: "web-pixel-manager",
                                version: ye,
                                url: "-"
                            },
                            events: [{
                                exceptions: [l],
                                context: s.context,
                                severity: s.severity,
                                unhandled: s.unhandled,
                                app: {
                                    version: ye
                                },
                                device: {
                                    manufacturer: c.device.vendor,
                                    model: c.device.model,
                                    osName: c.os.name,
                                    osVersion: c.os.version,
                                    browserName: c.browser.name,
                                    browserVersion: c.browser.version
                                },
                                metaData: {
                                    app: {
                                        library: s.library,
                                        browserTarget: Ee,
                                        env: ve,
                                        hashVersion: _e
                                    },
                                    device: {
                                        userAgent: s.userAgent || (null === (i = self.navigator) || void 0 === i ? void 0 : i.userAgent),
                                        renderingEngineName: c.engine.name,
                                        renderingEngineVersion: c.engine.version
                                    },
                                    request: {
                                        shopId: s.shopId,
                                        shopUrl: self.location.href,
                                        pixelId: s.pixelId,
                                        pixelType: s.pixelType,
                                        runtimeContext: s.runtimeContext
                                    },
                                    "Additional Notes": {
                                        initConfig: JSON.stringify(s.initConfig),
                                        notes: s.notes
                                    }
                                }
                            }]
                        })
                    }).catch((() => {}))
                } catch (s) {}
            };
        let He = "";

        function We(e = "") {
            He = Le(e)
        }
        let Xe = Je();

        function Je(e) {
            return e || "global"
        }
        const Qe = new Array;
        let Ze;

        function et(e, t = !1) {
            const n = {
                schema_id: e.schemaId,
                payload: Ve(e.payload),
                metadata: {
                    event_created_at_ms: ot()
                }
            };
            Qe.push(n), t ? nt() : void 0 === Ze && (Ze = setTimeout(nt, 500))
        }

        function tt(e, t, n = !1) {
            et(xe(e, t), n)
        }

        function nt({
            skipXhr: e
        } = {
            skipXhr: !1
        }) {
            if (Ze = void 0, 0 === Qe.length) return;
            const t = [...Qe];
            Qe.length = 0,
                function(e, t) {
                    if (0 === e.length) return !1;
                    const n = {
                        metadata: {
                            event_sent_at_ms: ot()
                        },
                        events: e
                    };
                    ! function(e, t) {
                        const n = `${{global:"https://monorail-edge.shopifysvc.com",wellKnown:`${He}/.well-known/shopify/monorail`,staging:"https://monorail-edge-staging.shopifycloud.com",test:"https://localhost"}[Xe]}/unstable/produce_batch`;
                        try {
                            if (self.navigator.sendBeacon.bind(self.navigator)(n, e)) return !0
                        } catch (o) {}
                        if (!t) {
                            const t = new XMLHttpRequest;
                            try {
                                t.open("POST", n, !0), t.setRequestHeader("Content-Type", "text/plain"), t.send(e)
                            } catch (i) {
                                ze(i, {
                                    context: "utilities/monorail/sendRequest",
                                    unhandled: !1
                                })
                            }
                        }
                    }(JSON.stringify(n), t)
                }(t, e)
        }

        function ot() {
            return (new Date).getTime()
        }
        class it extends Set {
            constructor(e, t) {
                if (super(), this.maxSize = void 0, this.keep = void 0, Number.isFinite(e) && !Number.isInteger(e) || e <= 0) throw new Error("Invalid maxSize specified");
                this.maxSize = e, this.keep = t
            }
            push(e) {
                if ("oldest" === this.keep) this.size < this.maxSize && this.add(e);
                else if ("newest" === this.keep && (this.add(e), this.size > this.maxSize))
                    for (const t of this)
                        if (this.delete(t), this.size <= this.maxSize) break;
                return this
            }
        }
        const rt = {
            bufferSize: 50,
            replayKeep: "oldest",
            enableSubscribeAll: !1,
            subscribeAllKey: "all_events"
        };
        class at {
            constructor(e = rt) {
                this.channelSubscribers = new Map, this.replayQueue = void 0, this.options = void 0, this.options = e, this.replayQueue = new it(e.bufferSize, e.replayKeep)
            }
            publish(e, t, n = {}) {
                var o;
                if (this.options.enableSubscribeAll && e === this.options.subscribeAllKey) throw new Error(`Cannot publish to ${String(e)}`);
                this.replayQueue.push({
                    name: e,
                    payload: t,
                    options: n
                });
                const i = (e, n) => n.apply({}, [{ ...t
                }]);
                var r;
                return null === (o = this.channelSubscribers.get(e)) || void 0 === o || o.forEach(i), this.options.enableSubscribeAll && (null === (r = this.channelSubscribers.get(this.options.subscribeAllKey)) || void 0 === r || r.forEach(i)), !0
            }
            subscribe(e, t, n = {}) {
                const o = this.channelSubscribers.get(e) || new Map;
                return this.channelSubscribers.set(e, o.set(t, n)), this.replayQueue.forEach((({
                    name: n,
                    payload: o
                }) => {
                    (e === n || this.options.enableSubscribeAll && e === this.options.subscribeAllKey) && t.apply({}, [{ ...o
                    }])
                })), () => o.delete(t)
            }
        }
        const st = ["checkout_address_info_submitted", "checkout_completed", "checkout_started", "payment_info_submitted", "collection_viewed", "checkout_contact_info_submitted", "page_viewed", "product_added_to_cart", "product_viewed", "product_variant_viewed", "search_submitted", "checkout_shipping_info_submitted"],
            ct = ["all_events", "all_standard_events", "all_custom_events", "checkout_address_info_submitted", "checkout_completed", "checkout_started", "payment_info_submitted", "collection_viewed", "checkout_contact_info_submitted", "page_viewed", "product_added_to_cart", "product_viewed", "product_variant_viewed", "search_submitted", "checkout_shipping_info_submitted"];

        function lt(e) {
            return st.includes(e)
        }

        function ut(e) {
            return ct.includes(e)
        }
        const dt = ["checkout_completed", "checkout_started"];

        function pt() {
            const e = me.getShopPrefs();
            return e.limit.includes(l.GDPR) ? "gdpr" : e.limit.includes(l.GDPR_BLOCK_ALL) ? "gdpr_block_all" : "unknown"
        }
        let ft = !1;
        const mt = new Set;

        function ht(e) {
            const t = () => {
                e(), document.removeEventListener(o.TRACKING_ACCEPTED, t)
            };
            document.addEventListener(o.TRACKING_ACCEPTED, t)
        }

        function bt() {
            return /checkouts\/(.+)\/(thank_you|thank-you|post_purchase)$/.test(self.location.pathname)
        }
        const wt = ["[object String]", "[object Number]", "[object Boolean]", "[object Undefined]", "[object Null]"];

        function gt(e) {
            let t = null;

            function n(e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            }
            return void 0 === e || n(e) ? {
                isValid: function e(o) {
                    if (Array.isArray(o)) return o.every(e);
                    if (n(o)) return Object.keys(o).every((t => e(o[t])));
                    const i = wt.includes(Object.prototype.toString.call(o));
                    return i || (t = `${o} must be one of the following types: ${wt.join(", ")}`), i
                }(e),
                error: t
            } : (t = `${e} must be an object`, {
                isValid: !1,
                error: t
            })
        }

        function vt() {
            return {
                document: {
                    location: {
                        href: window.location.href,
                        hash: window.location.hash,
                        host: window.location.host,
                        hostname: window.location.hostname,
                        origin: window.location.origin,
                        pathname: window.location.pathname,
                        port: window.location.port,
                        protocol: window.location.protocol,
                        search: window.location.search
                    },
                    referrer: document.referrer,
                    characterSet: document.characterSet,
                    title: document.title
                },
                navigator: {
                    language: navigator.language,
                    cookieEnabled: navigator.cookieEnabled,
                    languages: navigator.languages,
                    userAgent: navigator.userAgent
                },
                window: {
                    innerHeight: window.innerHeight,
                    innerWidth: window.innerWidth,
                    outerHeight: window.outerHeight,
                    outerWidth: window.outerWidth,
                    pageXOffset: window.pageXOffset,
                    pageYOffset: window.pageYOffset,
                    location: {
                        href: window.location.href,
                        hash: window.location.hash,
                        host: window.location.host,
                        hostname: window.location.hostname,
                        origin: window.location.origin,
                        pathname: window.location.pathname,
                        port: window.location.port,
                        protocol: window.location.protocol,
                        search: window.location.search
                    },
                    origin: window.origin,
                    screenX: window.screenX,
                    screenY: window.screenY,
                    scrollX: window.scrollX,
                    scrollY: window.scrollY
                }
            }
        }

        function yt(e) {
            const t = {};
            for (const o of e.split(/ *; */)) {
                const e = o.split("=");
                try {
                    t[decodeURIComponent(e[0])] = decodeURIComponent(e[1] || "")
                } catch (n) {
                    continue
                }
            }
            return t
        }
        const Et = Symbol.for("RemoteUi::Retain"),
            _t = Symbol.for("RemoteUi::Release"),
            Ct = Symbol.for("RemoteUi::RetainedBy");
        class At {
            constructor() {
                this.memoryManaged = new Set
            }
            add(e) {
                this.memoryManaged.add(e), e[Ct].add(this), e[Et]()
            }
            release() {
                for (const e of this.memoryManaged) e[Ct].delete(this), e[_t]();
                this.memoryManaged.clear()
            }
        }

        function xt(e) {
            return Boolean(e && e[Et] && e[_t])
        }

        function Tt(e, {
            deep: t = !0
        } = {}) {
            const n = xt(e);
            if (n && e[Et](), t) {
                if (Array.isArray(e)) return e.reduce(((e, n) => Tt(n, {
                    deep: t
                }) || e), n);
                if ("object" == typeof e && null != e) return Object.keys(e).reduce(((n, o) => Tt(e[o], {
                    deep: t
                }) || n), n)
            }
            return n
        }
        const Nt = "_@f";

        function St(e) {
            const t = new Map,
                n = new Map,
                o = new Map;
            return {
                encode: function o(i) {
                    if ("object" == typeof i) {
                        if (null == i) return [i];
                        if (i instanceof ArrayBuffer) return [i];
                        const e = [];
                        if (Array.isArray(i)) {
                            return [i.map((t => {
                                const [n, i = []] = o(t);
                                return e.push(...i), n
                            })), e]
                        }
                        return [Object.keys(i).reduce(((t, n) => {
                            const [r, a = []] = o(i[n]);
                            return e.push(...a), { ...t,
                                [n]: r
                            }
                        }), {}), e]
                    }
                    if ("function" == typeof i) {
                        if (t.has(i)) {
                            const e = t.get(i);
                            return [{
                                [Nt]: e
                            }]
                        }
                        const o = e.uuid();
                        return t.set(i, o), n.set(o, i), [{
                            [Nt]: o
                        }]
                    }
                    return [i]
                },
                decode: i,
                async call(e, t) {
                    const o = new At,
                        r = n.get(e);
                    if (null == r) throw new Error("You attempted to call a function that was already released.");
                    try {
                        const e = xt(r) ? [o, ...r[Ct]] : [o];
                        return await r(...i(t, e))
                    } finally {
                        o.release()
                    }
                },
                release(e) {
                    const o = n.get(e);
                    o && (n.delete(e), t.delete(o))
                },
                terminate() {
                    t.clear(), n.clear(), o.clear()
                }
            };

            function i(t, n) {
                if ("object" == typeof t) {
                    if (null == t) return t;
                    if (t instanceof ArrayBuffer) return t;
                    if (Array.isArray(t)) return t.map((e => i(e, n)));
                    if (Nt in t) {
                        const i = t["_@f"];
                        if (o.has(i)) return o.get(i);
                        let r = 0,
                            a = !1;
                        const s = () => {
                                r -= 1, 0 === r && (a = !0, o.delete(i), e.release(i))
                            },
                            c = () => {
                                r += 1
                            },
                            l = new Set(n),
                            u = (...t) => {
                                if (a) throw new Error("You attempted to call a function that was already released.");
                                if (!o.has(i)) throw new Error("You attempted to call a function that was already revoked.");
                                return e.call(i, t)
                            };
                        Object.defineProperties(u, {
                            [_t]: {
                                value: s,
                                writable: !1
                            },
                            [Et]: {
                                value: c,
                                writable: !1
                            },
                            [Ct]: {
                                value: l,
                                writable: !1
                            }
                        });
                        for (const e of l) e.add(u);
                        return o.set(i, u), u
                    }
                    return Object.keys(t).reduce(((e, o) => ({ ...e,
                        [o]: i(t[o], n)
                    })), {})
                }
                return t
            }
        }

        function kt() {
            return `${Pt()}-${Pt()}-${Pt()}-${Pt()}`
        }

        function Pt() {
            return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)
        }

        function It(e, t, n, o, i, r = !1) {
            let a = {};
            try {
                a = t.configuration ? JSON.parse(t.configuration) : {}
            } catch (b) {}

            function s() {
                try {
                    return window.localStorage.setItem("local-storage-test", "test"), window.localStorage.removeItem("local-storage-test"), !0
                } catch (b) {
                    return !1
                }
            }

            function c() {
                try {
                    return window.sessionStorage.setItem("session-storage-test", "test"), window.sessionStorage.removeItem("session-storage-test"), !0
                } catch (b) {
                    return !1
                }
            }
            return {
                analytics: {
                    subscribe: (i, a, s) => (r && Tt(a), e.subscribe(i, a, { ...s,
                        pixelRuntimeConfig: t,
                        shopId: n,
                        surface: o
                    }))
                },
                browser: {
                    cookie: {
                        get: async e => {
                            if (e) {
                                let t = "";
                                const n = document.cookie.split("; ");
                                for (const o of n) {
                                    const [n, i] = o.split("=");
                                    if (n === e) {
                                        t = i;
                                        break
                                    }
                                }
                                return t
                            }
                            return document.cookie
                        },
                        set: async (e, t) => {
                            if (t) {
                                const n = `${e}=${t}`;
                                document.cookie = n
                            } else document.cookie = e;
                            return document.cookie
                        }
                    },
                    sendBeacon: async (e, t = "") => {
                        if (e.includes(self.location.origin) && !e.match(/\/\.well-known\/shopify\/monorail\/unstable\/produce_batch/)) return !1;
                        const n = new window.Blob([t], {
                            type: "text/plain"
                        });
                        return window.navigator.sendBeacon(e, n)
                    },
                    localStorage: {
                        setItem: async (e, t) => s() ? window.localStorage.setItem(e, t) : Promise.resolve(),
                        getItem: async e => s() ? window.localStorage.getItem(e) : Promise.resolve(null),
                        key: async e => s() ? window.localStorage.key(e) : Promise.resolve(null),
                        removeItem: async e => s() ? window.localStorage.removeItem(e) : Promise.resolve(),
                        clear: async () => s() ? window.localStorage.clear() : Promise.resolve(),
                        length: async () => s() ? window.localStorage.length : Promise.resolve(0)
                    },
                    sessionStorage: {
                        setItem: async (e, t) => c() ? window.sessionStorage.setItem(e, t) : Promise.resolve(),
                        getItem: async e => c() ? window.sessionStorage.getItem(e) : Promise.resolve(null),
                        key: async e => c() ? window.sessionStorage.key(e) : Promise.resolve(null),
                        removeItem: async e => c() ? window.sessionStorage.removeItem(e) : Promise.resolve(),
                        clear: async () => c() ? window.sessionStorage.clear() : Promise.resolve(),
                        length: async () => c() ? window.sessionStorage.length : Promise.resolve(0)
                    }
                },
                settings: a,
                init: (l = i, {
                    context: vt(),
                    data: {
                        customer: (h = null == l ? void 0 : l.customer, h ? {
                            email: h.email,
                            firstName: h.firstName,
                            id: h.id,
                            lastName: h.lastName,
                            phone: h.phone,
                            ordersCount: h.ordersCount
                        } : null),
                        cart: (u = null == l ? void 0 : l.cart, u ? {
                            id: null == u ? void 0 : u.id,
                            cost: {
                                totalAmount: {
                                    amount: null == u || null === (d = u.cost) || void 0 === d || null === (p = d.totalAmount) || void 0 === p ? void 0 : p.amount,
                                    currencyCode: null == u || null === (f = u.cost) || void 0 === f || null === (m = f.totalAmount) || void 0 === m ? void 0 : m.currencyCode
                                }
                            },
                            lines: null == u ? void 0 : u.lines,
                            totalQuantity: null == u ? void 0 : u.totalQuantity
                        } : null)
                    }
                }),
                _pixelInfo: { ...t,
                    surface: o
                }
            };
            var l, u, d, p, f, m, h
        }
        let Rt, Ot;

        function Lt({
            webPixelConfig: e,
            eventBus: t,
            shopId: n,
            storefrontBaseUrl: o,
            surface: i,
            initData: r
        }) {
            let a;
            const s = Dt(e),
                c = e.id,
                l = e.type.toLowerCase();
            let u;
            const d = new Promise((e => {
                    u = e
                })),
                p = `web-pixel-sandbox-${e.type}-${e.id}-${e.runtimeContext}`;
            if (Ge("pixel:register", "start", {
                    pixelId: c,
                    source: l
                }), e.type === Ot.App || e.runtimeContext === Rt.Strict) {
                const t = [Le(o), "/wpm", `@${_e}`, `/web-pixel-${c}`, `@${e.scriptVersion}`, "/sandbox", "/worker.modern.js"];
                o.match(/spin\.dev\/?/) && t.push("?fast_storefront_renderer=1"), a = new Worker(t.join(""), {
                    name: p
                })
            } else {
                let {
                    search: t
                } = self.location;
                o.match(/spin\.dev\/?/) && (t = `${t}${t.length?"&":"?"}fast_storefront_renderer=1`), a = function(e, {
                    terminate: t = !0,
                    targetOrigin: n = "*"
                } = {}) {
                    if ("undefined" == typeof window) throw new Error("You can only run fromIframe() in a browser context, but no window was found.");
                    const o = new WeakMap,
                        i = new Promise((t => {
                            window.addEventListener("message", (n => {
                                n.source === e.contentWindow && "remote-ui::ready" === n.data && t()
                            }))
                        }));
                    return {
                        async postMessage(t, o) {
                            await i, e.contentWindow.postMessage(t, n, o)
                        },
                        addEventListener(t, n) {
                            const i = t => {
                                t.source === e.contentWindow && n(t)
                            };
                            o.set(n, i), self.addEventListener(t, i)
                        },
                        removeEventListener(e, t) {
                            const n = o.get(t);
                            null != n && (o.delete(t), self.removeEventListener(e, n))
                        },
                        terminate() {
                            t && e.remove()
                        }
                    }
                }(function({
                    id: e,
                    src: t,
                    srcdoc: n,
                    privileges: o
                }) {
                    const i = document.querySelector(`iframe#${e}`);
                    if (i && "IFRAME" === i.tagName) return i;
                    const r = document.createElement("iframe");
                    if (t) r.setAttribute("src", t);
                    else {
                        if (!n) {
                            const e = new $e("src or srcdoc must be provided");
                            throw ze(e, {
                                context: "createIframe",
                                unhandled: !1,
                                severity: "warning"
                            }), e
                        }
                        r.setAttribute("srcdoc", n)
                    }
                    if (r.setAttribute("id", e), r.setAttribute("name", e), r.setAttribute("sandbox", o.join(" ")), r.setAttribute("tabIndex", "-1"), r.setAttribute("aria-hidden", "true"), ! function(e) {
                            return "sandbox" in e
                        }(r)) {
                        const e = new $e("browser does not support the sandbox attribute on IFrames");
                        throw ze(e, {
                            context: "createIframe",
                            unhandled: !1,
                            severity: "warning"
                        }), e
                    }
                    return r.setAttribute("style", "display:none; height:0; width:0; visibility: hidden;"),
                        function(e) {
                            let t = document.querySelector("#WebPixelsManagerSandboxContainer");
                            null == t && (t = document.createElement("div"), t.setAttribute("id", "WebPixelsManagerSandboxContainer"), document.body.appendChild(t)), t.appendChild(e)
                        }(r), r
                }({
                    id: p,
                    src: [Le(o), "/wpm", `@${_e}`, `/web-pixel-${c}`, `@${e.scriptVersion}`, "/sandbox", /\.(js|json|xml)$/.test(self.location.pathname) ? "" : self.location.pathname, t].join(""),
                    privileges: ["allow-scripts", "allow-forms"]
                }))
            }
            const f = function(e, {
                    uuid: t = kt,
                    createEncoder: n = St,
                    callable: o
                } = {}) {
                    let i = !1,
                        r = e;
                    const a = new Map,
                        s = new Map,
                        c = function(e, t) {
                            let n;
                            if (null == t) {
                                if ("function" != typeof Proxy) throw new Error("You must pass an array of callable methods in environments without Proxies.");
                                const t = new Map;
                                n = new Proxy({}, {
                                    get(n, o) {
                                        if (t.has(o)) return t.get(o);
                                        const i = e(o);
                                        return t.set(o, i), i
                                    }
                                })
                            } else {
                                n = {};
                                for (const o of t) Object.defineProperty(n, o, {
                                    value: e(o),
                                    writable: !1,
                                    configurable: !0,
                                    enumerable: !0
                                })
                            }
                            return n
                        }(p, o),
                        l = n({
                            uuid: t,
                            release(e) {
                                u(3, [e])
                            },
                            call(e, n, o) {
                                const i = t(),
                                    r = f(i, o),
                                    [a, s] = l.encode(n);
                                return u(5, [i, e, a], s), r
                            }
                        });
                    return r.addEventListener("message", d), {
                        call: c,
                        replace(e) {
                            const t = r;
                            r = e, t.removeEventListener("message", d), e.addEventListener("message", d)
                        },
                        expose(e) {
                            for (const t of Object.keys(e)) {
                                const n = e[t];
                                "function" == typeof n ? a.set(t, n) : a.delete(t)
                            }
                        },
                        callable(...e) {
                            if (null != o)
                                for (const t of e) Object.defineProperty(c, t, {
                                    value: p(t),
                                    writable: !1,
                                    configurable: !0,
                                    enumerable: !0
                                })
                        },
                        terminate() {
                            u(2, void 0), m(), r.terminate && r.terminate()
                        }
                    };

                    function u(e, t, n) {
                        i || r.postMessage(t ? [e, t] : [e], n)
                    }
                    async function d(e) {
                        const {
                            data: t
                        } = e;
                        if (null != t && Array.isArray(t)) switch (t[0]) {
                            case 2:
                                m();
                                break;
                            case 0:
                                {
                                    const e = new At,
                                        [o, i, r] = t[1],
                                        s = a.get(i);
                                    try {
                                        if (null == s) throw new Error(`No '${i}' method is exposed on this endpoint`);
                                        const [t, n] = l.encode(await s(...l.decode(r, [e])));
                                        u(1, [o, void 0, t], n)
                                    } catch (n) {
                                        const {
                                            name: e,
                                            message: t,
                                            stack: i
                                        } = n;
                                        throw u(1, [o, {
                                            name: e,
                                            message: t,
                                            stack: i
                                        }]), n
                                    } finally {
                                        e.release()
                                    }
                                    break
                                }
                            case 1:
                                {
                                    const [e] = t[1];s.get(e)(...t[1]),
                                    s.delete(e);
                                    break
                                }
                            case 3:
                                {
                                    const [e] = t[1];l.release(e);
                                    break
                                }
                            case 6:
                                {
                                    const [e] = t[1];s.get(e)(...t[1]),
                                    s.delete(e);
                                    break
                                }
                            case 5:
                                {
                                    const [e, o, i] = t[1];
                                    try {
                                        const t = await l.call(o, i),
                                            [n, r] = l.encode(t);
                                        u(6, [e, void 0, n], r)
                                    } catch (n) {
                                        const {
                                            name: t,
                                            message: o,
                                            stack: i
                                        } = n;
                                        throw u(6, [e, {
                                            name: t,
                                            message: o,
                                            stack: i
                                        }]), n
                                    }
                                    break
                                }
                        }
                    }

                    function p(e) {
                        return (...n) => {
                            if (i) return Promise.reject(new Error("You attempted to call a function on a terminated web worker."));
                            if ("string" != typeof e && "number" != typeof e) return Promise.reject(new Error(`Can’t call a symbol method on a remote endpoint: ${e.toString()}`));
                            const o = t(),
                                r = f(o),
                                [a, s] = l.encode(n);
                            return u(0, [o, e, a], s), r
                        }
                    }

                    function f(e, t) {
                        return new Promise(((n, o) => {
                            s.set(e, ((e, i, r) => {
                                if (null == i) n(r && l.decode(r, t));
                                else {
                                    const e = new Error;
                                    Object.assign(e, i), o(e)
                                }
                            }))
                        }))
                    }

                    function m() {
                        var e;
                        i = !0, a.clear(), s.clear(), null === (e = l.terminate) || void 0 === e || e.call(l), r.removeEventListener("message", d)
                    }
                }(a, {
                    callable: ["initialize", "initWebPixelsAwaitingConsent"]
                }),
                m = It(t, e, n, i, r, !0),
                h = {
                    cookieRestrictedDomains: async () => function() {
                        var e, t;
                        const n = [];
                        return ((null === (e = self) || void 0 === e || null === (t = e.location) || void 0 === t ? void 0 : t.hostname) || "").split(".").reverse().reduce(((e, t) => {
                            const o = "" === e ? t : `${t}.${e}`;
                            return i = o, document.cookie = `wpm-domain-test=1; path=/; domain=${i}`, document.cookie.split(";").find((e => e.includes("wpm-domain-test"))) || n.push(o),
                                function(e) {
                                    document.cookie = `wpm-domain-test=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${e}`
                                }(o), o;
                            var i
                        }), ""), n
                    }(),
                    userCanBeTracked: async () => he(),
                    self: {
                        origin: {
                            get: async () => self.origin
                        }
                    },
                    document: {
                        referrer: {
                            get: async () => document.referrer
                        }
                    },
                    monorail: {
                        register: async ({
                            status: t,
                            errorMsg: o
                        }) => {
                            const {
                                measurement: r
                            } = je("pixel:register", {
                                pixelId: c,
                                source: l
                            });
                            let a;
                            try {
                                a = null != r && r.duration ? Math.round(r.duration) : void 0
                            } catch (d) {}
                            tt("register", {
                                version: ye,
                                pageUrl: self.location.href,
                                shopId: n,
                                surface: i,
                                pixelId: e.id,
                                pixelAppId: s,
                                pixelSource: e.type,
                                pixelRuntimeContext: e.runtimeContext,
                                pixelScriptVersion: e.scriptVersion,
                                pixelConfiguration: null == e ? void 0 : e.configuration,
                                pixelEventSchemaVersion: e.eventPayloadVersion,
                                status: t,
                                userCanBeTracked: he().toString(),
                                shopPrefs: pt(),
                                bundleTarget: Ee,
                                errorMsg: o,
                                performanceBeta: ge(Ce).toString(),
                                duration: a,
                                sessionId: Oe()
                            }), u(t)
                        }
                    }
                };
            f.expose({
                pixelRuntimeAPI: () => m,
                sandboxInternalAPI: () => h
            });
            const b = self.document.title;
            return f.call.initialize(b, e, vt()), ht((() => {
                f.call.initWebPixelsAwaitingConsent()
            })), {
                config: e,
                endpoint: f,
                registerPromise: d
            }
        }

        function Dt(e) {
            return "shopify-custom-pixel" === e.id ? "shopify-pixel" : e.type === Ot.Custom ? "-1" : e.apiClientId ? `${e.apiClientId}` : void 0
        }! function(e) {
            e.Strict = "STRICT", e.Lax = "LAX"
        }(Rt || (Rt = {})),
        function(e) {
            e.App = "APP", e.Custom = "CUSTOM"
        }(Ot || (Ot = {}));
        const Mt = "all_standard_events",
            jt = "all_custom_events";

        function Gt(e) {
            const t = new at({
                    bufferSize: Number.POSITIVE_INFINITY,
                    replayKeep: "oldest",
                    enableSubscribeAll: !0,
                    subscribeAllKey: Mt
                }),
                n = new at({
                    bufferSize: 1e3,
                    replayKeep: "oldest",
                    enableSubscribeAll: !0,
                    subscribeAllKey: jt
                }),
                o = (ht((function() {
                    R(), mt.forEach((e => {
                        mt.delete(e), e()
                    }))
                })), {
                    gate(e, t = {
                        runOnAccept: !0
                    }) {
                        he() ? e() : t.runOnAccept && mt.add(e)
                    }
                });
            e.initData;
            let i = !1;
            return {
                publish(n, o, r) {
                    var a, s, c;
                    if ("string" != typeof n) throw new Error("Expected event name to be a string, but got " + typeof n);
                    if (!lt(n)) return !1;
                    if ("checkout_completed" === n && bt() && -1 !== document.cookie.indexOf("loggedConversion2=1")) return !1;
                    const l = gt(o);
                    if (!l.isValid) return console.error(l.error), !1;
                    const u = function(e, t, n) {
                        let o;
                        try {
                            var i;
                            if ("product_added_to_cart" === e && null !== (i = window.Shopify) && void 0 !== i && i.evids) {
                                var r;
                                const t = function(e) {
                                    var t, n;
                                    const o = null === (t = e.cartLine) || void 0 === t ? void 0 : t.merchandise.product.id,
                                        i = null === (n = e.cartLine) || void 0 === n ? void 0 : n.merchandise.id;
                                    if (o && i) return `${o}-${i}`
                                }(n);
                                o = null === (r = window.Shopify) || void 0 === r ? void 0 : r.evids(e, {
                                    analyticsFramework: "wpm",
                                    cacheKey: t
                                })
                            } else {
                                var a, s;
                                o = null !== (a = window.Shopify) && void 0 !== a && a.evids ? null === (s = window.Shopify) || void 0 === s ? void 0 : s.evids(e, {
                                    analyticsFramework: "wpm"
                                }) : Ie()
                            }
                        } catch {
                            o = Ie()
                        }
                        return {
                            id: "string" == typeof o && o.length > 0 ? o : Ie(),
                            clientId: yt(document.cookie)._shopify_y,
                            timestamp: (new Date).toISOString(),
                            name: e,
                            context: vt(),
                            data: { ...n || {}
                            }
                        }
                    }(n, 0, o);
                    let d;
                    return function(e) {
                            return dt.includes(e)
                        }(u.name) && (d = u.data.checkout.token), tt("eventPublish", {
                            version: ye,
                            bundleTarget: Ee,
                            pageUrl: self.location.href,
                            shopId: e.shopId,
                            surface: e.surface || "unknown",
                            eventName: u.name,
                            eventType: "standard",
                            extensionId: null == r || null === (a = r.extension) || void 0 === a ? void 0 : a.extensionId,
                            extensionAppId: null == r || null === (s = r.extension) || void 0 === s ? void 0 : s.appId,
                            extensionType: null == r || null === (c = r.extension) || void 0 === c ? void 0 : c.type,
                            userCanBeTracked: he().toString(),
                            shopPrefs: pt(),
                            performanceBeta: ge(Ce).toString(),
                            eventId: u.id,
                            checkoutToken: d
                        }),
                        function(e) {
                            "checkout_completed" === e && function() {
                                if (bt()) {
                                    const e = self.location.pathname.split("/").slice(0, -1).join("/"),
                                        t = new Date(Date.now());
                                    t.setMonth(t.getMonth() + 2), document.cookie = `loggedConversion2=1; expires=${t}; path=${e}`
                                }
                            }()
                        }(n), i || he() || (i = !0, p = e.shopId, f = e.surface || "unknown", mt.add((() => function(e, t) {
                            ft || (ft = !0, tt("consentAccepted", {
                                version: ye,
                                bundleTarget: Ee,
                                shopId: e,
                                surface: t,
                                shopPrefs: pt(),
                                performanceBeta: ge(Ce).toString()
                            }))
                        }(p, f)))), t.publish(n, u);
                    var p, f
                },
                publishCustomEvent(t, o, i) {
                    var r, a, s;
                    if ("string" != typeof t) throw new Error("Expected event name to be a string, but got " + typeof t);
                    if (lt(t) || ut(t)) return !1;
                    const c = gt(o);
                    if (!c.isValid) return console.error(c.error), !1;
                    const l = function(e, t, n = null) {
                        return {
                            id: Ie(),
                            clientId: yt(document.cookie)._shopify_y,
                            timestamp: (new Date).toISOString(),
                            name: e,
                            context: vt(),
                            customData: n
                        }
                    }(t, 0, o);
                    return tt("eventPublish", {
                        version: ye,
                        bundleTarget: Ee,
                        pageUrl: self.location.href,
                        shopId: e.shopId,
                        surface: e.surface || "unknown",
                        eventName: l.name,
                        eventType: "custom",
                        extensionId: null == i || null === (r = i.extension) || void 0 === r ? void 0 : r.extensionId,
                        extensionAppId: null == i || null === (a = i.extension) || void 0 === a ? void 0 : a.appId,
                        extensionType: null == i || null === (s = i.extension) || void 0 === s ? void 0 : s.type,
                        performanceBeta: ge(Ce).toString(),
                        eventId: l.id
                    }), n.publish(t, l)
                },
                subscribe(e, i, r = {}) {
                    const a = e => {
                        o.gate((() => {
                            var t;
                            const n = r.schemaVersion || r.pixelRuntimeConfig.eventPayloadVersion;
                            i(e), tt("subscriberEventEmit", {
                                version: ye,
                                bundleTarget: Ee,
                                pageUrl: self.location.href,
                                shopId: r.shopId,
                                surface: r.surface,
                                pixelId: r.pixelRuntimeConfig.id,
                                pixelAppId: Dt(r.pixelRuntimeConfig),
                                pixelSource: r.pixelRuntimeConfig.type,
                                pixelRuntimeContext: r.pixelRuntimeConfig.runtimeContext,
                                pixelScriptVersion: r.pixelRuntimeConfig.scriptVersion,
                                pixelConfiguration: null === (t = r.pixelRuntimeConfig) || void 0 === t ? void 0 : t.configuration,
                                pixelEventSchemaVersion: n,
                                eventName: e.name,
                                eventType: lt(e.name) ? "standard" : "custom",
                                performanceBeta: ge(Ce).toString(),
                                eventId: e.id
                            })
                        }))
                    };
                    if ("all_events" === e) {
                        const e = t.subscribe(Mt, a, r),
                            o = n.subscribe(jt, a, r);
                        return () => e() && o()
                    }
                    return e === jt ? n.subscribe(jt, a, r) : e === Mt || ut(e) ? t.subscribe(e, a, r) : n.subscribe(e, a, r)
                }
            }
        }

        function Bt(e) {
            try {
                return new URL(e), !0
            } catch (t) {
                return function(e) {
                    const t = new RegExp("^(https?:\\/\\/)((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)*[a-z]{1,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
                    return Boolean(t.test(e))
                }(e)
            }
        }

        function Ut(e) {
            var t, n;
            e.payload.isCompleted = "true", e.payload.runTimeDuration = null === (t = je("completed")) || void 0 === t || null === (n = t.measurement) || void 0 === n ? void 0 : n.duration
        }
        const Vt = function() {
            const e = self.Shopify && self.Shopify.Checkout ? "shopify" : self.Shopify && self.Shopify.analytics && self.Shopify.analytics.replayQueue ? "storefront-renderer" : "checkout-one",
                t = self.location.href,
                n = xe("load", {
                    version: ye,
                    bundleTarget: Ee,
                    pageUrl: t,
                    status: "loading",
                    surface: e
                }),
                o = {
                    publish: () => !1,
                    publishCustomEvent: () => !1
                };
            try {
                const e = new Map,
                    i = Oe();
                return n.payload.status = "loaded", et(n), {
                    init(n) {
                        if (null !== self.location.href.match(/\/wpm@(.+)\/sandbox/)) return o;
                        const {
                            shopId: r,
                            cdnBaseUrl: a,
                            webPixelsConfigList: s,
                            surface: c = "unknown",
                            initData: l,
                            enabledBetaFlags: u
                        } = n || {}, d = self.location.origin;
                        We(d), we(u), ge("web_pixels_use_shop_domain_monorail_endpoint") && (Xe = Je("wellKnown"));
                        const p = he().toString(),
                            f = ge(Ce).toString(),
                            m = xe("unload", {
                                version: ye,
                                bundleTarget: Ee,
                                pageUrl: t,
                                shopId: r,
                                surface: c,
                                isCompleted: "false",
                                runtimeErrorCaught: "false",
                                userCanBeTracked: p,
                                performanceBeta: f,
                                sessionId: i
                            });
                        var h;
                        h = m, window.addEventListener("pagehide", (() => {
                            var e, t;
                            h.payload.pageDuration = null === (e = je("page:session")) || void 0 === e || null === (t = e.measurement) || void 0 === t ? void 0 : t.duration, et(h), nt({
                                skipXhr: !0
                            })
                        }));
                        const b = Gt(n),
                            w = {
                                severity: "warning",
                                context: "createWebPixelsManager/init",
                                unhandled: !1,
                                shopId: r,
                                initConfig: n
                            },
                            g = xe("init", {
                                version: ye,
                                bundleTarget: Ee,
                                pageUrl: t,
                                shopId: r,
                                surface: c,
                                status: "initializing",
                                userCanBeTracked: p,
                                performanceBeta: f
                            });
                        try {
                            if (self.Shopify && !0 === self.Shopify.designMode) return self.console && console.log("[WebPixelsManager] Prevented from executing in the Theme Editor"), o;
                            if (/^web-pixel-sandbox/.test(self.name)) {
                                const e = new $e("WebPixelsManager: browser library is being run in a sandbox");
                                throw w.library = "browser", ze(e, w), e
                            }
                            if (!r) {
                                const e = new $e("WebPixelsManager: shopId is required");
                                throw ze(e, w), e
                            }
                            if (!d) {
                                const e = new $e("WebPixelsManager: storefrontBaseUrl is required");
                                throw ze(e, w), e
                            }
                            if (!Bt(d)) {
                                const e = new $e(`WebPixelsManager: storefrontBaseUrl is not a valid absolute URL: ${d}`);
                                throw ze(e, w), e
                            }
                            if (!a) {
                                const e = new $e("WebPixelsManager: cdnBaseUrl is required");
                                throw ze(e, w), e
                            }
                            if (!Bt(a)) {
                                const e = new $e(`WebPixelsManager: cdnBaseUrl is not a valid absolute URL: ${a}`);
                                throw ze(e, w), e
                            }
                            const t = [];
                            return s.forEach((n => {
                                try {
                                    n.id = String(n.id);
                                    const i = (o = n.id, `${n.type.toLowerCase()}/${o}`);
                                    if (!e.has(i) && function(e) {
                                            const t = {
                                                eventPayloadVersion: "string",
                                                id: "string",
                                                runtimeContext: "string",
                                                scriptVersion: "string",
                                                type: "string"
                                            };
                                            return e.type === Ot.App && (t.configuration = "string"), Object.keys(e).filter((n => Object.prototype.hasOwnProperty.call(t, n) && typeof e[n] === t[n])).length === Object.keys(t).length
                                        }(n)) {
                                        const o = Lt({
                                            webPixelConfig: n,
                                            eventBus: b,
                                            shopId: r,
                                            storefrontBaseUrl: d,
                                            cdnBaseUrl: a,
                                            surface: c,
                                            initData: l
                                        });
                                        e.set(i, o), t.push(o.registerPromise)
                                    } else console.warn("Web Pixel config is invalid or already configured")
                                } catch (i) {
                                    i instanceof $e || ze(i, { ...w,
                                        context: "createWebPixelsManager/createWebPixelLoop"
                                    }), self.console && console.error(i)
                                }
                                var o
                            })), Promise.all(t).then((() => Ut(m))).catch((() => Ut(m))), "checkout-one" !== c && _(b.publish, l), g.payload.status = "initialized", et(g), {
                                publish: (e, t, n = {}) => b.publish(e, t),
                                publishCustomEvent: (e, t, n = {}) => b.publishCustomEvent(e, t)
                            }
                        } catch (v) {
                            return v instanceof $e || ze(v, {
                                context: "init",
                                shopId: r,
                                initConfig: n
                            }), self.console && console.error(v), g.payload.status = "failed", g.payload.errorMsg = null == v ? void 0 : v.message, et(g), m.payload.runtimeErrorCaught = "true", o
                        }
                    }
                }
            } catch (i) {
                return i instanceof $e || ze(i, {
                    context: "createWebPixelsManager"
                }), self.console && console.error(i), n.payload.status = "manager-create-error", n.payload.errorMsg = null == i ? void 0 : i.message, et(n, !0), {
                    init: () => o
                }
            }
        }();
        self.webPixelsManager = Vt
    })()
})();