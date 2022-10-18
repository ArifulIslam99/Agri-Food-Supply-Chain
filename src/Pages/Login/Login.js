import React from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import loginbg from "../../images/tomato.jpeg"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const loginStyle = {
        background: `url(${loginbg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
    const navigate = useNavigate();
    const location = useLocation();
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    if (loading || googleLoading) {
        return <div className="flex justify-center items-center h-screen">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>

    }

    if (signInWithGoogle) {


        if (googleUser) {
            const name = googleUser?.user?.displayName;
            const email = googleUser?.user?.email;
            const currentUser = { email: email, name: name, role: "" };
            fetch(`http://localhost:5000/user/${email}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
     
                })

            navigate("/")
        }

    }

    let from = location.state?.from?.pathname || "/";
    if(user || googleUser) {
        navigate(from, {replace: true})
    }
    let signInError;
   

    if (error || googleError) {
        signInError = <p className='text-red-600 text-center'><small>{error?.message || googleError?.message}</small> </p>
    }
    const onSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password);
        toast.success("logged in success")
    };

    return (
        <div className='flex h-screen justify-center items-center' style={loginStyle}>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold ">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is Required"
                                    },
                                    pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === "required" && <span className="labelt-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === "pattern" && <span className="labelt-text-alt text-red-500">invalid email</span>}
                            </label>
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is Required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Should be atleast six characers"
                                    },

                                })}
                            />
                            <label className="label">
                                {errors.password?.type === "required" && <span className="labelt-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === "minLength" && <span className="labelt-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>

                        {signInError}
                        <input className="btn w-full max-w-xs" value="Login" type="submit" />
                        <p className='text-center mt-2'>New User? <Link className='text-blue-700' to="/signup">Create an account</Link></p>
                    </form>
                    <div className='divider'>
                        OR
                    </div>

                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline btn-error"
                    >Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;