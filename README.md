# hook-helper

This package provides the simplest way to create hooks and call them.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SS78MUMW8AH4N)

## Installation

To install the package, execute this command in the root of your project :
```
meteor add jalik:hook-helper
```

If later you want to remove the package :
```
meteor remove jalik:hook-helper
```

## Example of using hook helper

Below is an example of an application using hook helpers to expose events to 3rd party modules and executing module hooks when events happen.

```js
import {HookHelper} from 'meteor/jalik:hook-helper';


const App = {

    events: {
        pluginAdded: new HookHelper(),
        start: new HookHelper(),
        stop: new HookHelper()
    },

    plugins: {},

    addPlugin(name, plugin) {
        this.plugins[name] = plugin;
        // Execute plugin added hooks
        this.events.pluginAdded.call(this, name, plugin);
    },

    onPluginAdded(callback) {
        this.events.pluginAdded.add(callback);
    },

    onStart(callback) {
        this.events.start.add(callback);
    },

    onStop(callback) {
        this.events.stop.add(callback);
    },

    start() {
        // Execute start hooks
        this.events.start.call(this);
    },

    stop() {
        // Execute stop hooks
        this.events.stop.call(this);
    }
};


/**
 * 3rd party module hooks
 */
App.onStart(function () {
    console.info(`App started @ ${new Date()}`);
});

App.onStop(function () {
    console.info(`App stopped @ ${new Date()}`);
});

App.onPluginAdded(function (name, plugin) {
    console.info(`Plugin ${name} added`, plugin);
});

App.onPluginAdded(function (name, plugin) {
    console.info(`Plugin ${name} added`, plugin);
});


// Start the application
App.start();

// Add a plugin
App.addPlugin('hello-world', {
    action: function () {
        console.log("Hello World");
    }
});

// Start the application
App.stop();
```

## Adding callbacks

To add a callback, use the method `add(callback)`.
```js
import {HookHelper} from 'meteor/jalik:hook-helper';

const cb = new HookHelper();

cb.add(function() {
  console.log("Hello");
});

console.log(cb.size()); // 1
```

## Executing callbacks

To execute all callbacks, use the method `call(context, arg1, arg2..)` or `call(context, args)`.
```js
import {HookHelper} from 'meteor/jalik:hook-helper';

const cb = new HookHelper();

cb.add(function(name) {
  console.log(`Hello ${name}`);
});
cb.add(function(name) {
  console.log(`Hello again ${name}`);
});

// Using a list of arguments
cb.call(this, 'karl');

// Using an array of arguments
cb.apply(this, ['karl']);
```

## Removing callbacks

To remove a single callback, use the method `remove(callback)`.
```js
import {HookHelper} from 'meteor/jalik:hook-helper';

const cb = new HookHelper();

cb.add(function() {
  console.log("Hello");
});
const helloAgain = function() {
  console.log("Hello again");
};
cb.add(helloAgain);

console.log(cb.size()); // 2
cb.remove(helloAgain);
console.log(cb.size()); // 1
```

## Listing callbacks

To get the list of callbacks, use the method `toArray()`, it will returns all callbacks in an `Array`.
```js
import {HookHelper} from 'meteor/jalik:hook-helper';

const cb = new HookHelper();

cb.add(function() {
  console.log("Hello");
});
cb.add(function() {
  console.log("Hello again");
});

const arr = cb.toArray();
console.log(arr.length); // 2
```

To remove all callbacks, use the method `clear()`.
```js
import {HookHelper} from 'meteor/jalik:hook-helper';

const cb = new HookHelper();

cb.add(function() {
  console.log("Hello");
});

console.log(cb.size()); // 1
cb.clear();
console.log(cb.size()); // 0
```

## Changelog

### v0.2.0
- Uses ES6 module `import` and `export` syntax
- Adds method `apply(context, args)` to executes callbacks with `args` as `Array`
- Adds method `toArray()` to get all callbacks in an `Array`
- Fixes method `call()` not being called when no arguments passed

## License

This project is released under the [MIT License](http://www.opensource.org/licenses/MIT).
