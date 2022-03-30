(this["webpackJsonpfcl-harness"]=this["webpackJsonpfcl-harness"]||[]).push([[1],{23:function(n,t,e){"use strict";e.r(t),function(n){e.d(t,"LABEL",(function(){return i})),e.d(t,"CMD",(function(){return s}));var r=e(8),c=e(5),u=e.n(c),a=e(4),o=e(6),i="User Sign 1 (No Verification)",s=function(){var t=Object(r.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"FOO",t.abrupt("return",Object(a.currentUser)().signUserMessage(n.from("FOO").toString("hex")).then(Object(o.b)("US-1")).catch(Object(o.a)("US-1")));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()}.call(this,e(11).Buffer)},42:function(n,t,e){"use strict";e.r(t);var r={};e.r(r),e.d(r,"LABEL",(function(){return O})),e.d(r,"CMD",(function(){return j}));var c={};e.r(c),e.d(c,"LABEL",(function(){return g})),e.d(c,"CMD",(function(){return v}));var u={};e.r(u),e.d(u,"LABEL",(function(){return m})),e.d(u,"CMD",(function(){return A}));var a={};e.r(a),e.d(a,"LABEL",(function(){return I})),e.d(a,"CMD",(function(){return E}));var o={};e.r(o),e.d(o,"LABEL",(function(){return y})),e.d(o,"CMD",(function(){return B}));var i={};e.r(i),e.d(i,"LABEL",(function(){return C})),e.d(i,"CMD",(function(){return S}));var s=e(7),f=e.n(s),d=e(19),b=e.n(d),l=e(4),p=e(22);l.config().put("accessNode.api","https://rest-testnet.onflow.org").put("sdk.transport",p.a).put("env","testnet").put("discovery.wallet","https://fcl-discovery.onflow.org/testnet/authn");var h=e(13);window.fcl=l,window.t=h,window.addEventListener("FLOW::TX",(function(n){console.log("FLOW::TX",n.detail.delta,n.detail.txId),l.tx(n.detail.txId).subscribe((function(t){return console.log("TX:STATUS",n.detail.txId,t)}))})),window.addEventListener("message",(function(n){console.log("Harness Message Received",n.data)}));var O="Log In",j=l.reauthenticate,g="Log Out",v=l.unauthenticate,L=e(8),w=e(5),x=e.n(w),M=e(6),m="Query 1 (no args)",A=function(){var n=Object(L.a)(x.a.mark((function n(){return x.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",Object(l.query)({cadence:"\n      pub fun main(): Int {\n        return 7\n      }\n    "}).then(Object(M.b)("Q-1")).catch(Object(M.a)("Q-1")));case 1:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),I="Query 2 (args)",E=function(){var n=Object(L.a)(x.a.mark((function n(){return x.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",Object(l.query)({cadence:"\n      pub fun main(a: Int, b: Int): Int {\n        return a + b\n      }\n    ",args:function(n,t){return[n(5,t.Int),n(7,t.Int)]}}).then(Object(M.b)("Q-1")).catch(Object(M.a)("Q-1")));case 1:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),y="Mutate 1 (no args)",B=function(){var n=Object(L.a)(x.a.mark((function n(){return x.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",Object(l.mutate)({cadence:"\n      transaction() {\n        prepare(acct: AuthAccount) {\n          log(acct)\n        }\n      }\n    ",limit:50}).then(Object(M.b)("M-1")).catch(Object(M.a)("M-1")));case 1:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),C="Mutate 2 (args)",S=function(){var n=Object(L.a)(x.a.mark((function n(){return x.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",Object(l.mutate)({cadence:"\n      transaction(a: Int, b: Int, c: Address) {\n        prepare(acct: AuthAccount) {\n          log(acct)\n          log(a)\n          log(b)\n          log(c)\n        }\n      }\n    ",args:function(n,t){return[n(6,t.Int),n(7,t.Int),n("0xba1132bc08f82fe2",t.Address)]},limit:50}).then(Object(M.b)("M-1")).catch(Object(M.a)("M-1")));case 1:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),k=[r,c,u,a,o,i,e(23)],D=e(14);var F=e(9),U=function(n){return Object(F.jsx)("li",{children:Object(F.jsx)("button",{onClick:n.CMD,children:n.LABEL})},n.LABEL)};function T(){var n=function(){var n=Object(s.useState)(null),t=Object(D.a)(n,2),e=t[0],r=t[1];return Object(s.useEffect)((function(){return l.currentUser().subscribe(r)}),[]),e}(),t=function(){var n=Object(s.useState)(null),t=Object(D.a)(n,2),e=t[0],r=t[1];return Object(s.useEffect)((function(){return l.config().subscribe(r)}),[]),e}();return Object(F.jsxs)("div",{children:[Object(F.jsx)("ul",{children:k.map(U)}),Object(F.jsx)("pre",{children:JSON.stringify({currentUser:n,config:t},null,2)})]})}var Q=function(n){n&&n instanceof Function&&e.e(6).then(e.bind(null,80)).then((function(t){var e=t.getCLS,r=t.getFID,c=t.getFCP,u=t.getLCP,a=t.getTTFB;e(n),r(n),c(n),u(n),a(n)}))};b.a.render(Object(F.jsx)(f.a.StrictMode,{children:Object(F.jsx)(T,{})}),document.getElementById("root")),Q()},6:function(n,t,e){"use strict";e.d(t,"b",(function(){return r})),e.d(t,"a",(function(){return c}));var r=function(n){return function(t){return console.log("".concat(n),t),t}},c=function(n){return function(t){return console.error("Oh No!! [".concat(n,"]"),t),t}}}},[[42,2,3]]]);
//# sourceMappingURL=main.bb777582.chunk.js.map