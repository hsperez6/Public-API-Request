<!-- Trigger/Open The Modal -->
<button id="myBtn">Open Modal</button>

<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>

</div>





<script>
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
</script>









// function doSearch2 (input) {
//     const cards = gallery.querySelectorAll('.card');
//     let matches = [];
//     const inputLow = input.value.toLowerCase();

//     cards.forEach(card => {
//         const name = card.querySelector('#name').textContent.toLowerCase();
        
//         if (inputLow.length !== 0 && name.includes(inputLow)) {
//             matches.push(card);
//         } else if (inputLow.length === 0) {
//             matches = [];
//             fillGallery(fetchedData);
//         } else {

//         }
        
//     });

//     if (matches.length !== 0) {
//         gallery.innerHTML = '';
//         fillGallery(matches);
//     } else {
//         fillGallery(fetchedData);
//     }

// };






// searchIcon.addEventListener('click', (e) => {
//     e.preventDefault();
//     doSearch(searchInput, data);
//  });
 







/*************************************************************************** */





/*









    // for (let i=0; i<fetchedData.length ; i++) {
    //     let fullName = document.querySelector('#name');
    //     let fullNameLow = fullName.toLowerCase();
    //     if (Input.value.length !== 0 && fullNameLow.includes(Input.toLowerCase())) {
    //        matches.push(list[i]);
    //     };
    // };
    // if (Input.value.length === 0) {
    //    showPage(data, 1);
    //    addPagination(data);
    // } else if (Input.value.length !== 0 && matches.length !== 0) {
    //    showPage(matches, 1);
    //    addPagination(matches);
    // } else {
    //    let studentList = document.querySelector('.student-list');
    //    studentList.innerHTML = '<li>No results found</li>';
    //    addPagination(matches);
    // }
//  };
    


















// const cards = document.getElementsByClassName('card');


    // console.log(e.target.closest('.card'));



// const profiles = await fetchData('https://randomuser.me/api/?results=12');

// let profiles;



/*
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        const results = await json.results;
        return results;
    } catch (error) {
        throw error;
    }
  }
*/


/*    
fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(data => {
        console.log(data.results);
        fillGallery(data);
    })
*/



/*

function createModal(employee) {
    const modaldiv = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            </div>

            // IMPORTANT: Below is only for exceeds tasks 
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`
    
};


function createModalInfoContainer() {
    <div class="modal-info-container">
        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
    </div>
}



function popupModal() {

}


// console.log(clickedCardName)

        // const firstName = 



// const profileList = [];


// function populateProfileList(json) {
//     json.results.map(person =>{
//         profileList.push(person);
//     })
// }








gallery.addEventListener('click', (e) => {
    const parent = e.target.parentNode;
    const grandparent = parent.parentNode;



    // if (e.target.classList.contains('card') || parent.classList.contains('card') || grandparent.classList.contains('card')) {
    //     if (e.target.constains('eamil') || e.target.childNode)    
    //         body.insertAdjacentHTML(
    //             'beforeend',
    //             
    //     )
    // }

});





function openModals() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
      card.onclick = () => {
        let cardName = card.querySelector(".card-name").textContent;
        let firstName = data[index].name.first;
        let lastName = data[index].name.last;

        if (cardName.includes(firstName) && cardName.includes(lastName)) {
          createModal();
          createInfo(data[index]);
          toggleModals(cards);
        }
      }
    });
  }


// function logClickedName(array) {
//     array.map(card => {
//         card.onclick = () => {
//             const cardName = card.querySelector('.card-name').textContent;
//             console.log(cardName);
//         }
//     });
// };


// logClickedName(cards);




// object.onclick = function(){myScript};














// if (e.target.closest(".card")) {
    // console.log(e.target.closest('card'));
//   }

/*
cell
: 
"042-239-34-88"
dob
: 
{date: '1960-01-27T03:50:58.683Z', age: 63}
email
: 
"aada.jokinen@example.com"
gender
: 
"female"
id
: 
{name: 'HETU', value: 'NaNNA074undefined'}
location
: 
{street: {…}, city: 'Ylitornio', state: 'Ostrobothnia', country: 'Finland', postcode: 28236, …}
login
: 
{uuid: '03db40f7-3e82-46ad-94b9-19479efd6b3a', username: 'organicbird641', password: 'place', salt: '6GkxN12r', md5: '291c33f7d8e65304cd3ed75572287ac4', …}
name
: 
{title: 'Ms', first: 'Aada', last: 'Jokinen'}
nat
: 
"FI"
phone
: 
"09-983-716"
picture
: 
{large: 'https://randomuser.me/api/portraits/women/58.jpg', medium: 'https://randomuser.me/api/portraits/med/women/58.jpg', thumbnail: 'https://randomuser.me/api/portraits/thumb/women/58.jpg'}
registered
: 
{date: '2011-02-24T23:17:39.744Z', age: 12}
[[Prototype]]
: 
Object
*/
























