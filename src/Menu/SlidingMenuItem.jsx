import React, { useCallback } from 'react';
import './SlidingMenuItem.scss';

const SlidingMenuItem = ({
  children,
  icon,
  onClick,
  href,
  isActive = false,
  badge,
  className = '',
  style = {},
  disabled = false,
  variant = 'default',
}) => {
  const handleClick = useCallback(
    (e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) {
        onClick(e);
      }
    },
    [onClick, disabled]
  );

  const itemClass = `sliding-menu-item sliding-menu-item--${variant} ${
    isActive ? 'sliding-menu-item--active' : ''
  } ${disabled ? 'sliding-menu-item--disabled' : ''} ${className}`;

  const content = (
    <>
      {icon && <span className="sliding-menu-item-icon">{icon}</span>}
      <span className="sliding-menu-item-label">{children}</span>
      {badge && <span className="sliding-menu-item-badge">{badge}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={itemClass}
        style={style}
        onClick={handleClick}
        data-testid="sliding-menu-item"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={itemClass}
      style={style}
      onClick={handleClick}
      disabled={disabled}
      type="button"
      data-testid="sliding-menu-item"
    >
      {content}
    </button>
  );
};

export default SlidingMenuItem;
