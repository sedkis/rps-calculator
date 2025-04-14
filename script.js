document.addEventListener('DOMContentLoaded', () => {
    const inputValue = document.getElementById('inputValue');
    const outputValue = document.getElementById('outputValue');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const inputReadable = document.getElementById('inputReadable');

    // Conversion rates to RPS (requests per second)
    const conversionRates = {
        rps: 1,
        rpm: 60,        // 1 RPM = 60 RPS
        rph: 3600,      // 1 RPH = 3600 RPS
        rpd: 86400,     // 1 RPD = 86400 RPS
        rpmth: 2592000, // 1 RPMth = 2592000 RPS (30 days)
        rpy: 31536000   // 1 RPY = 31536000 RPS
    };

    function formatNumber(num) {
        if (Math.abs(num) >= 1e9) {
            return num.toExponential(2);
        }
        return num.toLocaleString(undefined, {
            maximumFractionDigits: 2
        });
    }

    function getHumanReadableNumber(num) {
        const absNum = Math.abs(num);
        if (absNum >= 1e12) {
            return `${(num / 1e12).toFixed(2)} trillion`;
        } else if (absNum >= 1e9) {
            return `${(num / 1e9).toFixed(2)} billion`;
        } else if (absNum >= 1e6) {
            return `${(num / 1e6).toFixed(2)} million`;
        } else if (absNum >= 1e3) {
            return `${(num / 1e3).toFixed(2)} thousand`;
        } else {
            return num.toFixed(2);
        }
    }

    function formatInput(value) {
        // Remove all non-numeric characters except decimal point
        const numericValue = value.replace(/[^\d.]/g, '');
        
        // Ensure only one decimal point
        const parts = numericValue.split('.');
        if (parts.length > 2) {
            parts.pop();
        }
        
        // Format the whole number part with commas
        const wholeNumber = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        // Reconstruct the number with decimal if it exists
        return parts.length > 1 ? `${wholeNumber}.${parts[1]}` : wholeNumber;
    }

    function updateInputReadable() {
        const input = parseFloat(inputValue.value.replace(/,/g, ''));
        if (!isNaN(input)) {
            inputReadable.textContent = `(${getHumanReadableNumber(input)})`;
        } else {
            inputReadable.textContent = '';
        }
    }

    function convert() {
        // Remove commas and parse the input value
        const input = parseFloat(inputValue.value.replace(/,/g, ''));
        
        if (isNaN(input)) {
            outputValue.value = '';
            return;
        }

        const fromRate = conversionRates[fromUnit.value];
        const toRate = conversionRates[toUnit.value];
        
        // Calculate the result
        const result = input * (toRate / fromRate);
        
        // Display the formatted result with human readable format
        outputValue.value = `${formatNumber(result)} (${getHumanReadableNumber(result)})`;
    }

    // Format input as user types
    inputValue.addEventListener('input', (e) => {
        const cursorPosition = e.target.selectionStart;
        const oldLength = e.target.value.length;
        
        // Format the input
        e.target.value = formatInput(e.target.value);
        
        // Adjust cursor position
        const newLength = e.target.value.length;
        const newPosition = cursorPosition + (newLength - oldLength);
        e.target.setSelectionRange(newPosition, newPosition);
        
        // Update input readable format
        updateInputReadable();
        
        // Perform conversion
        convert();
    });

    // Add event listeners for unit changes
    fromUnit.addEventListener('change', convert);
    toUnit.addEventListener('change', convert);

    // Initial conversion
    convert();
}); 