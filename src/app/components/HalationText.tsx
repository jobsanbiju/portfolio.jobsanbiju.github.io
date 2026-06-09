import React from 'react';

export interface HalationTextProps {
  children: React.ReactNode;
  glowColor?: string;
  blurAmount?: string | number;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function HalationText({
  children,
  glowColor = 'rgba(255,90,90,1)',
  blurAmount = '8px',
  opacity = 0.5,
  className,
  style,
}: HalationTextProps) {
  const blur = typeof blurAmount === 'number' ? `${blurAmount}px` : blurAmount;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    lineHeight: 'inherit',
    textAlign: 'inherit',
    isolation: 'isolate',
    ...style,
  };

  const blurNum = Math.max(1, parseFloat(String(blur).replace('px', '')) || 8);

  const glowTextShadow = [
    `0 0 ${Math.max(2, Math.round(blurNum / 3))}px rgba(255,255,255,0.6)`,
    `0 0 ${Math.max(6, Math.round(blurNum * 0.9))}px ${glowColor.replace(/rgba?\(|\)/g, '').split(',').slice(0,3).join(',')},` + ` ${Math.min(0.55, opacity)}`,
  ].join(', ');

  const glowStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    color: glowColor,
    filter: `blur(${blur})`,
    WebkitFilter: `blur(${blur})`,
    opacity: opacity,
    transform: 'translateZ(0) scale(1.03)',
    pointerEvents: 'none',
    whiteSpace: 'inherit',
    display: 'inline-block',
    textAlign: 'inherit',
    mixBlendMode: 'screen',
    zIndex: 0,
    willChange: 'filter, opacity, transform',
    // layered soft shadows for consistent halation across stacking contexts
    textShadow: glowTextShadow,
  };

  const mainStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    color: 'inherit',
    zIndex: 1,
    // subtle layered shadow on main text to ensure visible halation on dark backgrounds
    textShadow: `0 0 ${Math.max(2, Math.round(blurNum / 4))}px rgba(255,255,255,0.06), 0 0 ${Math.max(6, Math.round(blurNum / 2))}px rgba(255,90,90,0.14)`,
  };

  return (
    <span className={className} style={containerStyle}>
      <span aria-hidden style={glowStyle} className="halation-glow">{children}</span>
      <span style={mainStyle} className="halation-main">{children}</span>
    </span>
  );
}
