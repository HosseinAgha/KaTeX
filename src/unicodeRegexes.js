const hangulRegex = /[\uAC00-\uD7AF]/;

// This regex combines
// - Hiragana: [\u3040-\u309F]
// - Katakana: [\u30A0-\u30FF]
// - CJK ideograms: [\u4E00-\u9FAF]
// - Hangul syllables: [\uAC00-\uD7AF]
// Notably missing are halfwidth Katakana and Romanji glyphs.
const cjkRegex =
    /[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FAF]|[\uAC00-\uD7AF]/;

// This regex contains all persian and arabic letters and numerals
const persianArabicRegex = /[\u0600-\u06FF]/;
// This regex contains all eastern arabic numerals
const easternArabicNumsRegex = /[\u0660-\u0669]|[\u06F0-\u06F9]/;

module.exports = {
    persianArabicRegex: persianArabicRegex,
    easternArabicNumsRegex: easternArabicNumsRegex,
    cjkRegex: cjkRegex,
    hangulRegex: hangulRegex,
};
