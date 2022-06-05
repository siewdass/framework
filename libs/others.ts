export class Router {

  private routes: any
  private params: any = {}
  private query: string = ''
  private interpolation = new Interpolation

  private view: any

  private route: string
  private subroute: string

  constructor( routes ) {
    this.routes = routes
    const { location: { pathname, search } } = window
    this.setParams( search )
    this.setRoute( pathname )
  }

  private setParams( search: string ): void {
    if ( search ) {
      let p = this.query.replace( '?', '' ).split( '&' )
      for ( let i in p ) {
        let data = p[ i ].split( '=' )
        this.params[ data[ 0 ] ] = data[ 1 ]
      }
      console.log( this.params )
    }
  }

  public getParams( ) {
    return this.params
  }

  private validSubroute( route: string, path: string ): string {
    if ( !route.endsWith( '/' ) ) { return }
    const subroute = path.split( '/' )[ 1 ]
    const subroutes = this.routes[ route ].prototype.subroutes
    if ( !subroutes ) { return }
    for ( let i in subroutes ) {
      if ( path.endsWith( '/' ) && subroutes[ i ].default ) {
        return i
      } else if ( i === subroute ) {
        return i
      }
    }
  }

  private validRoute( path: string ): string {
    for ( let i in this.routes ) {
      if ( this.routes[ path ] ) {
        return path
      }
    }
    return '/'
  }

  public setRoute( path: string ) {
    this.route = this.validRoute( path )
    const subroute = this.validSubroute( this.route, path )

    this.view = new this.routes[ this.route ]
    const html = this.interpolation.generate( this.view )
    document.body.innerHTML = ''
    document.body.appendChild( html )

    if ( subroute ) {
      this.setSubroute( subroute )
    } else {
      window.history.pushState( { }, 'routing', this.route )
    }
  }

  public setSubroute( path: string ) {
    if ( this.subroute === path ) { return }
    const container = document.querySelector( 'router' )
    if ( !container ) { return }

    const component = new this.view.subroutes[ path ].component
    const defaults = this.view.subroutes[ path ].default
    const html = this.interpolation.generate( component )
    container.innerHTML = ''
    container.appendChild( html )
    this.subroute = path
    const url = defaults ? this.route : this.route + this.subroute
    window.history.pushState( { }, 'routing', url )
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

