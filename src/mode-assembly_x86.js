define("ace/mode/assembly_x86_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var AssemblyX86HighlightRules = function() {

    this.$rules = { start: 
       [ { token: 'keyword.control.assembly',
          regex: '\\b(?:adc|add|and|and|b|b(?:eq|ne|cs|cc|mi|pl|vs|vc|hi|ge|lt|gt|le|al)|bic|bl|bx|cdp|cmn|cmp|eor|ldc|ldm|ldr|ldrb|mcr|mla|mov|mrc|mrs|msr|mul|mvn|orr|rsc|rsb|sbc|stc|stm|str|strb|sub|swi|swp|teq|tst)\\b',
           caseInsensitive: true },
         { token: 'variable.parameter.register.assembly',
           regex: '\\b(?:r0|r1|r2|r3|r4|r5|r6|r7|r8|r9|r10|r11|ip|sp|lr|pc)\\b',
           caseInsensitive: true },
         { token: 'constant.character.decimal.assembly',
           regex: '\\b[0-9]+\\b' },
         { token: 'constant.character.hexadecimal.assembly',
           regex: '\\b0x[A-F0-9]+\\b',
           caseInsensitive: true },
         { token: 'constant.character.hexadecimal.assembly',
           regex: '\\b[A-F0-9]+h\\b',
           caseInsensitive: true },
         { token: 'string.assembly', regex: /'([^\\']|\\.)*'/ },
         { token: 'string.assembly', regex: /"([^\\"]|\\.)*"/ },
         { token: 'support.function.directive.assembly',
           regex: '^\\[',
           push: 
            [ { token: 'support.function.directive.assembly',
                regex: '\\]$',
                next: 'pop' },
              { defaultToken: 'support.function.directive.assembly' } ] },
         { token: 
            [ 'support.function.directive.assembly',
              'support.function.directive.assembly',
              'entity.name.function.assembly' ],
           regex: '(^struc)( )([_a-zA-Z][_a-zA-Z0-9]*)' },
         { token: 'support.function.directive.assembly',
           regex: '^endstruc\\b' },
        { token: 
            [ 'support.function.directive.assembly',
              'entity.name.function.assembly',
              'support.function.directive.assembly',
              'constant.character.assembly' ],
           regex: '^(%macro )([_a-zA-Z][_a-zA-Z0-9]*)( )([0-9]+)' },
         { token: 'support.function.directive.assembly',
           regex: '^%endmacro' },
         { token: 
            [ 'text',
              'support.function.directive.assembly',
              'text',
              'entity.name.function.assembly' ],
           regex: '(\\s*)(.text|.data|.asciz|.global main)\\b( ?)((?:[_a-zA-Z][_a-zA-Z0-9]*)?)',
           caseInsensitive: true },
          { token: 'support.function.directive.assembly',
           regex: '\\b(?:d[bwdqtoy]|res[bwdqto]|equ|times|align|alignb|sectalign|section|ptr|byte|word|dword|qword|incbin)\\b',
           caseInsensitive: true },
         { token: 'entity.name.function.assembly', regex: '^\\s*%%[\\w.]+?:$' },
         { token: 'entity.name.function.assembly', regex: '^\\s*%\\$[\\w.]+?:$' },
         { token: 'entity.name.function.assembly', regex: '^[\\w.]+?:' },
         { token: 'entity.name.function.assembly', regex: '^[\\w.]+?\\b' },
         { token: 'comment.assembly', regex: '# +.*$' } ] 
    }
    
    this.normalizeRules();
};

AssemblyX86HighlightRules.metaData = {fileTypes: [ 'asm' ], name: 'Assembly x86', scopeName: 'source.assembly'}


oop.inherits(AssemblyX86HighlightRules, TextHighlightRules);

exports.AssemblyX86HighlightRules = AssemblyX86HighlightRules;
});

define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var BaseFoldMode = require("./fold_mode").FoldMode;
var Range = require("../../range").Range;

var FoldMode = exports.FoldMode = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1 || line[startLevel] != "#")
            return;

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) {
            line = session.getLine(row);
            var level = line.search(re);

            if (level == -1)
                continue;

            if (line[level] != "#")
                break;

            endRow = row;
        }

        if (endRow > startRow) {
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
        }
    };
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var indent = line.search(/\S/);
        var next = session.getLine(row + 1);
        var prev = session.getLine(row - 1);
        var prevIndent = prev.search(/\S/);
        var nextIndent = next.search(/\S/);

        if (indent == -1) {
            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
            return "";
        }
        if (prevIndent == -1) {
            if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") {
                session.foldWidgets[row - 1] = "";
                session.foldWidgets[row + 1] = "";
                return "start";
            }
        } else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") {
            if (session.getLine(row - 2).search(/\S/) == -1) {
                session.foldWidgets[row - 1] = "start";
                session.foldWidgets[row + 1] = "";
                return "";
            }
        }

        if (prevIndent!= -1 && prevIndent < indent)
            session.foldWidgets[row - 1] = "start";
        else
            session.foldWidgets[row - 1] = "";

        if (indent < nextIndent)
            return "start";
        else
            return "";
    };

}).call(FoldMode.prototype);

});

define("ace/mode/assembly_x86",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/assembly_x86_highlight_rules","ace/mode/folding/coffee"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var AssemblyX86HighlightRules = require("./assembly_x86_highlight_rules").AssemblyX86HighlightRules;
var FoldMode = require("./folding/coffee").FoldMode;

var Mode = function() {
    this.HighlightRules = AssemblyX86HighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
        this.lineCommentStart = ";";
        this.$id = "ace/mode/assembly_x86";
    }).call(Mode.prototype);

    exports.Mode = Mode;
    });