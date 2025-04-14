document.addEventListener('DOMContentLoaded', () => {
    const inputValue = document.getElementById('inputValue');
    const outputValue = document.getElementById('outputValue');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');

    // Conversion rates to RPS (requests per second)
    const conversionRates = {
        rps: 1,
        rpm: 60,        // 1 RPM = 60 RPS
        rph: 3600,      // 1 RPH = 3600 RPS
        rpd: 86400,     // 1 RPD = 86400 RPS
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
        
        // Display the formatted result directly
        outputValue.value = formatNumber(result);
    }

    // Add event listeners for real-time conversion
    inputValue.addEventListener('input', convert);
    fromUnit.addEventListener('change', convert);
    toUnit.addEventListener('change', convert);

    // Initial conversion
    convert();
}); 