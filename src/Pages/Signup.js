import "../style/Signup.css";
import { useState, useRef } from "react";
import logo from '../speech-recognition-icon.jpg';
import { useNavigate } from "react-router-dom";
export const Signup = () => {
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const [userName, setUserName] = useState("");
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
    const handlesignup = async () => {
        if (!userName) {
            alert("Please enter a username.");
            return;
        }
    
        if (audioChunks.length === 0) {
            alert("Please record your voice.");
            return;
        }
        
        const blob = new Blob(audioChunks, { type: 'audio/wav' });

        // Create a FormData object to send the audio file and username
        const formData = new FormData();
        formData.append('audio', blob);
        formData.append('userName', userName);

        // Replace 'your-api-endpoint' with the actual URL of your API endpoint
        const result = await fetch('your-api-endpoint', {
            method: 'POST',
            body: JSON.parse(JSON.stringify(formData))
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
                <img src={logo} alt="" />
            </div>
            <div class="text-center mt-3 name">
                Signup
            </div>
            <div class="p-3 mt-3">
                <div class="form-field d-flex align-items-center">
                    <span class="far fa-user"></span>
                    <input type="text" name="userName" id="userName" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div class="record d-flex align-items-center">
                    {audioChunks.length === 0 ? (
                        <button onClick={handleStartRecording} className="btn mt-3">
                            {isRecording ? 'Stop Recording For data1' : 'Start Recording For data'}
                        </button>
                    ) : (
                        <div>
                            <audio controls>
                                <source src={URL.createObjectURL(new Blob(audioChunks, { type: 'audio/wav' }))} type="audio/wav" />
                            </audio>
                            <button onClick={handleStartRecording} className="rerecord btn mt-3">
                                Re-record data
                            </button>
                        </div>
                    )}
                </div>
                <button class="btn mt-3" onClick={handlesignup}>Register</button>
            </div>
        </div>
    );
};