(function(global) {
    var philote = function(query) {
        if (query.indexOf('#') === 0) {
            var result = document.querySelector(query);
            if (result === null) {
                console.error('Did not find node matching: ' + query);
            }
        } else {
            var result = document.querySelectorAll(query)
        }

        return result;
    }

    philote.parameterize = function(object) {
        var parameters = [];

        for (var property in object) {
            var key = encodeURIComponent(property);
            var value = encodeURIComponent(object[property]);
            parameters.push(key + '=' + value);
        }

        return parameters.join('&');
    }

    philote.ajax = function(data) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = function() {
            if (request.readyState == XMLHttpRequest.DONE ) {
               if (request.status >= 200 <= 399) {
                   if (typeof data.success === 'function') {
                       data.success(request.responseText);
                   }
               } else {
                   if (typeof data.error === 'function') {
                       data.error(request.responseText);
                   }
               }

               if (typeof data.complete === 'function') {
                   data.complete(request.responseText);
               }
            }
        }

        if (typeof data.method === 'undefined' ) {
            data.method = 'GET';
        }

        if (typeof data.data === 'undefined' ) {
            data.data = {};
        }

        if (data.data instanceof FormData) {
            var postData = data.data;
        } else {
            var postData = philote.parameterize(data.data);
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }

        request.open(data.method, data.url);
        request.send(postData);
    }

    Node.prototype.addClass = function(newClasses) {
        var element = this;
        var newClassList = newClasses.split(' ');
        newClassList.forEach(function(newClass) {
            element.classList.add(newClass);
        });
    }

    NodeList.prototype.addClass = function(newClasses) {
        var newClassList = newClasses.split(' ');
        this.forEach(function(element) {
            newClassList.forEach(function(newClass) {
                element.classlist.add(newClass);
            });
        });
    }

    Node.prototype.removeClass = function(newClasses) {
        var element = this;
        var newClassList = newClasses.split(' ');
        newClassList.forEach(function(newClass) {
            element.classList.remove(newClass);
        });
    }

    NodeList.prototype.removeClass = function(newClasses) {
        var newClassList = newClasses.split(' ');
        this.forEach(function(element) {
            newClassList.forEach(function(newClass) {
                element.classlist.remove(newClass);
            });
        });
    }

    // TODO: 
    Node.prototype.find = function(query) {
        return this.querySelectorAll(query);
    }

    Node.prototype.ready = function(listener) {
        this.addEventListener('DOMContentLoaded', listener);
    }

    Node.prototype.on = function(type, listener) {
        this.addEventListener(type, listener);
    }

    NodeList.prototype.on = function(type, listener) {
        this.forEach(function(element) {
            element.addEventListener(type, listener);
        });
    }

    Node.prototype.off = function(type, listener) {
        this.removeEventListener(type, listener);
    }

    NodeList.prototype.off = function(type, listener) {
        this.forEach(function(element) {
            element.removeEventListener(type, listener);
        });
    }

    NodeList.prototype.each = function(callBack) {
        this.forEach(function(element) {
            callBack.call(element);
        });
    }

    global.philote = philote;
})(this);
