# BullScript [![Build Status](https://travis-ci.org/mxcl/bs.svg?branch=master)](https://travis-ci.org/mxcl/bs)

BullScript compiles to Javascript.

Alpha Quality
=============
The test-suite no doubt has holes. So you may have to fix some bugs if you use
it at this stage. But, we’re actively developing BS, so hgopefully its quality
will rapidly improve.

Examples & Usage
================
http://mxcl.github.com/bs/

Inline HTML Caveats
===================
You have to cleanly terminate your HTML tags. This is how the parser
determines where HTML ends. So if you start with a `<div>` end with a `</div>`.
Though having said this, we understand tags like `<img>` too. Also you can do
this:

```js
var a = <div>foo</div>
        <b>blah</b>
var b = 2;
```

Additionally, (currently) the parser will be confused by JavaScript of this
kind:

```js
if (a <bc) { bar(); }
```

Heck, the above even breaks Sublime Text’s Markdown syntax highlighting.


License
=======
I, Max Howell the copyright holder of this work, hereby release it into the
public domain. This applies worldwide.

In case this is not legally possible, I grant any entity the right to use this
work for any purpose, without any conditions, unless such conditions are
required by law.
