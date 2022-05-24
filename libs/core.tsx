import { JSX } from './runtime'

class Router {
  routes: any

  constructor( routes ) {
    this.routes = routes
    const { location: { pathname = '/' } } = window;
    const URI = pathname === '/home' ? '/' : pathname
    this.load( URI )
  }

  load( route = '/' ) {
    for ( let i in this.routes ) {
      const { path, view } = this.routes[ i ]
      if ( path == route ) {
        const container = document.querySelector( 'router' )
        if ( container ) {
          container.innerHTML = ''
          container.appendChild( view )
          window.history.pushState( { }, 'routing', path )
        }
      }
    }
  }

}

class Interpolation {
  generate( instance ) {
    let view = instance.render( )
    let props = Object.getOwnPropertyNames( instance )
    let all = view.getElementsByTagName( '*' )

    for ( let p in props ) {
      for ( let i = 0; i < all.length; i++ ) {
        if ( instance[ props[ p ] ] == all[ i ].innerHTML ) {
          const original = instance[ props[ p ] ]
          Object.defineProperty( instance, props[ p ], {
            get( ) {
              return this.value
            },
            set( value ) {
              all[ i ].innerHTML = value
              this.value = value
            }
          } )
          instance[ props[ p ] ] = original
        }
      }
    }
    return { view }
  }
}


export function MODULE( param: any ) {
  return function( target: Function ) {
    document.body.appendChild( <router></router> )
    const { routes, views, components, services } = param
    //console.log( 'ALL SERVICES:', global.services )

    const interpolation = new Interpolation

    let ROUTES = [ ]
    for ( let r in routes ) {
      const route = new routes[ r ]
      const path = route.path
      const { view } = interpolation.generate( route )
      ROUTES.push( { path, view } )
    }

    global.router = new Router( ROUTES )
  }
}

export function ROUTE( path: String ) {
  return function( target: Function ) {
    target.prototype.route = true
    target.prototype.path = path
  }
}


/*import 'reflect-metadata'

export const getParameters = ( param ) => {
  const RegExInsideParentheses = /[(][^)]*[)]/
  const RegExParenthesesAndSpaces = /[()\s]/g
  const a = RegExInsideParentheses.exec( param )[ 0 ]
  const b = a.replace( RegExParenthesesAndSpaces, '' )
  const c = b.split( ',' ).map( str => str.trim( ) )
  return c
}

export function Test( constructor: any ) {
  const types = Reflect.getMetadata( 'design:paramtypes', constructor ) 
  const keys = getParameters( constructor )
  console.log( Object.keys(constructor ) )
  const CONSTRUCTOR: any = function( ...args ) {
    const c = new constructor( args )
    for ( let i = 0; i < types.length; i++ ) {
      const type = types[ i ].name
      if ( global.services[ type ] ) {
        c[ keys[ i ] ] = global.services[ type ]
      } else if ( type == 'Boolean' ) {
        c[ keys[ i ] ] = false
      } else if ( type == 'Number' ) {
        c[ keys[ i ] ] = 0
      } else if ( type == 'String' ) {
        c[ keys[ i ] ] = ''
      } else if ( type == 'Array' ) {
        c[ keys[ i ] ] = [ ]
      } else if ( type == 'Object' ) {
        c[ keys[ i ] ] = { }
      }
    }
    return c
  }

  CONSTRUCTOR.prototype = constructor.prototype
  return CONSTRUCTOR
}

export const Tester = ( ) => {
  return ( target: any ) => {
    /*const props = getParameters( target )
    console.log( props )
    for ( let i in props ) {
      console.log( target[ i ] )
    }
    const constructor: any = function ( ...args ) {
      const x = new target( ...args )
      //console.log( 'test', target.prototype[ 'text' ] )
      const descriptor = { writable: true, value: 'helloxxx' }
      Object.defineProperty( x, 'text', descriptor )
      return x
    }
    constructor.prototype = target.prototype;
    return constructor
  }
}

//methods Object.getOwnPropertyNames( constructor.prototype )
*/

/*

let component = new Home( )
let data = component.render( )
let props = Object.getOwnPropertyNames( component )
let all = data.getElementsByTagName( '*' )

for ( let p in props ) {
  for ( let i = 0; i < all.length; i++ ) {
    if ( component[ props[ p ] ] == all[ i ].innerHTML ) {
      const original = component[ props[ p ] ]
      Object.defineProperty( component, props[ p ], {
        get( ) {
          return this.value
        },
        set( value ) {
          all[ i ].innerHTML = value
          this.value = value
        }
      } )
      component[ props[ p ] ] = original
    }
  }
}

document.body.appendChild( data )
*/



//import 'reflect-metadata'


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
