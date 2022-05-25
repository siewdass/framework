export class Router {
  private routes: any
  private params: any = {}
  private query: string = ''

  constructor( routes ) {
    this.routes = routes
    const { location: { pathname = '/', search } } = window
    console.log( 'path', pathname )
    if ( search ) {
      this.query = search
      this.setParams( )
      console.log( 'params', this.params )
    }
    const enabled = this.routes.filter( item => item.path === pathname )
    const path = enabled ? pathname : '/'
    this.setRoute( path + this.query )
  }

  private setParams( ): void {
    let p = this.query.replace( '?', '' ).split( '&' )
    for ( let i in p ) {
      let data = p[ i ].split( '=' )
      this.params[ data[ 0 ] ] = data[ 1 ]
    }
  }

  public getParams( ) {
    return this.params
  }

  public setRoute( route = '/' ) {
    for ( let i in this.routes ) {
      const { path, view } = this.routes[ i ]
      if ( path == route || route.startsWith( path ) ) {
        const container = document.querySelector( 'router' )
        if ( container ) {
          container.innerHTML = ''
          container.appendChild( view )
          const PATH = path == '/' ? path : route
          window.history.pushState( { }, 'routing', PATH )
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
