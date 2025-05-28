import NextAuth, { DefaultSession } from "next-auth"
import {IUser} from '@/interface/IUser'

declare module 'next-auth' {
    interface Session {
        user?: IUser;
    }
}
