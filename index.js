document.addEventListener("DOMContentLoaded", () => {
  const blog_wrapper = document.querySelector(".blog_wrapper");
  renderBlogUI(fetchBlog, blog_wrapper);
});
async function fetchBlog() {
  const response = await fetch(
    "https://www.googleapis.com/blogger/v3/blogs/YOUR_BLOGGER_API/posts?key=AIzaSyDGY4IGSdDvqx3Z8zOM7j44lE5vZ3jqlH0"
  );
  const data = await response.json();
  return data.items;
}

async function renderBlogUI(callback, element) {
  const blogArray = await callback();
  let blogRender = "";
  blogArray.forEach((blog, index) => {
    const blogAvatar = getAvatar(blog);
    blogRender += `<div class="blog_item">
    <img
      src=${blogAvatar}
    />
    <h2>${blog.title}</h2>
  </div>`;
  });
  element.innerHTML = blogRender;
}
function getAvatar(blog) {
  const contentString = blog.content;
  const element = document.createElement("div");
  element.innerHTML = contentString;
  const avatar = element.querySelector("img");
  return avatar.src;
}
// ______________________________________________________________________
const API_KEY_BLOGGER = "YOUR_API_KEY";
