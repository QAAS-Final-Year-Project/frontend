import { Nationalities } from "data";
import React from "react";

function OwnerCountry({
  country,
  showText = false,
}: {
  country: string;
  showText?: boolean;
}) {
  return (
    <div className='flex items-center justify-center text-base gap-x-[5px]'>
      <span>
        {Nationalities.find((nat) => nat.en_short_name === country)?.emoji}
      </span>
      <span>
        {showText && (
          <div className='text-stone-500 text-base font-normal leading-normal'>
            {" "}
            {
              Nationalities.find((nat) => nat.en_short_name === country)
                ?.en_short_name
            }
          </div>
        )}
      </span>
    </div>
  );
}

export default OwnerCountry;
