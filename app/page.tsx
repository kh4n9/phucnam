"use client";

import LightRays from './LightRays';

export default function Home() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', backgroundColor: '#060010' }}>
      <LightRays
        raysOrigin="top-center"
        raysColor="#144272"
        raysSpeed={1}
        lightSpread={0.5}
        rayLength={3}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        className="custom-rays"
        pulsating={false}
        fadeDistance={1}
        saturation={1}
      />
    </div>
  );
}
