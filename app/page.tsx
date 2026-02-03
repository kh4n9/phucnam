"use client";

import LightRays from './LightRays';
import Navbar from './Navbar';

export default function Home() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative', backgroundColor: '#060010' }}>
      {/* Navbar */}
      <Navbar />

      {/* LightRays Background */}
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
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

      {/* Main Content Area */}
      <main style={{ position: 'relative', zIndex: 1, paddingTop: '100px' }}>
        {/* Content will go here */}
      </main>
    </div>
  );
}
