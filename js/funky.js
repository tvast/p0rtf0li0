// funkyConsoleLog.js
export const colorCodes = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
  pink: '\x1b[95m', // Added pink as bright magenta (not standard but common)
};

export const funkyConsoleLog = (message, colors) => {
  // Map color codes based on color names
  const style = colors.map(color => colorCodes[color] || '').join('');
  // Log the styled message with reset at the end
  console.log(`${style}${message}${colorCodes.reset}`);
};
