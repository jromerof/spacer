# Spacer

For the spanish version check the README_ES.md file

This is a small component that I made for adding margin to the child component without having to write the classNames or styles for the component itself and avoiding making divs around it (helps avoinding divitis).

It also has support for tailwind classes (because tailwind it's great)

```jsx
//You can use it like this

//This will add a style of margin:1px
<Spacer spacerOptions={1}}>
  //This component should be able to receive className(for tailwind) or style as props
  <MyComponent/>
</Spacer>
```

The component accepts two props:

* tailwind (bool): If it's true it will try to add tailwind classes instead of styles
* spacerOptions: 
  * It can recieve a number that will be transformed as a margin:number; css style
  * A string with auto or px
  * An object specifying the top, bottom, left and right margin
  ```javascript
  //You don't need to specify all the directions, only the ones you're using
  { t:1,
    b: 2,
    l: 3,
    r: 4,
  }
  ```
  * An object specifying breakpoints (only for tailwind)
  ```javascript
  //You can use the other type of values for the keys in this object
  {
    //This is the default margin style
    base: 1,
    sm: { t:1,
          b: 2,
          l: 3,
          r: 4,
        },
    md: "auto",
    xl: -4,
    lg: 5
    "2xl": 6
  }



