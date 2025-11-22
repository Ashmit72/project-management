import React from 'react';
import { Spinner } from './ui/spinner';

type LoadingProps = {
  message?: string;
  size?: number;
  overlay?: boolean;
};

export default function Loading({
  message = 'Loading...',
  size = 16,
  overlay = false,
}: LoadingProps) {
  const containerStyle: React.CSSProperties = overlay
    ? {
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
      }
    : {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

  return (
    <div style={containerStyle}>
      <div className="text-center flex flex-col justify-center items-center gap-2">
        <Spinner variant="activity" size={size} />
        <div
          style={{ color: '#333', fontSize: size <= 20 ? 14 : size - 6 + 'px' }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
