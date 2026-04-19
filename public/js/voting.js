// public/js/voting.ts
///
// Check if we are on the posts page (optional but good practice)
// 1. Get ALL buttons as a group
const btns = document.querySelectorAll(".vote-btn");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const t = e.target;
    const value = t.dataset.value;
    const postId = t.dataset.postId;
    fetch("/upvote/:postid", { method: "post", body: { value }, credentials: 'include'})
  });
});

// // 2. Loop through them (just like a list)
// voteButtons.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     // This 'btn' is the specific one you clicked!

//     // Toggle the classes (similar to your hamenu logic)
//     btn.classList.toggle("active-up");

//     // Logic to send data to server would go here
//     console.log("Voting on post:", btn.dataset.postid);
//   });
// });

// public/js/voting.js

// 1. Grab all the vote buttons
const voteButtons = document.querySelectorAll(".likeButton, .dislikeButton");

voteButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Find the container for this specific post
    const parent = btn.parentElement;
    const upBtn = parent.querySelector(".likeButton");
    const downBtn = parent.querySelector(".dislikeButton");

    // 2. Check which button was clicked
    if (btn.classList.contains("likeButton")) {
      // If clicking Up: Turn Green ON, turn Red OFF
      btn.classList.add("active-up");
      downBtn.classList.remove("active-down");
    } else {
      // If clicking Down: Turn Red ON, turn Green OFF
      btn.classList.add("active-down");
      upBtn.classList.remove("active-up");
    }
  });
});
