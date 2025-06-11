import * as THREE from 'three';

class Media3DUtility {
    constructor(options = {}) {
        const {
            videoPath,
            audioPath,
            videoDimensions = { width: 16, height: 9 },
            audioVolume = 0.5,
            cameraPosition = { x: 0, y: 0, z: 5 }
        } = options;

        this.videoPath = videoPath;
        this.audioPath = audioPath;
        this.videoDimensions = videoDimensions;
        this.audioVolume = audioVolume;

        // Initialize scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.initMedia();
    }

    // Initialize video and audio
    initMedia() {
        this.loadVideo();
        this.loadAudio();
        this.animate();
    }

    // Load and display video
    loadVideo() {
        const video = document.createElement('video');
        video.src = this.videoPath;
        video.load();
        video.play();
        video.loop = true;

        const texture = new THREE.VideoTexture(video);
        const geometry = new THREE.PlaneGeometry(this.videoDimensions.width, this.videoDimensions.height);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        this.videoMesh = new THREE.Mesh(geometry, material);
        this.videoMesh.position.set(0, 0, -5); // Position it in front of the camera
        this.scene.add(this.videoMesh);
    }

    // Load and play audio
    loadAudio() {
        const listener = new THREE.AudioListener();
        this.camera.add(listener);

        const sound = new THREE.Audio(listener);
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load(this.audioPath, (buffer) => {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(this.audioVolume);
            sound.play();
        });
    }

    // Animation loop
    animate() {
        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
}

// Usage example
const media3D = new Media3DUtility({
    videoPath: 'path/to/your/video.mp4', // Specify your video path
    audioPath: 'path/to/your/audio.mp3', // Specify your audio path
    videoDimensions: { width: 16, height: 9 },
    audioVolume: 0.5,
    cameraPosition: { x: 0, y: 0, z: 5 }
});