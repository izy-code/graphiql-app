import Link from 'next/link';

import { useScopedI18n } from '@/locales/client';

import styles from './TeamMember.module.scss';
import type { BlockInfoProps, BlockParagraph } from './types.ts';

function InfoItem({ title, content }: BlockParagraph): JSX.Element {
  return (
    <div>
      <span className={styles.infoTitle}>{title}: </span>
      {content}
    </div>
  );
}

export function TeamMember({
  title,
  classPhoto,
  link,
  textInfo,
  simpleText,
  github,
  isEvenBlock,
}: BlockInfoProps): JSX.Element {
  const softStackItems = textInfo['Tech stack']?.split(',').map((item) => item.trim()) || [];
  const translate = useScopedI18n('teamMember');

  return (
    <div className={`${styles.blockInfo} ${isEvenBlock ? styles.rotate : ''}`}>
      <Link href={link} target="_blank">
        <div className={`${styles.imageTeam} ${styles[classPhoto]}`} />
      </Link>
      <div className={styles.textInfo}>
        <Link href={link} className={styles.titleBlock} target="_blank">
          <h2>{title} </h2>
        </Link>
        {github && (
          <div>
            <span className={styles.infoTitle}>GitHub: </span>
            <Link href={link} className={styles.link} target="_blank">
              {github}
            </Link>
          </div>
        )}
        {textInfo.role && <InfoItem title={translate('role')} content={textInfo.role} />}
        {textInfo.contributions && <InfoItem title={translate('contributions')} content={textInfo.contributions} />}
        {textInfo['Short bio'] && <InfoItem title={translate('bio')} content={textInfo['Short bio']} />}
        {textInfo['Tech stack'] && (
          <div>
            <span className={styles.infoTitle}>{translate('techStack')}</span>
            {softStackItems.map((item) => (
              <span key={item} className={styles.softStackItem}>
                {item}
              </span>
            ))}
          </div>
        )}
        {simpleText && Array.isArray(simpleText) && simpleText.map((text) => <div key={text}>{text}</div>)}
      </div>
    </div>
  );
}
