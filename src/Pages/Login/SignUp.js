import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from "react-firebase-hooks/auth";
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import loginbg from "../../images/tomato.jpeg"
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {

    const loginStyle = {
        background: `url(${loginbg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, UpdateError] = useUpdateProfile(auth);
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();
    if (loading || googleLoading || updating) {
        return <div className="flex justify-center items-center h-screen">
        <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>

    }
    let signInError;

    if (error || googleError || UpdateError) {
        signInError = <p className='text-red-600 text-center'><small>{error?.message || googleError?.message}</small> </p>
    }
    const onSubmit = async data => {
       await  createUserWithEmailAndPassword(data.email, data.password);
       await updateProfile({ displayName: data.name });
       navigate("/about")
    };

    return (
        <div className='flex h-screen justify-center items-center' style={loginStyle}>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold ">Sign Up</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is Required"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === "required" && <span className="labelt-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
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
                        <input className="btn w-full max-w-xs" value="Sign Up" type="submit" />
                        <p className='text-center mt-2'>Already User? <Link className='text-blue-700' to="/login">Please login</Link></p>
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

export default SignUp;