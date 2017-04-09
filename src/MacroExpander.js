/**
 * This file contains the “gullet” where macros are expanded
 * until only non-macro tokens remain.
 */

import Lexer from "./Lexer";

class MacroExpander {
    constructor(input, macros) {
        this.lexer = new Lexer(input);
        this.macros = macros;
        this.stack = []; // contains tokens in REVERSE order
        this.discardedWhiteSpace = [];
    }

    /**
     * Recursively expand first token, then return first non-expandable token.
     */
    nextToken() {
        for (;;) {
            if (this.stack.length === 0) {
                this.stack.push(this.lexer.lex());
            }
            const topToken = this.stack.pop();
            const name = topToken.text;
            if (!(name.charAt(0) === "\\" && this.macros.hasOwnProperty(name))) {
                return topToken;
            }
            let expansion = this.macros[name];
            if (typeof expansion === "string") {
                const bodyLexer = new Lexer(expansion);
                expansion = [];
                let tok = bodyLexer.lex();
                while (tok.text !== "EOF") {
                    expansion.push(tok);
                    tok = bodyLexer.lex();
                }
                expansion.reverse(); // to fit in with stack using push and pop
                this.macros[name] = expansion;
            }
            this.stack = this.stack.concat(expansion);
        }
    }

    get(ignoreSpace) {
        this.discardedWhiteSpace = [];
        let token = this.nextToken();
        if (ignoreSpace) {
            while (token.text === " ") {
                this.discardedWhiteSpace.push(token);
                token = this.nextToken();
            }
        }
        return token;
    }

    /**
     * Undo the effect of the preceding call to the get method.
     * A call to this method MUST be immediately preceded and immediately followed
     * by a call to get.  Only used during mode switching, i.e. after one token
     * was got in the old mode but should get got again in a new mode
     * with possibly different whitespace handling.
     */
    unget(token) {
        this.stack.push(token);
        while (this.discardedWhiteSpace.length !== 0) {
            this.stack.push(this.discardedWhiteSpace.pop());
        }
    }
}

module.exports = MacroExpander;
