import styles from './ColorPicker.module.css';
import { useState, useRef } from 'react';
import clickSound from '/src/assets/click.wav';
import soundEnableImage from '/src/assets/soundEnable.png';
import soundDisableImage from '/src/assets/soundDisable.png';

function ColorPicker() {

    const [pickedColor, setPickedColor] = useState('#000000');
    const [predefinedPickedColor, setPredefinedPickedColor] = useState('red');
    const isSoundOn = useRef(true);
    const soundImageRef = useRef(null);

    const toggleSound = () => {
        isSoundOn.current = !isSoundOn.current;
        //Change sound image based on sound state
        soundImageRef.current.src = isSoundOn.current ? soundEnableImage : soundDisableImage;
        playSound();
    }

    const handleCustomColorPick = (e) => {
        setPickedColor(e.target.value);
        console.log(e.target.value);
    }

    const handleOnMouseOver = (e) => {
        playSound();
    }

    const handleColorPickerClick = () => {
        playSound();
    }
    
    const playSound = () => {
        if(!isSoundOn.current) return;

        const colorPickerFocusSfx = new Audio(clickSound);
        colorPickerFocusSfx.play();
    }

    const isColorLight = (hex) => {
        const rgb = hexToRgb(hex);
        if (!rgb) return false;

        const [r, g, b] = rgb
            .match(/\d+/g)
            .map(Number); // Extract RGB values as numbers
        // Calculate brightness using the formula
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 155; // Threshold for determining light vs. dark
    };

    const handlePredefinedColorPick = (pickedColor) => {
        setPredefinedPickedColor(pickedColor);
    }

    const hexToRgb = (hex) => {
        if (!hex) return;

        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        return `rgb(${r}, ${g}, ${b})`;
    };

    const hexToHsl = (hex) => {
        if (!hex) return;

        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex[1] + hex[2], 16) / 255;
            g = parseInt(hex[3] + hex[4], 16) / 255;
            b = parseInt(hex[5] + hex[6], 16) / 255;
        }
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    };

    return (
        <>
            <div className={styles['navbar']}>
                <div className={`${styles['app-title']} ${styles['navbar-item']}`}>Color Picker</div>
                <div className={styles['navbar-item']}>
                    <img className={styles['img-sound-toggle']} ref={soundImageRef} onClick={toggleSound} src={soundEnableImage} alt="" />
                </div>
            </div>
            <div className={styles['container']}>
                <div className={styles['custom-color-select-container']}>
                    <h2>Select Custom Color</h2>
                    <div className={styles['picked-color']} style={{ backgroundColor: pickedColor, color: isColorLight(pickedColor) ? '#000000' : '#FFFFFF' }}>
                        <p>{pickedColor}</p>
                        <p>{hexToHsl(pickedColor)}</p>
                        <p>{hexToRgb(pickedColor)}</p>
                    </div>
                    <div className={styles['color-picker']}>
                        <input value={pickedColor} onBlur={handleColorPickerClick} onClick={handleColorPickerClick} onChange={handleCustomColorPick} type="color" />
                    </div>
                </div>

                <div className={styles['predefined-color-container']}>
                    <h2>Select Predefined colors</h2>
                    <div className={styles['predefined-picked-color']} style={{ backgroundColor: predefinedPickedColor, color: isColorLight(predefinedPickedColor) ? '#000000' : '#FFFFFF' }}>
                        <p>{predefinedPickedColor}</p>
                    </div>
                    <div className={styles['color-options']}>
                        <div onClick={() => handlePredefinedColorPick('red')} onMouseOver={handleOnMouseOver} className={`${styles['color-option']} ${styles['color-option-red']}`}></div>
                        <div onClick={() => handlePredefinedColorPick('blue')} onMouseOver={handleOnMouseOver} className={`${styles['color-option']} ${styles['color-option-blue']}`}></div>
                        <div onClick={() => handlePredefinedColorPick('orange')} onMouseOver={handleOnMouseOver} className={`${styles['color-option']} ${styles['color-option-orange']}`}></div>
                        <div onClick={() => handlePredefinedColorPick('brown')} onMouseOver={handleOnMouseOver} className={`${styles['color-option']} ${styles['color-option-brown']}`}></div>
                        <div onClick={() => handlePredefinedColorPick('yellow')} onMouseOver={handleOnMouseOver} className={`${styles['color-option']} ${styles['color-option-yellow']}`}></div>
                        <div onClick={() => handlePredefinedColorPick('purple')} onMouseOver={handleOnMouseOver} className={`${styles['color-option']} ${styles['color-option-purple']}`}></div>
                        <div onClick={() => handlePredefinedColorPick('black')} onMouseOver={handleOnMouseOver} className={`${styles['color-option']} ${styles['color-option-black']}`}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ColorPicker;