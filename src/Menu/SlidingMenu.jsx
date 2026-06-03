import React, { useState, useCallback, useRef, useEffect } from 'react';
import './SlidingMenu.scss';

/**
 * SlidingMenu Component - A menu that slides content to reveal menu underneath
 *
 * The application content slides to reveal a menu that appears to come from behind.
 * Supports both vertical (left/right) and horizontal (top/bottom) orientations.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Main content to display
 * @param {React.ReactNode} props.menu - Menu content to display
 * @param {'top' | 'bottom' | 'left' | 'right'} [props.position='left'] - Menu position
 * @param {boolean} [props.isOpen=false] - Whether menu is open
 * @param {Function} [props.onOpenChange] - Callback when menu open state changes
 * @param {string} [props.className] - Custom CSS class
 * @param {Object} [props.style] - Custom inline styles
 * @param {number} [props.duration=300] - Animation duration in milliseconds
 * @param {boolean} [props.closeOnEscape=true] - Close menu on Escape key
 * @param {boolean} [props.closeOnBackdropClick=true] - Close menu when clicking outside
 * @param {string} [props.backdropColor='rgba(0, 0, 0, 0.5)'] - Backdrop overlay color
 */

/**
 * SlidingMenu Component - A sliding menu that appears UNDER the app content.
 *
 * Usage:
 * 1. Render <SlidingMenu> near the root (before your main app layout).
 * 2. Wrap your main app layout with <SlidingMenu.ContentShifter>.
 */

const SlidingMenu = ({
  children,
  position = 'left',
  isOpen = false,
  onOpenChange,
  className = '',
  style = {},
  duration = 300,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  backdropColor = 'rgba(0, 0, 0, 0.5)',
  showBackdrop = true,
}) => {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const open = onOpenChange !== undefined ? isOpen : internalOpen;

  const handleOpenChange = useCallback(
    (next) => {
      if (onOpenChange) onOpenChange(next);
      else setInternalOpen(next);
    },
    [onOpenChange]
  );

  // Escape closes menu
  useEffect(() => {
    if (!closeOnEscape || !open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleOpenChange(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeOnEscape, open, handleOpenChange]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const menuClass = [
    'remochi-sliding-menu',
    `remochi-sliding-menu--${position}`,
    open ? 'remochi-sliding-menu--open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const menuStyle = {
    ...style,
    '--animation-duration': `${duration}ms`,
  };

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) handleOpenChange(false);
  };

  return (
    <>
      {showBackdrop && open && (
        <div
          className="sliding-menu-backdrop"
          style={{ backgroundColor: backdropColor }}
          onClick={handleBackdropClick}
        />
      )}

      {/* Menu layer that lives UNDER content (lower z-index) */}
      <nav className={menuClass} style={menuStyle} role="navigation">
        <div className="sliding-menu-inner">{children}</div>
      </nav>
    </>
  );
};

/**
 * ContentShifter – shifts your app content to reveal the menu underneath.
 */
const ContentShifter = ({
  children,
  position = 'left',
  isMenuOpen = false,
  menuWidth = '280px',
  menuHeight = 'auto',
  duration = 300,
  className = '',
  style = {},
}) => {
  const isVertical = position === 'left' || position === 'right';
  const isLeft = position === 'left';
  const isTop = position === 'top';

  const transform = isMenuOpen
    ? isVertical
      ? isLeft
        ? `translateX(${menuWidth})`
        : `translateX(-${menuWidth})`
      : isTop
      ? `translateY(${menuHeight})`
      : `translateY(-${menuHeight})`
    : 'translate(0, 0)';

  const contentStyle = {
    ...style,
    transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transform,
  };

  const rootClass = [
    'sliding-menu-content-shifter',
    `sliding-menu-content-shifter--${position}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} style={contentStyle}>
      {children}
    </div>
  );
};

SlidingMenu.ContentShifter = ContentShifter;

export default SlidingMenu;
