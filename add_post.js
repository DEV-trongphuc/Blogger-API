const CLIENT_ID =
  "207133852736-rsqhm1rvc4chp660ksfcc8ku6ats9kri.apps.googleusercontent.com";
const BLOG_ID = "6242886294878668681";
const CLIENT_SECRET = "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";
const linkGetToken = `https://accounts.google.com/o/oauth2/v2/auth?
scope=https://www.googleapis.com/auth/blogger&
response_type=token&
redirect_uri=http://127.0.0.1:5500/add_post.html&
client_id=${CLIENT_ID}`;
document.addEventListener("DOMContentLoaded", () => {
  let token = getToken();
  const addPost = document.getElementById("submit");
  const addTitle = document.getElementById("add_title");
  addPost.addEventListener("click", () => {
    if (token) {
      const titlePost = addTitle.innerText;
      const editorData = editor.getData();
      const contentPost = editorData;
      const dataPost = {
        title: titlePost,
        content: contentPost,
      };
      handleAddPost(dataPost, token);
    } else {
      accessToken(linkGetToken);
    }
  });
});

async function handleAddPost(dataPost, token) {
  const postData = {
    kind: "blogger#post",
    blog: {
      id: BLOG_ID,
    },
    title: dataPost.title,
    content: dataPost.content,
  };
  const urlPost = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/`;
  const response = await fetch(urlPost, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  console.log(data);
}

function accessToken(linkGetToken) {
  window.location.href = linkGetToken;
}
function getToken() {
  const saveAccessToken = localStorage.getItem("saveAccessToken");

  if (saveAccessToken) {
    return saveAccessToken;
  } else {
    const url = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = url.get("access_token");
    localStorage.setItem("saveAccessToken", accessToken);
    return accessToken;
  }
}
