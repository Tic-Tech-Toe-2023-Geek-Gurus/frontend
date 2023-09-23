import "../style/Login.css";
import { useState, useRef } from "react";

export const Login = () => {

    const [isRecording, setIsRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const [userName, setUserName] = useState(""); // State to hold the username
    const mediaRecorder = useRef(null);

    const handleStartRecording = () => {
        if (!isRecording) {
            setAudioChunks([]);
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    mediaRecorder.current = new MediaRecorder(stream);
                    mediaRecorder.current.ondataavailable = (e) => {
                        if (e.data.size > 0) {
                            setAudioChunks((chunks) => [...chunks, e.data]);
                        }
                    };
                    mediaRecorder.current.start();
                    setIsRecording(true);
                })
                .catch((error) => {
                    console.error('Error accessing microphone:', error);
                });
        } else {
            mediaRecorder.current.stop();
            setIsRecording(false);
        }
    };

    const handleDownload = () => {
        const blob = new Blob(audioChunks, { type: 'audio/wav' });

        // Create a FormData object to send the audio file and username
        const formData = new FormData();
        formData.append('audio', blob);
        formData.append('userName', userName);

        // Replace 'your-api-endpoint' with the actual URL of your API endpoint
        fetch('your-api-endpoint', {
            method: 'POST',
            body: formData
        }).then((response) => {
                if (response.ok) {
                    console.log('Audio and username sent successfully.');
                    // Handle success as needed
                } else {
                    console.error('Failed to send audio and username to the API.');
                    // Handle error as needed
                }
            })
            .catch((error) => {
                console.error('Error sending audio and username:', error);
                // Handle error as needed
            });
    };

    return (
        <div class="wrapper">
            <div class="logo">
                <img src="https://cdn2.vectorstock.com/i/1000x1000/40/56/speech-recognition-glyph-icon-vector-28874056.jpg" alt="" />
            </div>
            <div class="text-center mt-3 name">
                Verify your Voice
            </div>
            <div class="p-3 mt-3">
                <div class="form-field d-flex align-items-center">
                    <span class="far fa-user"></span>
                    <input type="text" name="userName" id="userName" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="record d-flex align-items-center">
                {audioChunks.length === 0 ? (
                    <button onClick={handleStartRecording} className="btn mt-3">
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                ) : (
                    <div>
                        <audio controls>
                            <source src={URL.createObjectURL(new Blob(audioChunks, { type: 'audio/wav' }))} type="audio/wav" />
                        </audio>
                        <button onClick={handleStartRecording} className="record btn mt-3">
                            Re-record
                        </button>
                        <button onClick={handleDownload} className="btn mt-3">
                            Verify
                        </button>
                    </div>
                )}
            </div>
            </div>
            <div class="text-center fs-6">
                Register new account? <a href="/signup">Sign up</a>
            </div>
        </div>
    )
}