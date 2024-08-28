import Link from 'next/link';

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
  const softStackItems = textInfo['Soft stack']?.split(',').map((item) => item.trim()) || [];

  return (
    <div className={`${styles.blockInfo} ${isEvenBlock ? styles.rotate : ''}`}>
      <Link href={link} target="_blank">
        <div className={`${styles.imageCommand} ${styles[classPhoto]}`} />
      </Link>
      <div className={styles.textInfo}>
        <Link href={link} className={styles.titleBlock} target="_blank">
          <h2>{title} </h2>
        </Link>
        {github && (
          <div>
            <span className={styles.infoTitle}>Github: </span>
            <Link href={link} className={styles.link} target="_blank">
              {github}
            </Link>
          </div>
        )}
        {textInfo.role && <InfoItem title="Role" content={textInfo.role} />}
        {textInfo.contributions && <InfoItem title="Contributions" content={textInfo.contributions} />}
        {textInfo['Short bio'] && <InfoItem title="Short bio" content={textInfo['Short bio']} />}
        {textInfo['Soft stack'] && (
          <div>
            <span className={styles.infoTitle}>Soft stack: </span>
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

export default TeamMember;
