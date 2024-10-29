export const selectStyles = ({hideDropdownIndicator,border} : {hideDropdownIndicator : boolean; border: boolean}) => ({
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: '0.875rem',
    color: state.isSelected ? '#FFFFFF' : '#6B7280',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    cursor: 'pointer',
    borderBottom: '1px solid #E5E7EB',
    backgroundColor: state.isSelected
      ? 'rgb(var(--color-accent))'
      : state.isFocused
      ? '#F9FAFB'
      : '#ffffff',
  }),
  control: (_: any, state: any) => ({
    display: 'flex',
    alignItems: 'center',
    height: 56,
    minHeight: 50,
    backgroundColor: state?.isDisabled ? '#EEF1F4' : '#ffffff',
    borderRadius: 5,
    border: border ? '1px solid #D1D5DB' : '',
    borderColor: state?.isDisabled ? '#D4D8DD' : state.isFocused ? 'rgb(var(--color-accent-500))' : '#D1D5DB',
    // boxShadow:
    //   state.menuIsOpen &&
    //   '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    boxShadow: 'none', // This mimics the focus:ring-0 from Tailwind CSS
    border: 'none', // Remove input border
    '&:focus': {
      outline: 'none', // Ensure no default browser outline
      boxShadow: 'none', // This mimics the focus:ring-0 from Tailwind CSS
      border: 'none', // Remove input border
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    display: hideDropdownIndicator ? 'none' : 'block', // Conditionally hide or show dropdown icon
    color: state.isFocused ? '#9CA3AF' : '#cccccc',
    '&:hover': {
      color: '#9CA3AF',
    },
  }),
  clearIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? '#9CA3AF' : '#cccccc',
    padding: 0,
    cursor: 'pointer',
    '&:hover': {
      color: '#9CA3AF',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: 5,
    border: '1px solid #E5E7EB',
    boxShadow:
      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    zIndex: 50,
  }),
  valueContainer: (provided: any, _: any) => ({
    ...provided,
    paddingLeft: 16,
  }),
  singleValue: (provided: any, _: any) => ({
    ...provided,
    fontSize: '0.875rem',
    color: '#4B5563',
  }),
  multiValue: (provided: any, _: any) => ({
    ...provided,
    backgroundColor: 'rgb(var(--color-accent-400))',
    borderRadius: 9999,
    overflow: 'hidden',
    boxShadow:
      '0 0px 3px 0 rgba(0, 0, 0, 0.1), 0 0px 2px 0 rgba(0, 0, 0, 0.06)',
  }),
  multiValueLabel: (provided: any, state: any) => ({
    ...provided,
    paddingLeft: state.isRtl ? 0 : 12,
    paddingRight: state.isRtl ? 12 : 0,
    fontSize: '0.875rem',
    color: '#ffffff',
  }),
  multiValueRemove: (provided: any, _: any) => ({
    ...provided,
    paddingLeft: 6,
    paddingRight: 6,
    color: '#ffffff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgb(var(--color-accent-300))',
      color: '#F3F4F6',
    },
  }),
  placeholder: (provided: any, _: any) => ({
    ...provided,
    fontSize: '0.875rem',
    color: 'rgba(107, 114, 128, 0.7)',
  }),
  noOptionsMessage: (provided: any, _: any) => ({
    ...provided,
    fontSize: '0.875rem',
    color: 'rgba(107, 114, 128, 0.7)',
  }),
});
  
export const selectStylesModern = {
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: '0.875rem',
    color: '#6B7280',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 12,
    marginBottom: 12,
    cursor: 'pointer',
    border: '1px solid #E5E5E5',
    borderRadius: 6,
    position: 'relative',
    backgroundColor: state.isSelected
      ? '#EEF1F4'
      : state.isFocused
      ? '#EEF1F4'
      : '#ffffff',
  }),
  control: (_: any, state: any) => ({
    display: 'flex',
    alignItems: 'center',
    minHeight: 50,
    backgroundColor: state?.isDisabled ? '#EEF1F4' : '#ffffff',
    borderRadius: 5,
    border: '1px solid #D1D5DB',
    borderColor: state?.isDisabled
      ? '#D4D8DD'
      : state.isFocused
      ? 'rgb(var(--color-accent-500))'
      : '#D1D5DB',
    boxShadow: state.menuIsOpen && '0px 2px 6px rgba(59, 74, 92, 0.1)',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? '#9CA3AF' : '#cccccc',
    '&:hover': {
      color: '#9CA3AF',
    },
  }),
  clearIndicator: (provided: any, state: any) => ({
    ...provided,
    color: state.isFocused ? '#9CA3AF' : '#cccccc',
    padding: 0,
    cursor: 'pointer',

    '&:hover': {
      color: '#9CA3AF',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: 5,
    border: '1px solid #D1D5DB',
    paddingLeft: 16,
    paddingRight: 16,
    boxShadow: '0px 2px 6px rgba(59, 74, 92, 0.1)',
  }),
  valueContainer: (provided: any, _: any) => ({
    ...provided,
    paddingLeft: 16,
  }),
  singleValue: (provided: any, _: any) => ({
    ...provided,
    fontSize: '0.875rem',
    color: '#4B5563',
  }),
  multiValue: (provided: any, _: any) => ({
    ...provided,
    backgroundColor: 'rgb(var(--color-accent-400))',
    borderRadius: 9999,
    overflow: 'hidden',
    boxShadow:
      '0 0px 3px 0 rgba(0, 0, 0, 0.1), 0 0px 2px 0 rgba(0, 0, 0, 0.06)',
  }),
  multiValueLabel: (provided: any, state: any) => ({
    ...provided,
    paddingLeft: state.isRtl ? 0 : 12,
    paddingRight: state.isRtl ? 12 : 0,
    fontSize: '0.875rem',
    color: '#ffffff',
  }),
  multiValueRemove: (provided: any, _: any) => ({
    ...provided,
    paddingLeft: 6,
    paddingRight: 6,
    color: '#ffffff',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgb(var(--color-accent-300))',
      color: '#F3F4F6',
    },
  }),
  placeholder: (provided: any, _: any) => ({
    ...provided,
    fontSize: '0.875rem',
    color: 'rgba(107, 114, 128, 0.7)',
  }),
  noOptionsMessage: (provided: any, _: any) => ({
    ...provided,
    fontSize: '0.875rem',
    color: 'rgba(107, 114, 128, 0.7)',
  }),
};
  