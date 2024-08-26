'use client';

import type { ReactNode } from 'react';
import * as React from 'react';

import { CommandBlock } from '../command-block/CommandBlock.tsx';
import { commandInfo } from './data.ts';
import styles from './Welcome.module.scss';

export function Welcome(): ReactNode {
  const [userName] = React.useState('Alex');
  let welcomeString = 'Welcome';
  welcomeString += userName !== '' ? ` Back, ${userName}!` : '!';

  return (
    <main className="main">
      <div className={styles.welcome}>
        <h1>{welcomeString}</h1>
        {userName === '' ? (
          <div>
            <button>Sign In</button>
            <button>Sign Up</button>
          </div>
        ) : (
          <div>
            <div className={styles.additionalInfo}>
              <button>REST Client</button>
              <button>GraphiQL Client</button>
              <button>History</button>
            </div>
          </div>
        )}

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
      </div>
    </main>
  );
}
