import { Button } from 'components/ui';
import Decimal from 'decimal.js';
import { collectEventNft, getNFT } from 'lib/web3';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Geocode from 'react-geocode';
import toast from 'react-hot-toast';

export default function eventPage() {
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const tokenId = router.query.tokenId as string;
  const [nft, setNft] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lng: 0, lat: 0 });

  interface Position {
    coords: { latitude: number; longitude: number };
  }

  useEffect(() => {
    getNFT(`${eventId}.${tokenId}`).then((data) => setNft(data));
  }, [tokenId]);

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
    <div className="flex flex-col m-4">
      {!nft && <div className="text-heading-xl">Token unavailable</div>}
      {nft && (
        <Image
          className="bg-primary rounded-2xl bg-cover bg-no-repeat bg-center"
          src={nft.metadata.media}
          alt={event.title}
          width={120}
          height={350}
        />
      )}
      <div>
        <h1>Title: {nft && nft.metadata.title}</h1>
        <h1>Token id: {nft && nft.token_id}</h1>
        <h1>Available: {nft && nft.max_copies - nft.copies_minted}</h1>
        <h1>Minted: {nft && nft.copies_minted}</h1>
      </div>
      {nft && (
        <Button
          isDisabled={nft.copies_minted >= nft.max_copies}
          onClick={async () => {
            getLocation();
            const { metadata } = nft;
            const area = expandAllowedLocation(metadata.lat, metadata.lng);
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
                collectEventNft(tokenId);
                toast.success('You are at the event. Token collected!');
              } else {
                Geocode.fromLatLng(metadata.lat, metadata.lng).then(
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
          {nft && nft.copies_minted >= nft.max_copies ? 'Unavailable' : 'Collect'}
        </Button>
      )}
    </div>
  );
}
