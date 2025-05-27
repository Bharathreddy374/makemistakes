"use client"
import React from 'react';
import {z} from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import Link from 'next/link';
import { toast } from 'sonner';
import FormFeild from './FormFeild';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '@/firebase/client';
import { signIn, signUp } from '@/lib/actions/auth.action';

const authFormSchema = (type:FormType) => {
    return z.object({
        name: type ==="sign-up"?z.string().min(3, "Name is required") : z.string().optional(),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
    })
}

const AuthForm = ({type}:{type:FormType}) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        if (type === "sign-up") {

            // Handle sign-up logic here
            const { name, email, password } = values;

            const userCredentials = await createUserWithEmailAndPassword(auth,email, password);

            const result = await signUp({
                uid: userCredentials.user.uid,
                name: name!,
                email,
                password,
            })
            if(!result?.success) {
                toast.error(result?.message);
                return;
            }
            // Simulate an API call for sign-up

            

            toast.success("Account created successfully!. Please log in.");
            router.push("/sign-in");
        } else {
            const {email,password}=values;
            const userCredentials = await signInWithEmailAndPassword(auth,email, password);

            const idToken = await userCredentials.user.getIdToken();
            if(!idToken) {
                toast.error("Failed to retrieve user token. Please try again.");
                return;
            }
            await signIn({
                email,
                idToken,
            });

            // Handle sign-in logic here
            toast.success("Logged in successfully!");
            router.push("/");
        }

    }catch (error) {
        console.error("Error submitting form:", error);
        toast.error("An error occurred while submitting the form. Please try again later.");
    }
  }
    const isSignIn = type === "sign-in"? true : false;
    return (
            <div className="card-border card lg:min-w-[566px]">
                <div className="flex flex-col gap-6 card py-14 px-10 items-center">
                    <div className="flex flex-row gap-2 justify-center">
                        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                        <h2 className='text-primary-100'>MakeMistakes</h2>
                    </div>
                    <h3 className='text-primary-100 '>Face the final be fearless with AI</h3>
                </div>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 p-3 form">  
            {!isSignIn && (
                <FormFeild
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="Enter your name"/>    
            )}
             <FormFeild
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                />
                <FormFeild
                    control={form.control}
                    name="password"
                    label="password"
                    placeholder="Enter your password"
                    type="password"
                />
    

        <Button className='btn' type="submit">{isSignIn ? 'Login':'Create Account' }</Button>
      </form>
    </Form>
    <p className="text-center">{isSignIn?"No account yet? ":"Have an account? "}
        <Link href={isSignIn ? "/sign-up": "/sign-in"} className="text-user-primary font-bold ml-1">
            {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
    </p>
            </div>
        )
}
export default AuthForm
