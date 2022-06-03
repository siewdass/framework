import { RUNTIME } from '../libs/runtime'
import { MODULE, ROUTE, SUBROUTE, VIEW, COMPONENT } from '../libs/core'
import { Router } from '../libs/others'

@COMPONENT( )
export class Home {
  prop = 'Home'
  constructor( ) { }
  render( ) {
    return (
      <p>{ this.prop }</p>
    )
  }
}

@COMPONENT( )
export class About {
  prop = 'About'
  constructor( ) { }
  render( ) {
    return (
      <p>{ this.prop }</p>
    )
  }
}

@ROUTE( '/login' )
@VIEW( )
export class Login {
  prop = 'Log..'
  constructor( router: Router ) {
    console.log( 'Instance:', this.prop )
  }
  change( ) {
    this.prop = 'Login'
    console.log( this.prop )
  }
  render( ) {
    return (
      <div>
        <button onclick={ ( ) => this.change( ) }>{ this.prop }</button>
      </div>
    )
  }
}

@ROUTE( '/' )
@VIEW( )
export class App {

  @SUBROUTE( { path: 'home', default: true } )
  home: Home

  @SUBROUTE( { path: 'about' } )
  about: About

  router: Router

  constructor( ) {
  }

  change( path: string ) {
    console.log( path )
    //this.router.setRoute( path )
  }

  render( ) {
    return (
      <div>
        <navbar>
          <ul>
            <li>
              <a onclick={ ( ) => this.change( 'home' ) }>Home</a>
            </li>
            <li>
              <a onclick={ ( ) => this.change( 'about' ) }>About</a>
            </li>
          </ul>
        </navbar>
        <router></router>
      </div>
    )
  }

}

@MODULE( { views: [ App, Login ], components: [ Home, About ], services: [ ] } )
export class Frontend {
}

new Frontend