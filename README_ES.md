Spacer
Para la versión en ingles revisa el archivo README.md

Este es un componente pequeño que hice para añadir margin a su componente hijo sin tener que escribir estilos o nombres de clase para el componente mismo y evitar hacer divs entre medio (para evitar la divits).

También tiene soporte para classes de tailwind (tailwind es genial)
```jsx
//Se puede usar así

//Esto añade un estilo de margin:1px
<Spacer spacerOptions={1}}>
  //El componente hijo debe poder recibir className (para tailwind) o style
  <MyComponent/>
</Spacer>
```
El componente acepta dos props

tailwind (bool): Si es true añadira los classNames de tailwind al componente hijo en vez de props a style
spacerOptions:
  * Puede recibir un numero que se transformara en el estilo margin:number;
  * Una string con 'auto' o 'px' (tailwind)
  * Un Objeto especificando el margen top, bottom, left y right 
  ```javascript
    //No es necesario especificar todas las direcciones, solo las que se usaran
    { t:1, //Top
      b: 2, //Bottom
      l: 3, //Left
      r: 4, //Right
    }
  * Un objeto espeicificando los breakpoints (solo para tailwind) 
  ```javascript
    //Puedes usar los otros tipos de valores para las llaves de este objeto
    {
      //Este será el estilo por defecto del margen
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
```
