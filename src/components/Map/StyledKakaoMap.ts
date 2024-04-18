import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  font-size: var(--text-m);
  color: var(--gray-700);

  .mapBoxWrapper {
    width: 100%;
    height: 200px;
  }
`;

const SearchHead = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--background-color);
  padding: 1.3rem 1.6rem;

  input {
    width: 100%;
    outline: none;
    background-color: var(--background-color);
  }

  .saveBtn {
    width: 5rem;
    color: var(--point-dark-400);
    text-align: right;
  }

  .saveBtn:hover {
    color: var(--point-dark-600);
  }
`;

export { MapContainer, SearchHead };
