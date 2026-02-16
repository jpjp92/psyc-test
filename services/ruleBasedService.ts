import { PSYCH_TESTS, MBTI_DATA, MULTI_IQ_DATA, HTP_DATA, SMARTPHONE_DATA } from '../constants';

// 응답 타입 변경 (텍스트 + 선택적 첨부 데이터)
type BotResponse = {
  text: string;
  attachment?: {
    type: 'mbti' | 'multi-iq' | 'htp' | 'smartphone';
    data: any[];
  };
};

// 1. 키워드 및 응답 데이터베이스 정의
type ResponseCategory = {
  keywords: string[];
  responses: string[];
};

const KNOWLEDGE_BASE: Record<string, ResponseCategory> = {
  // --- 심리 검사 관련 --- (HTP와 스마트폰은 아래에서 특수 처리)
  greeting: {
    keywords: ['안녕', '반가', '하이', 'hello', 'ㅎㅇ', '시작', '처음'],
    responses: [
      `안녕하세요! 저는 여러분에게 필요한 심리 검사를 안내해 드리는 **심리 상담 가이드 봇**입니다. 🌲`,
      `반갑습니다. 숨 상담소에 오신 것을 환영해요. \n저는 여러분의 마음 상태에 맞는 심리 검사를 추천해 드리는 **상담 가이드**입니다.`,
      `어서오세요! 저는 **심리 상담 가이드 봇**입니다. \n성격, 진로, 스트레스 등 궁금한 점을 말씀해 주시면 적절한 검사를 찾아드릴게요.`
    ]
  },
  identity: {
    keywords: ['너는', '누구', '이름', '뭐하는', '정체', '넌', '능력', '기능', '할 수', '도움'],
    responses: [
      `저는 **심리 상담 가이드 봇**입니다. 🌲 \n여러분의 고민을 듣고 MBTI, 다중지능, HTP, 스마트폰 과의존 등 적절한 심리 검사 사이트를 안내해 드리는 역할을 하고 있어요.`,
      `저는 숨 상담소의 가이드입니다. 심리 검사가 필요하거나 자신의 마음을 알아보고 싶을 때 저에게 물어봐 주세요.`
    ]
  },
  gratitude: {
    keywords: ['고마', '감사', '땡큐', 'thx', '굿', '좋아'],
    responses: [
      `도움이 되어서 정말 기뻐요! 언제든 또 찾아주세요. 🌿`,
      `당신의 마음이 숲처럼 편안해지길 바랍니다.`,
      `별말씀을요! 당신의 하루가 조금 더 행복해지길 응원할게요.`
    ]
  },
  weather: {
    keywords: ['날씨', '비', '눈', '더워', '추워', '맑음', '화창'],
    responses: [
      `날씨에 따라 기분도 달라지곤 하죠. 마음의 날씨는 어떠신가요? ☀️`,
      `비가 오면 차분해지고, 맑으면 설레기도 하죠. 오늘은 어떤 기분인지 들려주세요.`
    ]
  },
  food: {
    keywords: ['밥', '배고', '점심', '저녁', '메뉴', '맛있', '먹었'],
    responses: [
      `맛있는 음식을 먹으면 기분이 좋아지죠! 오늘은 당신이 제일 좋아하는 음식을 드셨으면 좋겠어요.`,
      `저는 로봇이라 밥을 먹진 못하지만, 당신이 든든하게 챙겨 먹었으면 좋겠어요. 🍚`
    ]
  },
  bored: {
    keywords: ['심심', '지루', '놀아', '할거', '뭐하지'],
    responses: [
      `심심할 땐 나에 대해 알아보는 것만큼 재미있는 게 없죠! \n**[${PSYCH_TESTS[0].name}](${PSYCH_TESTS[0].url})** 한번 해보시는 건 어때요?`,
      `지루한 시간, 숨겨진 재능을 찾아보는 건 어떨까요? **[${PSYCH_TESTS[1].name}](${PSYCH_TESTS[1].url})**를 추천드려요!`
    ]
  },
  tired: {
    keywords: ['피곤', '지쳐', '힘드', '자고', '졸려', '밤'],
    responses: [
      `오늘 하루도 정말 고생 많으셨어요. 푹 쉬면서 재충전하는 시간이 꼭 필요해요. 🌙`,
      `잠시 눈을 감고 심호흡을 해보세요. 당신은 충분히 휴식할 자격이 있어요.`
    ]
  }
};

const getRandomResponse = (responses: string[]) => {
  return responses[Math.floor(Math.random() * responses.length)];
};

// MBTI 데이터 파싱 헬퍼
const parseMbtiData = () => {
  return Object.entries(MBTI_DATA).map(([code, text]) => {
    // "ISTJ: (현실주의자) ... " 형태 파싱
    const match = text.match(/\((.*?)\)\s*(.*?):\s*(.*)/);
    const alias = match ? match[1] : '';
    const emoji = match ? match[2] : '';
    const desc = match ? match[3] : text;
    return { code, alias, emoji, description: desc };
  });
};

export const sendMessageToBot = async (message: string): Promise<BotResponse> => {
  const delay = Math.random() * 500 + 300;
  await new Promise(resolve => setTimeout(resolve, delay));

  const text = message.toLowerCase();

  // --- 1. 특정 MBTI 유형 질문 확인 (예: "ISTJ 특징 알려줘") ---
  const mbtiTypes = Object.keys(MBTI_DATA);
  const foundType = mbtiTypes.find(type => text.toUpperCase().includes(type));

  if (foundType) {
    const rawData = MBTI_DATA[foundType];
    const match = rawData.match(/\((.*?)\)\s*(.*?):\s*(.*)/);
    const data = [{
      code: foundType,
      alias: match ? match[1] : '',
      emoji: match ? match[2] : '',
      description: match ? match[3] : rawData
    }];
    return {
      text: `요청하신 **${foundType}** 유형에 대한 정보입니다.`,
      attachment: { type: 'mbti', data }
    };
  }

  // --- 2. 다중지능 처리 로직 ---
  const multiKeywords = ['지능', '재능', '강점', '적성', 'iq', '아이큐', '진로', '직업', '다중'];
  const multiTypes = Object.keys(MULTI_IQ_DATA);
  const foundMulti = multiTypes.find(t => text.includes(t));

  if (foundMulti) {
    const info = MULTI_IQ_DATA[foundMulti];
    return {
      text: `**${foundMulti}**은 다음과 같은 특징을 가지고 있습니다.`,
      attachment: {
        type: 'multi-iq',
        data: [{ name: foundMulti, ...info }]
      }
    };
  }

  if (multiKeywords.some(k => text.includes(k))) {
    return {
      text: `우리의 지능은 한 가지가 아닙니다. 하워드 가드너의 다중지능 이론에 따르면 인간은 8가지의 다양한 지능을 가지고 있어요.\n\n나의 강점이 궁금하다면 **[검사하러 가기](${PSYCH_TESTS[1].url})**를 이용해보세요!`,
      attachment: {
        type: 'multi-iq',
        data: Object.entries(MULTI_IQ_DATA).map(([name, info]) => ({ name, ...info }))
      }
    };
  }

  // --- 3. HTP 그림 진단 처리 로직 ---
  const htpKeywords = ['그림', '심리', '나무', '집', '미술', 'htp', '에이치티피'];
  if (htpKeywords.some(k => text.includes(k))) {
    return {
      text: `마음이 답답하거나 내면의 소리를 듣고 싶을 땐 그림을 그려보는 게 큰 도움이 됩니다.\n\n**[${PSYCH_TESTS[2].name}](${PSYCH_TESTS[2].url})**를 통해 당신의 무의식을 알아보세요.`,
      attachment: {
        type: 'htp',
        data: [HTP_DATA]
      }
    };
  }

  // --- 4. 스마트폰 과의존 진단 처리 로직 ---
  const smartKeywords = ['스마트폰', '핸드폰', '중독', '과의존', '디지털', '폰', '유튜브', '인스타', '쇼츠', '릴스'];
  if (smartKeywords.some(k => text.includes(k))) {
    return {
      text: `현대인에게 스마트폰은 떼려야 뗄 수 없는 존재지만, 때로는 적절한 거리가 필요합니다.\n\n나의 디지털 사용 습관이 궁금하다면 **[${PSYCH_TESTS[3].name}](${PSYCH_TESTS[3].url})**를 진행해보세요.`,
      attachment: {
        type: 'smartphone',
        data: [SMARTPHONE_DATA]
      }
    };
  }

  // --- 3. 일반 MBTI 질문 (다중지능 체크 후 실행) ---
  const mbtiKeywords = ['mbti', '성격', '엠비티아이', '유형'];

  if (mbtiKeywords.some(k => text.includes(k))) {
    return {
      text: `MBTI는 16가지 성격 유형으로 사람을 분류합니다. \n자세한 내용을 아래 카드에서 확인해보세요. 본인의 유형이 궁금하다면 **[검사하러 가기](${PSYCH_TESTS[0].url})**를 클릭하세요!`,
      attachment: { type: 'mbti', data: parseMbtiData() }
    };
  }

  // --- 4. 일반 키워드 매칭 ---
  for (const category in KNOWLEDGE_BASE) {
    const { keywords, responses } = KNOWLEDGE_BASE[category];
    if (keywords.some(k => text.includes(k))) {
      return { text: getRandomResponse(responses) };
    }
  }

  // --- 5. 기본 응답 ---
  const defaultResponses = [
    `음, 제가 모든 말을 이해하진 못하지만, 저는 **심리 상담 가이드 봇**으로서 여러분에게 맞는 검사를 찾아드리고 있어요. 😊 \n혹시 심리 검사를 찾고 계신다면 "성격"이나 "적성" 같은 단어로 물어봐 주세요.`,
    `그렇군요. 일상적인 대화도 좋지만, 저는 **심리 상담 가이드**라 여러분의 마음을 돌보는 데에 더 집중하고 싶어요! ✨ \n성격, 진로, 스트레스 등에 대해 궁금한 점이 있으신가요?`,
    `제가 아직 배우는 중이라 정확히 답하기 어렵네요. 😅 \n하지만 저는 **심리 검사 안내 봇**이니, **MBTI**나 **그림 검사** 등을 추천해 드릴 수 있어요.`,
    `당신의 이야기에 귀 기울이고 있어요. \n저는 **상담 가이드 봇**입니다. 혹시 마음이 복잡하시다면 적절한 심리 검사를 받아보는 건 어떨까요?`
  ];

  return { text: getRandomResponse(defaultResponses) };
};
