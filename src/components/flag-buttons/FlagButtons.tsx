import Image from 'next/image';
import type { ReactNode } from 'react';

import flag from '../../assets/images/flag.jpg';
import styles from './FlagButtons.module.scss';

export function FlagButtons(): ReactNode {
  return <Image className={styles.header_image} src={flag} alt="flag" />;
}
