BullScript
==========
Like JavaScript but find it a little limited?

Like CoffeeScript but find it a little over-the-top?

BullScript is a nice in-between: syntactic sugar, but without going too far:
you will always know what JavaScript is being generated. I’m not
bullscripting you.

The Bullscript compiler is also WAY simple. PLEASE fork and improve and make a JS version, it will not take you long!

BS is designed to help you write JS that is easier to read. With convenience
functionality to help you write better JS. BUT at the end of the day, you are
still writing Javascript. Not something else.

Still Pretty New
================
It works, but you may have some trouble. It's pretty easy to try it though,
so what's to lose? Soon we'll have all the problems sorted out. So star it!

Examples
========

```js
/*bs*/ var foo = "Hello #{name}, ‘sup?";
/*js*/ var foo = "Hello " + name + ", ‘sup?";
```

Easy enough, Ruby-style variable substitution. CoffeeScript does that too,
init? But how about writing HTML inline!

```js
/*bs*/ var bar = <div class="abc">
                     Hello <a href='#{href}'>#{name}</a>, sup?
                 </div>;

/*js*/ var bar = '<div class="abc">'+
                    'Hello <a href="' + href + '">' + name + '</a>, sup?'+
                 '</div>';
```

Multi-line too! Notice how BS is generated with a one-to-one line mapping?

Being able to write HTML inline makes templates not-always-required. But
that’s up to you.

How about automatic jQuerization?

```js
/*bs*/ var $bar = <ol><li>foo</ol>;
/*js*/ var $bar = $('<ol><li>foo</ol>');
```

Multiline strings:

```js
  """Line one
     Line two
     Line three"""
```

Becomes:

```js
  "Line one\n"+
     "Line two\n"+
     "Line three"
```

Because we're generating HTML, we don't add the leading whitespace to the
string on the extra lines. We do however add a trailing newline character.

Fancy escaping:

```js
/*bs*/ "foo #n{bar} jee"
/*js*/ "foo " + (bar || '') + " jee"
```

```js
/*bs*/ "http://foo.com/#x{bar}/jee"
/*js*/ "http://foo.com/" + encodeURIComponent(bar) + "/jee"
```


TODO - #{}x
===========
Auto escape HTML:

    /*bs*/ <a href="http://example.com/#{foo}x">;
    /*js*/ '<a href='http://example.com/' + encodeURIComponent(foo) + '">';

Also we should auto escape <, & etc. when inserting as variables in text nodes
(as `&lt;`, `&amp;`, etc.).

TODO - <<
=========
How about a new operator that is handy for jQuery?

```js
/*bs*/ $bar << <li>foo << <li>bar;
/*js*/ $bar.append('<li>foo').append('<li>bar');
```

Note, this operator is a little unfortunate considering the angular brackets
of the inline HTML, so we should think of something better.

Use parenthesis to append at different levels in the DOM:

```js
$bar << (<ol> << <li>#{foo} << <li>#{bar});
```

TODO - Multiline Strings
========================
Using the """foo""" syntax


HTML Blocks Caveats
===================
Since many of the things you write inside HTML blocks are in fact valid
Javascript, and multiline strings are not typically valid in Javascript,
there are some caveats regarding these special blocks.

Namely we will continue to suck everything after a <\w into an HTML block
until you terminate it with a trailing semi-colon or a << operator.

Probably ideally we would use proper JS statement termination rules, and
detect when a newline is in fact a terminator. We could do this by analysing
your markup and seeing that you have closed the opening block.

We have not done that yet though. Please fork and fix! Or suggest better
solutions in a ticket! :)


HTML Blocks & Whitespace
========================
We add a space at the ends of HTML lines:

    <b>Boo
    Foo
    Goo</b>

Will compile to:

    '<b>Boo '+
    'Foo '+
    Goo'</b>'

We do this because if you wrote that HTML the newline would count as
whitespace. We use a space instead of a newline as it’s less visual-noise.


Caveats
=======
HTML blocks need to be terminated by a semi-colon and then straight after a
newline. This way semi-colons in the HTML are ignored. Flakey, we know.

Currently we can't figure out the HTML portion unless you choose not to use
the less-than operator (<) without whitespace like so:

    if (1 <abc)

Currently you can't put string substituions inside of string substitutions,
like:

    "foo #{bar("#{bar}")} bar"


MAYBE
=====
* Make the value of this in our-style maps be the array it is invoked on by
default, eg:

    array.map(function(obj, array) { /* this is array now due to 2nd param */} );

* Print and return, return operator (only if some global logging is set, debug only):

    printurn array.map(foo); // => var a = array.map(foo); console.log(a); return a;

* Inline SASS so you can define variables and use them in your JS *and* your CSS!
* Defaults for function parameters:

    function foo(a, b = []) {
        a = b;
    }
    function foo(a, b) { b = b || [];
        a = b;
    }

* Convenience try block syntax:

    function foo() try {
    } catch (e) {
    }
    function foo() { try {
    } catch (e) {
    }}

* How about Ruby-style block syntax:

```js
/* bs */ [1,2,3].map{ |x| x * 2 }.each{ |x| console.log(x); }
/* js */ [1,2,3].map(function(x){ return x * 2; }).each(function(x){ console.log(x); })
```
