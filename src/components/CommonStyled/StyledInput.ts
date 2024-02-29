import styled from 'styled-components';

const StyledInput = styled.input`
  display: block;
  width: 100%;
  border: 1px solid var(--gray-300);
  color: var(--gray-900);

  &::placeholder {
    color: var(--gray-600);
  }

  &:focus {
    border-color: var(--gray-800);
    outline: none;
  }
`;

export default StyledInput;
