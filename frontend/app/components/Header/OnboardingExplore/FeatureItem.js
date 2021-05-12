import React from 'react';
import { Checkbox, Icon } from 'UI';
import cn from 'classnames';
import stl from './featureItem.css';

const FeatureItem = ({ label, completed = false, subText, onClick }) => {
  return (
    <div
      className={ cn(stl.wrapper, { [stl.activeLink]: onClick, [stl.completed]: !completed }) }
      onClick={onClick && onClick}
    >
      <div className={ cn("h-6 w-6 flex-shrink-0 rounded-full flex items-center justify-center", { 'bg-white' : !completed, 'bg-teal' : completed })}>
        { completed && <Icon name="check" size="16" color="white" /> }
      </div>
      <div className="ml-3">{label}</div>     
    </div>
  );
};

export default FeatureItem;