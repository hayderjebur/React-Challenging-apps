
/**
 * Provides additional contect and details about in-page content.
 *
 * @module views/components/Tooltip
 * @memberof -Common
 */
import './Tooltip.scss';

import PropTypes from 'prop-types';
import React, { createRef, useCallback, useEffect, useState } from 'react';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Link_Huge from '../Link_Huge/Link_Huge';
import Text from '../Text/Text';
import * as utils from './Tooltip';

/**
 * Closes the tooltip
 *
 * @method closeTooltip
 * @param {object} data
 * @param {object} methods
 * @returns visibility: hidden
 */
export const closeTooltip = ( data, methods ) => {
  const { ref = {} } = data || {};
  const { setTooltipOpen } = methods || {};
  if( ref.current?.style.visibility === 'visible' ){
    return () => {
      ref.current.style.visibility = 'hidden';
      setTooltipOpen( false );
    };
  }
};

/**
 * Opens the tooltip
 *
 * @method openTooltip
 * @param {object} data
 * @param {object} methods
 * @returns visibility: visible
 */
export const openTooltip = ( data, methods ) => {
  const { caretRef = {}, ref = {}, closeRef = {} } = data || {};
  const { setTooltipOpen } = methods || {};
  return ( e ) => {
    const y = e.clientY / 16; // click position on y axis
    const x = e.clientX / 16; // click position on x axis
    const windowHeight =  global.innerHeight / 16;
    const rect = e.target.getBoundingClientRect(); // tooltip dimensions
    const tooltipHeight = ref.current.clientHeight / 16;
    const spaceFromBottom = windowHeight - y;
    const tooltipWidth = ref.current.clientWidth / 16; // width in rems (330px)

    /**
     * set tooltip position on open
     */

    // set tooltip position on x axis and move caret accordingly
    if( x <= tooltipWidth ){
      ref.current.style.left = 0;
      ref.current.style.right = 'auto';
      caretRef.current.style.left = 0;
      caretRef.current.style.right = 'unset';
    }
    else {
      ref.current.style.left = 'auto';
      ref.current.style.right = '-0.25rem';
      caretRef.current.style.right = 0;
      caretRef.current.style.left = 'unset';
    }
    // set tooltip position on y axis and flip caret if tooltip too close to bottom
    if( spaceFromBottom < ( tooltipHeight + 6 ) ){
      ref.current.style.top = 'unset';
      ref.current.style.bottom = ( rect.height * 1.25 ) / 16 + 'rem';
      caretRef.current.classList.add( 'Tooltip__caret--flipped' );
    }
    else {
      ref.current.style.top = ( rect.height * 1.25 ) / 16 + 'rem';
      ref.current.style.bottom = 'unset';
      caretRef.current.classList.remove( 'Tooltip__caret--flipped' );
    }
    ref.current.style.visibility = 'visible';
    setTooltipOpen( true );
    closeRef.current.focus();
  };
};


/**
* Represents a Tooltip component
*
* @method
* @param {TooltipProps} props - React properties passed from composition
* @returns Tooltip
*/

export const Tooltip = ( props ) => {
  const [tooltipOpen, setTooltipOpen] = useState( false );
  const ref = useCallback( node => {
    if( node !== null ){
      ref.current = node;
    }
  }, [] );
  const caretRef = createRef();
  const closeRef = createRef();

  useEffect( () => {
    if( !global || !tooltipOpen ){
      return;
    }

    global.removeEventListener( 'click', utils.closeTooltip );
    global.removeEventListener( 'resize', utils.closeTooltip );
    global.addEventListener( 'click', utils.closeTooltip( { ref }, { setTooltipOpen } ), { once: true } );
    global.addEventListener( 'resize', utils.closeTooltip( { ref }, { setTooltipOpen } ) );

    return () => {
      global.removeEventListener( 'click', utils.closeTooltip );
      global.removeEventListener( 'resize', utils.closeTooltip );
    };
  }, [tooltipOpen] );

  return (
    <div className='Tooltip'>
      <Button
        icon
        className='Tooltip__button'
        iconImage={ props.actionIcon }
        iconSize='m'
        isExpanded={ tooltipOpen }
        ariaLabel={ props.accessibilityLabel }
        ariaControls='TooltipContent'
        ariaHiddenIcon={ true }
        onClick={ utils.openTooltip( { ref, caretRef, closeRef }, { setTooltipOpen } ) }
      />
      <div
        ref={ ref }
        className='Tooltip__container'
      >
        <div className='Tooltip__wrapper'>
          <div
            className='Tooltip__caret'
            ref={ caretRef }
          >
            <div className='Tooltip__caret--shape'></div>
          </div>
          <div className='Tooltip__content'
            id='TooltipContent'
            aria-live='polite'
            role='tooltip'
          >
            {
              props.iconImage &&
              <div className='Tooltip__icon'>
                <Icon className={ `Tooltip__icon--${props.iconImage}` }
                  size='m'
                  name={ props.iconImage }
                  aria-hidden={ true }
                />
              </div>
            }
            {
              props.message &&
              <div className='Tooltip__message'>
                <Text
                  htmlTag='p'
                  textStyle='body-3'
                  textAlign='left'
                >
                  { props.message }
                </Text>
              </div>
            }
            <div className='Tooltip__close'>
              <Button
                icon
                ariaLabel={ props.dismissLabel }
                iconImage='X'
                type='button'
                ref={ closeRef }
                onClick={ utils.closeTooltip( { ref }, { setTooltipOpen } ) }
              />
            </div>
          </div>
          {
            props.linkAction && props.linkAction.label &&
            <div className='Tooltip__action'>
              <Link_Huge
                compact
                action={ props.linkAction }
                withHover
              >
                { props.linkAction.label }
              </Link_Huge>
            </div>
          }
        </div>
      </div>
    </div>
  );
} ;
/**
 * Property type definitions
 * @typedef TooltipProps
 * @type {object}
 * @property {string} message - Tooltip message
 * @property {string} iconImage - Optional icon
 * @property {string} accessibilityLabel - ADA label for the icon button
 * @property {string} dismissLabel - ADA label to close the Tooltip
 * @property {object} linkAction - Sets the linkAction properties
 * @property {string} actionIcon - Sets icon for tooltip
 */
export const propTypes = {
  message: PropTypes.string.isRequired,
  iconImage: PropTypes.string,
  accessibilityLabel: PropTypes.string,
  dismissLabel: PropTypes.string,
  linkAction: PropTypes.object,
  actionIcon: PropTypes.string
};

Tooltip.propTypes = propTypes;

export default Tooltip;
