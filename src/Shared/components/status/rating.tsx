import { FC } from "react";

const RatingComponent: FC<{ rating: number }> = ({ rating }) => {
  if (!rating)
    return (
      <div className=' text-stone-500 bg-zinc-200 px-[9px] py-[5px]  !text-sm inline-flex rounded items-center justify-center'>
        Not Rated
      </div>
    );
  const renderStar = (starNumber: number) => {
    const fullStar = (
      <svg
        width='20'
        height='20'
        viewBox='0 0 25 25'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18.0184 21.951C17.8564 21.9507 17.6969 21.9113 17.5534 21.836L12.4564 19.156L7.35943 21.836C7.19428 21.9228 7.00814 21.9617 6.82204 21.9482C6.63594 21.9348 6.45732 21.8696 6.30636 21.7599C6.1554 21.6503 6.03813 21.5006 5.96781 21.3277C5.89749 21.1549 5.87692 20.9659 5.90843 20.782L6.88143 15.106L2.75843 11.086C2.62502 10.9557 2.53068 10.7907 2.48607 10.6097C2.44146 10.4287 2.44836 10.2388 2.50598 10.0614C2.5636 9.88409 2.66964 9.72641 2.81215 9.60617C2.95465 9.48592 3.12793 9.40792 3.31243 9.38096L9.01143 8.55296L11.5594 3.38896C11.6516 3.23306 11.7828 3.10388 11.9401 3.01414C12.0974 2.92439 12.2753 2.8772 12.4564 2.8772C12.6375 2.8772 12.8155 2.92439 12.9728 3.01414C13.1301 3.10388 13.2613 3.23306 13.3534 3.38896L15.9014 8.55296L21.6004 9.38096C21.7851 9.40778 21.9586 9.48575 22.1013 9.60606C22.244 9.72637 22.3502 9.88421 22.4078 10.0617C22.4655 10.2392 22.4723 10.4293 22.4275 10.6105C22.3827 10.7917 22.2881 10.9567 22.1544 11.087L18.0314 15.106L19.0044 20.782C19.029 20.9255 19.022 21.0727 18.9838 21.2133C18.9456 21.3538 18.8771 21.4844 18.7832 21.5957C18.6893 21.707 18.5722 21.7965 18.4401 21.8579C18.308 21.9192 18.1641 21.951 18.0184 21.951Z'
          fill='#FCD34D'
        />
      </svg>
    );

    const halfStar = (
      <svg
        width='20'
        height='20'
        viewBox='0 0 25 25'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M22.4074 10.061C22.3497 9.88372 22.2435 9.72608 22.1009 9.60592C21.9583 9.48576 21.785 9.40786 21.6004 9.38103L15.9014 8.55303L13.3534 3.38903C13.2666 3.22849 13.1365 3.09545 12.978 3.00497C12.8195 2.91449 12.6388 2.87017 12.4564 2.87703V19.157L17.5534 21.836C17.7186 21.9229 17.9047 21.9618 18.0908 21.9483C18.2769 21.9349 18.4555 21.8696 18.6065 21.76C18.7574 21.6503 18.8747 21.5006 18.945 21.3278C19.0154 21.155 19.0359 20.9659 19.0044 20.782L18.0314 15.106L22.1544 11.086C22.288 10.9558 22.3825 10.7908 22.4272 10.6096C22.4719 10.4285 22.4651 10.2385 22.4074 10.061Z'
          fill='#DDDDDD'
        />
        <path
          d='M11.5595 3.38895L9.01147 8.55295L3.31247 9.38095C3.12777 9.40778 2.95426 9.48575 2.81157 9.60606C2.66889 9.72637 2.56271 9.8842 2.50507 10.0617C2.44742 10.2392 2.44061 10.4293 2.48539 10.6105C2.53017 10.7917 2.62476 10.9567 2.75847 11.087L6.88147 15.106L5.90847 20.782C5.87709 20.9657 5.89771 21.1546 5.96799 21.3273C6.03828 21.4999 6.15543 21.6495 6.30623 21.7591C6.45703 21.8688 6.63546 21.934 6.82139 21.9476C7.00733 21.9612 7.19335 21.9225 7.35847 21.836L12.4565 19.156V2.89395C12.2767 2.89083 12.0993 2.93489 11.9419 3.02175C11.7845 3.10861 11.6526 3.23522 11.5595 3.38895Z'
          fill='#FCD34D'
        />
      </svg>
    );

    const emptyStar = (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M17.562 21.56C17.4 21.5597 17.2404 21.5203 17.097 21.445L12 18.765L6.90301 21.445C6.73786 21.5318 6.55172 21.5707 6.36562 21.5572C6.17952 21.5438 6.0009 21.4786 5.84994 21.3689C5.69898 21.2593 5.58171 21.1096 5.51139 20.9367C5.44107 20.7639 5.4205 20.5749 5.45201 20.391L6.42501 14.715L2.30201 10.695C2.1686 10.5647 2.07426 10.3997 2.02965 10.2187C1.98504 10.0377 1.99194 9.84776 2.04956 9.67043C2.10717 9.4931 2.21322 9.33542 2.35573 9.21517C2.49823 9.09493 2.67151 9.01693 2.85601 8.98997L8.55501 8.16197L11.103 2.99797C11.1952 2.84207 11.3264 2.71288 11.4836 2.62314C11.6409 2.5334 11.8189 2.48621 12 2.48621C12.1811 2.48621 12.3591 2.5334 12.5164 2.62314C12.6737 2.71288 12.8049 2.84207 12.897 2.99797L15.445 8.16197L21.144 8.98997C21.3287 9.01679 21.5022 9.09476 21.6449 9.21507C21.7876 9.33538 21.8938 9.49321 21.9514 9.67073C22.009 9.84824 22.0159 10.0383 21.9711 10.2195C21.9263 10.4007 21.8317 10.5657 21.698 10.696L17.575 14.715L18.548 20.391C18.5726 20.5345 18.5656 20.6817 18.5274 20.8223C18.4892 20.9629 18.4207 21.0934 18.3268 21.2047C18.2329 21.316 18.1158 21.4055 17.9837 21.4669C17.8516 21.5283 17.7077 21.56 17.562 21.56Z'
          fill='#DDDDDD'
        />
      </svg>
    );

    const decimalPart = rating % 1;
    if (starNumber <= Math.floor(rating)) {
      return fullStar;
    } else if (decimalPart >= 0.5 && starNumber === Math.ceil(rating)) {
      return halfStar;
    } else {
      return emptyStar;
    }
  };

  return (
    <div className='flex items-center gap-x-2.5'>
      <div className='px-[7px] py-[5px] bg-amber-300 rounded flex justify-center items-center'>
        <div className="text-center text-white text-sm font-bold  leading-[15px]">
          {rating}
        </div>
      </div>
      <div className='flex w-full'>
        {[1, 2, 3, 4, 5].map((starNumber) => renderStar(starNumber))}
      </div>
    </div>
  );
};

export default RatingComponent;
