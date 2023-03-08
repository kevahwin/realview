import axios from "axios";

const url = "api/posts/";
// const upload = "api/uploads/"

/* eslint-disable no-async-promise-executor */

class PostService {
  // get posts
  static getPosts(userEmail) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}?userEmail=${userEmail}`);
        const data = res.data;
        resolve(
          data.map((post) => ({
            ...post,
            createdAt: new Date(post.createdAt),
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  //Create post
  static insertPost(text, userEmail, id) {
    return axios.post(url, {
      text,
      userEmail,
      id,
    });
  }

  //delete post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
