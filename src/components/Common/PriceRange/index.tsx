"use client"
import React, { useEffect, useState } from 'react';
import { Slider, Typography } from '@mui/material';
import styles from './styles.module.css'; 

const PriceRangeSlider = () => {
  const [value, setValue] = useState<number[]>([]);
  useEffect(()=>{
    setValue([100000, 2500000])
  },[])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div className={styles.priceRangeContainer}>
      <Typography className={styles.sliderLabel} id="range-slider" gutterBottom>
        Price Range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        min={100000}
        max={2500000}
        step={10000}
        valueLabelFormat={(x) => `₹${x.toLocaleString()}`}
        sx={{
          color: 'rgba(0, 0, 0, 0.2)',
 // Customize the slider color
          '& .MuiSlider-thumb': {
            backgroundColor: '#ff6600', // Thumb color
            '&::before': {
              content: '"n"',
              display: 'block',
              width: '13px',
              height: '13px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF', // Inner circle color
            },
          },
          '& .MuiSlider-track': {
            backgroundColor: '#ff6600', // Track color
            
          },
          '& .MuiSlider-valueLabel': {
            backgroundColor: '#ff6600', // Value label background color
            color: '#ffffff', // Value label text color
            borderRadius: "6px",
            padding: "3px 6px",
            fontSize: "14px",
            fontFamily: "rajdhani",
            '&::before': {
                content: 'none', // Remove the triangle shape
              },
          },
        }}
      />
    </div>
  );
};

export default PriceRangeSlider;
