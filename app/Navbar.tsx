"use client";

import ShinyText from './ShinyText';
import GooeyNav from './GooeyNav';

const navItems = [
    { label: "Trang chủ", href: "#" },
    { label: "Giới thiệu", href: "#gioi-thieu" },
    { label: "Kho biển số", href: "#kho-bien-so" },
    { label: "Định giá", href: "#dinh-gia" },
    { label: "Bài viết", href: "#bai-viet" },
];

const Navbar: React.FC = () => {
    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '16px 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(6, 0, 16, 0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(197, 160, 89, 0.1)',
            }}
        >
            {/* Left - Logo area */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    minWidth: '180px',
                }}
            >
                {/* Logo placeholder */}
                <div
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'linear-gradient(45deg, #DFBD69, #926F34)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(197, 160, 89, 0.3)',
                    }}
                >
                    <span style={{ color: '#0A2647', fontWeight: 'bold', fontSize: '18px' }}>
                        PN
                    </span>
                </div>

                {/* Brand name with ShinyText */}
                <ShinyText
                    text="Phúc Nam"
                    speed={2}
                    delay={0}
                    color="#C5A059"
                    shineColor="#DFBD69"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="brand-text"
                />
            </div>

            {/* Center - Navigation */}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <GooeyNav
                    items={navItems}
                    particleCount={15}
                    particleDistances={[90, 10]}
                    particleR={100}
                    initialActiveIndex={0}
                    animationTime={600}
                    timeVariance={300}
                    colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                />
            </div>

            {/* Right - Favorites button */}
            <div
                style={{
                    minWidth: '180px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <button
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        background: 'transparent',
                        border: '1px solid rgba(197, 160, 89, 0.5)',
                        borderRadius: '50px',
                        color: '#C5A059',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(197, 160, 89, 0.1)';
                        e.currentTarget.style.borderColor = '#C5A059';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.5)';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    {/* Heart icon */}
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span>Yêu thích</span>
                </button>
            </div>

            <style jsx>{`
        .brand-text {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
      `}</style>
        </header>
    );
};

export default Navbar;
