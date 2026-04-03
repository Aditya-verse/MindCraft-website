
export interface OCRState {
  image: string | null;
  extractedText: string;
  summaryText: string | null;
  isProcessing: boolean;
  isSummarizing: boolean;
  error: string | null;
  language: string;
  autoDetect: boolean;
  history: ScanEntry[];
  activeTab: 'scan' | 'history';
}

export interface ScanEntry {
  id: string;
  timestamp: number;
  text: string;
  thumbnail: string;
}

export enum OCRActionType {
  SET_IMAGE = 'SET_IMAGE',
  SET_TEXT = 'SET_TEXT',
  SET_SUMMARY = 'SET_SUMMARY',
  SET_PROCESSING = 'SET_PROCESSING',
  SET_SUMMARIZING = 'SET_SUMMARIZING',
  SET_ERROR = 'SET_ERROR',
  SET_LANGUAGE = 'SET_LANGUAGE',
  TOGGLE_AUTO_DETECT = 'TOGGLE_AUTO_DETECT',
  ADD_TO_HISTORY = 'ADD_TO_HISTORY',
  DELETE_HISTORY_ITEM = 'DELETE_HISTORY_ITEM',
  SET_HISTORY = 'SET_HISTORY',
  SET_TAB = 'SET_TAB',
  CLEAR_ALL = 'CLEAR_ALL'
}

export type OCRAction =
  | { type: OCRActionType.SET_IMAGE; payload: string | null }
  | { type: OCRActionType.SET_TEXT; payload: string }
  | { type: OCRActionType.SET_SUMMARY; payload: string | null }
  | { type: OCRActionType.SET_PROCESSING; payload: boolean }
  | { type: OCRActionType.SET_SUMMARIZING; payload: boolean }
  | { type: OCRActionType.SET_ERROR; payload: string | null }
  | { type: OCRActionType.SET_LANGUAGE; payload: string }
  | { type: OCRActionType.TOGGLE_AUTO_DETECT }
  | { type: OCRActionType.ADD_TO_HISTORY; payload: ScanEntry }
  | { type: OCRActionType.DELETE_HISTORY_ITEM; payload: string }
  | { type: OCRActionType.SET_HISTORY; payload: ScanEntry[] }
  | { type: OCRActionType.SET_TAB; payload: 'scan' | 'history' }
  | { type: OCRActionType.CLEAR_ALL };










  