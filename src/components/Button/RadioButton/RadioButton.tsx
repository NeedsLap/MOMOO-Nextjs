import React from 'react';

import RadioButtonContainer from '@/components/Button/RadioButton/StyledRadioButton';

interface RadioButtonProps {
  label: string;
  groupName: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, groupName }) => {
  return (
    <RadioButtonContainer>
      <input type="radio" id={label} name={groupName} />
      <label htmlFor={label}>{label}</label>
    </RadioButtonContainer>
  );
};

export default RadioButton;
