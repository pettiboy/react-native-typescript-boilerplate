import React from 'react'

export interface AuthContextType { 
    signIn: (data: {    
        phone: string;    
        otp: string;
    }) => Promise<"Incorrect OTP" | undefined>; 
    signUp: (data: {
        phone: string;    
        otp: string;    
        name: string;
    }) => Promise<"Incorrect OTP" | undefined>; 
    signOut: () => Promise<void>; 
    getToken: () => string | undefined; 
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined)
