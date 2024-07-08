

import React from 'react';
import  { StylesConfig } from 'react-select'; // Import StylesConfig from react-select
import CreatableSelect, { StylesConfig, ActionMeta, OnChangeValue } from 'react-select/creatable';
import Select from 'react-select'
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
      border:"none",
      ".css-1u9des2-indicatorSeparator": {
        display: "none",
      },
      position:'relative',
      backgroundColor:'transparent',
      width:"100%",

    }),
    option: (base: any, state: { isSelected: any }) => ({
      ...base,
      backgroundColor: state.isSelected ? "#EF6E0B" : "#fff", // Selected option background color
      color: state.isSelected ? "#ffffff" : "#71717A", // Selected option text color
      borderRadius: "12px",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#EF6E0B", // Hovered option background color
        color: "#ffffff", // Hovered option text color
      },
      fontSize: "14px",
      fontFamily: "rajdhani",
      marginBottom:'4px',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#000000",
      fontSize:'16px',
      fontWeight:'600',
      fontFamily: "rajdhani",
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
      border: "1px solid #EF6E0B", // Border for the options wrapper
      borderRadius: "12px", // Border radius for the options wrapper
      position:'absolute',
      left:0

    }),
    menuList: (base: any) => ({
      ...base,
      padding: 0, // Remove default padding from the menu list
    }),
  };
  
  
// Define types for options and props
interface OptionType {
  value: string;
  label: string;
}

interface ReactSelectProps {
  selectedOption: OptionType | null;
  setSelectedOption: (option: OptionType | null) => void;
  options: OptionType[];
  placeholder: string;
  className?: string;
  isCreatable?: boolean;
  defaultValue?: any;
}

const CommonReactSelect: React.FC<ReactSelectProps> = ({
  selectedOption,
  setSelectedOption,
  options,
  placeholder,
  defaultValue,
  className,
  isCreatable = false,
}) => {

  // Handle change when an option is selected or typed
  const handleChange = (
    newValue: OnChangeValue<OptionType, false>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setSelectedOption(newValue);
  };

  // Convert user input into an OptionType object
  const createOption = (inputValue: string): OptionType => ({
    value: inputValue,
    label: inputValue,
  });

  return (
    <div>
      {isCreatable ? (
        <CreatableSelect
          value={selectedOption}
          defaultValue={defaultValue}
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          className={className}
          styles={customStylesForSelect}
          onCreateOption={(inputValue) => {
            const newOption = createOption(inputValue);
            setSelectedOption(newOption);
          }}
        />
      ) : (
        <Select
          value={selectedOption}
          defaultValue={defaultValue}
          onChange={handleChange}
          options={options}
          placeholder={placeholder}
          className={className}
          styles={customStylesForSelect}
        />
      )}
    </div>
  );
};

export default CommonReactSelect;