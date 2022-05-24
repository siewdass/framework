export class Router {
  routes: any

  constructor( routes ) {
    this.routes = routes
    const { location: { pathname = '/' } } = window;
    let routed = false
    for ( let i in this.routes ) {
      const { path } = this.routes[ i ]
      if ( path == pathname ) {
        this.routing( path )
        routed = true
      }
    }
    if ( !routed ) {
      this.routing( )
    }
  }

  routing( route = '/' ) {
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

export class Interpolation {
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
    return view
  }
}
