import axios from 'axios';

class comicService {
    constructor() {
        this.getLastPost = this.getLastPost.bind(this);
        this.getRamdomPost = this.getRamdomPost.bind(this);
    }
    
    // get the last post
    getLastPost = () => {
        return axios.get('/info.0.json').then(res => {
            return Promise.resolve(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    getRamdomPost=(postId)=>{
        return axios.get(`/${postId}/info.0.json`).then(res=>{
            return Promise.resolve(res.data);
        })
    }
}

export default new comicService();

