// src/ThemeColors.js
import React from 'react';
import '../styles.scss'; // Import the Sass file

const ThemeColors = () => {
    return (
        <div className="theme-colors">
            <h2>Main Theme Colors</h2>
            <div className="color-swatch primary">
                Primary: #957D95
            </div>
            <div className="color-swatch secondary">
                Secondary: #ECCFC3
            </div>
            <div className="color-swatch success">
                Success: #ECB8A5
            </div>
            <div className="color-swatch info">
                Info: #E49AB0
            </div>
            <div className="color-swatch warning">
                Warning: #904C77
            </div>
        </div>
    );
};

export default ThemeColors;