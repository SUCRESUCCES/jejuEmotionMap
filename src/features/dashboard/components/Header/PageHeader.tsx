import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[calc(50%-810px)] not-italic text-[#9ca3af] text-[24px] text-nowrap top-[99px] tracking-[-0.1504px]">
        {subtitle}
      </p>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] left-[calc(50%-810px)] not-italic text-[32px] text-black text-nowrap top-[48px]">
        {title}
      </p>
    </>
  );
}


