BullScript
==========
Like JavaScript but find it a little limited?

Like CoffeeScript but find it a little over-the-top?

BullScript is a nice in-between: syntactic sugar, but without going too far:
you will always know what JavaScript is being generated. I’m not
bullscripting you.

Not Ready For Production
========================
I'm building this as I go for a web-project I am working on, but it's not
ready yet. You’re welcome to help!

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

How about Ruby-style block syntax:

```js
/* bs */ [1,2,3].map{ |x| x * 2 }.each{ |x| console.log(x); }
/* js */ [1,2,3].map(function(x){ return x * 2; }).each(function(x){ console.log(x); })
```

How about automatic jQuerization?

```js
/*bs*/ var $bar = <ol><li>foo</ol>;
/*js*/ var $bar = $('<ol><li>foo</ol>');
```

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
