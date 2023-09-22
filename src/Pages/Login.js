import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import { useState } from "react";
import { record } from "vmsg";
export const Login = () => {
    const navigate = useNavigate();
    return (
        <div class="wrapper">
            <div class="logo">
                <img src="https://cdn2.vectorstock.com/i/1000x1000/40/56/speech-recognition-glyph-icon-vector-28874056.jpg" alt=""/>
            </div>
            <div class="text-center mt-3 name">
                Verify your Voice
            </div>
            <form class="p-3 mt-3">
                <div class="form-field d-flex align-items-center">
                    <span class="far fa-user"></span>
                    <input type="text" name="userName" id="userName" placeholder="Username"/>
                </div>
                <div class="record d-flex align-items-center">
                    <button class="btn mt-3">Start Recording</button>
                </div>
                <button class="btn mt-3">Verify</button>
            </form>
            <div class="text-center fs-6">
            Register new account? <a href="#">Sign up</a>
            </div>
        </div>
    )
}