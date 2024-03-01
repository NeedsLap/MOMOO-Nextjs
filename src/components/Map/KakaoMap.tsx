import Image from 'next/image';
import React, { useState } from 'react';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { MapContainer, SearchHead } from '@/components/Map/StyledKakaoMap';

function KakaoMap({
  onAddressSelect,
}: {
  onAddressSelect: (address: string) => void;
}) {
  const [state, setState] = useState({
    center: { lat: 37.49676871972202, lng: 127.02474726969814 },
    isPanto: true,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchedLocation, setSearchedLocation] = useState<{
    place_name: string | null;
  } | null>(null);

  async function handleSearch() {
    if (searchQuery) {
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(searchQuery, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          handlePlacesSearch(data);
        }
      });
    }
  }

  const handlePlacesSearch = (data: any[]) => {
    if (data && data.length > 0) {
      const newSearch = data[0];
      const newPosition = { lat: newSearch.y, lng: newSearch.x };
      setState((prevState) => ({
        ...prevState,
        center: newPosition,
      }));
      setSearchedLocation(newSearch);
      console.log('검색된 위치 정보:', newPosition);
    }
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <MapContainer>
      <SearchHead>
        <input
          onChange={handleSearchQueryChange}
          onKeyDown={handleKeyDown}
          value={searchQuery}
          placeholder="주소 또는 키워드 입력해 주세요"
        />
        {searchedLocation && <div></div>}
        <button
          type="button"
          className="saveBtn"
          aria-label="Select address"
          onClick={() =>
            onAddressSelect(
              searchedLocation?.place_name ? searchedLocation.place_name : '',
            )
          }
        >
          <Image
            src="/icons/select.svg"
            alt="선택 버튼"
            className="btnUpload"
            width={24}
            height={24}
          />
        </button>
      </SearchHead>
      <div className="mapBoxWrapper">
        <Map
          center={state.center}
          isPanto={state.isPanto}
          style={{
            width: '100%',
            height: '100%',
          }}
          level={3}
        >
          <MapMarker position={state.center}></MapMarker>
        </Map>
      </div>
    </MapContainer>
  );
}

export default KakaoMap;
