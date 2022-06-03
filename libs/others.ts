export class Router {

  private routes: any
  private params: any = {}
  private query: string = ''
  private interpolation = new Interpolation
  private view: string
  private instance: any

  constructor( routes ) {
    this.routes = routes
    const { location: { pathname, search } } = window
    if ( search ) {
      this.query = search
      this.setParams( )
      console.log( this.params )
    }
    const enabled = this.routes.filter( item => item.path === pathname )
    const path = enabled ? pathname + this.query: '/'
    this.setRoute( path )
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

  public setRoute( path: string ) {
    for ( let i in this.routes ) {
      const { route, view } = this.routes[ i ]
      if ( route == path ) {
        if ( this.view !== view.name ) {
          this.instance = new view
          this.view = view.name
          const element = this.interpolation.generate( this.instance )
          document.body.innerHTML = ''
          document.body.appendChild( element )
        }
        const container = document.querySelector( 'router' )
        if ( container && this.instance.subroutes ) {
          container.innerHTML = ''
          for ( let i in this.instance.subroutes ) {
            if ( this.instance.subroutes[ i ].default ) {
              const instance = new this.instance.subroutes[ i ].component
              const element = this.interpolation.generate( instance )
              container.appendChild( element )
              break
            }
          }
        }
        window.history.pushState( { }, 'routing', route )
      }
    }
  }

  setSubRoute( ) {  
  }

}

// route.startsWith( path ) ) {
//const container = document.querySelector( 'router' )
//if ( container ) {
//container.innerHTML = ''
//container.appendChild( v )
//const PATH = path == '/' ? route : path

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

