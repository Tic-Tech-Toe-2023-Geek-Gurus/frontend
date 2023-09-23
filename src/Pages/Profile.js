import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../style/Profile.css";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/');
    }

    const schema = yup.object().shape({
        name: yup.string().required("Your First Name is Required!"),
        age: yup.number().positive().integer().min(18).required(),
        email: yup.string().email().required(),
        mobileno: yup.string().min(10, "Mobile No must be at least 10 digits")
            .max(10, "Mobile No cannot be more than 10 digits")
            .required("Mobile No is Required"),
        country: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onsubmit = async (data) => {
        const result = await fetch('http://localhost:8000/api/users/profile', {
            method: 'POST',
            body: JSON.parse(JSON.stringify(FormData)),
        }).then((response) => {
            if (response.ok) {
                alert('Data updated successfully.');
                // Handle success as needed
            } else {
                console.error('Failed to send data to the API.');
            }
        }).catch((error) => {
                console.error('Error sending data:', error);
                // Handle error as needed
            });
        localStorage.setItem("userdata",data);
        navigate('/');
    }

    return (
        <div>
            <div class="user">
                <img className="avatar" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Maxwell Admin" />
            </div>
            <h5 class="user-name">Yuki Hayashi</h5>
            <h2>Personal info</h2>
            <form onSubmit={handleSubmit(onsubmit)} class="form-horizontal" role="form" method="POST">
                <div class="form-group">
                    <label class="col-lg-3 control-label">Name:</label>
                    <div class="col-lg-8">
                        <input class="form-control" type="text" defaultValue={"User"} {...register("name")} />
                    </div>
                    <p>{errors.first_name?.message}</p>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">Age:</label>
                    <div class="col-lg-8">
                        <input class="form-control" type="text" defaultValue={18} {...register("age")} />
                    </div>
                    <p>{errors.last_name?.message}</p>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">Mobile No:</label>
                    <div class="col-lg-8">
                        <input class="form-control" type="text" defaultValue={"4518484841"} {...register("mobileno")} />
                    </div>
                    <p>{errors.mobileno?.message}</p>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">Email:</label>
                    <div class="col-lg-8">
                        <input class="form-control" type="text" defaultValue={"India@gmail.com"} {...register("email")} />
                    </div>
                    <p>{errors.email?.message}</p>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">Country:</label>
                    <div class="col-lg-8">
                        <input class="form-control" type="text" defaultValue={"India"} {...register("country")} />
                    </div>
                    <p>{errors.Country?.message}</p>
                </div>
                <div class="form-group">
                    <button onClick={handleCancel} className="btn">
                        Cancel
                    </button>
                    <input type="submit" className="btn" value="Update" />
                </div>
            </form>
        </div >
    );
};