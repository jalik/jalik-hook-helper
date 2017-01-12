/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {Meteor} from 'meteor/meteor';
import {chai} from 'meteor/practicalmeteor:chai';
import {HookHelper} from 'meteor/jalik:hook-helper';


describe('HookHelper', function () {

    const func = function (name) {
        return name ? `Hello ${name}` : "Hello";
    };

    describe(`new HookHelper()`, function () {
        it(`should have no callback`, function () {
            const h = new HookHelper();
            chai.assert.equal(h.size(), 0);
        });
    });

    describe(`add(function)`, function () {
        it(`should add a callback`, function () {
            const h = new HookHelper();
            h.add(func);
            chai.assert.equal(h.size(), 1);
        });
    });

    describe(`add(null)`, function () {
        it(`should throw an error`, function () {
            const h = new HookHelper();
            const fn = function () {
                h.add(null);
            };
            chai.assert.throws(fn, TypeError);
        });
    });

    describe(`clear()`, function () {
        it(`should remove all callbacks`, function () {
            const h = new HookHelper();
            h.add(func);
            h.clear();
            chai.assert.equal(h.size(), 0);
        });
    });

    describe(`call()`, function () {
        it(`should return an Array`, function () {
            const h = new HookHelper();
            h.add(func);
            h.add(func);
            const results = h.call();
            chai.assert.equal(Array.isArray(results), true);
        });
    });

    describe(`call()`, function () {
        it(`should return an Array containing the results of each callback`, function () {
            const h = new HookHelper();
            h.add(func);
            h.add(func);
            const results = h.call();
            chai.assert.equal(results.length, h.size());
        });
    });

    describe(`call()`, function () {
        it(`should pass arguments to callbacks during execution`, function () {
            const h = new HookHelper();
            h.add(func);
            const results = h.call(this, 'karl');
            chai.assert.equal(results[0], func('karl'));
        });
    });

    describe(`remove(function)`, function () {
        it(`should remove all instance of the callback`, function () {
            const h = new HookHelper();
            h.add(func);
            h.add(func);
            h.remove(func);
            chai.assert.equal(h.size(), 0);
        });
    });

    describe(`remove(null)`, function () {
        it(`should throw an error`, function () {
            const h = new HookHelper();
            const fn = function () {
                h.remove(null);
            };
            chai.assert.throws(fn, TypeError);
        });
    });

    describe(`size()`, function () {
        it(`should return the number of callbacks`, function () {
            const h = new HookHelper();
            chai.assert.equal(h.size(), 0);
            h.add(func);
            chai.assert.equal(h.size(), 1);
            h.add(func);
            chai.assert.equal(h.size(), 2);
        });
    });

    describe(`toArray()`, function () {
        it(`should return an Array`, function () {
            const h = new HookHelper();
            chai.assert.equal(Array.isArray(h.toArray()), true);
        });
    });

    describe(`toArray()`, function () {
        it(`should return an Array containing all callbacks`, function () {
            const h = new HookHelper();
            h.add(func);
            h.add(func);
            h.add(func);
            chai.assert.equal(h.toArray().length, h.size());
        });
    });
});
