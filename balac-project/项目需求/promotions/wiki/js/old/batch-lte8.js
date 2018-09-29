try {
/* module-key = 'com.atlassian.auiplugin:ajs-html5shim', location = 'js/external/html5-shim/html5.js' */
/* HTML5 Shiv v3.6.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed */
(function(G,M){function F(){var Q=N.elements;return"string"==typeof Q?Q.split(" "):Q}function J(R){var Q=E[R[D]];Q||(Q={},K++,R[D]=K,E[K]=Q);return Q}function C(R,Q,S){Q||(Q=M);if(L){return Q.createElement(R)}S||(S=J(Q));Q=S.cache[R]?S.cache[R].cloneNode():A.test(R)?(S.cache[R]=S.createElem(R)).cloneNode():S.createElem(R);return Q.canHaveChildren&&!P.test(R)?S.frag.appendChild(Q):Q}function O(R,Q){if(!Q.cache){Q.cache={},Q.createElem=R.createElement,Q.createFrag=R.createDocumentFragment,Q.frag=Q.createFrag()}R.createElement=function(S){return !N.shivMethods?Q.createElem(S):C(S,R,Q)};R.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+F().join().replace(/\w+/g,function(S){Q.createElem(S);Q.frag.createElement(S);return'c("'+S+'")'})+");return n}")(N,Q.frag)}function B(R){R||(R=M);var Q=J(R);if(N.shivCSS&&!I&&!Q.hasCSS){var T,S=R;T=S.createElement("p");S=S.getElementsByTagName("head")[0]||S.documentElement;T.innerHTML="x<style>article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}</style>";T=S.insertBefore(T.lastChild,S.firstChild);Q.hasCSS=!!T}L||O(R,Q);return R}var H=G.html5||{},P=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,A=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,I,D="_html5shiv",K=0,E={},L;(function(){try{var R=M.createElement("a");R.innerHTML="<xyz></xyz>";I="hidden" in R;var Q;if(!(Q=1==R.childNodes.length)){M.createElement("a");var T=M.createDocumentFragment();Q="undefined"==typeof T.cloneNode||"undefined"==typeof T.createDocumentFragment||"undefined"==typeof T.createElement}L=Q}catch(S){L=I=!0}})();var N={elements:H.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:!1!==H.shivCSS,supportsUnknownElements:L,shivMethods:!1!==H.shivMethods,type:"default",shivDocument:B,createElement:C,createDocumentFragment:function(R,Q){R||(R=M);if(L){return R.createDocumentFragment()}for(var Q=Q||J(R),V=Q.frag.cloneNode(),U=0,T=F(),S=T.length;U<S;U++){V.createElement(T[U])}return V}};G.html5=N;B(M)})(this,document);
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.auiplugin:ajs', location = 'js/atlassian/tables.js' */
(function(){AJS.tables=AJS.tables||{};AJS.tables.rowStriping=function(){var C=AJS.$("table.aui-zebra > tbody");for(var A=0,B=C.length;A<B;A++){AJS.$(C[A]).find("> tr").filter(":odd").addClass("aui-zebra")}};AJS.$(AJS.tables.rowStriping)})();
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


try {
/* module-key = 'com.atlassian.auiplugin:ajs', location = 'js/atlassian/toolbar.js' */
AJS.setUpToolbars=function(){if(AJS.$.browser.msie){var E=AJS.$(".aui-toolbar .toolbar-group");E.each(function(F,G){AJS.$(G).children(":first").addClass("first");AJS.$(G).children(":last").addClass("last")});if(parseInt(AJS.$.browser.version,10)==7){function B(){AJS.$(".aui-toolbar button").closest(".toolbar-item").addClass("contains-button")}function C(){AJS.$(".aui-toolbar .toolbar-split-right").each(function(I,L){var J=AJS.$(L),M=J.closest(".aui-toolbar"),F=M.find(".toolbar-split-left"),H=M.data("leftWidth"),K=M.data("rightWidth");if(!H){H=F.outerWidth();M.data("leftWidth",H)}if(!K){K=0;AJS.$(".toolbar-item",L).each(function(O,P){K+=AJS.$(P).outerWidth()});M.data("rightWidth",K)}var N=M.width(),G=N-H;if(N>K&&K>G){F.addClass("force-split")}else{F.removeClass("force-split")}})}function D(){E.each(function(F,G){var H=0;AJS.$(G).children(".toolbar-item").each(function(J,I){H+=AJS.$(this).outerWidth()});AJS.$(this).width(H)})}D();B();var A=false;AJS.$(window).resize(function(){if(A!==false){clearTimeout(A)}A=setTimeout(C,200)})}}};AJS.toInit(function(){AJS.setUpToolbars()});
} catch (err) {
    if (console && console.log && console.error) {
        console.log("Error running batched script.");
        console.error(err);
    }
}


