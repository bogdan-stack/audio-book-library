"use client"

import Image from 'next/image';
import image from '@/public/images/heraldica.png';
import { useRouter } from 'next/navigation';

interface ListItemProps {
    name: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({
    name,
    href
}) => {
    const router = useRouter();

    const onClick = () => {
      //Add authentification in the future
      router.push(href);
    }

  return (

      <div className="w-full
      mb-4
      flex
      items-center
      justify-center bg-lime-700 rounded-xl shadow-lg space-x-4">
        <div className="
        shrink-0
        mx-2
        ">
        <Image
        className="object-cover"
        width={45}
        height={45}
        src={image}
        alt="Image"
        />
        </div>
        <div>
    <div className="font-medium text-white">Platforma Audiobook FAR</div>
    <p className="text-neutral-300">Ascultă, învață, luptă!</p>
  </div>
</div>
  );
}

export default ListItem;