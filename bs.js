/** This is BullScript’s Javascript library that you probably will need to
  * include in projects that use the BullScript compiler (bsc).
  */

(function() {
    bs = {
        x: function(y) {
            if (y === null || y === undefined)
                return '';
            if (typeof(y) == 'function')
                y = y();
            return encodeURIComponent(y).replace(/%20/g, '+');
        },
        X: function(y) {
            if (y === null || y === undefined)
                return '';
            if (typeof(y) == 'function')
                y = y();
            return encodeURIComponent(y).replace(/[!'()]/g, escape).replace(/\*/g, '%2A');
        },
        n: function(y) {
            if (y === null || y === undefined)
                return '';
            if (typeof(y) == 'function')
                y = y();
            return y;
        },
        N: function(y) {
            if (y instanceof Array && y.length <= 0)
                return '';
            if (y instanceof Object && Object.keys(y).length <= 0)
                return '';
            if (typeof(y) == 'function')
                y = y();
            return y || '';
        }
    };
})();
