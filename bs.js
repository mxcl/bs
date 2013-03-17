/** This is BullScript’s Javascript library that you probably will need to
  * include in projects that use the BullScript compiler (bsc).
  */

(function() {
    bs = {
        x: function(y) {
            if (y === null || y === undefined)
                return '';
            return encodeURIComponent(y).replace('%20', '+');
        },
        X: function(y) {
            if (y === null || y === undefined)
                return '';
            return encodeURIComponent(y).replace(/[!'()]/g, escape).replace(/\*/g, '%2A');
        },
        n: function(y) {
            if (y === null || y === undefined)
                return '';
            return y;
        },
        N: function(y) {
            if (y instanceof Array && y.length <= 0)
                return '';
            if (y instanceof Object && Object.keys(y).length <= 0)
                return '';
            return y || '';
        }
    };
})();
