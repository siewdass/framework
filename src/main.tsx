import { RUNTIME } from '../libs/runtime'
import { MODULE, ROUTE, VIEW } from '../libs/core'
import { Router } from '../libs/others'

@ROUTE( '/' )
export class Home {
  text = 'Hello..'
  constructor( router: Router ) {
    console.log( 'INSTANCE', this.text )
  }
  change( ) {
    console.log( this.text )
    this.text = 'Hello World'
  }
  render( ) {
    return (
      <view>
        <button
          press={ ( ) => this.change( ) }
          value={ this.text }
        />
      </view>
    )
  }
}

@ROUTE( '/about' )
export class About {
  text = 'About'
  constructor( ) {
    console.log( 'INSTANCE', this.text )
  }
  render( ) {
    return (
      <view>
        <p value={ this.text } />
      </view>
    )
  }
}

@VIEW( )
export class Loading {
  render( ) {
    return (
      <view>
        <p value='Loading' />
      </view>
    )
  }
}

@MODULE( {
  routes: [ Home, About ],
  views: [ Loading ],
  components: [ ],
  services: [ ]
} )
export class Application {}

new Application 
