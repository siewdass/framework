import { JSX } from '../libs/runtime'
import { MODULE, ROUTE } from '../libs/core'

@ROUTE( '/' )
export class Home {
  text = 'Hello..'
  constructor( ) {
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

@MODULE( {
  routes: [ Home, About ],
  views: [ ],
  components: [ ],
  services: [ ]
} )
export class Application {}

new Application 
