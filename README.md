# RPS Calculator

A simple web-based calculator for converting between different rates of requests per second (RPS) units.

## Features

- Convert between different RPS units:
  - Requests per Second (RPS)
  - Requests per Minute (RPM)
  - Requests per Hour (RPH)
  - Requests per Day (RPD)
  - Requests per Year (RPY)
- Real-time conversion
- Clean, modern interface
- Mobile-responsive design

## Usage

1. Open `index.html` in your web browser
2. Enter a value in the input field
3. Select the source unit (from)
4. Select the target unit (to)
5. The conversion result will appear automatically

## Technical Details

The calculator uses the following conversion rates (all relative to RPS):
- RPM = RPS × 60
- RPH = RPS × 3600
- RPD = RPS × 86400
- RPY = RPS × 31536000

## Browser Support

The calculator works in all modern browsers that support ES6+ JavaScript features. 