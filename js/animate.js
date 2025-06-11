import { funkyConsoleLog, colorCodes } from './funky.js';

    export default function startAsciiAnimation() {
        // Angles, Radius, and Constants
        let A = 1000;
        let B = 100;
        const rainbowColors = [
            '\x1b[0m',  // reset
            '\x1b[1m',  // bold
            '\x1b[31m', // red
            '\x1b[32m', // green
            '\x1b[33m', // yellow
            '\x1b[34m', // blue
            '\x1b[35m', // magenta
            '\x1b[36m', // cyan
            '\x1b[37m', // white
            '\x1b[41m', // bgRed
            '\x1b[42m', // bgGreen
            '\x1b[43m', // bgYellow
            '\x1b[44m', // bgBlue
            '\x1b[45m', // bgMagenta
            '\x1b[46m', // bgCyan
            '\x1b[47m'  // bgWhite
        ];

    
        // Function to render ASCII frame with colorful characters
        function renderAsciiFrame() {
            const b = []; // Array to store ASCII chars
            const z = []; // Array to store depth values
    
            const width = process.stdout.columns || 80; // Get terminal width
            const height = process.stdout.rows || 24; // Get terminal height
            const availableHeight = height - 3; // Leave space for URL and status
    
            A += 0.07; // Increment angle A
            B += 0.03; // Increment angle B
    
            // Sin and Cosine of angles
            const cA = Math.cos(A);
            const sA = Math.sin(A);
            const cB = Math.cos(B);
            const sB = Math.sin(B);
    
            // Initialize arrays with default values
            for (let k = 0; k < width * availableHeight; k++) {
                b[k] = k % width === width - 1 ? '\n' : ' '; // Set default ASCII char
                z[k] = 0; // Set default depth
            }
    
            // Generate the ASCII frame
            for (let j = 0; j < 6.28; j += 0.07) {
                const ct = Math.cos(j); // Cosine of j
                const st = Math.sin(j); // Sin of j
    
                for (let i = 0; i < 6.28; i += 0.02) {
                    const sp = Math.sin(i); // Sin of i
                    const cp = Math.cos(i); // Cosine of i
                    const h = ct + 2; // Height calculation
                    const D = 1 / (sp * h * sA + st * cA + 5); // Distance calculation
                    const t = sp * h * cA - st * sA; // Temporary variable
    
                    // Calculate coordinates of ASCII char
                    const x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
                    const y = Math.floor(availableHeight / 2 + (availableHeight / 4) * D * (cp * h * sB + t * cB));
    
                    // Calculate the index in the array
                    const o = x + width * y;
    
                    // Calculate the ASCII char index
                    const N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
    
                    // Update ASCII char and depth if conditions are met
                    if (y < availableHeight && y >= 0 && x >= 0 && x < width && D > z[o]) {
                        z[o] = D;
                        // Use rainbow colors for the ASCII characters
                        const colorIndex = Math.floor((N + 8) / 2) % rainbowColors.length; // Use N to determine color
                        b[o] = `${rainbowColors[colorIndex]}${'.,-~:;=!*#$@'[N > 0 ? N : 0]}${colorCodes.reset}`; // Colorful ASCII char
                    }
                }
            }
    
            // Clear the terminal before printing
            console.clear();
            process.stdout.write('\x1B[H'); // Move cursor to the top-left corner
            process.stdout.write(b.join('')); // Output the ASCII art
        }
    
        // Function to start the ASCII animation
        function startAnimation() {
            setInterval(() => {
                renderAsciiFrame(); // Render the ASCII frame
            }, 50); // Update every 50ms
    
            // Log the clickable URL and planet message without stopping the animation
            const devServerUrl = 'http://localhost:3000'; // Example dev server URL
            console.log(`${colorCodes.cyan}Click here to view the Dev Server: ${devServerUrl}${colorCodes.reset}`);
    
            // Log the application status
            const appStatus = "App is running smoothly!"; // Example status message
            console.log(`${colorCodes.green}${appStatus}${colorCodes.reset}`);
    
            // Log the dinosaur message after starting the animation
            setTimeout(() => {
                funkyConsoleLog("Vintage Dinosaurs are cool! 🦖", ['green']); // Display the dinosaur message in green
            }, 2000); // Log message after 2 seconds
        }
    
        startAnimation(); // Start the animation
    }
