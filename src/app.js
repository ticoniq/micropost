import { http } from './http';
import { ui } from './ui';

// Gets posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post 
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete 
document.querySelector('#posts').addEventListener('click', deletePost);

// Listen for edit state 
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel state 
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Get All posts 
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Submit post 
function submitPost() {
  // Get input field data 
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  // Validate input 
  if (title === '' || body === '') {
    ui.showAlert('Please fill in all field', 'alert alert-danger');
  } else {

    const data = {
      title,
      body
    }

    // Check for id 
    if (id === '') {
      // Create post 
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.clearField();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      // Update post 
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

// Delete post 
function deletePost(e) {
  // console.log('delete');
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post deleted', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }

  e.preventDefault();
}

function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    }

    // fill for with current post 
    ui.fillForm(data);
  }

  e.preventDefault();
}

// Cancel edit state 
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }

  e.preventDefault();
}