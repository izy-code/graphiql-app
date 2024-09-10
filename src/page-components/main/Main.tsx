'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import * as React from 'react';

import { NonProtectedPaths, ProtectedPaths } from '@/common/enums';
import { TeamMember } from '@/components/team-member/TeamMember.tsx';
import { useAuth } from '@/hooks/useAuth';
import { useScopedI18n } from '@/locales/client';

import { teamInfo, teamText } from './data.ts';
import styles from './Main.module.scss';

export default function Main(): ReactNode {
  const user = useAuth();
  const translate = useScopedI18n('main');

  return (
    <div className={styles.page}>
      <div className={styles.bigSection}>
        <h1 className={styles.welcomeTitle}>{translate('title')}</h1>
        <p>{user ? translate('signed-in', { name: user?.displayName }) : translate('welcome')}</p>
        <div className={styles.additionalInfo}>
          {user ? (
            <>
              <Link href={ProtectedPaths.REST}>{translate('links.rest')}</Link>
              <Link href={ProtectedPaths.GRAPHIQL}>{translate('links.graphiql')}</Link>
              <Link href={ProtectedPaths.HISTORY}>{translate('links.history')}</Link>
            </>
          ) : (
            <>
              <Link href={NonProtectedPaths.SIGN_IN}>{translate('links.sign-in')}</Link>
              <Link href={NonProtectedPaths.SIGN_UP}>{translate('links.sign-up')}</Link>
            </>
          )}
        </div>
      </div>

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{translate('project')}</h2>

        {teamText &&
          teamText.map((texts) => (
            <div className={styles.introParagraph} key={texts.key}>
              {texts.text}
            </div>
          ))}

        {teamInfo.map((info, index) => (
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
