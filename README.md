BullScript
==========
BullScript is yet another language that compiles to Javascript.

Well actually not really. BullScript *is* Javascript. Javascript with a little
syntactic sugar to get rid of the rough edges. You still must write
Javascript, you still must use curly-braces, you still must put paranthesis
around your function parameters. But we have added a little sugar so that
some of the bigger pains in the language are much nicer.

At the end of your BullScript day, you are still writing Javascript, not
something else that is “better”.

Alpha Quality
=============
The test-suite no doubt has holes. So you may have to fix some bugs if you use
it at this stage. But, we’re actively developing BS, so hgopefully its quality
will rapidly improve.

Examples
========
Inline HTML
-----------

```js
/** This bs: **/

var bar = <div class="abc">
            Hello <a href='#{href}'>#{name}</a>, sup?
          </div>;

/** Becomes this js: **/

var bar = $('<div class="abc"> '+
              'Hello <a href="' + href + '">' + name + '</a>, sup? '+
            '</div>');
```

It’s time to stop writing your HTML5 applications across multiple files.

Variable Substitution
---------------------
```js
/** bs **/ var foo = "Hello #{name}, ‘sup?";
/** js **/ var foo = "Hello " + name + ", ‘sup?";
```

Multiline Strings
-----------------

```js
  """Line one
     Line #{two}
     Line three"""
```

Becomes:

```js
  "Line one\n"+
     "Line " + two + "\n"+
     "Line three"
```

Fancy Escaping
--------------
```js
/** bs **/ "foo #n{bar} jee"
/** js* */ "foo " + (bar || '') + " jee"
```

```js
/** bs **/ "http://foo.com/#x{bar}/jee"
/** js **/ "http://foo.com/" + encodeURIComponent(bar) + "/jee"
```

In fact there is more to this: they call through to bs.js so that the escapes
are more useful. `#n{}` will output an empty string for `null` and
`undefined`, while `#N{}` will do so for empty Arrays, Objects and anything
that is `falsy`. `#x{}` does “pretty” escaping, ie. `encodeURIComponent` but
replacing `%20`s with `+`s, while `#N{}` does *full* escaping, that is
`encodeURIComponent` but it also encodes `!'()` which doesn’t hurt, but can
avoid certain categories of bug. If you want vanilla `encodeURIComponent` then
(currently) you’ll have to call it yourself.

Using BullScript
================
Currently we only have the compiler: `bsc`.

Using it in eg. Sinatra is thus (you will need to adapt paths):

```rb
get '/*.js' do |fn|
  `./bsc #{fn}.js`
end
```

And when deploying just adapt your build-system to compile `bs` to `js`, eg.
for `make` here’s an implicit rule you can use:

```Makefile
%.js: %.bs
    ./bsc $< > $@
```

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
