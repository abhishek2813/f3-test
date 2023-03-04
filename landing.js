async function main() { // main function
    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=percy+jackson";  // getting the data from API
    //Getbook function to handle API
    async function getBook(url) { 
        let response = await fetch(url);
        let data = await response.json()
        return data;
    } 
    //store the json obj into variable Books
    var books = await getBook(apiUrl);
    // console.log(books.saleInfo);

    //creating data variable to showing into serach
    let data1 = "";

    // map function to ittrate obj and getting the value
    books.items.map((value) => {
        data1 += `
<div class="col-lg-4 col-md-12 mb-4 item hide">
    <div class="card">
        <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light" data-mdb-ripple-color="light">
            <img src="${value.volumeInfo.imageLinks ? value.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150x200?text=No+Cover+Available'}" class="card-img-top" />
            <div class="hover-overlay">
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            </div>
        </div>
        <div class="card-body">
            <h5 class="card-title mb-3">${value.volumeInfo.title}</h5>
            <p><b>Author :- </b><spn class="author">${value.volumeInfo.authors ? value.volumeInfo.authors[0] : 'Unknown Author'}</spn></p>
            <p><b>Page Count :- </b>${value.volumeInfo.pageCount ? value.volumeInfo.pageCount : 'Unknown'}</p>
            <p><b>Publisher :- </b>${value.volumeInfo.publisher ? value.volumeInfo.publisher : 'Unknown'}</p>
            <p><b>Categories :- </b>${value.volumeInfo.categories ? value.volumeInfo.categories: 'Unknown'}</p>
            <p><b>Amount :- Rs. </b>${value.saleInfo.listPrice ? value.saleInfo.listPrice.amount : 'Not for Sale'}</p>
            <div class="row">
                <button class="btn btn-dark add-to-cart-button" type="submit"><a href="${value.saleInfo.buyLink ? value.saleInfo.buyLink : '#'} target=" _blank"">Buy Now</a></button>
            </div>
        </div>
    </div>
</div>
`;
    })
    // adding data to items in html
    document.getElementById("items").innerHTML = data1;
}
// Serching Input filter 
async function searchFilter() {
 //calling main fun here to wait for seraching function
    await main();
    let input = document.getElementById('filterserach').value
  // if length is empty return func
    if(input.length<=0){
        return;
    }
    //get input fun

    input = input.toLowerCase();
    let x = document.getElementsByClassName('card-title');
    let y = document.getElementsByClassName('author');
    var elements = document.querySelectorAll(".item");

    var date = new Date();
 /// strore the serch data on localstrogr
    const query = {
        Search: input.trim(),
        SearchTime: date.toGMTString()
    }
    if (!query) return;

    // Store search query in localStorage
    let searchHistory = localStorage.getItem('searchHistory');
    searchHistory = searchHistory ? JSON.parse(searchHistory) : [];

    if (!searchHistory.includes(query)) {
        searchHistory.push(query);
        //set localstorge item
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
// chceking mathing data
    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input) && !y[i].innerHTML.toLowerCase().includes(input)) {
            elements[i].style.display = "none";
        } else {
            // if serach data math remove hide class and display block elements
            elements[i].style.display = "intial";
            elements[i].classList.remove("hide")
        }
    }
}
