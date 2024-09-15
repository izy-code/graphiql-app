'use client';

import Link from 'next/link';
import { type ReactNode, useEffect, useMemo } from 'react';

import { STORE_RESET } from '@/common/constants';
import { NonProtectedPaths, ProtectedPaths } from '@/common/enums';
import { TeamMember } from '@/components/team-member/TeamMember.tsx';
import { useAppDispatch } from '@/hooks/store-hooks';
import { useAuth } from '@/hooks/useAuth';
import { useScopedI18n } from '@/locales/client';

import styles from './Main.module.scss';

export default function Main(): ReactNode {
  const user = useAuth();
  const translate = useScopedI18n('main');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: STORE_RESET });
  }, [dispatch]);

  const teamInfo = useMemo(
    () => [
      {
        title: translate('team.name-1'),
        classPhoto: 'imageIzy',
        link: 'https://github.com/izy-code',
        textInfo: {
          role: translate('team.role-1'),
          contributions: translate('team.contributions-1'),
          'Short bio': translate('team.bio-1'),
          'Tech stack':
            'CSS, Sass, HTML, JavaScript, Java, TypeScript, Webpack, Vite, Jest, Vitest, React, Next, Redux, Remix',
        },
        github: 'izy-code',
        simpleText: [],
      },
      {
        title: translate('team.name-2'),
        classPhoto: 'imageVadim',
        link: 'https://github.com/VadimKol',
        textInfo: {
          role: translate('team.role-2'),
          contributions: translate('team.contributions-2'),
          'Short bio': translate('team.bio-2'),
          'Tech stack': 'CSS, Sass, SQL, HTML, JavaScript, TypeScript, Webpack, Vite, Jest, Vitest, React, Next, Redux',
        },
        github: 'vadimkol',
        simpleText: [],
      },
      {
        title: translate('team.name-3'),
        classPhoto: 'imageAlex',
        link: 'https://github.com/BodnarAlex',
        textInfo: {
          role: translate('team.role-3'),
          contributions: translate('team.contributions-3'),
          'Short bio': translate('team.bio-3'),
          'Tech stack':
            'PHP, C++, Python, Wordpress, CSS, Sass, HTML, JavaScript, TypeScript, Webpack, Vite, React, Next, Redux',
        },
        github: 'bodnaralex',
        simpleText: [],
      },
      {
        title: 'Rolling Scopes School',
        classPhoto: 'imageRss',
        link: 'https://rs.school',
        textInfo: {},
        simpleText: [translate('rs-1'), translate('rs-2'), translate('rs-3')],
        github: '',
      },
    ],
    [translate],
  );

  const getWelcomeMessage = (): string => {
    if (user) {
      if (user.displayName) {
        return translate('signed-in', { name: user.displayName });
      }
      return translate('signed-up');
    }
    return translate('welcome');
  };

  return (
    <div className={styles.page}>
      <div className={styles.bigSection}>
        <h1 className={styles.welcomeTitle}>{translate('title')}</h1>
        <p>{getWelcomeMessage()}</p>
        <div className={styles.additionalInfo}>
          {user ? (
            <>
              <Link href={ProtectedPaths.REST}>{translate('links.rest')}</Link>
              <Link href={ProtectedPaths.GRAPHQL}>{translate('links.graphql')}</Link>
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
        <p className={styles.projectInfo}>{translate('project-info')}</p>
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
