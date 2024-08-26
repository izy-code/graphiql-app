'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import * as React from 'react';

import { CommandBlock } from '../command-block/CommandBlock.tsx';
import { CustomMuiButton } from '../custom-mui-button/CustomMuiButton.tsx';
import { commandInfo } from './data.ts';
import styles from './Welcome.module.scss';

export function Welcome(): ReactNode {
  const router = useRouter();
  const [userName] = React.useState('Alex');
  let welcomeString = 'Welcome';
  welcomeString += userName !== '' ? ` Back, ${userName}!` : '!';

  return (
    <main className="main">
      <div className={styles.welcome}>
        <h1 className={styles.welcomeTitle}>{welcomeString}</h1>
        {userName === '' ? (
          <div className={styles.additionalInfo}>
            <CustomMuiButton onClick={() => router.push('/sign-in')}>Sign In</CustomMuiButton>
            <CustomMuiButton onClick={() => router.push('/sign-up')}>Sign Up</CustomMuiButton>
          </div>
        ) : (
          <div>
            <div className={styles.additionalInfo}>
              <CustomMuiButton onClick={() => router.push('/rest')}>REST Client</CustomMuiButton>
              <CustomMuiButton onClick={() => router.push('/graph')}>GraphiQL Client</CustomMuiButton>
              <CustomMuiButton onClick={() => router.push('/history')}>History</CustomMuiButton>
            </div>
          </div>
        )}
      </div>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Command</h2>
        {commandInfo.map((info, index) => (
          <CommandBlock
            key={info.classPhoto}
            title={info.title}
            classPhoto={info.classPhoto}
            link={info.link}
            textInfo={info.textInfo}
            simpleText={info.simpleText}
            github={info.github}
            isEvenBlock={(index + 1) % 2 === 0}
          />
        ))}
      </div>
    </main>
  );
}
