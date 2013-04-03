Maybe This Stuff?
=================
More sensible handling for stuff passed in subst
------------------------------------------------
Eg. passing an array should separate it by spaces rather than ',' depending on
placement, that is, <a class="#{classes}"> should space separate where as:
<a>#{foos}</a> should ", " separate.

Passing functions should call them.

Assigning variables to DOM elements inline
------------------------------------------
Querying for bits of large HTML documents you create inline is inefficient, we
cam avoid that:

```
a =     <div>
b =         <a href=foo>Foo</a>
        </div>.appendTo(foo);
```

```
        a = $('div').append(
            b = $('<a href=foo>Foo</a>')
        ).appendTo(foo);
```

Comments within inline HTML
---------------------------
```
var a = <div>   // comment
        </div>
```

`%w[a v b]`
-----------
* Creates array of strings separated by spaces, like Ruby’s.

`<<`
----
```js
/** bs **/ $bar << <li>foo << <li>bar;
/** js **/ $bar.append('<li>foo').append('<li>bar');
```

This is cool because: it makes it easier and more readable to construct your
HTML programmatically, otherwise you get lots of nested brackets.

Note, this operator is a little unfortunate considering the angular brackets
of the inline HTML, so we should think of something better.

Use parenthesis to append at different levels in the DOM:

```js
$bar << (<ol> << <li>#{foo} << <li>#{bar});
```

Ruby-style Block Syntax
-----------------------
```js
/** bs **/ [1,2,3].map{ |x| x * 2 }.each{ |x| console.log(x); }
/** js **/ [1,2,3].map(function(x){ return x * 2; }).each(function(x){ console.log(x); })
```

* Rationale: less visual noise
* Make the “context” of the map call be the iterated element

`p` Debug Logger
----------------
```js
return&log foo;
```

* returns the value, but logs it first.

Inline SCSS
-----------
We have *Inline HTML*, so we should also support inline CSS, but let’s do it
with SCSS and then (with a bit of effort), support having variables in both
the JS and the CSS.

Function Parameter Defaults
---------------------------
This is common to compile-to-JavaScript languages. But I’m not sure about it
as—frankly—it doesn’t feel very “Javascripty”.

Convenience `try` syntax for functions
--------------------------------------
```js
function foo() try {
    bar();
} catch (e) {
    console.error(e);
}
```

Becomes:

```js
function foo() { try {
    bar();
} catch (e) {
    console.error(e);
}}
```
