# philote.js

**Just a small collection of JavaScript shortcuts.**

# Example Usage

```javascript
document.ready(function() {

    philote('#myForm').on("submit", function(event) {
        event.preventDefault();

        var formData = new FormData(this);
        var target = philote('#level1');

        philote.ajax({
            method: 'POST',
            url: 'https://not-a-real.domain/api/stuff',
            data: formData,
            success: function(data) {
                target.removeClass('error');
                target.addClass('success');
                target.innerHTML = data;
            },
            error: function() {
                target.addClass('error');
                target.removeClass('success');
                target.innerHTML = 'error';
            },
        });

    });

    philote('#level1').find('span').each(function() {
        this.innerHTML = 'it works';
    });
});
```

# Reference

### Core Method: `philote.nodeListToArray(nodeList)`

> `nodeList` is an NodeList to be converted into an Array of Nodes

### Core Method: `philote.parameterize(object)`

> `object` is an Object to be converted into a URI ready String

### Core Method: `philote.ajax(data)`

> `data` is an Object with the following options:

| Property | Type | Default | Required | Description|
| :-: | :-: | :-: | :-: | :-- |
| method | `String` | `'GET'` | No | The HTTP method for the request. |
| url | `String` | `undefined` | Yes | The URL for the request. |
| data | `Object` or `FormData` | `undefined` | No | The POST data to be used in the request. |
| success | `Function` | `undefined` | No | Will be used as a callback when there has been a successful HTTP request. |
| error | `Function` | `undefined` | No | Will be used as a callback when there has been a error when trying to make a HTTP request. |
| complete | `Function` | `undefined` | No | Will be used as a callback when the HTTP request has completed, regardless of success. |


### Node Only Methods
| Method | Description|
| :-: | :-- |
| `ready(callback)` | Alias for `addEventListener('DOMContentLoaded', callback)`. |

### Array Only Methods

| Method | Description|
| :-: | :-- |
| `each(callback)` | Loops over each item of the array and makes the `callback` in the scope of that item. |


### Array and Node Methods

| Method | Description|
| :-: | :-- |
| `find(classes)` | Wrapper for `querySelectorAll` but it also converts the `NodeList` to an array, and it works on an array of `Node`s without causing duplicates. |
| `addClass(classes)` | `classes` is a string that is split by a space and each class is added to every `Node` |
| `removeClass(classes)` | `classes` is a string that is split by a space and each class is removed from every `Node` |
| `on(type, listener)` | Wrapper for `addEventListener`. |
| `off(type, listener)` | Wrapper for `removeEventListener`. |


# Tip: You can make an alias!
```javascript
var $ = philote;
var p = philote;
// ... or anything else you want.
```
