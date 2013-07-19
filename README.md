populatejs: DRY HTML CSS API
============================

Populatejs is a drop-in Javascript library helping you "Don't Repeat Yourself" when doing markup.

Wherever you need to duplicate DOM elements in HTML to test how the layout is working with a greater number of items,
PopulateJS comes and does such boring work for you using it's compact, elegant and functional CSS API.
And your HTML markup is ready for making templates for real CMS...

Motivation
----------
For example, you need to create the category page for e-shop. There are many article items on it...
At first you're creating markup and CSS for only one item and then you're populating HTML structure
if you haven't got ready CMS setup or template engine.
```html
    <div class="item">
        <div class="thumb">
            <img src="test_thumb.jpg" />
        </div>
        <div class="title">
            Some cool stuff. Lorem ipsum
        </div>
        <div class="description">
            Lorem ipsum...
        </div>
        <div class="price">
            $<em>14</em><span>99</span>
        </div>
    </div>
```

To avoid copypasting such huge snippet just try how it will work with Populate JS!

How to use
----------
Drop following code snippet into your HTML page
```html
<script type="text/javascript" src="https://raw.github.com/vladignatyev/populate-js/master/js/populate.js"></script>
```
And you're ready! 
To populate category page with items just add ```populate-10``` CSS class to ```<div class="item">``` and you'll get 10 items on your page.

Need more? Populate inner content with ```populate-inner-5``` where 5 is any number.
You may combine it to populate the page with fake content not affecting your clean HTML markup.
When you've done, just replace ```populate.js``` string from your HTML and it will be ready to create templates and so forth.

What's inside?
-------------
This microlibrary was written completely test-driven using outstanding [QUnit js unit testing framework](http://qunitjs.com/).
To run tests just open ```tests.html``` in your favorite browser.

At a glance, populatejs does traversing DOM tree on document ready event and clone DOM-nodes you've choosen in efficient and usable manner.

Contributing guide
------------------
You're welcome to create tickets for feature requests on additional CSS sugar and to pull new features.
Use TDD to keep your code marvellous! 



