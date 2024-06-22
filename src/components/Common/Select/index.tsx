import React from 'react';
import Select, { StylesConfig } from 'react-select';
import { FieldProps } from 'formik'; // Import FieldProps from Formik

const customStylesForSelect: StylesConfig<any, boolean> = {
  control: (baseStyles: any) => ({
    ...baseStyles,
    borderRadius: "12px",
    outline: "none",
    cursor: "pointer",
    boxShadow: "none",
    minHeight: "38px",
    fontSize: "14px",
    height: "100%",
    fontFamily: "rajdhani",
    border: "none",
    ".css-1u9des2-indicatorSeparator": {
      display: "none",
    },
    position: 'relative',
  }),
  option: (base: any, state: { isSelected: any }) => ({
    ...base,
    backgroundColor: state.isSelected ? "#EF6E0B" : "#fff",
    color: state.isSelected ? "#ffffff" : "#71717A",
    borderRadius: "12px",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#EF6E0B",
      color: "#ffffff",
    },
    fontSize: "14px",
    fontFamily: "rajdhani",
    marginBottom: '4px',
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#71717A",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#71717A",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#71717A",
  }),
  menu: (base: any) => ({
    ...base,
    border: "1px solid #EF6E0B",
    borderRadius: "12px",
    position: 'absolute',
    left: 0,
  }),
  menuList: (base: any) => ({
    ...base,
    padding: 0,
  }),
};

interface OptionType {
  value: string;
  label: string;
}

interface ReactSelectProps extends FieldProps {
  options: OptionType[];
  placeholder: string;
  className?: string;
}

const CommonReactSelect: React.FC<ReactSelectProps> = ({
  field,
  form,
  options,
  placeholder,
  className,
}) => {

  const handleChange = (selectedOption: OptionType | null) => {
    form.setFieldValue(field.name, selectedOption ? selectedOption.value : '');
  };

  const selectedValue = options ? options.find(option => option.value === field.value) : null;

  return (
    <div className="App">
      <Select
        value={selectedValue}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        className={className}
        styles={customStylesForSelect}
        onBlur={() => form.setFieldTouched(field.name, true)}
      />
    </div>
  );
};

export default CommonReactSelect;
