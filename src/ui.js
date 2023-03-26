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

  // show post 
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

  // show alert 
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

  // clear alert field 
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // clear data field 
  clearField() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  // Fill form to edit 
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.id.value = data.id;

    this.changeFormState('edit');
  }

  // Clear id hidden value 
  clearIdInput() {
    this.id.value = '';
  }

  // Change form state 
  changeFormState(type) {
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block'

      // create cancel button 
      const button = document.createElement('button');
      // Add class name 
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      // get parent 
      const cardForm = document.querySelector('.card-form');
      // Get element to insert before 
      const formEnd = document.querySelector('.form-end');
      // Insert the cancel button 
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';

      // remove cancel button 
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }

      // clear id from hidden field 
      this.clearIdInput();
      // clear text field 
      this.clearField();
    }
  }
}

export const ui = new UI();