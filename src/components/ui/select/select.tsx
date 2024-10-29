import React from 'react';
import Select, { Props } from 'react-select';
import { selectStyles } from './select.style';

// Define the type for the ref
export type Ref = any;

// Define additional props for dynamic control
interface SelectRProps extends Props {
  hideDropdownIndicator: boolean; // Option to hide the dropdown indicator
  border: boolean
}

export const SelectR = React.forwardRef<Ref, SelectRProps>(
  ({ hideDropdownIndicator,border, ...props }, ref) => {
    return (
      <Select
        ref={ref}
        styles={selectStyles({hideDropdownIndicator,border})} // Pass the dynamic value
        {...props} // Spread the remaining props
      />
    );
  }
);

SelectR.displayName = 'SelectR';

export default SelectR;
