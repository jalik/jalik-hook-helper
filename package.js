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

Package.describe({
    name: "jalik:hook-helper",
    version: "0.2.0",
    author: "karl.stein.pro@gmail.com",
    summary: "Managing hooks made easy",
    homepage: "https://github.com/jalik/jalik-hook-helper",
    git: "https://github.com/jalik/jalik-hook-helper.git",
    documentation: "README.md"
});

Package.onUse(function (api) {
    api.versionsFrom('1.3.5.1');
    api.use('ecmascript');
    api.mainModule('hook-helper.js');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('practicalmeteor:mocha');
    api.use('jalik:hook-helper');
    api.mainModule('hook-helper-tests.js');
});
