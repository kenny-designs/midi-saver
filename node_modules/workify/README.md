# Workify

Worker and Fork process handler with stream pipes works on browser and NodeJS without any modification

To include the lib as standalone in your webpage you can use the cdn or download de files:

```html
<script type="text/javascript" src="https://unpkg.com/workify@latest/dist/bundle.js"></script>
<!-- or minified version -->
<script type="text/javascript" src="https://unpkg.com/workify@latest/dist/bundle.min.js"></script>
```

<!-- You can also use as nodeJS module like this: -->

<!-- Create files in current work dir with the follow structure -->

## Browser Usage

Create two files in current work dir with the follow structure.

```javascript
// worker.js
onmessage = function(event) {
    console.log("Main said : " + event.data);
};

setInterval(function(){
    postMessage('foo');
}, 5000);
```

```html
<!-- index.html -->
<script type="text/javascript" src="https://unpkg.com/workify@latest/dist/bundle.min.js"></script>
<script type="text/javascript">
    var Worker = workify.Worker,
        worker = new Worker('worker.js');

        worker.onmessage = function(event) {
            console.log("Worker said : " + event.data);
        };

    setInterval(function() {
        worker.postMessage('bar');
    }, 1000);
</script>
```

## NodeJS Usage

You can also execute the same code in nodejs creating an index.js file

```javascript
// index.js
var Worker = require('workify').Worker,
    worker = new Worker('worker.js');

    worker.onmessage = function(event) {
        console.log("Worker said : " + event.data);
    };

setInterval(function() {
    worker.postMessage('bar');
}, 1000);
```

And execute to see the result

```shell
$ node index.js
```

## Advanced Usage

If you wanna use the same main file in both cases (browser and nodejs), you can put this fallback in the `index.js` file

```javascript
var Worker = (function() {
        try {
            return workify.Worker
        } catch (_) {
            return require('workify').Worker
        }
    })(),
    worker = new Worker('worker.js');

    worker.onmessage = function(event) {
        console.log("Worker said : " + event.data);
    };

setInterval(function() {
    worker.postMessage('bar');
}, 1000);
```

Now you can include in html with a script tag

```html
<!-- index.html -->
<script type="text/javascript" src="https://unpkg.com/workify@latest/dist/bundle.min.js"></script>
<script type="text/javascript" src="index.js"></script>
```

And get the same result when you execute in node

### Browserify

If you need require some modules in your worker, you can do it with browserify, the worker recognize automatically which modules need the worker to work properly

### Performance
