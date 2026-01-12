import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const defaultGreeting: Message[] = [
  {
    id: '1',
    text: '안녕하세요! 제주도 사회적 스트레스 모니터링 시스템 리포트에 대해 무엇이든 물어보세요. WeKnora RAG 기술을 활용하여 정확한 답변을 제공해드립니다.',
    sender: 'bot',
    timestamp: new Date(),
  },
];

export const useChat = (initialMessages: Message[] = defaultGreeting) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('구좌읍') || lowerMessage.includes('구좌')) {
      return '구좌읍의 현재 SSI 지수는 0.68로 "주의" 단계입니다. 주요 이슈는 교통 불편(12건), 사회적 고립감(8건), 의료 접근성(6건) 순으로 나타났습니다. 특히 버스 배차 간격에 대한 불편이 가장 많이 언급되었습니다.';
    } else if (lowerMessage.includes('ssi') || lowerMessage.includes('지수')) {
      return 'SSI(Social Stress Indicator)는 0.0-1.0 범위로 측정되며, 5단계로 구분됩니다:\n• 0.0-0.3: 안정 (파란색)\n• 0.3-0.5: 양호 (초록색)\n• 0.5-0.7: 주의 (노란색)\n• 0.7-0.85: 경고 (주황색)\n• 0.85-1.0: 위험 (빨간색)';
    } else if (lowerMessage.includes('교통') || lowerMessage.includes('버스')) {
      return '구좌읍에서 교통 관련 의견이 12건으로 가장 많았습니다. 주민들은 하루 3~5회 운행되는 버스 배차 간격으로 인해 병원, 마트 이용에 어려움을 겪고 있다고 언급했습니다. 택시 비용 부담도 주요 이슈로 나타났습니다.';
    } else if (lowerMessage.includes('고립') || lowerMessage.includes('외로')) {
      return '사회적 고립감 관련 게시글이 8건 확인되었습니다. 특히 최근 이주민들이 사회적 연결망 형성에 어려움을 겪고 있으며, "이사 온 지 3개월인데 친구가 없다", "젊은 사람이 별로 없어 외롭다"는 의견이 있었습니다.';
    } else if (lowerMessage.includes('병원') || lowerMessage.includes('의료') || lowerMessage.includes('소아과')) {
      return '의료 접근성 관련 의견이 6건 발견되었습니다. 구좌읍 내 소아과가 없어 제주시까지 40분 이동해야 하는 불편이 주요 이슈입니다. "애가 열나면 응급 상황이 무섭다"는 육아 가구의 우려가 표현되었습니다.';
    } else if (lowerMessage.includes('데이터') || lowerMessage.includes('분석')) {
      return '현재 분석은 7일간 수집된 31건의 온라인 게시글을 기반으로 하고 있습니다. 구좌읍 인구 7,826명 대비 0.40%의 샘플로, 참고 자료로만 활용해야 합니다. 실제 정책 결정 시에는 공식 통계, 대규모 설문조사 등과 종합적으로 고려가 필요합니다.';
    } else if (lowerMessage.includes('안녕') || lowerMessage.includes('도움')) {
      return '네, 무엇을 도와드릴까요? 구좌읍의 SSI 지수, 주요 이슈, 데이터 분석 방법 등에 대해 질문해주세요.';
    } else {
      return `"${userMessage}"에 대한 정보를 리포트에서 찾고 있습니다. 더 구체적으로 질문해주시면 정확한 답변을 드릴 수 있습니다. 예: "구좌읍 SSI 지수는?", "교통 관련 이슈는?", "긍정 의견은?"`;
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    messages,
    inputText,
    setInputText,
    isTyping,
    messagesEndRef,
    handleSend,
    handleKeyPress,
  } as const;
};

export default useChat;
