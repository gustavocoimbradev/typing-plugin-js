# typing.plugin.js


### option 1 - cloning the repo

run the following command in your terminal (the plugin files are located in the /plugin folder)

`
git clone https://github.com/gustavocoimbradev/typing-plugin-js.git 
`

### option 2 - using the CDN

CSS

```html
<link href="https://gustavocoimbradev.github.io/typing-plugin-js/_plugin/css/typing.plugin.css" rel="stylesheet"> 
```
JS

```html
 <script src="https://gustavocoimbradev.github.io/typing-plugin-js/_plugin/js/typing.plugin.js"></script>  
```

### basic usage

```html
<div class="typing-js">

    <span typing-text="Hello, world!"></span>

</div> 
```
you can use multiples texts

```html
<div class="typing-js">

    <span typing-text="Hello, world!"></span>

    <span typing-text="Hello, typing.plugin.js!"></span>

    <span typing-text="Hello, developer!"></span>

    <span typing-text="Goodbye, everyone!"></span>

</div> 
```

** for now, it is only possible to apply the effect once on the same page. Perhaps in future implementations this problem will be resolved.


### additional attributes

* typing-time - interval time between each keystroke (default value: 40)
* sleeping-time - time between the end of typing and the beginning of deleting letters (default value: 2000)
* deleting-time - interval time between each deletion (default value: 25)
* interval-time - interval time between each phrase (default value: 250)
* typing-loop - boolean value (1/0) to enable or disable the loop (default value: 1)

how to use the attributes

```html
<div class="typing-js" {{ place the attributes here }} >

    <span typing-text="Hello, world!"></span>

</div>
```
