document.addEventListener('DOMContentLoaded', () => {
    const inputValue = document.getElementById('inputValue');
    const fromUnit = document.getElementById('fromUnit');
    const inputReadable = document.getElementById('inputReadable');
    const resultsContainer = document.getElementById('results');

    const units = [
        { key: 'rps', label: 'Requests per Second' },
        { key: 'rpm', label: 'Requests per Minute' },
        { key: 'rph', label: 'Requests per Hour' },
        { key: 'rpd', label: 'Requests per Day' },
        { key: 'rpmth', label: 'Requests per Month' },
        { key: 'rpy', label: 'Requests per Year' },
    ];

    // Conversion rates to RPS (requests per second)
    const conversionRates = {
        rps: 1,
        rpm: 60,
        rph: 3600,
        rpd: 86400,
        rpmth: 2592000,
        rpy: 31536000
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
        const numericValue = value.replace(/[^\d.]/g, '');
        const parts = numericValue.split('.');
        if (parts.length > 2) {
            parts.pop();
        }
        const wholeNumber = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
        const input = parseFloat(inputValue.value.replace(/,/g, ''));
        const fromRate = conversionRates[fromUnit.value];

        resultsContainer.innerHTML = units
            .filter(u => u.key !== fromUnit.value)
            .map(u => {
                const toRate = conversionRates[u.key];
                const result = isNaN(input) ? 0 : input * (toRate / fromRate);
                const valueText = isNaN(input) ? '—' : formatNumber(result);
                const readableText = isNaN(input) ? '' : `(${getHumanReadableNumber(result)})`;

                return `<div class="result-row">
                    <span class="result-label">${u.label}</span>
                    <span class="result-value">${valueText}</span>
                    <span class="result-readable">${readableText}</span>
                </div>`;
            })
            .join('');
    }

    inputValue.addEventListener('input', (e) => {
        const cursorPosition = e.target.selectionStart;
        const oldLength = e.target.value.length;
        e.target.value = formatInput(e.target.value);
        const newLength = e.target.value.length;
        const newPosition = cursorPosition + (newLength - oldLength);
        e.target.setSelectionRange(newPosition, newPosition);
        updateInputReadable();
        convert();
    });

    fromUnit.addEventListener('change', convert);

    convert();
});
