// 플랫폼 목록 및 색상 정의
export interface PlatformInfo {
  platform: string;
  color: string;
}

export const PLATFORMS: PlatformInfo[] = [
  { platform: '당근마켓', color: '#FF6B35' },
  { platform: '네이버 제주맘카페', color: '#03C75A' },
  { platform: '디시인사이드', color: '#4A90E2' },
  { platform: '제주도청 건의', color: '#00BFA5' },
  { platform: '네이버 뉴스', color: '#1EC800' },
  { platform: 'X', color: '#000000' },
  { platform: '픽제주', color: '#FF9500' },
  { platform: '그 외', color: '#90A4AE' }
];

// 플랫폼별 기본 색상 맵
export const PLATFORM_COLORS: Record<string, string> = PLATFORMS.reduce((acc, p) => {
  acc[p.platform] = p.color;
  return acc;
}, {} as Record<string, string>);








