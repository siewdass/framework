import { JSX } from './lib'
import { Test, Tester } from './core'

//@Tester()
class Home {
  text = 'Hello..'
  constructor( ) {
    console.log( 'INSTANCE', this.text )
  }
  change( ) {
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

let component = new Home( )
let data = component.render( )
let props = Object.getOwnPropertyNames( component )
let all = data.getElementsByTagName( '*' )

for ( let p in props ) {
  for ( let i = 0; i < all.length; i++ ) {
    if ( component[ props[ p ] ] == all[ i ].innerHTML ) {
      const original = component[ props[ p ] ]
      Object.defineProperty( component, props[ p ], {
        get( ) {
          return this.value
        },
        set( value ) {
          all[ i ].innerHTML = value
          this.value = value
        }
      } )
      component[ props[ p ] ] = original
    }
  }
}

document.body.appendChild( data )
