import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@/components/theme-provider.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SigninPage } from '@/pages/signin-page.tsx';
import { RootLayout } from '@/RootLayout';
import { SignupPage } from '@/pages/signup-page';
import { ResetpasswordPage } from '@/pages/reset-password-page';
import { OnboardingPage } from '@/pages/onboarding-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/signin',
    element: <SigninPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/reset-password',
    element: <ResetpasswordPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
