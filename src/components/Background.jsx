import React from 'react';

const Background = () => (
    <div
        style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            background: 'var(--bg)',
            pointerEvents: 'none',
        }}
    >
        <div
            style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70vw',
                height: '70vw',
                background: 'radial-gradient(circle, rgba(200,255,0,0.022) 0%, transparent 65%)',
                borderRadius: '50%',
            }}
        />
    </div>
);

export default Background;
