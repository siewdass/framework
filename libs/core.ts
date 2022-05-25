import { Interpolation, Router } from "./others"

export function MODULE( param: any ) {
  return function( target: Function ) {
    const r = document.createElement( 'router' )
    document.body.appendChild( r )
    const { routes, views, components, services } = param
    //console.log( 'ALL SERVICES:', global.services )

    const interpolation = new Interpolation

    let ROUTES = [ ]
    for ( let r in routes ) {
      const route = new routes[ r ]
      const path = route.path
      const view = interpolation.generate( route )
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

export function VIEW( ) {
  return function( target: Function ) {
    target.prototype.view = true
  }
}