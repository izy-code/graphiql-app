import '@testing-library/jest-dom/vitest';

import { cwd } from 'node:process';

import { loadEnvConfig } from '@next/env';

import { firebaseMock, navigationMock } from '@/utils/test-utils';

import { server } from './msw/server';

loadEnvConfig(cwd());

navigationMock();
firebaseMock();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
