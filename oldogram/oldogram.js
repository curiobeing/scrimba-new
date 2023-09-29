import { posts } from "/oldogram/data.js";

const mainEl = document.getElementById("main");

// we could've used the for loop directly without a function
// but, we need a function that can be called every time like is made
function render() {
  // we remove the existing elements in the mainEl, when we call the render function from updateLikes function
  // else the elements keep getting added again and again every time for loop runs
  mainEl.innerHTML = "";

  for (let i = 0; i < posts.length; i++) {
    let currentPost = posts[i];

    // we add id to elements for which we need to add click functionality
    // id structure would be combination of element type and id from post object
    let newEl = `
    <section>

    <div class="user-info">
        <img src=/oldogram/assets/${currentPost.avatar} alt=${currentPost.avatar} class="user-avatar">

        <div class="name-location">
            <h4>${currentPost.name}</h4>
            <p>${currentPost.location}</p>
        </div>

    </div>

    <img src=/oldogram/assets/${currentPost.post} alt=${currentPost.post} class="post-img" id="post-img-${
      currentPost.id
    }">

    <div class="action-btns-${currentPost.id}">
    <!-- action buttons -->
    <img src="/oldogram/assets/${
      currentPost.likeStatus ? "icon-heart-filled.png" : "icon-heart.png"
    }" alt="like button" class="action-btn" id="like-btn-${currentPost.id}">
    <img src="/oldogram/assets/icon-comment.png" alt="comment buttom" class="action-btn">
    <img src="/oldogram/assets/icon-dm.png" alt="dm button" class="action-btn">
    </div>
    
    <h4 class="likes">${currentPost.likes} likes</h4>
    <p class="comment"><span>${currentPost.username}</span> ${currentPost.comment}</p>

    </section>
    `;

    // we use insertAdjacentHTML so that event listeners are preserved
    mainEl.insertAdjacentHTML("beforeend", newEl);

    // after adding the html, we can get the element as usual

    // we get the post-img element to add dbl click like
    let postImg = document.getElementById(`post-img-${currentPost.id}`);
    postImg.addEventListener("dblclick", () => updateLikes(currentPost));

    // here, we get the like icon-btn element and add click listener to it
    let likeBtn = document.getElementById(`like-btn-${currentPost.id}`);
    likeBtn.addEventListener("click", () => updateLikes(currentPost));
  }
}

function updateLikes(post) {
  // a user can either like or dislike, he can't do it mutiple times
  if (post.likeStatus) {
    post.likes -= 1;
  } else {
    post.likes += 1;
  }
  // we reverse the likeStatus for the post object so that like/dislike works
  post.likeStatus = !post.likeStatus;
  console.log(post.likes);

  // we render the elements once again after the post object values i.e. likes and likeStatus are changed
  render();
}

// the initial rendering when the html page loads
render();
