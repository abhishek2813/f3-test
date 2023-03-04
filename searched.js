const bookDetailsDiv = document.querySelector('#book-details');

// Function to fetch book data from the Books API and display all details
const fetchBookDetails = async (query) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  const response = await fetch(url);
  const data = await response.json();
  const book = data.items[0];
// store all values from varaibles
  const title = book.volumeInfo.title;
  const author = book.volumeInfo.authors;
  const description = book.volumeInfo.description;
  const cover = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150x200?text=No+Cover+Available';
  const pageCount = book.volumeInfo.pageCount;
  const publishedDate = book.volumeInfo.publishedDate;
  const publisher = book.volumeInfo.publisher;
  const buyLink = book.saleInfo.buyLink;
  const price = book.saleInfo.listPrice;

  // setting the html elements here
  const bookDetailsHTML = `
    <h2>${title}</h2>
    <p>By ${author}</p>
    <img src="${cover}" alt="Cover for ${title}">
    <p>${description}</p>
    <ul>
      <li>Page Count: ${pageCount}</li>
      <li>Published Date: ${publishedDate}</li>
      <li>Publisher: ${publisher}</li>
      <li>Price: ${price}</li>
    </ul>
    ${buyLink ? `<a href="${buyLink}" target="_blank">Buy Now</a>` : ''}
  `;

  bookDetailsDiv.innerHTML = bookDetailsHTML;
};

// Function to display search history from localStorage
const displaySearchHistory = () => {
  const searches = JSON.parse(localStorage.getItem('searchHistory')) || [];
  const searchHistoryDiv = document.querySelector('#search-history');
  searchHistoryDiv.innerHTML = '';

  if (searches.length === 0) {
    searchHistoryDiv.innerHTML = '<p>No search history found.</p>';
    return;
  }

  searches.forEach((query) => {
    const searchItem = document.createElement('div');
    searchItem.classList.add('search-item');
    searchItem.textContent = query.Search;
    searchItem.addEventListener('click', () => {
      fetchBookDetails(query.Search);
    });
    searchHistoryDiv.appendChild(searchItem);
    searchHistoryDiv.classList.add("list-group-item");
    searchHistoryDiv.classList.add("m-2");
  });
};

displaySearchHistory();