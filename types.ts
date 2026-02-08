export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  attachment?: {
    type: 'mbti' | 'multi-iq';
    data: any[];
  };
}

export interface TestInfo {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
}

export enum ModalType {
  NONE,
  INFO,
}

export interface MbtiInfo {
  code: string;
  alias: string;
  description: string;
  tags: string[]; // 파싱된 이모지 등을 태그로 활용
}

export interface MultiIqInfo {
  name: string;
  description: string;
  jobs: string;
}