# StudyWithMe Pomodoro Timer

This is a lightweight and customizable Pomodoro timer designed for use with OBS (Open Broadcaster Software) and easily deployable on GitHub Pages. It helps you manage your focus and break times with visual and auditory cues.

## Features

*   **Customizable Timer Durations**: Set focus, short break, and long break times.
*   **Pomodoro Cycles**: Configure the number of focus sessions before a long break.
*   **Auto-Start Option**: Automatically start the next session (focus or break).
*   **Sound Notifications**: Chime sound at the end of each session.
*   **Visual Indicators**: Clearly shows the current session type (Focus, Short Break, Long Break) and a progress bar.
*   **Persistent State**: Your timer's state is saved locally, so you can close and reopen the page without losing progress.
*   **Custom Text Display**: Show a custom message or task name on the timer.
*   **Customizable Colors and Fonts**: Adjust the text color, background color, and font family via URL parameters.
*   **Responsive Design**: Adapts to different screen sizes, suitable for OBS browser sources.
*   **Control Buttons**: Play/Pause, Next Session, Reset, and Sound Toggle.

## Usage with OBS

1.  **Deploy to GitHub Pages**: Host this project on GitHub Pages for easy access.
2.  **Add a Browser Source**: In OBS, add a new "Browser" source.
3.  **Enter the URL**: Use the URL of your deployed Pomodoro timer (e.g., `https://yourusername.github.io/your-repo-name/`).
4.  **Adjust Size**: Set the width and height of the browser source to fit your OBS scene.
5.  **Customize (Optional)**: Use URL parameters to customize the timer's appearance and behavior.

## URL Parameters

You can customize the timer by adding parameters to the URL. Here's a list of available parameters:

*   `focus`: Focus session duration in minutes (default: 25).
*   `sb`: Short break duration in minutes (default: 5).
*   `lb`: Long break duration in minutes (default: 15).
*   `pomodoro`: Number of focus sessions before a long break (default: 4).
*   `autoStart`: Set to `1` to auto-start the timer, `0` otherwise (default: 0).
*   `chime`: Set to `1` to enable sound, `0` to disable (default: 1).
*   `volume`: Sound volume (0.0 to 1.0, default: 0.5).
*   `text`: Custom text to display (e.g., `text=My%20Study%20Session`).
*   `color`: Text color (e.g., `color=red` or `color=%23FF0000`).
*   `bgcolor`: Background color (e.g., `bgcolor=blue` or `bgcolor=%230000FF`). Note: The widget has a gradient background, this parameter affects the overall color scheme.
*   `font`: Font family (1-9, see `styles.css` for options, default: 1 - Arial).

### Example URLs

*   **Basic timer with default settings:**
    `https://yourusername.github.io/your-repo-name/`

*   **Custom focus (45 min), short break (10 min), auto-start, and custom text:**
    `https://yourusername.github.io/your-repo-name/?focus=45&sb=10&autoStart=1&text=Deep%20Work%20Session`

*   **Custom colors and font:**
    `https://yourusername.github.io/your-repo-name/?color=%23FFFFFF&bgcolor=%23333333&font=5`

## Local Development

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```
2.  **Open `index.html`:**
    Simply open the `index.html` file in your web browser. No server is required for basic functionality.

## Project Structure
├── README.md
├── icons/
│   ├── bell-off.svg
│   ├── bell.svg
│   ├── coffee.svg
│   ├── next.svg
│   ├── pause.svg
│   ├── play.svg
│   ├── reset.svg
│   ├── tomato.svg
│   ├── walking.svg
│   └── walking1.svg
├── index.html
├── script.js
├── sounds/
│   └── chime.mp3
└── styles.css
