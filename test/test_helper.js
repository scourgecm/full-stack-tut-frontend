import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = new jsdom.JSDOM('<!doctype html><html><body></body></html>');
const win = doc.window;

global.document = win.document;
global.window = win;

Object.keys(win).forEach((key) => {
    if (!(key in global)) {
        global[key] = win[key];
    }
});

chai.use(chaiImmutable);