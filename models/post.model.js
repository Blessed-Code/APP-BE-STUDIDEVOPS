const filename = "../data/posts.json";
const writeFilePath = "data/posts.json";
const helper = require("../helpers/helper");
let posts = require(filename);

function getPosts() {
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject({
                message: "no post available",
                status: 202
            });
        } else {
            resolve(posts);
        }
    });
};

function getPost(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(post => resolve(post))
        .catch(err => reject(err));
    });
};

function insertPost(newPost) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(posts) };
        const date = {
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        };
        newPost =  {...id, ...date, ...newPost };
        posts.push(newPost);
        helper.writeJSONFile(writeFilePath, posts)
        resolve(newPost);
    });
};

function updatePost(id, newPost) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(post => {
            const index = posts.findIndex(p => p.id == post.id);
            id = { id: post.id };
            const date = {
                createdAt: post.createdAt,
                updatedAt: helper.newDate()
            };
            posts[index] = { ...id, ...date, ...newPost }
            helper.writeJSONFile(writeFilePath, posts)
            resolve(posts[index]);
        })
        .catch(err => reject(err));
    });
};

function deletePost(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(posts, id)
        .then(() => {
            let res = posts.filter(p => p.id != id);
            helper.writeJSONFile(writeFilePath, res);
            resolve();
        })
        .catch(err => reject(err));
    });
};


module.exports = {
    insertPost,
    getPosts,
    getPost, 
    updatePost,
    deletePost
};