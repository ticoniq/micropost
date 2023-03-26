class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.id = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
    this.titleInput = document.querySelector('#title');
  }

  showPosts(posts) {
    // console.log(posts);
    let output = '';

    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();

    // create div 
    const div = document.createElement('div');
    // Add class 
    div.className = className;
    // Add Text 
    div.appendChild(document.createTextNode(message));
    // Get the parent element 
    const container = document.querySelector('.postContainer');
    // Get the post div 
    const post = document.querySelector('#posts');
    // Insert Alrt div 
    container.insertBefore(div, posts);
    // Set timeout 
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearField() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
}

export const ui = new UI();