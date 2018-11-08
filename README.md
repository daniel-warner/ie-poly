# IE-Poly

IE-Poly is a JS polyfill library for "DOM Element Object" methods that are not supported in some versions of Microsoft's Internet Explorer browser. Errors for methods have also been added in to ensure the user is using proper argument types as well as the correct number of arguments for the method to function as expected. 


## To Use:

Pass a reference of a "DOM Element Object" to the "ie()" function constructor to gain access to the polyfill methods, like so:

```javascript
var domNode = document.getElementById("myDomNode");

ie(domNode).addEventListener('onclick', function(){console.log('node clicked')})

ie(domNode).classList.remove("class1", "class2");
```


## Polyfills added so far:

addEventListener

removeEventListener

The classList property with its returned DOMTokenList Object polyfill, along with methods: add, remove, item, contains