import React from 'react'

type Props = {
    tag: string
    img:any
    date:any
    title: string
    description: string
}


const ArticleCard = (props: Props) => {
  return (
    <div className=' bg-white mb-[35px] rounded shadow flex items-center'>
    <div className='relative'>
      <div className=' relative bg-white/opacity-0 shadow' />
      <img
        className='w-[260px] h-[270px] object-cover relative rounded-l'
        src={props.img}
      />
      <div className='h-[30px] absolute px-3 py-[5px] bottom-5 left-5 bg-white rounded  flex items-center justify-center'>
        <div className='text-zinc-800 text-sm font-normal  leading-tight'>
          {props.tag}
        </div>
      </div>
    </div>
    <div className='grow shrink basis-0 self-stretch p-[35px] flex-col justify-start items-start gap-2.5 inline-flex'>
      <div className='px-2.5 py-1 bg-zinc-100 rounded flex items-center justify-center'>
        <div className='text-zinc-500 text-sm font-normal  leading-tight'>
         {props.date}
        </div>
      </div>
      <h6 className=' text-zinc-800 text-[22px] font-medium  leading-[33px]'>
        {props.title}
      </h6>
      <div className='pt-[5px]'>
        <p className=' text-zinc-500 text-base font-normal  leading-[27px]'>
         {props.description}
        </p>
      </div>
    </div>
  </div>
  )
}

export default ArticleCard