import React from 'react';

export interface HoverBoxProps {
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const UdoHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_우도면" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_우도면" />
  </div>
);

export const ChujaHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_추자면" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_추자면" />
  </div>
);

export const SeongsanHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_성산읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute flex inset-0 items-center justify-center">
      <div className="flex-none h-[141.246px] rotate-[25.665deg] w-[89px]">
        <div className="relative size-full" data-name="박스_성산읍">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 142">
            <path d="M0 0H89V141.246H0V0Z" fill="var(--fill-0, #D9D9D9)" fillOpacity="0" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export const PyoseonHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_표선면" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute flex inset-0 items-center justify-center">
      <div className="flex-none h-[125px] rotate-[332.567deg] w-[89px]">
        <div className="relative size-full" data-name="박스_표선면">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 125">
            <path d="M0 0H89V125H0V0Z" fill="var(--fill-0, #D9D9D9)" fillOpacity="0" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export const NamwonHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_남원읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 147 125">
      <path d="M0 0H147V125H0V0Z" fill="var(--fill-0, #D9D9D9)" fillOpacity="0" />
    </svg>
  </div>
);

export const SeogwipoHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_서귀포시" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_서귀포시" />
  </div>
);

export const JungmunHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_중문" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_중문" />
  </div>
);

export const AndeokHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_안덕면" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_안덕면" />
  </div>
);

export const DaejeongHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_대정읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_대정읍" />
  </div>
);

export const HangyeongHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_한경면" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_한경면" />
  </div>
);

export const HallimHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_한림읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_한림읍" />
  </div>
);

export const AewolHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_애월읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_애월읍" />
  </div>
);

export const JejuCityHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_제주시" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_제주시" />
  </div>
);

export const JocheonHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_조천읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_조천읍" />
  </div>
);

export const GujwaHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (
  <div className={className} data-name="박스_구좌읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_구좌읍" />
  </div>
);
