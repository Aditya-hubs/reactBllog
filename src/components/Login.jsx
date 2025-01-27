import React, {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import {login as authLogin} from "../store/authSlice"
import {Button , Input , Logo} from "./index"
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register , handleSubmit} = useForm()
    const {error , setError} = useState("")

    const login =  async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.
                getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                    navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100px rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-centre">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%"/>
                        </span>
                </div>
               <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
               <p className="mt-2 text-center text-base text-black/60">
               Don't have an account?
               <Link to="/signup"
               className="font-medium text-primary transition-all duration-200 hover:underline">
                Sign up
                </Link>
                </p>
                {error && <p className="text-red mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
                        <Input 
                        label = "Email: "
                        placeholder = "Enter your email"
                        type = "email"
                        {...register("email",{
                            required: true,
                            validate:  {
                                matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(v)
                                || "Email address must be valid address",
                            }
                        })}
                        />
                        <Input 
                        label = "Password: "
                        placeholder = "Enter your password"
                        type = "password"
                        {...register("email",{
                            required: true,
                        })}
                        />
                        <Button type="submit"
                        >Sign in</Button>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login