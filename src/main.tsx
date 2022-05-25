import { RUNTIME } from '../libs/runtime'
import { MODULE, ROUTE, VIEW } from '../libs/core'
import { Router } from '../libs/others'

@ROUTE( '/' )
@VIEW( )
export class Home {
  text = 'Ho..'
  constructor( router: Router ) {
    console.log( 'Instance:', this.text )
  }
  change( ) {
    console.log( this.text )
    this.text = 'Home'
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
    console.log( 'Instance:', this.text )
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
