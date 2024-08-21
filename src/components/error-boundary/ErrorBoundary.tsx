'use client';

import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

import { ErrorPage } from '@/components/error-page/ErrorPage';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage: string;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message || error.toString() };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    let errorContent = `Error boundary caught error: ${error.message}`;

    if (info.componentStack) {
      errorContent += `\nComponent stack: ${info.componentStack}`;
    }

    console.error(errorContent);
  }

  public render(): ReactNode {
    const { hasError, errorMessage } = this.state;
    const { children } = this.props;

    if (hasError) {
      return <ErrorPage errorBoundaryMessage={errorMessage} />;
    }

    return children;
  }
}
