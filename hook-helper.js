/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 Karl STEIN
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

export class HookHelper {

    constructor() {
        this.callbacks = [];
    }

    /**
     * Executes every callbacks using an array as arguments
     * @param context
     * @param args
     * @returns {Array}
     */
    apply(context, args) {
        const results = [];

        for (let i = 0; i < this.callbacks.length; i += 1) {
            results.push(this.callbacks[i].apply(context, args));
        }
        return results;
    }

    /**
     * Adds a callback
     * @param callback
     */
    add(callback) {
        if (typeof callback !== 'function') {
            throw new TypeError("HookHelper.add(): callback is not a function");
        }
        this.callbacks.push(callback);
    }

    /**
     * Executes every callbacks using a list of arguments
     * @returns {Array}
     */
    call() {
        // Transform arguments object to array
        const args = Array.prototype.slice.call(arguments);
        const context = args.shift();
        return this.apply(context, args);
    }

    /**
     * Removes all callbacks
     */
    clear() {
        this.callbacks = [];
    }

    /**
     * Removes the callback
     * @param callback
     */
    remove(callback) {
        if (typeof callback !== 'function') {
            throw new TypeError("HookHelper.remove(): callback is not a function");
        }
        let index = -1;
        do {
            index = this.callbacks.indexOf(callback);
            this.callbacks.splice(index, 1);
        }
        while (index !== -1);
    }

    /**
     * Returns the number of callbacks
     * @returns {Number}
     */
    size() {
        return this.callbacks.length;
    }

    /**
     * Returns all callbacks
     * @returns {Array}
     */
    toArray() {
        return this.callbacks.slice();
    }
}

export default HookHelper;
