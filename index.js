/**
 * Boxyname constructor take options in parameters. At the moment, there are prefix and base count.
 * 
 * @param {Object} options
 */
var Boxyname = function (options) {
    this.options = options || {
        prefix: 'bx',
        base: 16
    };
    this.b = this.options.base;
    this.p = this.options.prefix;
}

/**
 * We can get an hexadecimal return from a decimal.
 * 
 * @param {integer} decimal
 */
Boxyname.prototype.get = function (decimal) {
    return this.p + this.pad(parseInt(decimal).toString(this.b));
}

/**
 * Internal function to retrieve next or prev names.
 * 
 * @param {string} direction
 * @param {string} hexadecimal
 * @param {integer} iteration
 * @callback cb
 */
Boxyname.prototype.side = function (direction, hexadecimal, iteration, cb) {
    var hexa = hexadecimal.replace(this.p, '');
    var decimal = parseInt(hexa, this.b);
    var obj = {};
    obj[1] = (direction === 'next') ? this.get(decimal + 1) : this.get(decimal - 1);
    
    if (iteration > 1) {
        for (var i = 2; i <= iteration; i++) {
            obj[i] = (direction === 'next') ? this.get(decimal + i) : this.get(decimal - i);
        }
    }

    if (cb) {
        return cb(obj);
    } else {
        return obj;
    }
}

/**
 * We can get 1 or X next hexadecimalS from current hexadecimal.
 * This function returns a raw object but eventually yan can make a callback to add your logic.
 * 
 * @param {string} hexadecimal
 * @param {integer} iteration
 * @callback cb
 */
Boxyname.prototype.next = function (hexadecimal, iteration = 1, cb = null) {
    return this.side('next', hexadecimal, iteration, cb);
}

/**
 * We can get 1 or X previous hexadecimalS from current hexadecimal.
 * This function returns a raw object but eventually yan can make a callback to add your logic.
 * 
 * @param {string} hexadecimal
 * @param {integer} iteration
 * @callback cb
 */
Boxyname.prototype.prev = function (hexadecimal, iteration = 1, cb = null) {
    return this.side('previous', hexadecimal, iteration, cb);
}

/**
 * 
 * Potentially, we can maybe add a padding for the result.
 * Example : bx1 -> bx001
 * 
 * @param {integer} decimal
 * 
 */
Boxyname.prototype.pad = function pad(decimal, width = 3, value = 0) {
    return decimal.length >= width ? decimal : new Array(width - decimal.length + 1).join(value) + decimal;
}

var boxyname = new Boxyname();

function awaitForSomeAws(server, time) {
    let maybeAnError = Math.random() >= 0.8;
    return new Promise(function (resolve, reject) {
        if (maybeAnError) {
	    setTimeout(() => reject('Error ' + server + ' created.'), time);
        } else {
            setTimeout(() => resolve('Server ' + server + ' created.'), time);
        }
    });
}

console.log(boxyname.get(1)); // Get the 9999th server

console.log(boxyname.prev('bxfff', 10)); // Get 10 server name previous to bxfff

console.log(boxyname.next('bx1', 100)); // Get 10 server name previous to bx005

boxyname.next('bx1', 10, function (servers) {
    for (k in servers) {
        // Oh! Maybe we can simulate a call to an api like AWS :)
        awaitForSomeAws(servers[k], k * 10)
            .then(function (val) {
                console.log(val);
            })
	        .catch(function (val) {
                console.log(val);
            });
    }
});