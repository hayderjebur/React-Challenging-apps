import React from 'react';
const { SPACE_KEY } = require( '../constants/constants' ).default;

/**
 * stateAction callback after keyCode is detected
 *
 * @callback stateAction
 * @param {{ keyCode: string }} event
 */

/**
 * UseKeyPress
 * @param {string|array} keyCode - the code of the key to respond to, compared against event.keyCode
 * @param {array} forPreventDefault - the code of the key to make default behavior stop
 * @param {object} targetRef - the node to attach event listner
 * @param {stateAction} stateAction - the action to perform on key press
 * @param {boolean} bubbleEvent - to make event listener with or without bubbles event -- optional
 * keycode for Enter is 13, Spacebar is 32,Escape is 27,Uparrow is 40,Downarrow is 38,9 is Tab
 * More keycodes can found from https://keycode.info/
*/
export default function UseKeyPress( keyCode, targetRef, stateAction, forPreventDefault = [], bubbleEvent = false ){

  React.useEffect( () => {
    function handleKeyPress( e ){
      if( Array.isArray( keyCode ) ? keyCode.includes( e.keyCode ) : keyCode === e.keyCode ){
        !forPreventDefault.includes( e.keyCode ) && e.preventDefault();
        stateAction?.( e )
      }
    }

    if( targetRef.current ){
      targetRef.current.addEventListener( 'keydown', handleKeyPress, bubbleEvent );
    }
    return () => {
      if( targetRef.current ){
        targetRef.current.removeEventListener( 'keydown', handleKeyPress );
      }
    }
  }, [targetRef, keyCode, stateAction] );

  return ( <></> )
}



