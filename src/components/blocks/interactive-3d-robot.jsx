import React from 'react';
import Spline from '@splinetool/react-spline';

export function InteractiveRobotSpline({ scene, className }) {
    return (
        <div className={className}>
            <Spline scene={scene} />
        </div>
    );
}
