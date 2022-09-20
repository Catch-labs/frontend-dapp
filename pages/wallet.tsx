import BN from 'bn.js';
import Decimal from 'decimal.js';
import type { Contract } from 'near-api-js';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Web3Props extends Contract {
  nft_event_register: (params: any, gas: any, deposit: any) => any;
  nft_token_by_id: (params: any) => any;
}

function wallet({ web3, user }: { web3: Web3Props; user: any }) {
  const [currentLocation, setCurrentLocation] = useState({ lng: 0, lat: 0 });
  const tokenId = 'demoneft-nearcon.tokennft';
  const collectEventNft = async () => {
    const result = await web3.nft_event_register(
      {
        token_id: tokenId,
        receiver_id: user.accountId,
      },
      300000000000000, // gas
      new BN('1000000000000000000000000')
    );
    console.log(result);
  };

  const checkNft = async () => {
    const { metadata } = await web3.nft_token_by_id({
      token_id: tokenId,
    });

    console.log(metadata);

    return { lat: metadata.lat, lng: metadata.lng };
  };

  interface Position {
    coords: { latitude: number; longitude: number };
  }

  const getLocation = () => {
    const success = (position: Position) => {
      toast.success(`Fetched the location: lng: ${position.coords.longitude}, lat: ${position.coords.latitude}`);
      setCurrentLocation({ lng: position.coords.longitude, lat: position.coords.latitude });
    };

    const error = (test: any) => {
      console.log('Unable to retrieve your location', test);
      toast.error('Geolocation error!');
    };

    if (!navigator.geolocation) {
      toast.error('Geolocation API not supported by this browser.');
    } else {
      toast.success('Checking location...');
      navigator.geolocation.getCurrentPosition(success, error, {
        maximumAge: 6000,
        timeout: 5000,
        enableHighAccuracy: true,
      });
    }
  };

  const expandAllowedLocation = (lat: string, lng: string) => {
    const latNum = new Decimal(lat);
    const lngNum = new Decimal(lng);
    const offset = new Decimal(0.01);

    const latMin = latNum.minus(offset);
    const latMax = latNum.plus(offset);
    const lngMin = lngNum.minus(offset);
    const lngMax = lngNum.plus(offset);

    return { latMin: latMin, latMax, lngMin, lngMax };
  };

  return (
    <div>
      {/* <Button
        onClick={async () => {
          getLocation();
          const nftLocation = await checkNft();
          const area = expandAllowedLocation(nftLocation.lat, nftLocation.lng);
          if (currentLocation) {
            const { lat, lng } = currentLocation;

            const latNum = new Decimal(lat);
            const lngNum = new Decimal(lng);

            // dirty hack to expand location area
            if (
              latNum.greaterThanOrEqualTo(area.latMin) &&
              latNum.lessThanOrEqualTo(area.latMax) &&
              lngNum.greaterThanOrEqualTo(area.lngMin) &&
              lngNum.lessThanOrEqualTo(area.lngMax)
            ) {
              collectEventNft();
              toast.success('You are at the event. Token collected!');
            } else {
              Geocode.fromLatLng(nftLocation.lat, nftLocation.lng).then(
                (response) => {
                  const address = response.results[0].formatted_address;
                  toast.error(`You are not at the event! Event location: ${address}`);
                },
                (error) => {
                  console.error(error);
                }
              );
            }
          }
        }}
      >
        Collect
      </Button> */}
    </div>
  );
}

export default wallet;
