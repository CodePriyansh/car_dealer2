

import React from 'react';
import Select, { StylesConfig } from 'react-select'; // Import StylesConfig from react-select

const customStylesForSelect: StylesConfig<any, boolean> = {
    control: (baseStyles: any) => ({
      ...baseStyles,
      borderRadius: "12px",
      outline: "none",
      cursor: "pointer",
      boxShadow: "none", // Remove box shadow for the main select control
      minHeight: "38px",
      fontSize: "14px",
      height: "100%",
      fontFamily: "rajdhani",
      border:"none",
      ".css-1u9des2-indicatorSeparator": {
        display: "none",
      },
      position:'relative'
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
  
  

interface OptionType {
  value: string;
  label: string;
}

interface ReactSelectProps {
  selectedOption: OptionType | null;
  setSelectedOption: (option: OptionType | null) => void;
  options: OptionType[]|[];
  placeholder: string;
  className?: string;
}

const CommonReactSelect: React.FC<ReactSelectProps> = ({
  selectedOption,
  setSelectedOption,
  options,
  placeholder,
  className,
}) => {

  const handleChange = (selectedOption: OptionType | null) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div className="App">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        className={className}
        styles={customStylesForSelect}
      />
    </div>
  );
};

export default CommonReactSelect;
