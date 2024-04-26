import React, { Component } from 'react';
import './Photoboot.css'; // Import the CSS file


class Photoboot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureTaken: false,
            pictureDataURL: '',
            cameraEnabled: true, // Enable camera by default
            pictureURLs: [], // Array to store picture URLs
            currentSlideIndex: 0 // Index of the current slide
        };
        this.videoRef = React.createRef();
    }s

    componentDidMount() {
        // Automatically enable camera when the component mounts
        this.enableCamera();
    }

    enableCamera = () => {
        this.setState({ cameraEnabled: true });
    };

    takePicture = () => {
        const video = this.videoRef.current;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && this.state.cameraEnabled) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    video.srcObject = stream;
                    video.play();
                })
                .catch((err) => {
                    console.error('Error accessing camera:', err);
                });
        }
    };

    handleOK = () => {
        const video = this.videoRef.current;
        if (this.state.cameraEnabled) {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/jpeg');
            const updatedURLs = [...this.state.pictureURLs, dataURL]; // Add the new picture URL to the array
            this.setState({ pictureTaken: true, pictureDataURL: dataURL, cameraEnabled: false, pictureURLs: updatedURLs });
    
            // Stop camera stream if srcObject is not null
            if (video.srcObject) {
                video.srcObject.getTracks().forEach(track => track.stop());
            }
        }
    };
    
    retakePicture = () => {
        this.setState({ pictureTaken: false, pictureDataURL: '', cameraEnabled: true });
    };

    prevSlide = () => {
        this.setState(prevState => ({
            currentSlideIndex: (prevState.currentSlideIndex - 1 + prevState.pictureURLs.length) % prevState.pictureURLs.length
        }));
    };

    nextSlide = () => {
        this.setState(prevState => ({
            currentSlideIndex: (prevState.currentSlideIndex + 1) % prevState.pictureURLs.length
        }));
    };

    render() {
        const { pictureTaken, pictureDataURL, cameraEnabled, pictureURLs, currentSlideIndex } = this.state;

        return (
            <div className="todo-container">
                <h1>Take a Selfie</h1>
                <div className="media-container">
                    {pictureTaken ? (
                        <div className="image-container">
                            <img src={pictureDataURL} alt="Selfie" />
                            <div className="text-overlay">Photo taken by tourism</div>
                        </div>
                    ) : (
                        <video ref={this.videoRef} style={{ display: cameraEnabled ? 'block' : 'none' }} />
                    )}
                </div>
                <div className="button-container">
                    {!pictureTaken && cameraEnabled && (
                        <button onClick={this.takePicture}>Take Photo</button>
                    )}
                    {cameraEnabled && (
                        <button onClick={this.handleOK}>OK</button>
                    )}
                    {pictureTaken && (
                        <button onClick={this.retakePicture}>Retake</button>
                    )}
                </div>
                <div className='todo-container1'>
                {pictureURLs.length > 0 && (
                    <div className="slideshow-container">
                        <img src={pictureURLs[currentSlideIndex]} alt={`Selfie ${currentSlideIndex + 1}`} className="slideshow-image" />
                        <button className="prev" onClick={this.prevSlide}>&#10094;</button>
                        <button className="next" onClick={this.nextSlide}>&#10095;</button>
                    </div>
                
                )}
                </div>
            </div>
        );
    }
}

export default Photoboot;