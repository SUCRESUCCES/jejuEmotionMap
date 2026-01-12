import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  MessageCircle,
  X,
  Send,
  TrendingUp,
  Bus,
  Heart,
  Home,
  Users,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import bgImage from "figma:asset/67b386e7091d031fec91768ef7e33daf4069cbb2.png";
import {
  getSSIDataByDateRange,
  getTrendData,
  getRiskLevelFromSSI,
} from "../dashboard/constants/ssiMockData";
// JSON 리포트 데이터 로더
import { getRegionReport, type RegionReport } from "../../mocks/reportLoader";
// 새 컴포넌트
import IssueAnalysis from "../../components/depth2/IssueAnalysis";
import InsightSectionNew from "../../components/depth2/InsightSection";

// --- Types ---

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface RegionAnalysisData {
  region_name: string;
  ssi_score: number;
  risk_level: string;
  total_posts: number;
  platform_distribution?: Array<{
    platform: string;
    count: number;
    color: string;
  }>;
  positive_issues: Array<{
    keyword: string;
    voices: string[];
    context?: string;
    related_issues?: string;
  }>;
  negative_issues: Array<{
    keyword: string;
    severity?: string;
    voices: string[];
    context?: string;
    related_issues?: string;
  }>;
  neutral_issues?: Array<{
    keyword: string;
    voices: string[];
    context?: string;
    related_issues?: string;
  }>;
  trend_data: number[];
  insights?: Array<{
    title: string;
    description: string;
    details?: string[];
  }>;
}

interface Depth2ReportProps {
  startDate: string;
  endDate: string;
  tempStartDate: string;
  tempEndDate: string;
  onTempStartDateChange: (date: string) => void;
  onTempEndDateChange: (date: string) => void;
  onSearch: () => void;
  reportData: RegionAnalysisData | null;
  selectedRegion: string;
}

// --- Constants & Helpers ---

const RISK_INFO_MAP = {
  high: { color: "#FF5252", text: "위험" },
  warning: { color: "#FFB74D", text: "경고" },
  caution: { color: "#FDD835", text: "주의" },
  good: { color: "#66BB6A", text: "양호" },
  stable: { color: "#42A5F5", text: "안정" },
};

const getRiskInfo = (level: string) => {
  const lower = level.toLowerCase();
  if (
    lower.includes("위험") ||
    lower.includes("danger") ||
    lower.includes("high")
  )
    return RISK_INFO_MAP.high;
  if (lower.includes("경고") || lower.includes("warning"))
    return RISK_INFO_MAP.warning;
  if (lower.includes("주의") || lower.includes("caution"))
    return RISK_INFO_MAP.caution;
  if (lower.includes("양호") || lower.includes("good"))
    return RISK_INFO_MAP.good;
  return RISK_INFO_MAP.stable;
};

// --- Chatbot Components ---

function ChatbotModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "안녕하세요! 제주도 사회적 스트레스 모니터링 시스템 리포트에 대해 무엇이든 물어보세요. WeKnora RAG 기술을 활용하여 정확한 답변을 제공해드립니다.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("구좌읍") || lowerMessage.includes("구좌")) {
      return '구좌읍의 현재 SSI 지수는 0.68로 "주의" 단계입니다. 주요 이슈는 교통 불편(12건), 사회적 고립감(8건), 의료 접근성(6건) 순으로 나타났습니다. 특히 버스 배차 간격에 대한 불편이 가장 많이 언급되었습니다.';
    } else if (lowerMessage.includes("ssi") || lowerMessage.includes("지수")) {
      return "SSI(Social Stress Indicator)는 0.0-1.0 범위로 측정되며, 5단계로 구분됩니다:\n• 0.0-0.3: 안정 (파란색)\n• 0.3-0.5: 양호 (초록색)\n• 0.5-0.7: 주의 (노란색)\n• 0.7-0.85: 경고 (주황색)\n• 0.85-1.0: 위험 (빨간색)";
    } else if (lowerMessage.includes("교통") || lowerMessage.includes("버스")) {
      return "구좌읍에서 교통 관련 의견이 12건으로 가장 많았습니다. 주민들은 하루 3~5회 운행되는 버스 배차 간격으로 인해 병원, 마트 이용에 어려움을 겪고 있다고 언급했습니다. 택시 비용 부담도 주요 이슈로 나타났습니다.";
    } else if (lowerMessage.includes("고립") || lowerMessage.includes("외로")) {
      return '사회적 고립감 관련 게시글이 8건 확인되었습니다. 특히 최근 이주민들이 사회적 연결망 형성에 어려움을 겪고 있으며, "이사 온 지 3개월인데 친구가 없다", "젊은 사람이 별로 없어 외롭다"는 의견이 있었습니다.';
    } else if (
      lowerMessage.includes("병원") ||
      lowerMessage.includes("의료") ||
      lowerMessage.includes("소아과")
    ) {
      return '의료 접근성 관련 의견이 6건 발견되었습니다. 구좌읍 내 소아과가 없어 제주시까지 40분 이동해야 하는 불편이 주요 이슈입니다. "애가 열나면 응급 상황이 무섭다"는 육아 가구의 우려가 표현되었습니다.';
    } else if (
      lowerMessage.includes("데이터") ||
      lowerMessage.includes("분석")
    ) {
      return "현재 분석은 7일간 수집된 31건의 온라인 게시글을 기반으로 하고 있습니다. 구좌읍 인구 7,826명 대비 0.40%의 샘플로, 참고 자료로만 활용해야 합니다. 실제 정책 결정 시에는 공식 통계, 대규모 설문조사 등과 종합적으로 고려가 필요합니다.";
    } else if (lowerMessage.includes("안녕") || lowerMessage.includes("도움")) {
      return "네, 무엇을 도와드릴까요? 구좌읍의 SSI 지수, 주요 이슈, 데이터 분석 방법 등에 대해 질문해주세요.";
    } else {
      return `"${userMessage}"에 대한 정보를 리포트에서 찾고 있습니다. 더 구체적으로 질문해주시면 정확한 답변을 드릴 수 있습니다. 예: "구좌읍 SSI 지수는?", "교통 관련 이슈는?", "긍정 의견은?"`;
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] shadow-2xl w-[480px] h-[700px] flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-[#00BFA5] to-[#00ACC1] px-[24px] py-[20px] flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="bg-white/20 rounded-full p-[8px]">
              <MessageCircle className="w-[24px] h-[24px] text-white" />
            </div>
            <div>
              <h3 className="text-white text-[16px] font-bold">
                WeKnora AI 어시스턴트
              </h3>
              <p className="text-white/80 text-[12px]">RAG 기반 리포트 분석</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-[8px] transition-colors"
          >
            <X className="w-[20px] h-[20px]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-[20px] space-y-[16px] bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-[16px] px-[16px] py-[12px] ${
                  message.sender === "user"
                    ? "bg-[#00BFA5] text-white"
                    : "bg-white border border-gray-200 text-[#374151]"
                }`}
              >
                <p className="text-[14px] leading-[1.6] whitespace-pre-wrap break-words">
                  {message.text}
                </p>
                <p
                  className={`text-[11px] mt-[6px] ${
                    message.sender === "user"
                      ? "text-white/70"
                      : "text-gray-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-[16px] px-[16px] py-[12px]">
                <div className="flex gap-[4px]">
                  <div
                    className="w-[8px] h-[8px] bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-[8px] h-[8px] bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-[8px] h-[8px] bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 p-[16px] bg-white">
          <div className="flex gap-[12px] items-end">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="리포트에 대해 질문해보세요..."
              className="flex-1 resize-none border border-gray-300 rounded-[12px] px-[16px] py-[12px] text-[14px] focus:outline-none focus:border-[#00BFA5] focus:ring-2 focus:ring-[#00BFA5]/20 min-h-[48px] max-h-[120px]"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="bg-[#00BFA5] hover:bg-[#00ACC1] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-[12px] p-[12px] transition-colors"
            >
              <Send className="w-[20px] h-[20px]" />
            </button>
          </div>
          <p className="text-[11px] text-gray-400 mt-[8px]">
            Enter로 전송 • Shift+Enter로 줄바꿈
          </p>
        </div>
      </div>
    </div>
  );
}

function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[32px] right-[32px] z-40 bg-gradient-to-r from-[#00BFA5] to-[#00ACC1] hover:shadow-2xl text-white rounded-full p-[16px] shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="채팅 열기"
      >
        <MessageCircle className="w-[28px] h-[28px]" />
        <div className="absolute -top-[8px] -right-[8px] bg-red-500 text-white text-[10px] font-bold rounded-full w-[20px] h-[20px] flex items-center justify-center animate-pulse">
          AI
        </div>
      </button>

      <ChatbotModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

// --- Report Sub-Components ---

function ReportHeader({
  startDate,
  endDate,
  tempStartDate,
  tempEndDate,
  onTempStartDateChange,
  onTempEndDateChange,
  onSearch,
  selectedRegion,
}: Pick<
  Depth2ReportProps,
  | "startDate"
  | "endDate"
  | "tempStartDate"
  | "tempEndDate"
  | "onTempStartDateChange"
  | "onTempEndDateChange"
  | "onSearch"
  | "selectedRegion"
>) {
  return (
    <div className="flex items-center justify-between mb-0">
      <div>
        <h1 className="text-[28px] font-bold text-[#455A64] mb-[8px]">
          {selectedRegion || "구좌읍"} 사회적 스트레스 상세 리포트
        </h1>
        <p className="text-[14px] text-[#90A4AE]">
          분석 기간: {startDate} ~ {endDate}
        </p>
      </div>

      {/* Date Picker */}
      <div className="flex items-center gap-[8px]">
        <div className="bg-white/90 rounded-[20px] flex items-center h-[50px] px-[20px] gap-[8px]">
          <svg
            className="w-5 h-5 text-[#90A4AE]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>

          <div className="h-[16px] relative shrink-0 w-[154px]">
            <input
              type="date"
              value={tempStartDate.replace(/\//g, "-")}
              onChange={(e) =>
                onTempStartDateChange(e.target.value.replace(/-/g, "/"))
              }
              className="w-full h-full bg-transparent border-0 outline-none cursor-pointer font-sans text-[14px] text-[#2c3e50]"
              style={{ colorScheme: "light" }}
            />
          </div>

          <p className="font-sans font-normal text-[#9ca3af] text-[24px] leading-[24px]">
            ~
          </p>

          <div className="h-[16px] relative shrink-0 w-[148px]">
            <input
              type="date"
              value={tempEndDate.replace(/\//g, "-")}
              onChange={(e) =>
                onTempEndDateChange(e.target.value.replace(/-/g, "/"))
              }
              className="w-full h-full bg-transparent border-0 outline-none cursor-pointer font-sans text-[14px] text-[#2c3e50]"
              style={{ colorScheme: "light" }}
            />
          </div>
        </div>

        <button
          onClick={onSearch}
          className="rounded-[20px] transition-all hover:shadow-lg h-[50px] w-[60px] cursor-pointer border-none"
          style={{
            backgroundImage:
              "linear-gradient(140.194deg, rgba(0, 163, 224, 0.9) 0%, rgba(77, 208, 225, 0.9) 100%)",
            boxShadow: "0px 4px 12px 0px rgba(0, 163, 224, 0.25)",
          }}
        >
          <p className="font-medium text-[16px] text-[#4b4b4b]">조회</p>
        </button>
      </div>
    </div>
  );
}

function DataOverview({
  data,
  startDate,
  endDate,
}: {
  data: RegionAnalysisData;
  startDate: string;
  endDate: string;
}) {
  return (
    <div className="bg-white rounded-[16px] p-[40px] border border-[#E0E7E9] shadow-[0px_4px_20px_0px_rgba(0,188,212,0.05)]">
      <h2 className="text-[20px] font-bold text-[#455A64] mb-[24px]">
        분석 데이터 개요
      </h2>

      <div className="flex gap-[48px]">
        {/* Left: Info */}
        <div className="flex-1">
          <div className="flex flex-col gap-[16px]">
            <div>
              <p className="text-[14px] text-[#90A4AE] mb-[4px]">분석 기간</p>
              <p className="text-[18px] font-bold text-[#455A64]">
                {startDate} ~ {endDate}
              </p>
            </div>
            <div>
              <p className="text-[14px] text-[#90A4AE] mb-[4px]">수집 게시글</p>
              <p className="text-[18px] font-bold text-[#455A64]">
                총 {data.total_posts}건
              </p>
            </div>
          </div>
        </div>

        {/* Right: Platform Table */}
        {data.platform_distribution &&
          data.platform_distribution.length > 0 && (
            <div className="flex-[1.5]">
              <p className="text-[14px] font-bold text-[#455A64] mb-[12px]">
                플랫폼별 분포
              </p>

              <div className="rounded-[8px] border border-[#E0E7E9] overflow-hidden">
                <div className="flex items-center bg-[#F5F5F5] px-[16px] py-[12px] border-b border-[#E0E7E9]">
                  <div className="flex-[2]">
                    <p className="text-[13px] font-bold text-[#455A64]">
                      채널명
                    </p>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-[13px] font-bold text-[#455A64]">건수</p>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-[13px] font-bold text-[#455A64]">비율</p>
                  </div>
                </div>

                {(() => {
                  // total_posts를 기준으로 비율 계산
                  const sortedPlatforms = [...data.platform_distribution!].sort(
                    (a, b) => b.count - a.count
                  );
                  return sortedPlatforms.map((platform, index) => {
                    const percentage = (
                      (platform.count / data.total_posts) *
                      100
                    ).toFixed(1);
                    return (
                      <div
                        key={index}
                        className={`flex items-center px-[16px] py-[10px] bg-white ${
                          index < sortedPlatforms.length - 1
                            ? "border-b border-[#F5F5F5]"
                            : ""
                        }`}
                      >
                        <div className="flex-[2] flex items-center">
                          <div
                            className="w-[8px] h-[8px] rounded-full mr-[8px]"
                            style={{ backgroundColor: platform.color }}
                          />
                          <p className="text-[13px] text-[#455A64]">
                            {platform.platform}
                          </p>
                        </div>
                        <div className="flex-1 text-right">
                          <p className="text-[13px] text-[#90A4AE]">
                            {platform.count}건
                          </p>
                        </div>
                        <div className="flex-1 text-right">
                          <p className="text-[13px] font-bold text-[#00BFA5]">
                            {percentage}%
                          </p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

function SSITrendChart({
  data,
  riskColor,
}: {
  data: RegionAnalysisData;
  riskColor: string;
}) {
  const weeklyData = data.trend_data || [
    0.52, 0.54, 0.58, 0.55, 0.59, 0.62, 0.65, 0.68,
  ];

  return (
    <div className="bg-white rounded-[16px] p-[40px] border border-[#E0E7E9] shadow-[0px_4px_20px_0px_rgba(0,188,212,0.05)]">
      <div className="flex items-center justify-center gap-[64px]">
        <div className="text-center">
          <p className="text-[14px] text-[#90A4AE] mb-[12px]">
            SSI (Social Stress Index)
          </p>
          <div className="text-[48px] font-bold" style={{ color: riskColor }}>
            {data.ssi_score.toFixed(2)}
          </div>
          <div className="flex items-center justify-center gap-[8px] mt-[12px]">
            <span
              className="text-[13px] font-bold rounded-[999px] h-[28px] px-[12px] flex items-center"
              style={{
                backgroundColor: `${riskColor}20`,
                border: `1px solid ${riskColor}50`,
                color: riskColor,
              }}
            >
              {getRiskInfo(data.risk_level).text}
            </span>
            <TrendingUp className="w-5 h-5" style={{ color: riskColor }} />
          </div>
        </div>

        <div className="text-center">
          <p className="text-[14px] text-[#90A4AE] mb-[12px]">
            최근 8주 추이 (7일단위)
          </p>
          <div className="w-[400px] h-[180px]">
            <svg
              width="400"
              height="180"
              viewBox="0 0 400 180"
              className="bg-transparent"
            >
              {/* 그리드 라인 */}
              <line
                x1="40"
                y1="20"
                x2="40"
                y2="140"
                stroke="#E0E7E9"
                strokeWidth="1"
              />
              <line
                x1="40"
                y1="140"
                x2="380"
                y2="140"
                stroke="#E0E7E9"
                strokeWidth="2"
              />

              {/* Y축 레이블 */}
              <text x="30" y="25" fontSize="10" fill="#90A4AE" textAnchor="end">
                1.0
              </text>
              <text x="30" y="65" fontSize="10" fill="#90A4AE" textAnchor="end">
                0.7
              </text>
              <text
                x="30"
                y="105"
                fontSize="10"
                fill="#90A4AE"
                textAnchor="end"
              >
                0.4
              </text>
              <text
                x="30"
                y="145"
                fontSize="10"
                fill="#90A4AE"
                textAnchor="end"
              >
                0.0
              </text>

              {/* 가로 그리드 */}
              <line
                x1="40"
                y1="20"
                x2="380"
                y2="20"
                stroke="#F5F5F5"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <line
                x1="40"
                y1="60"
                x2="380"
                y2="60"
                stroke="#F5F5F5"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <line
                x1="40"
                y1="100"
                x2="380"
                y2="100"
                stroke="#F5F5F5"
                strokeWidth="1"
                strokeDasharray="2,2"
              />

              {/* 데이터 시각화 로직 */}
              {(() => {
                const xStart = 60;
                const xSpacing = 40;
                const yScale = (value: number) => 140 - value * 120;

                const pathData = weeklyData
                  .map((value, index) => {
                    const x = xStart + index * xSpacing;
                    const y = yScale(value);
                    return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                  })
                  .join(" ");

                return (
                  <>
                    <defs>
                      <linearGradient
                        id="areaGradient"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#00BFA5"
                          stopOpacity="0.2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#00BFA5"
                          stopOpacity="0.02"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d={`${pathData} L ${
                        xStart + 7 * xSpacing
                      } 140 L ${xStart} 140 Z`}
                      fill="url(#areaGradient)"
                    />
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#00BFA5"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {weeklyData.map((value, index) => {
                      const x = xStart + index * xSpacing;
                      const y = yScale(value);
                      const isLast = index === weeklyData.length - 1;
                      return (
                        <g key={index}>
                          <circle
                            cx={x}
                            cy={y}
                            r={isLast ? "6" : "4"}
                            fill="white"
                            stroke={isLast ? riskColor : "#00BFA5"}
                            strokeWidth={isLast ? "3" : "2"}
                          />
                          <text
                            x={x}
                            y="160"
                            fontSize="10"
                            fill="#90A4AE"
                            textAnchor="middle"
                          >
                            {index + 1}주
                          </text>
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>
          <p className="text-[12px] text-[#90A4AE] mt-[8px]">
            1주차: {weeklyData[0].toFixed(2)} → 8주차:{" "}
            {weeklyData[7].toFixed(2)} (+
            {(weeklyData[7] - weeklyData[0]).toFixed(2)})
          </p>
        </div>
      </div>
    </div>
  );
}

function IssueList({
  title,
  count,
  color,
  issues,
  type,
}: {
  title: string;
  count: number;
  color: string;
  issues: any[];
  type: "positive" | "negative" | "neutral";
}) {
  if (!issues || issues.length === 0) return null;

  return (
    <div
      className={`bg-white rounded-[16px] p-[32px] border border-[#E0E7E9] shadow-[0px_4px_20px_0px_rgba(0,188,212,0.05)] ${
        type !== "positive" ? "mt-[20px]" : "mb-[20px]"
      }`}
    >
      <div
        className="text-[18px] font-bold mb-[20px] pb-[12px]"
        style={{ color, borderBottom: `2px solid ${color}` }}
      >
        {title} ({count}건)
      </div>

      <div className="flex flex-col gap-[24px]">
        {issues.map((issue, idx) => (
          <div key={idx}>
            <h3 className="text-[16px] font-bold mb-[12px] " style={{ color }}>
              {idx + 1}. {issue.keyword} ({issue.voices.length}건)
            </h3>
            {type === "neutral" && issue.context && (
              <p className="text-[13px] text-[#9CA3AF] mb-[12px] italic pl-[20px]">
                맥락: {issue.context}
              </p>
            )}
            <div className="flex flex-col gap-[8px] pl-[20px]">
              {issue.voices.slice(0, 8).map((voice: string, vIdx: number) => (
                <div key={vIdx} className="flex items-start gap-[8px]">
                  <span className="text-[#90A4AE] shrink-0">•</span>
                  <p className="text-[14px] text-[#374151] leading-[170%]">
                    "{voice}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightSection({
  data,
  startDate,
  endDate,
}: {
  data: RegionAnalysisData;
  startDate: string;
  endDate: string;
}) {
  // 기간 계산
  const calculateDays = (start: string, end: string) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const diffTime = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const periodDays = calculateDays(startDate, endDate);
  const totalIssues =
    (data.positive_issues?.length || 0) +
    (data.negative_issues?.length || 0) +
    (data.neutral_issues?.length || 0);
  const totalVoices =
    (data.positive_issues?.reduce(
      (sum, issue) => sum + issue.voices.length,
      0
    ) || 0) +
    (data.negative_issues?.reduce(
      (sum, issue) => sum + issue.voices.length,
      0
    ) || 0) +
    (data.neutral_issues?.reduce(
      (sum, issue) => sum + issue.voices.length,
      0
    ) || 0);

  return (
    <div>
      <h2 className="text-[24px] font-bold flex items-center gap-[8px] text-[#455A64] mb-[20px]">
        <svg
          className="w-6 h-6 text-[#00BFA5]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        데이터 해석 및 인사이트
      </h2>

      <div className="bg-white rounded-[16px] p-[40px] border border-[#E0E7E9] shadow-[0px_4px_20px_0px_rgba(0,188,212,0.05)]">
        {/* 전체 데이터 개관 */}
        <div className="mb-[32px]">
          <h3 className="text-[18px] font-bold text-[#00BFA5] mb-[16px]">
            전체 데이터 개관
          </h3>
          <p className="text-[14px] text-[#455A64] leading-[170%]">
            {data.region_name} 관련 게시글 {data.total_posts}건 중 {totalVoices}
            건에서 지역 생활과 관련된 의견이 확인되었습니다.{" "}
            {data.negative_issues?.[0]?.voices.length || 0}건의 부정적 의견이
            가장 많았으며, {data.positive_issues?.[0]?.voices.length || 0}건의
            긍정적 의견이 확인되었습니다.
          </p>
        </div>

        {/* 주요 발견사항 */}
        <div className="mb-[32px]">
          <h3 className="text-[18px] font-bold text-[#00BFA5] mb-[16px]">
            주요 발견사항
          </h3>

          {/* 발견사항은 데이터 기반으로 동적 생성 */}
          {data.negative_issues && data.negative_issues.length > 0 && (
            <div className="mb-[24px]">
              <h4 className="text-[16px] font-bold text-[#374151] mb-[12px]">
                1. {data.negative_issues[0].keyword}
              </h4>
              <div className="pl-[20px] mb-[12px]">
                <p className="text-[14px] font-bold text-[#90A4AE] mb-[8px]">
                  데이터:
                </p>
                <p className="text-[14px] text-[#455A64] leading-[170%] mb-[12px]">
                  {data.negative_issues[0].voices.length}건의 게시글에서{" "}
                  {data.negative_issues[0].keyword} 관련 언급
                </p>

                {data.negative_issues[0].context && (
                  <>
                    <p className="text-[14px] font-bold text-[#90A4AE] mb-[8px]">
                      해석:
                    </p>
                    <p className="text-[14px] text-[#455A64] leading-[170%] mb-[12px]">
                      {data.negative_issues[0].context}
                    </p>
                  </>
                )}

                {data.negative_issues[0].voices &&
                  data.negative_issues[0].voices.length > 0 && (
                    <>
                      <p className="text-[14px] font-bold text-[#90A4AE] mb-[8px]">
                        주민 의견:
                      </p>
                      <div className="flex flex-col gap-[6px]">
                        {data.negative_issues[0].voices
                          .slice(0, 2)
                          .map((voice, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-[8px]"
                            >
                              <span className="text-[#00BFA5] shrink-0">•</span>
                              <p className="text-[13px] text-[#6b7280] leading-[170%]">
                                "{voice}"
                              </p>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
              </div>
            </div>
          )}

          {data.negative_issues && data.negative_issues.length > 1 && (
            <div className="mb-[24px]">
              <h4 className="text-[16px] font-bold text-[#374151] mb-[12px]">
                2. {data.negative_issues[1].keyword}
              </h4>
              <div className="pl-[20px] mb-[12px]">
                <p className="text-[14px] font-bold text-[#90A4AE] mb-[8px]">
                  데이터:
                </p>
                <p className="text-[14px] text-[#455A64] leading-[170%] mb-[12px]">
                  {data.negative_issues[1].voices.length}건의 게시글에서{" "}
                  {data.negative_issues[1].keyword} 관련 언급
                </p>

                {data.negative_issues[1].context && (
                  <>
                    <p className="text-[14px] font-bold text-[#90A4AE] mb-[8px]">
                      해석:
                    </p>
                    <p className="text-[14px] text-[#455A64] leading-[170%] mb-[12px]">
                      {data.negative_issues[1].context}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 관찰된 패턴 */}
        <div className="mb-[32px]">
          <h3 className="text-[18px] font-bold text-[#00BFA5] mb-[16px]">
            관찰된 패턴 (참고용)
          </h3>

          <div className="mb-[20px]">
            <h4 className="text-[16px] font-bold text-[#374151] mb-[12px]">
              교통 불편 → 다른 불편으로 연쇄
            </h4>
            <div className="pl-[20px]">
              <p className="text-[14px] font-bold text-[#90A4AE] mb-[8px]">
                관찰:
              </p>
              <p className="text-[14px] text-[#455A64] leading-[170%] mb-[12px]">
                교통 불편을 언급한 게시글에서 의료, 장보기 등 다른 생활 불편도
                함께 언급되는 경향이 있었습니다.
              </p>

              <p className="text-[14px] font-bold text-[#90A4AE] mb-[8px]">
                해석:
              </p>
              <p className="text-[14px] text-[#455A64] leading-[170%]">
                버스 배차 간격이 길어지면 병원, 마트 등 필수 시설 이용이
                어려워진다는 의견으로 해석됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 긍정적 측면 */}
        <div>
          <h3 className="text-[18px] font-bold text-[#00BFA5] mb-[16px]">
            긍정적 측면
          </h3>

          <div className="pl-[20px]">
            {data.positive_issues && data.positive_issues.length > 0 ? (
              <>
                <p className="text-[14px] font-bold text-[#374151] mb-[8px]">
                  {data.positive_issues[0].keyword} (
                  {data.positive_issues[0].voices.length}건)
                </p>
                <p className="text-[14px] text-[#455A64] leading-[170%] mb-[12px]">
                  일부 게시글에서 {data.region_name}의 자연환경에 대한 긍정적
                  평가가 있었습니다.
                </p>

                {data.positive_issues[0].voices &&
                  data.positive_issues[0].voices.length > 0 && (
                    <div className="flex flex-col gap-[6px]">
                      {data.positive_issues[0].voices
                        .slice(0, 2)
                        .map((voice, idx) => (
                          <div key={idx} className="flex items-start gap-[8px]">
                            <span className="text-[#00BFA5] shrink-0">•</span>
                            <p className="text-[13px] text-[#6b7280] leading-[170%]">
                              "{voice}"
                            </p>
                          </div>
                        ))}
                    </div>
                  )}
              </>
            ) : (
              <p className="text-[14px] text-[#455A64] leading-[170%]">
                {data.region_name}에 대한 긍정적 의견이 확인되었습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DataLimitations({
  data,
  startDate,
  endDate,
}: {
  data: RegionAnalysisData;
  startDate: string;
  endDate: string;
}) {
  // 기간 계산
  const calculateDays = (start: string, end: string) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const diffTime = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const periodDays = calculateDays(startDate, endDate);
  const totalVoices =
    (data.positive_issues?.reduce(
      (sum, issue) => sum + issue.voices.length,
      0
    ) || 0) +
    (data.negative_issues?.reduce(
      (sum, issue) => sum + issue.voices.length,
      0
    ) || 0) +
    (data.neutral_issues?.reduce(
      (sum, issue) => sum + issue.voices.length,
      0
    ) || 0);

  return (
    <div>
      <h2 className="text-[24px] font-bold flex items-center gap-[8px] text-[#455A64] mb-[20px]">
        <svg
          className="w-6 h-6 text-[#90A4AE]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        데이터 한계 및 유의사항
      </h2>

      <div className="bg-white rounded-[16px] p-[40px] border border-[#E0E7E9] shadow-[0px_4px_20px_0px_rgba(0,188,212,0.05)]">
        <div className="flex flex-col gap-[20px]">
          {/* 1. 샘플 편향 */}
          <div>
            <h3 className="text-[16px] font-bold text-[#374151] mb-[12px]">
              1. 샘플 편향
            </h3>
            <div className="flex flex-col gap-[8px] pl-[20px]">
              <p className="text-[14px] text-[#374151] leading-[170%]">
                • 온라인 게시글 작성자에 편향되어 있습니다
              </p>
              <p className="text-[14px] text-[#374151] leading-[170%]">
                • 디지털 활용이 익숙한 연령대 의견이 과대표될 가능성
              </p>
              <p className="text-[14px] text-[#374151] leading-[170%] mt-[8px]">
                누락될 수 있는 목소리:
              </p>
              <p className="text-[14px] text-[#374151] leading-[170%] pl-[20px]">
                - 고령자 (온라인 활용도 낮음)
              </p>
              <p className="text-[14px] text-[#374151] leading-[170%] pl-[20px]">
                - 디지털 소외층
              </p>
              <p className="text-[14px] text-[#374151] leading-[170%] pl-[20px]">
                - 만족하는 주민 (불만 없어 게시 안 함)
              </p>
            </div>
          </div>

          {/* 2. 작은 샘플 크기 */}
          <div>
            <h3 className="text-[16px] font-bold text-[#374151] mb-[12px]">
              2. 작은 샘플 크기
            </h3>
            <div className="flex flex-col gap-[8px] pl-[20px]">
              <p className="text-[14px] text-[#374151] leading-[170%]">
                • 분석 게시글: {totalVoices}건
              </p>
              <p className="text-[14px] text-[#374151] leading-[170%]">
                • {data.region_name} 관련 게시글: {data.total_posts}건
              </p>
              <p className="text-[14px] text-[#374151] leading-[170%] mt-[8px]">
                → 제한된 샘플 크기로 인해 대표성에 한계가 있습니다.
              </p>
            </div>
          </div>

          {/* 3. 단기 데이터 */}
          <div>
            <h3 className="text-[16px] font-bold text-[#374151] mb-[12px]">
              3. 단기 데이터
            </h3>
            <div className="flex flex-col gap-[8px] pl-[20px]">
              <p className="text-[14px] text-[#374151] leading-[170%]">
                • 분석 기간: {periodDays}일
              </p>
              <p className="text-[14px] text-[#374151] leading-[170%]">
                • 장기 트렌드 파악 어려움
              </p>
            </div>
          </div>

          {/* 4. 내용 미검증 */}
          <div>
            <h3 className="text-[16px] font-bold text-[#374151] mb-[12px]">
              4. 내용 미검증
            </h3>
            <div className="flex flex-col gap-[8px] pl-[20px]">
              <p className="text-[14px] text-[#374151] leading-[170%]">
                • 게시글 내용의 사실 여부는 검증하지 않았습니다
              </p>
              <p className="text-[14px] text-[#374151] leading-[170%]">
                • 주민이 느끼는 '체감'을 전달하는 것이며, 객관적 사실과 다를 수
                있습니다
              </p>
            </div>
          </div>

          {/* 정책 결정 시 유의사항 */}
          <div className="mt-[12px] pt-[20px] border-t border-[#E0E7E9]">
            <p className="text-[14px] text-[#374151] leading-[180%] mb-[12px]">
              이 분석은 '이런 의견도 있다'는 참고 자료로만 활용하시고, 실제 정책
              결정 시에는:
            </p>
            <div className="flex flex-col gap-[8px] pl-[20px]">
              <p className="text-[14px] text-[#374151] leading-[170%]">
                • 공식 통계
              </p>
              <p className="text-[14px] text-[#374151] leading-[170%]">
                • 대규모 설문조사
              </p>
              <p className="text-[14px] text-[#374151] leading-[170%]">
                • 주민 간담회
              </p>
              <p className="text-[14px] text-[#374151] leading-[170%]">
                • 오프라인 민원 데이터
              </p>
            </div>
            <p className="text-[14px] text-[#374151] mt-[12px]">
              등 다양한 채널을 종합적으로 고려해주시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---

export default function Depth2Report({
  startDate,
  endDate,
  tempStartDate,
  tempEndDate,
  onTempStartDateChange,
  onTempEndDateChange,
  onSearch,
  reportData,
  selectedRegion,
}: Depth2ReportProps) {
  // Default Data Memoization
  // JSON 데이터에서 SSI 값 가져오기
  const ssiInfo = useMemo(() => {
    if (!selectedRegion) return { ssi: 0.68, change: 0 };
    return getSSIDataByDateRange(selectedRegion, startDate, endDate);
  }, [selectedRegion, startDate, endDate]);

  const trendData = useMemo(() => {
    if (!selectedRegion)
      return [0.52, 0.54, 0.58, 0.55, 0.59, 0.62, 0.65, 0.68];
    return getTrendData(selectedRegion, startDate, endDate);
  }, [selectedRegion, startDate, endDate]);

  const defaultData = useMemo<RegionAnalysisData>(() => {
    const totalPosts = 45;
    // 플랫폼별 분포 데이터 (건수 합계가 totalPosts와 일치하도록)
    const platformData = [
      { platform: "당근마켓", count: 15, color: "#FF6B35" },
      { platform: "네이버 제주맘카페", count: 10, color: "#03C75A" },
      { platform: "네이버 뉴스", count: 7, color: "#1EC800" },
      { platform: "디시인사이드", count: 5, color: "#4A90E2" },
      { platform: "X", count: 4, color: "#000000" },
      { platform: "제주도청 건의", count: 2, color: "#00BFA5" },
      { platform: "픽제주", count: 1, color: "#FF9500" },
      { platform: "그 외", count: 1, color: "#90A4AE" },
    ];

    // 비율이 높은 순서대로 정렬 (내림차순)
    const sortedPlatforms = [...platformData].sort((a, b) => b.count - a.count);

    return {
      region_name: selectedRegion || "구좌읍",
      ssi_score: ssiInfo.ssi,
      risk_level: getRiskLevelFromSSI(ssiInfo.ssi),
      total_posts: totalPosts,
      platform_distribution: sortedPlatforms,
      positive_issues: [
        {
          keyword: "자연환경 아름다워",
          voices: [
            `${selectedRegion || "지역"}의 자연환경이 아름다워요`,
            `${selectedRegion || "지역"}에서의 일상이 평화로워요`,
          ],
        },
      ],
      negative_issues: [
        {
          keyword: "교통 불편",
          severity: "심각",
          voices: [
            `${selectedRegion || "지역"}에서 대중교통 이용이 어려워요`,
            `${selectedRegion || "지역"}의 교통 접근성이 부족해요`,
          ],
          context: "대중교통 이용 불편",
          related_issues: "의료 접근성, 고령자 이동권",
        },
        {
          keyword: "의료 접근성",
          severity: "중간",
          voices: [`${selectedRegion || "지역"}에서 병원까지 거리가 멀어요`],
          context: `${selectedRegion || "지역"} 내 의료 시설 부족`,
          related_issues: "의료 인프라",
        },
      ],
      neutral_issues: [
        {
          keyword: "일자리",
          voices: [
            `${selectedRegion || "지역"}에 일자리가 부족해요`,
            `${selectedRegion || "지역"}에서 일자리를 찾기 어려워요`,
            `${selectedRegion || "지역"}의 경제 활동이 제한적이에요`,
            `${selectedRegion || "지역"}의 산업 기반이 약해요`,
          ],
          context: `${selectedRegion || "지역"} 내 일자리 부족`,
        },
      ],
      trend_data: trendData,
      insights: [],
    };
  }, [selectedRegion, ssiInfo.ssi, trendData]);

  const data = reportData || defaultData;
  const riskInfo = getRiskInfo(data.risk_level);

  // JSON 리포트 데이터 로드
  const jsonReport = useMemo(() => {
    if (!selectedRegion) {
      console.warn("[ChatPage] selectedRegion이 없습니다");
      return null;
    }

    console.log(
      `[ChatPage] jsonReport 계산 시작 - selectedRegion: "${selectedRegion}"`
    );
    console.log(
      `[ChatPage] getRegionReport 함수 존재:`,
      typeof getRegionReport
    );

    try {
      const report = getRegionReport(selectedRegion);
      if (report) {
        console.log(
          `[ChatPage] ✅ JSON 리포트 로드 성공! 지역: ${report.region}`
        );
      } else {
        console.warn(
          `[ChatPage] ⚠️ JSON 리포트를 찾을 수 없음: ${selectedRegion}`
        );
      }
      return report;
    } catch (error) {
      console.error("[ChatPage] ❌ getRegionReport 실행 중 오류:", error);
      return null;
    }
  }, [selectedRegion]);

  return (
    <div
      className="min-h-screen p-[40px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[32px]">
        <ReportHeader
          startDate={startDate}
          endDate={endDate}
          tempStartDate={tempStartDate}
          tempEndDate={tempEndDate}
          onTempStartDateChange={onTempStartDateChange}
          onTempEndDateChange={onTempEndDateChange}
          onSearch={onSearch}
          selectedRegion={selectedRegion}
        />

        <DataOverview data={data} startDate={startDate} endDate={endDate} />

        <SSITrendChart data={data} riskColor={riskInfo.color} />

        {/* JSON 리포트 데이터가 있으면 새 컴포넌트 사용, 없으면 기존 컴포넌트 사용 */}
        {jsonReport ? (
          <>
            {/* 주요 이슈 분석 - 새 컴포넌트 (JSON 데이터 사용) */}
            <IssueAnalysis
              positive={jsonReport.positive}
              negative={jsonReport.negative}
              neutral={jsonReport.neutral}
              totalPositive={jsonReport.totalPositive}
              totalNegative={jsonReport.totalNegative}
              totalNeutral={jsonReport.totalNeutral}
            />

            {/* 데이터 해석 및 인사이트 - 새 컴포넌트 (JSON 데이터 사용) */}
            <InsightSectionNew
              overview={jsonReport.overview}
              findings={jsonReport.findings}
              patterns={jsonReport.patterns}
              additionalInsights={jsonReport.additionalInsights}
            />
          </>
        ) : (
          <>
            {/* Issues Section - 기존 컴포넌트 (fallback) */}
            <div>
              <h2 className="text-[24px] font-bold flex items-center gap-[8px] text-[#455A64] mb-[20px]">
                <AlertCircle className="w-6 h-6 text-[#00BFA5]" />
                주요 이슈 분석
              </h2>

              <IssueList
                title="긍정적 의견"
                count={data.positive_issues.reduce(
                  (sum, issue) => sum + issue.voices.length,
                  0
                )}
                color="#059669"
                issues={data.positive_issues}
                type="positive"
              />

              <IssueList
                title="부정적 의견"
                count={data.negative_issues.reduce(
                  (sum, issue) => sum + issue.voices.length,
                  0
                )}
                color="#dc2626"
                issues={data.negative_issues}
                type="negative"
              />

              <IssueList
                title="중립적 의견"
                count={
                  data.neutral_issues?.reduce(
                    (sum, issue) => sum + issue.voices.length,
                    0
                  ) || 0
                }
                color="#6B7280"
                issues={data.neutral_issues || []}
                type="neutral"
              />
            </div>

            <InsightSection
              data={data}
              startDate={startDate}
              endDate={endDate}
            />
          </>
        )}

        <DataLimitations data={data} startDate={startDate} endDate={endDate} />
      </div>

      <ChatbotButton />
    </div>
  );
}
