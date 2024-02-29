import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  font-size: var(--text-m);
  color: var(--gray-700);

  input {
    width: 100%;
    outline: none;
    background-color: var(--background-color);
  }

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

  .saveBtn:hover img {
    background-color: var(--point-color);
    border-radius: 50%;
  }
`;

export { MapContainer, SearchHead };
