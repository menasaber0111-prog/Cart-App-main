import { failedLogin, sucssesLogin } from './types/authInterface';
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { email, json, jwt } from "zod";

export const authOptions : NextAuthOptions ={
    pages : {
        signIn : '/login'
    },
    providers : [
        Credentials({
            name : 'credentials',
            credentials : {
                email : {},
                 password : {}
            }, 
            authorize : async (credentials)=>{
                //call api
                const response = await fetch(`${process.env.API}/auth/signin` , {
                    method : 'Post',
                    body : JSON.stringify({
                        email: credentials?.email,
                        password : credentials?.password
                    }),
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                })

                const payload : failedLogin | sucssesLogin = await response.json()
                 console.log(payload);
                 if('token' in payload){
                    return {
                    id : payload.user.email,
                    user : payload.user,
                    token : payload.token
                }
                 }else{
                    throw new Error('Error...')
                 }
                 
                
            }
   
        })
    ],
    callbacks: {
        jwt:({token , user})=>{
            if(user){
                token.user=user.user
                token.token=user.token
            }
            return token

        },
        session:({session , token})=>{
            session.user=token.user
            return session

        }
     }
}