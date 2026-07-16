import isUnicodeSupported from 'is-unicode-supported';

const unicode = isUnicodeSupported();

export const SYMBOLS = {
    tick: unicode ? '✔' : '√',
    warning: unicode ? '⚠' : '!',
    cross: unicode ? '✖' : 'x',
    rocket: unicode ? '🚀' : '>',
    folder: unicode ? '📂' : '[DIR]',
    dot: unicode ? '🟢' : 'o',
    clock: unicode ? '⏱' : '@',
    mail: unicode ? '📬' : '[MAIL]',
    settings: unicode ? '⚙️' : '[SET]',
    wave: unicode ? '👋' : 'Hi',
    pointer: unicode ? '❯' : '>',
};
