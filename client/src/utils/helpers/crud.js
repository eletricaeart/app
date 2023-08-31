

const Social = {
   users: [
      {
         name: "Name",
         password: "password",
      }
   ],
   posts: [
      {
         owner: "name",
         post: "content",
      },
   ],
};

/* CREATE: */
function createPost( data ) {
   Social.posts.push( { owner: data.owner, post: data.post } );
}

createPost( { owner: "ceo", post: "Post" } );
console.log( Social.posts );
/* READ: */
function getPost() {
    
}
/* UPDATE: */
function updatePost() {

}
/* DELETE: */
function erasePost() {

}
