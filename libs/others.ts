export class Router {

  private routes: any
  private params: any = {}
  private query: string = ''
  private interpolation = new Interpolation
  private view: string
  private instance: any
  private path: string
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

  public setRoute( path: string ) {
    let view = this.routes[ path ]
    if ( !view ) {
      path = '/'
      view = this.routes[ path ]
    }
    this.instance = new view
    const html = this.interpolation.generate( this.instance )
    document.body.innerHTML = ''
    document.body.appendChild( html )
    const container = document.querySelector( 'router' )
    if ( container && this.instance.subroutes ) {
      for ( let i in this.instance.subroutes ) {
        if ( this.instance.subroutes[ i ].default ) {
          container.innerHTML = ''
          const instance = new this.instance.subroutes[ i ].component
          const element = this.interpolation.generate( instance )
          container.appendChild( element )
          break
        }
      }
    }
    window.history.pushState( { }, 'routing', path )
  }

  public setSubroute( path: string ) {
    if ( this.subroute === path ) { return }

    const container = document.querySelector( 'router' )
    if ( container ) {
      let instance: object, defaults: boolean
      for ( let i in this.instance.subroutes ) {
        if ( this.instance.subroutes[ i ].path == path ) {
          instance = new this.instance.subroutes[ i ].component
          defaults = this.instance.subroutes[ i ].default
        }
      }
      if ( instance ) {
        const element = this.interpolation.generate( instance )
        container.innerHTML = ''
        container.appendChild( element )
        this.subroute = path
        path = defaults ? '/' : path
        window.history.pushState( { }, 'routing', path )
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

