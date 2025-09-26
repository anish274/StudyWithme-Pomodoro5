# Pomodoro Timer for OBS

A lightweight, configurable Pomodoro timer designed to be used as a browser source in OBS Studio.

## Features

- Transparent background by default (configurable)
- Configurable via URL parameters
- Focus, short break, and long break timers
- Visual indicators for current session type
- Progress bar
- Play/Pause, Next, Reset, and Sound toggle controls
- Session counter
- Custom text display
- Configurable colors and fonts
- Chime sound when timer completes

## Usage

Add as a Browser Source in OBS:
1. In OBS, add a new "Browser" source
2. Set the URL to the GitHub Pages URL of this project with your desired parameters
3. Set width and height as needed (recommended: 400x150)
4. Check "Control audio via OBS" if you want to manage the chime sound through OBS

## URL Parameters

All parameters are optional and will use defaults if not specified:

- `focus`: Focus duration in minutes (default: 25)
- `sb`: Short break duration in minutes (default: 5)
- `lb`: Long break duration in minutes (default: 15)
- `pomodoro`: Number of focus sessions before a long break (default: 4)
- `autoStart`: Auto-start next session (1=yes, 0=no, default: 0)
- `chime`: Enable sound when timer completes (1=yes, 0=no, default: 1)
- `volume`: Chime volume (0.0-1.0, default: 0.5)
- `text`: Custom text to display (default: "Welcome to my Task")
- `color`: Text color (default: "black")
- `bgcolor`: Background color (default: "transparent")
- `font`: Font style (1-9, default: 1)

## Example URLs

Basic timer with default settings: