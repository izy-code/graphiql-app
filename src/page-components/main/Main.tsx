'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import * as React from 'react';

import { NonProtectedPaths, ProtectedPaths } from '@/common/enums';
import { TeamMember } from '@/components/team-member/TeamMember.tsx';
import { useAuth } from '@/hooks/useAuth';

import { commandInfo, teamText } from './data.ts';
import styles from './Main.module.scss';

export default function Main(): ReactNode {
  const { user } = useAuth();

  return (
    <div className={styles.page}>
      <div className={styles.bigSection}>
        <h1 className={styles.welcomeTitle}>REST/GraphiQL client</h1>
        <p>{user ? `Welcome back, ${user?.displayName}!` : 'Welcome, please sign in.'}</p>
        <div className={styles.additionalInfo}>
          {user ? (
            <>
              <Link href={ProtectedPaths.REST}>REST Client</Link>
              <Link href={ProtectedPaths.GRAPHIQL}>GraphiQL Client</Link>
              <Link href={ProtectedPaths.HISTORY}>History</Link>
            </>
          ) : (
            <>
              <Link href={NonProtectedPaths.SIGN_IN}>Sign in</Link>
              <Link href={NonProtectedPaths.SIGN_UP}>Sign up</Link>
            </>
          )}
        </div>
      </div>

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}> Team information</h2>

        {teamText &&
          teamText.map((texts) => (
            <div className={styles.introParagraph} key={texts.key}>
              {texts.text}
            </div>
          ))}

        {commandInfo.map((info, index) => (
          <TeamMember
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
  );
}
