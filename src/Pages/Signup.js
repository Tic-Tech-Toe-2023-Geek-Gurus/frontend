import "../style/Signup.css";
export const Signup = () => {
    return (
        <div class="wrapper">
            <div class="logo">
                <img src="https://cdn2.vectorstock.com/i/1000x1000/40/56/speech-recognition-glyph-icon-vector-28874056.jpg" alt=""/>
            </div>
            <div class="text-center mt-3 name">
                Signup
            </div>
            <form class="p-3 mt-3">
                <div class="form-field d-flex align-items-center">
                    <span class="far fa-user"></span>
                    <input type="text" name="userName" id="userName" placeholder="Username"/>
                </div>
                <div class="record d-flex align-items-center">
                    <button class="btn mt-3">Start_Recording For data1</button>
                </div>
                <div class="record d-flex align-items-center">
                    <button class="btn mt-3">Start_Recording For data2</button>
                </div>
                <button class="btn mt-3">Register</button>
            </form>
        </div>
    );
};