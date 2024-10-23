import conf from '../conf/conf.js';
import { Client, Account , ID } from "appwrite";

export class AuthService {
    client= new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email , password , name}){
        try {
            const userAccount  = await this.account.create(ID.unique() , email , password , name);
            if(userAccount){
                return this.login(email,password);
            }else{
                return userAccount;
            }
        } catch (err) {
            throw err;
        }
    }

    async login({email,password}){
       try {
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Login successful, session created:", session);
            return session;
        }catch (err) {
            throw err;
        } 
    }

    async getCurrentUser() {
        try {
            const session = await this.account.getSession('current');
            if (!session) {
                console.error("No active session found.");
                return null;
            }
            const user = await this.account.get();
            console.log("Current user retrieved:", user);
            return user;
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error.message);
            throw new Error(`Unable to fetch current user: ${error.message}`);
        }
    }
    
    

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (err) {
            throw err;
        }
    }
}

const authService = new AuthService()


export default authService




