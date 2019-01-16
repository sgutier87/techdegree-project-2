/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Global Variables
const ul = document.querySelector('.student-list');
const studentList = ul.children;
const studentPerPage = 10;
const headerDiv = document.querySelector('.page-header');




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
   const pageDiv = document.querySelector('.page');
   const newDiv = document.createElement('div');
   newDiv.className = 'pagination';
   pageDiv.appendChild(newDiv);
   const ul = document.createElement('ul');
   newDiv.appendChild(ul);

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
         
         //Loops over each link to remove className
         for (let i = 0; i < paginationLinks.length; i += 1) {
            paginationLinks[i].className = '';
         }
         
         //Adds 'active' className to target link for highlighting from CSS
         e.target.className = 'active';
      });
   }
}

//Creates a search bar
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

   const searchFilter = () => {
      let filterdList = [];

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
         }
      }
      
      appendPageLinks(filterdList);
   }

   button.addEventListener('click', (e) => {
      searchFilter();
   });

   input.addEventListener('keyup', (e) => {
      searchFilter();
   });
}

//Starts load on page 1
showPage(studentList, 1);
appendPageLinks(studentList);
createSeachBar(studentList);





