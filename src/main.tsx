import { ThemeProvider } from '@/components/theme-provider.tsx';
import { OnboardingPage } from '@/pages/onboarding-page';
import { ResetpasswordPage } from '@/pages/reset-password-page';
import { SigninPage } from '@/pages/signin-page.tsx';
import { SignupPage } from '@/pages/signup-page';
import AppLayout from '@/AppLayout';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        Component: AppLayout,
        children: [
          {
            path: 'onboarding',
            Component: OnboardingPage,
          },
        ],
      },
      {
        path: 'auth',
        children: [
          {
            path: 'signin',
            Component: SigninPage,
          },
          {
            path: 'signup',
            Component: SignupPage,
          },
          {
            path: 'reset-password',
            Component: ResetpasswordPage,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
