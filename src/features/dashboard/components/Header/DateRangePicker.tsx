import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import svgPaths from '../../../../shared/utils/svg-5fq1vtsmqv';
import 'react-datepicker/dist/react-datepicker.css';

// 한국어 로케일 등록
registerLocale('ko', ko);

interface DateRangePickerProps {
  tempStartDate: string;
  tempEndDate: string;
  onTempStartDateChange: (date: string) => void;
  onTempEndDateChange: (date: string) => void;
  onSearch: () => void;
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <BackgroundImage>
      <path d="M5.33333 1.33333V4" id="Vector" stroke="var(--stroke-0, #00A3E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M10.6667 1.33333V4" id="Vector_2" stroke="var(--stroke-0, #00A3E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p3ee34580} id="Vector_3" stroke="var(--stroke-0, #00A3E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2 6.66667H14" id="Vector_4" stroke="var(--stroke-0, #00A3E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#9ca3af] text-[24px] text-nowrap top-[-0.5px] tracking-[-0.3125px]">~</p>
      </div>
    </div>
  );
}

function Button({ onSearch }: { onSearch: () => void }) {
  return (
    <div 
      className="h-[50px] relative rounded-[20px] shadow-[0px_4px_12px_0px_rgba(0,163,224,0.25)] shrink-0 w-[60px] cursor-pointer hover:opacity-90 transition-opacity" 
      data-name="Button" 
      style={{ backgroundImage: "linear-gradient(140.194deg, rgba(0, 163, 224, 0.9) 0%, rgba(77, 208, 225, 0.9) 100%)" }}
      onClick={onSearch}
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[19.5px] left-[30px] not-italic text-[#4b4b4b] text-[16px] text-center text-nowrap top-[15.5px] tracking-[-0.0762px] translate-x-[-50%]">조회</p>
      </div>
    </div>
  );
}

export default function DateRangePicker({
  tempStartDate,
  tempEndDate,
  onTempStartDateChange,
  onTempEndDateChange,
  onSearch,
}: DateRangePickerProps) {
  // 문자열 날짜를 Date 객체로 변환하는 헬퍼 함수
  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const [startDateState, setStartDateState] = useState<Date | null>(parseDate(tempStartDate));
  const [endDateState, setEndDateState] = useState<Date | null>(parseDate(tempEndDate));
  const [isOpen, setIsOpen] = useState(false);

  // props 변경 시 상태 동기화
  useEffect(() => {
    setStartDateState(parseDate(tempStartDate));
  }, [tempStartDate]);

  useEffect(() => {
    setEndDateState(parseDate(tempEndDate));
  }, [tempEndDate]);

  // datepicker가 열릴 때 Frame div의 pointer-events 조정
  useEffect(() => {
    const findFrameElement = (): HTMLElement | null => {
      // data-cursor-element-id로 찾기
      let element = document.querySelector('[data-cursor-element-id="cursor-el-1"]') as HTMLElement;
      if (element) return element;
      
      // 클래스명으로 찾기 (absolute h-[688.333px] left-[73px] top-[303px] w-[1077.392px])
      const allAbsolute = document.querySelectorAll('.absolute');
      for (let i = 0; i < allAbsolute.length; i++) {
        const el = allAbsolute[i] as HTMLElement;
        const classes = el.className;
        if (classes.includes('h-[688.333px]') || classes.includes('left-[73px]')) {
          return el;
        }
      }
      return null;
    };

    if (isOpen) {
      // datepicker가 열릴 때 Frame div 찾아서 pointer-events: none 적용
      const frameElement = findFrameElement();
      if (frameElement) {
        // 원래 pointer-events 값을 저장
        if (!(frameElement as any).__originalPointerEvents) {
          (frameElement as any).__originalPointerEvents = frameElement.style.pointerEvents || '';
        }
        frameElement.style.pointerEvents = 'none';
      }
    } else {
      // datepicker가 닫힐 때 원래대로 복원
      const frameElement = findFrameElement();
      if (frameElement) {
        const originalValue = (frameElement as any).__originalPointerEvents;
        if (originalValue !== undefined) {
          frameElement.style.pointerEvents = originalValue;
        } else {
          frameElement.style.pointerEvents = '';
        }
      }
    }
  }, [isOpen]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDateState(date);
    if (date) {
      const dateString = date.toISOString().split('T')[0];
      onTempStartDateChange(dateString);
    } else {
      onTempStartDateChange('');
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDateState(date);
    if (date) {
      const dateString = date.toISOString().split('T')[0];
      onTempEndDateChange(dateString);
    } else {
      onTempEndDateChange('');
    }
  };

  // 커스텀 입력 컴포넌트
  const CustomInput = React.forwardRef<HTMLDivElement, { value?: string; onClick?: () => void }>(
    ({ value, onClick }, ref) => (
      <div 
        ref={ref}
        onClick={onClick}
        className="h-[24px] bg-transparent border-none outline-none font-['Inter:Regular',sans-serif] text-[14px] text-[#2c3e50] cursor-pointer flex items-center"
      >
        {value || ''}
      </div>
    )
  );
  CustomInput.displayName = 'CustomInput';

  return (
    <div className="absolute content-stretch flex gap-[8px] h-[65px] items-center left-[calc(50%-631px)] top-[142px] translate-x-[-50%] w-[364px] z-[9997]" data-name="Container" style={{ zIndex: isOpen ? 9999 : 9997 }}>
      <div className="bg-[rgba(255,255,255,0.9)] h-[50px] relative rounded-[20px] shrink-0 w-[400px]" data-name="Container">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[20px] pr-0 py-0 relative size-full">
          <Icon />
          <DatePicker
            selected={startDateState}
            onChange={handleStartDateChange}
            onCalendarOpen={() => setIsOpen(true)}
            onCalendarClose={() => setIsOpen(false)}
            selectsStart
            startDate={startDateState}
            endDate={endDateState}
            locale="ko"
            dateFormat="yyyy-MM-dd"
            customInput={<CustomInput />}
            className="h-[24px] w-[154px] bg-transparent border-none outline-none font-['Inter:Regular',sans-serif] text-[14px] text-[#2c3e50] cursor-pointer"
            wrapperClassName="w-[154px]"
            popperClassName="datepicker-popper"
          />
          <Text />
          <DatePicker
            selected={endDateState}
            onChange={handleEndDateChange}
            onCalendarOpen={() => setIsOpen(true)}
            onCalendarClose={() => setIsOpen(false)}
            selectsEnd
            startDate={startDateState}
            endDate={endDateState}
            minDate={startDateState}
            locale="ko"
            dateFormat="yyyy-MM-dd"
            customInput={<CustomInput />}
            className="h-[24px] w-[148px] bg-transparent border-none outline-none font-['Inter:Regular',sans-serif] text-[14px] text-[#2c3e50] cursor-pointer"
            wrapperClassName="w-[148px]"
            popperClassName="datepicker-popper"
          />
        </div>
      </div>
      <Button onSearch={onSearch} />
      <style>{`
        .react-datepicker-popper,
        .datepicker-popper {
          z-index: 10000 !important;
        }
        .react-datepicker__portal {
          z-index: 10000 !important;
        }
        .react-datepicker {
          z-index: 10000 !important;
        }
      `}</style>
    </div>
  );
}
