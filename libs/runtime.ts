function DOMparseChildren( children ) {
  let childs = [ ]
  for ( let i in children ) {
    if( typeof children[ i ] === 'string' ) {
      childs.push( document.createTextNode( children[ i ] ) )
    } else {
      childs.push( children[ i ] )
    }
  }
  return childs
}

function nonNull( val ) {
  return Boolean( val ) ? val : { }
}

function DOMparseNode( tag, properties, children ) {
  const element = document.createElement( tag )

  if ( properties !== {} ) {
    for ( let i in properties ) {
      if ( i == 'press' ) { 
        element[ 'onclick' ] = properties[ i ]
      } else if ( i == 'value' ) { 
        element[ 'innerHTML' ] = properties[ i ]
      } else {
        element[ i ] = properties[ i ]
      }
    }
  }
  
  const childs = DOMparseChildren( children )
  for ( let i in childs ) {
    element.appendChild( childs[ i ] )
  }

  return element
}

export function RUNTIME( tag, properties, ...children ) {
  if( typeof tag === 'function' ) {
    try {
      return tag( { ...nonNull( properties ), children } )
    } catch {
      const TAG = new tag
      return TAG.render( { ...nonNull( properties ), children } )
    }
  }
  return DOMparseNode( tag, properties, children )
}
