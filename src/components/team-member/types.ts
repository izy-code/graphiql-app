import type { ReactNode } from 'react';

interface TextInfo {
  role?: string;
  contributions?: string;
  'Short bio'?: string;
  'Tech stack'?: string;
}

export interface BlockInfoProps {
  title: string;
  classPhoto: string;
  link: string;
  textInfo: TextInfo;
  simpleText?: string[] | [];
  github?: string;
  isEvenBlock: boolean;
}

export interface BlockParagraph {
  title: string;
  content: ReactNode;
}
