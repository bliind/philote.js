(function(global) {
    var philote = function(query) {
        if (query.indexOf('#') === 0) {
            var result = document.querySelector(query);
            if (result === null) {
                console.error('Did not find node matching: ' + query);
            }
        } else {
            var nodeList = document.querySelectorAll(query);
            var result = philote.nodeListToArray(nodeList);
        }

        return result;
    }

    philote.nodeListToArray = function(nodeList) {
        var array = [];
        for (var i = 0 ; i < nodeList.length ; i++) {
            array.push(nodeList[i]);
        }

        return array;
    }

    philote.parameterize = function(object) {
        var parameters = [];
        for (var property in object) {
            var key = encodeURIComponent(property);
            var value = encodeURIComponent(object[property]);
            parameters.push(key + '=' + value);
        }

        var parametersString = parameters.join('&');

        return parametersString;
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

    Array.prototype.each = function(callback) {
        for (var i = 0 ; i < this.length ; i++) {
            callback.call(this[i]);
        }
    }

    Node.prototype.find = function(query) {
        var nodeList = this.querySelectorAll(query);

        return philote.nodeListToArray(nodeList);
    }

    Array.prototype.find = function(query) {
        var results = [];

        for (var i = 0 ; i < this.length ; i++) {
            var newNodes = this[i].querySelectorAll(query);
            for (var ii = 0 ; ii < newNodes.length ; ii++) {
                if (results.indexOf(newNodes[ii]) === -1) {
                    results.push(newNodes[ii]);
                }
            }
        }

        return results;
    }

    Node.prototype.addClass = function(classes) {
        var node = this;
        var classesList = classes.split(' ');
        for (var i = 0 ; i < classesList.length ; i++) {
            node.classList.add(classesList[i]);
        }
    }

    Array.prototype.addClass = function(newClasses) {
        var newClassList = newClasses.split(' ');
        for (var i = 0 ; i < this.length ; i++) {
            for (var ii = 0 ; ii < newClassList.length ; ii++) {
                this[i].classList.add(classesList[ii]);
            }
        }
    }

    Node.prototype.removeClass = function(newClasses) {
        var node = this;
        var classesList = classes.split(' ');
        for (var i = 0 ; i < classesList.length ; i++) {
            node.classList.remove(classesList[i]);
        }
    }

    Array.prototype.removeClass = function(newClasses) {
        var newClassList = newClasses.split(' ');
        for (var i = 0 ; i < this.length ; i++) {
            for (var ii = 0 ; ii < newClassList.length ; ii++) {
                this[i].classList.remove(classesList[ii]);
            }
        }
    }

    Node.prototype.toggleClass = function(classes) {
        var node = this;
        var classesList = classes.split(' ');
        for (var i = 0 ; i < classesList.length ; i++) {
            var regex = new RegExp(classesList[i]);
            if (regex.test(this.classList)) {
                node.classList.remove(classesList[i]);
            } else {
                node.classList.add(classesList[i]);
            }
        }
    }

    Array.prototype.toggleClass = function(classes) {
        var nodeArray = this;
        var classesList = classes.split(' ');
        for (var i = 0 ; i < classesList.length ; i++) {
            var regex = new RegExp(classesList[i]);
            for (var ii = 0; ii < nodeArray.length ; ii++) {
                if (regex.test(nodeArray[ii].classList)) {
                    nodeArray[ii].classList.remove(classesList[i]);
                } else {
                    nodeArray[ii].classList.add(classesList[i]);
                }
            }
        }
    }

    Node.prototype.ready = function(listener) {
        this.addEventListener('DOMContentLoaded', listener);
    }

    Node.prototype.on = function(type, listener) {
        this.addEventListener(type, listener);
    }

    Array.prototype.on = function(type, listener) {
        for (var i = 0 ; i < this.length ; i++) {
            this[i].addEventListener(type, listener);
        }
    }

    Node.prototype.off = function(type, listener) {
        this.removeEventListener(type, listener);
    }

    Array.prototype.off = function(type, listener) {
        for (var i = 0 ; i < this.length ; i++) {
            this[i].removeEventListener(type, listener);
        }
    }

    global.philote = philote;
})(this);
