interface RegionInfoProps {
  name: string;
  ssi: string;
  riskLevel: string;
  riskColor: string;
  namePosition: string;  // inset CSS string
  ssiPosition: string;
  badgePosition: string;
}

export default function RegionInfo({
  name,
  ssi,
  riskLevel,
  riskColor,
  namePosition,
  ssiPosition,
  badgePosition
}: RegionInfoProps) {
  return (
    <>
      {/* 지역명 */}
      <p 
        className={`absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] not-italic text-[21.992px] text-black text-center`}
        style={{ inset: namePosition }}
      >
        {name}
      </p>
      
      {/* SSI 수치 */}
      <p 
        className={`absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic text-[21.992px] text-center`}
        style={{ inset: ssiPosition, color: riskColor }}
      >
        {ssi}
      </p>
      
      {/* 위험도 배지 */}
      <div 
        className="absolute rounded-[10px]"
        style={{ inset: badgePosition, backgroundColor: riskColor }}
      />
      <p 
        className={`absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic text-[14px] text-center text-white`}
        style={{ inset: badgePosition }}
      >
        {riskLevel}
      </p>
    </>
  );
}


