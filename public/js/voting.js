// public/js/voting.ts
///

// Check if we are on the posts page (optional but good practice)
  // 1. Get ALL buttons as a group
  const btns = document.querySelectorAll(".vote-btn");

btns.forEach(btn => {
    btn.addEventListener('click', e => {
        const t = e.target
        const value = t.dataset.value
        const postId = t.dataset.postId 
    })
})


  // 2. Loop through them (just like a list)
  voteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // This 'btn' is the specific one you clicked!

      // Toggle the classes (similar to your hamenu logic)
      btn.classList.toggle("active-up");

      // Logic to send data to server would go here
      console.log("Voting on post:", btn.dataset.postid);
    });
  });

