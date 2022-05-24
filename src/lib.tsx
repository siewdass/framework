import 'reflect-metadata'

function DOMparseChildren( children ) {
  let childs = [ ]
  for ( let i in children ) {
    if( typeof children[ i ] === 'string' ) {
      childs.push( document.createTextNode( children[ i ] ) )
    } else {
      childs.push( children[ i ] )
    }
  }
  return childs
}

function nonNull( val ) {
  return Boolean( val ) ? val : { }
}

function DOMparseNode( tag, properties, children ) {
  const element = document.createElement( tag )

  if ( properties !== {} ) {
    for ( let i in properties ) {
      if ( i == 'press' ) { 
        element[ 'onclick' ] = properties[ i ]
      } else if ( i == 'value' ) { 
        element[ 'innerHTML' ] = properties[ i ]
      } else {
        element[ i ] = properties[ i ]
      }
    }
  }
  
  const childs = DOMparseChildren( children )
  for ( let i in childs ) {
    element.appendChild( childs[ i ] )
  }

  return element
}

export function JSX( tag, properties, ...children ) {
  if( typeof tag === 'function' ) {
    return tag( { ...nonNull( properties ), children } )
  }
  return DOMparseNode( tag, properties, children )
}


//let all = document.getElementById( 'b' )


//console.log( all.click )
/*all.addEventListener( 'click', ( ) => {
  all.click( )
} )

Object.prototype.isEmpty = function ( ) {
  for( let prop in this ) {
    if ( prop !== 'isEmpty' ) {
      return false
    }
  }
  return true
}*/




/*for ( let prop in component ) {
  if ( Object.prototype.hasOwnProperty.call( component, prop ) ) {
    console.log( component[ prop ])
    Reflect.deleteProperty( component, prop )
    console.log( component[ prop ])
    component[ prop ] = 'hello world'
    console.log( component[ prop ])
    Reflect.defineProperty(component, 'prop', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: component[ prop ],
      get: function( ) {
        this.value
      },
      set: function( value ) {
        this.value = value
      }
    })

    for ( let i in all ) {
      if ( component[ prop ] == all[ i ].innerHTML ) {

      }
    }
  }
}*/

/*
let c = {
  text: 'omg'
}
/*Object.defineProperty( c, 'text', {
  value: c[ 'text' ],
  get: function() { return this.value },
  set: function (value) { this.value == value; console.log( value ) },
  writable: true,
  configurable: true
} )
let t = Object.getOwnPropertyDescriptor(component, 'text')
console.log(t )
Object.defineProperty(component, 'text', {
  enumerable: true,
  configurable: true,
  writable: true,
  value: c[ 'text' ],
  //get () { return this.value }
})*/
