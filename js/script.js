/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Global Variables
const ul = document.querySelector('.student-list');
const studentList = ul.children;
const studentPerPage = 10;
const headerDiv = document.querySelector('.page-header');
const pageDiv = document.querySelector('.page');




//Loops over given list and changes 'display' value of items according to given 'page' number and 'studentPerPage'
const showPage = (list, page) => {
   for (let i = 0; i < list.length; i += 1) {
      //Stores the first item that should be displayed depending on 'page' number and current 'studentPerPage'
      let firstStudentIndex = (page - 1) * studentPerPage;
      //Stores the last item that should be displayed depending on 'fistStudentIndex' and current 'studentPerPage'
      let lastStudentIndex = firstStudentIndex + studentPerPage - 1;

      if (i >= firstStudentIndex && i <= lastStudentIndex) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

//Adds page links to page depending on how many pages are needed
const appendPageLinks = (list) => {
   //Creates 'newDiv' and appends 'ul' to it
   const pagesNeeded = list.length / studentPerPage;
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   pageDiv.appendChild(paginationDiv);
   const ul = document.createElement('ul');
   paginationDiv.appendChild(ul);

   //Loops over each page needed, creating 'li' and 'a' links for each
   //Appends each 'li' to 'ul' 
   for (let i = 0; i < pagesNeeded; i += 1) {
      const currentPage = i + 1;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = currentPage;
      a.href = '#';
      li.appendChild(a);
      ul.appendChild(li);
      //Sets className of first 'a' link to 'active' for hightlight
      const paginationLinks = document.querySelectorAll('.pagination a');
      paginationLinks[0].className = 'active';
      
      //Calls showPage() when 'a' link is clicked on
      a.addEventListener('click', (e) => {
         showPage(studentList, currentPage);
         removeActive(paginationLinks);
         
         //Adds 'active' className to target link for highlighting from CSS
         e.target.className = 'active';
      });
   }
}

//Loops over each link to remove className
const removeActive = (list) => {
   for (let i = 0; i < list.length; i += 1) {
      list[i].className = '';
   }
}

//Creates a searchbar
const createSeachBar = (list) => {
   const searchDiv = document.createElement('div');
   const input = document.createElement('input');
   const button = document.createElement('button');

   searchDiv.className = 'student-search';
   headerDiv.appendChild(searchDiv);
   input.placeholder = 'Search for students...';
   searchDiv.appendChild(input);
   button.textContent = 'Search';
   searchDiv.appendChild(button);

   //Adds fucntionality to searchbar
   const searchFilter = () => {
      let filterdList = [];
      let hiddenList = [];

      //Loops over list given and hides students not matching users input for name or email
      for (let i = 0; i < list.length; i += 1) {
         const search = input.value.toLowerCase();
         const studentDiv = list[i].firstElementChild.children;
         const studentName = studentDiv[1].textContent;
         const studentEmail = studentDiv[2].textContent;
         
         if (studentName.includes(search) || studentEmail.includes(search)) {
            list[i].style.display = '';
            filterdList.push(list[i]);
         }
         else {
            list[i].style.display = 'none';
            hiddenList.push(list[i]);
         }
      }

      //If number of hidden students added to hiddenList equales students in studentList 'No result' message appears
      if (hiddenList.length == studentList.length) {
         const noMatchDiv = document.createElement('div');
         const message = document.createElement('h1');
         noMatchDiv.className = 'noMatch';
         message.textContent = 'No results';
         noMatchDiv.appendChild(message);
         pageDiv.appendChild(noMatchDiv);
      } 

      showPage(filterdList, 1);
      appendPageLinks(filterdList);
   }

   //Function for removeing page links at start
   const removePageLinks = () => {
      const paginationDiv = document.querySelector('.pagination');
      paginationDiv.parentNode.removeChild(paginationDiv);
   }

   //EventListeners for searchbar
   button.addEventListener('click', (e) => {
      removePageLinks();
      searchFilter();
   });

   input.addEventListener('keyup', (e) => {
      removePageLinks();
      searchFilter();
   });
}

//Starts load on page 1
showPage(studentList, 1);
appendPageLinks(studentList);
createSeachBar(studentList);





