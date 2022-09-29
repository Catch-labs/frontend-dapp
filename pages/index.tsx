import { RightIcon } from 'components/ui/icons';
import { Contract } from 'near-api-js';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Web3Props extends Contract {
  nft_event_register: (params: any, gas: any, deposit: any) => any;
  nft_token_by_id: (params: any) => any;
  get_event_by_id: (params: any) => any;
}

export default function Overview({ web3 }: { web3: Web3Props }) {
  const [events, setEvents] = useState([]);

  const eventId = '123-nearcon';
  const checkEvent = async () => {
    if (web3) {
      const response = await web3.get_event_by_id({
        event_id: eventId,
      });

      const events = response.event_tokens_metadata.map((event: any) => {
        const ids = event.token_id.split('.');
        return {
          title: event.metadata.title,
          image: event.metadata.media,
          description: event.metadata.description,
          lat: event.metadata.lat,
          lng: event.metadata.lng,
          minted: event.copies_minted,
          total: event.max_copies,
          tokenId: ids[1],
          eventId: ids[0],
        };
      });

      setEvents(events);
    }
  };

  useEffect(() => {
    checkEvent();
  }, [web3]);

  const eventCards = events.map((event, index) => (
    <Link href={`/event/${event.eventId}/${event.tokenId}`} key={index}>
      <div className="border border-lightGrey w-auto h-auto mx-4 rounded-3xl bg-white flex flex-row items-start cursor-pointer relative">
        <span className="m-3">
          <Image
            className="bg-primary rounded-2xl bg-cover bg-no-repeat bg-center"
            src={event.image}
            alt={event.title}
            width={120}
            height={110}
          />
        </span>
        <div className="flex flex-col mt-auto mb-auto">
          <h2 className="text-xl sm:text-xl uppercase font-extrabold text-heading-sm text-gray-900">{event.title}</h2>
          <div className="text-darkGrey mt-1 mb-1">340m away</div>
          <div className="p-2 w-[138px] bg-secondary rounded-3xl">
            <p className="text-body-md font-bold">$3 off NFT voucher</p>
          </div>
          <RightIcon width={20} height={20} className="absolute right-4 bottom-6 transform -translate-y-1/3" />
        </div>
      </div>
    </Link>
  ));

  const exploreCards = events.map((event, index) => (
    <Link href={`/event/${event.eventId}/${event.tokenId}`} key={index}>
      <span className="relative flex-none py-6 px-1 first:pl-4 last:pr-6">
        <div className="absolute z-10 bottom-10 left-2 mt-1 p-1 w-[58px] bg-secondary rounded-3xl">
          <p className="text-body-sm font-bold">voucher</p>
        </div>
        <Image
          className="bg-primary rounded-2xl bg-cover bg-no-repeat bg-center"
          src={event.image}
          alt={event.title}
          width={'120vw'}
          height={'110vh'}
        />
      </span>
    </Link>
  ));

  return (
    <div>
      <h2 className="pl-4 text-xl sm:text-xl uppercase font-extrabold text-heading-xl text-gray-900">EXPLORE</h2>
      <figure className="relative rounded-xl overflow-auto">
        <ul className="overflow-x-auto flex">
          {exploreCards}
          {exploreCards}
          {exploreCards}
          {exploreCards}
          {exploreCards}
          {exploreCards}
          {exploreCards}
        </ul>
      </figure>
      <h2 className="pl-4 text-xl sm:text-xl uppercase font-extrabold text-heading-xl text-gray-900">NEAR ME</h2>
      {eventCards}
    </div>
  );
}
