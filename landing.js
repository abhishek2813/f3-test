async function main(){
   let apiUrl ="https://www.googleapis.com/books/v1/volumes?q=percy+jackson";
   async function getBook(url) {
       let response = await fetch(url);
       let data = await response.json()
       return data;
   }
   var books = await getBook(apiUrl);
   console.log(books.saleInfo);
  let data1="";
   books.items.map((value)=>{
   data1 +=`
   <div class="col-lg-4 col-md-12 mb-4 item hide">
      <div class="card">
        <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
          data-mdb-ripple-color="light">
          <img src="${value.volumeInfo.imageLinks ? value.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150x200?text=No+Cover+Available'}"
            class="card-img-top" />
            <div class="hover-overlay">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </div>
        </div>
        <div class="card-body">
            <h5 class="card-title mb-3">${value.volumeInfo.title}</h5>
            <p><b>Author :- </b>${value.volumeInfo.authors ? value.volumeInfo.authors[0] : 'Unknown Author'}</p>
            <p><b>Page Count :- </b>${value.volumeInfo.pageCount ? value.volumeInfo.pageCount : 'Unknown'}</p>
            <p><b>Publisher :- </b>${value.volumeInfo.publisher ? value.volumeInfo.publisher : 'Unknown'}</p>
            <p><b>Categories :- </b>${value.volumeInfo.categories ? value.volumeInfo.categories: 'Unknown'}</p>
            <p><b>Amount  :- Rs. </b>${value.saleInfo.listPrice ? value.saleInfo.listPrice.amount : 'Not for Sale'}</p>
           <div class="row">
            <button class="btn btn-dark add-to-cart-button" type="submit"><a href="${value.saleInfo.buyLink ? value.saleInfo.buyLink : '#'} target="_blank"">Buy Now</a></button>
          </div>
            </div>
        </div>
      </div>
   `;
   })
   document.getElementById("items").innerHTML = data1;
}
main();
async function searchFilter(){
   
    let input = document.getElementById('filterserach').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('card-title');
  var elements = document.querySelectorAll(".item");  

  var date = new Date();

  const query = {Search:input.trim(),SearchTime: date.toGMTString()}
  if (!query) return;

  // Store search query in localStorage
  let searchHistory = localStorage.getItem('searchHistory');
  searchHistory = searchHistory ? JSON.parse(searchHistory) : [];

  if (!searchHistory.includes(query)) {
    searchHistory.push(query);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }

  for (i = 0; i < x.length; i++) { 
      if (!x[i].innerHTML.toLowerCase().includes(input) || !x[i].innerHTML.toLowerCase().includes(input)) {
        elements[i].style.display="none";
      }
      else {
        
        elements[i].style.display="intial";            
      }
  }
}