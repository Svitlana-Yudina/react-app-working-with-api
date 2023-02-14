import React from 'react';
import './Assignment.scss';

export const Assignment: React.FC = () => {
  return (
    <div className="assignment">
      <picture>
        <source srcSet="./images/desktop_XL.png" media="(min-width: 1280px)" />
        <source srcSet="./images/desktop.png" media="(min-width: 1024px)" />
        <img src="./images/mobile.png" alt="MDN" />
      </picture>
    </div>
  );
};
