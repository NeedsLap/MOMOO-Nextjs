import styled from 'styled-components';

const StyledLoadingModal = styled.dialog`
  border: none;
  padding: 14px;
  display: flex;
  align-items: center;
  font-size: var(--text-m);
  color: var(--gray-900);
  background: var(--background-color);
  border-radius: 8px;

  &:focus {
    outline: none;
  }

  img {
    width: 14px;
    height: auto;
    margin-left: 6px;
    aspect-ratio: 1/1;
  }
`;

export default StyledLoadingModal;
