// Add your JavaScript here 

const bgColorPicker = document.getElementById('bgColorPicker');

if (bgColorPicker) { // Check if the element exists before adding event listener
    bgColorPicker.addEventListener('input', () => {
        document.body.style.backgroundColor = bgColorPicker.value;
    });
}

const catImage = document.getElementById('catImage');
const idleSound = document.getElementById('idleSound');
const clickPurrSound = document.getElementById('clickPurrSound');

// Set volume for idle sound
if (idleSound) {
    idleSound.volume = 0.3; // Adjust this value between 0.0 (silent) and 1.0 (full volume)
}

const purrSoundFiles = [
    'Cat-Sounds/Cat-Pur-03.mp3',
    'Cat-Sounds/Cat-Pur-04.mp3',
    'Cat-Sounds/Cat-Pur-05.mp3',
    'Cat-Sounds/Cat-Pur-06.mp3',
    'Cat-Sounds/Cat-Pur-07.mp3',
    'Cat-Sounds/Cat-Pur-08.mp3'
];

if (catImage && clickPurrSound) {
    catImage.addEventListener('click', () => {
        // Play a random purr sound
        const randomIndex = Math.floor(Math.random() * purrSoundFiles.length);
        clickPurrSound.src = purrSoundFiles[randomIndex];
        clickPurrSound.load(); // Load the new sound source
        clickPurrSound.play();

        // Attempt to play idle sound if it was blocked by autoplay policy
        // Some browsers require user interaction to start any audio.
        if (idleSound && idleSound.paused) {
            idleSound.play().catch(error => console.log("Idle sound autoplay might be blocked by browser:", error));
        }
    });
}

// Optional: A global click listener to try and start the idle sound if autoplay is blocked.
// This is a common pattern for handling autoplay restrictions.
document.body.addEventListener('click', () => {
    if (idleSound && idleSound.paused) {
        idleSound.play().catch(error => console.log("Idle sound autoplay failed on body click:", error));
    }
}, { once: true }); // { once: true } ensures this listener runs only once. 