//getting value of div
const searchHistoryList = document.querySelector('#search-history');

// Function to display search history on the page
const displaySearchHistory = () => {
  // getting the searches values from localstroge
let searchHistory = localStorage.getItem('searchHistory');
searchHistory = searchHistory ? JSON.parse(searchHistory) : [];
let i=1;
//   searchHistoryList.innerHTML = '';
if (searchHistory.length === 0) {
    searchHistoryList.innerHTML = '<p>No search history found.</p>';
return;
}

// display the value by foreach loop
searchHistory.forEach(query => {
const listItem = document.createElement('li');
listItem.classList.add("list-group-item");
listItem.classList.add("m-1");
listItem.innerHTML ="<b>"+ i++ +" </b>" +" " +"<b> "+query.Search+" </b>"  +" "+"Date and Time Of Search - "+query.SearchTime;
listItem.addEventListener('click', () => {
  searchInput.value = query;
  searchForm.dispatchEvent(new Event('submit'));
});
searchHistoryList.appendChild(listItem);
});
};
/// calling the displaySearchHistory function
displaySearchHistory();


// delete Search function
function deletesearch(){
const clearHistoryButton = document.querySelector('#clear-history');
var result = confirm("Want to delete?");
if (result) {
localStorage.removeItem("searchHistory");

alert("Deleted")
window.location.reload();
}

}