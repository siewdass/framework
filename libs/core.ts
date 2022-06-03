import { Router } from "./others"
import 'reflect-metadata'

export function MODULE( param: any ) {
  return function( target: Function ) {

    //global.components = {}

    const { routes, views, components, services } = param

    /*for ( let c in components ) {
      const component = components[ c ]
      if ( component.prototype.component ) {
        console.log(component.name )
        global.components[ component.name ] = component
      }
    }*/

    let ROUTES = [ ]
    for ( let v in views ) {
      const view = views[ v ]
      if ( view.prototype.route ) {
        const route = view.prototype.route
        ROUTES[ route ] = view
      }
    }
    global.router = new Router( ROUTES )
  }
}

export function ROUTE( path: String ) {
  return function( target: Function ) {
    target.prototype.route = path
  }
}


export function ROUTER( ) {
  return function( target: Object, property: string ) {
    target[ property ] = global.router
  }
}

export function SUBROUTE( params: any ) {
  return function( target: Object, property: string  ) { 
    if ( !target[ 'subroutes' ] ) {
      target[ 'subroutes' ] = { }
    }
    const type = Reflect.getMetadata( 'design:type', target, property )
    params.component = global.components[ type.name ]
    target[ 'subroutes' ][ type.name ] = params
  }
}

export function VIEW( ) {
  return function( target: Function ) {
    target.prototype.view = true
  }
}

export function COMPONENT( ) {
  return function( target: any ) {
    target.prototype.component = true
    if ( !global.components ) {
      global.components = { }
    }
    global.components[ target.name ] = target
  }
}