const myLibrary = [];
let dataObject = {};
const books = document.querySelector('#content');

function Book (title, author, pages, read=false, idx) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.idx = idx;
}

function createBook (book) {
  let eyeColor = book.read ? 'read.png' : 'unread.png';

  const card = document.createElement('div');
  const cardHeader = document.createElement('div');
  const cardContent = document.createElement('div');
  const cardFooter = document.createElement('div');

  const pages = document.createElement('p');
  const seen = document.createElement('button');
  const headerButton = document.createElement('button');

  const eye = document.createElement('img');

  const title = document.createElement('h2');
  const by = document.createElement('p');
  const author = document.createElement('p');

  const headerImage = document.createElement('img');

  pages.textContent = `${book.pages} pages`;
  pages.style.color = 'white';
  cardFooter.appendChild(pages);

  eye.setAttribute('src', `./assets/images/${eyeColor}`);
  eye.setAttribute('width', "25");
  eye.setAttribute('height', "25");
  eye.setAttribute('alt', 'read icon');
  eye.setAttribute('id', 'eye');

  seen.classList.add('eye');
  seen.appendChild(eye);
  cardFooter.style.marginTop = 'auto';
  cardFooter.appendChild(seen);

  author.textContent = `${book.author}`;
  author.style.fontWeight = 'bold';
  by.textContent = 'by';
  title.textContent = `"${book.title}"`;
  cardContent.classList.add('card-content');
  cardContent.append(title, by, author);

  cardFooter.classList.add('card-footer');

  headerImage.setAttribute('src', './assets/images/remove.png');
  headerImage.setAttribute('width', "25");
  headerImage.setAttribute('height', "25");
  headerImage.setAttribute('alt', 'close icon');

  headerButton.style.width = 'min-content';
  headerImage.setAttribute('id', 'header-img');
  cardHeader.style.textAlign = 'right';
  headerButton.appendChild(headerImage);
  cardHeader.appendChild(headerButton);

  card.classList.add('card');
  card.dataset.idx = book.idx;
  card.append(cardHeader, cardContent, cardFooter);

  card.addEventListener('click', (event) => {
    console.log(seen.id);
    console.log(event.target);
    if (event.target.id === 'eye') {
      console.log('Here');
      eyeColor = eyeColor === 'read.png' ? 'unread.png' : 'read.png';
      eye.setAttribute('src', `./assets/images/${eyeColor}`);
    } else if (event.target.id === 'header-img') {
      removeBook(card);
    }
  });

  return card;
}

function removeBook (bookCard) {
  myLibrary.splice(parseInt(bookCard.dataset.idx), 1);
  books.removeChild(bookCard);
}

function addBookToLibrary (book) {
  const bk = new Book(...book);
  let bookCard = createBook(bk);

  myLibrary.push(bk);
  books.appendChild(bookCard);
}

const bookAdder = document.querySelector('#add-btn');
const dialog = document.querySelector("#dialog-box");
const dialogBox = document.querySelector('#dialog');
const closeDialogButton = document.querySelector('#cancel-dialog');
const submitButton = document.querySelector('#submit');
const inputFields = Array.from(document.querySelectorAll('input.input'));
const readField = document.querySelector('#read');

closeDialogButton.addEventListener('click', () => {
  dialog.close('');
});

bookAdder.addEventListener('click', () => {
  dialog.showModal();
  submitButton.focus();
});

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  if (inputFields.every((field) => field.value)) {
    dialog.close('add');
  }
});

inputFields.forEach((field) => {
  field.addEventListener('input', () => {
    dataObject[field.name] = field.value;
  });
});

readField.addEventListener('change', () => {
  dataObject[readField.name] = readField.checked;
});

dialog.addEventListener('close', (event) => {
  if (dialog.returnValue === 'add') {
    dataObject.idx = myLibrary.length;
    addBookToLibrary(Array.from(Object.values(dataObject)));

    inputFields.forEach((field) => {
        field.value = '';
    });
    readField.checked = false;
    dataObject[readField.name] = readField.checked;
  }
});
