import conf from '../conf/conf.js';
import { Client,ID,Databases,Storage,Query } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content , featuredImage, status ,  userID}) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseID,
                conf.appWritecollectionID,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userID
                }
            )
        } catch (err) {
            throw err;
        }
    }

    async updatePost(slug,{title, content , featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseID,
                conf.appWritecollectionID,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                }
            )
        } catch (err) {
            throw err;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseID,
                conf.appWritecollectionID,
                slug,
            )
            return true
        } catch (err) {
            throw err;
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseID,
                conf.appWritecollectionID,
                slug
            )
        } catch (err) {
            throw err
        }
    }

    async getPosts(queries = [Query.equal("Status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseID,
                conf.appWritecollectionID,
                queries
            )
        }catch(err){
            throw err;
        }
    }

    //file making service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketID,
                fileID
            )
        } catch (error) {
            throw err;
        }
    }

    getFilePreview(fileID){
       return this.bucket.getFilePreview(
        conf.appWriteBucketID,
        fileID
       )
    }


}

const service = new Service()
export default service