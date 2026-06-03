import React from 'react';
import './SlidingMenuItemGroup.scss';

const SlidingMenuItemGroup = ({
  children,
  label,
  className = '',
  style = {},
  divider = false,
}) => {
  return (
    <div
      className={`sliding-menu-item-group ${divider ? 'sliding-menu-item-group--divider' : ''} ${className}`}
      style={style}
      data-testid="sliding-menu-item-group"
    >
      {label && (
        <div className="sliding-menu-item-group-label">
          {label}
        </div>
      )}
      <div className="sliding-menu-item-group-items">
        {children}
      </div>
    </div>
  );
};

export default SlidingMenuItemGroup;
