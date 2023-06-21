
document.addEventListener('DOMContentLoaded', async (e) => {

const gallery = document.getElementById('gallery')
const body = document.getElementsByTagName('body')


/**
 * FETCH DATA FROM API
 */
const fetchedData = await fetch('https://randomuser.me/api/?results=12&nat=us')
                        .then(res => res.json())
                        .then(data => {
                            return data.results;
                            //  profiles;
});


/**
 * FILL PAGE WITH PROFILES RETURNED FROM FETCH FUNCTION
 * @param {*} data Array of profiles in JSON format
 */
function fillGallery(data) {  
    data.map(person => {
        gallery.insertAdjacentHTML(
            'beforeend',
            `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${person.picture.thumbnail}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                    <p class="card-text">${person.email}</p>
                    <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
                </div>
            </div>`
        );
    });
};

fillGallery(fetchedData);

/**
 * EVENT LISTENER FOR SELECTING PROFILE AND CREATING MODAL WINDOW
 */
gallery.addEventListener('click', (e) => {
    if(e.target.classList.contains('card') || e.target.classList.contains('card-img') || e.target.classList.contains('card-name') || e.target.classList.contains('card-text')) {
        const clickedCard = e.target.closest('.card');
        const clickedCardName = clickedCard.querySelector('#name').textContent;
        
        fetchedData.forEach((person, index) => {
            if (clickedCardName.includes(person.name.first) && clickedCardName.includes(person.name.last)) {
                const clickedIndex = index;
                createModal(clickedIndex);
            }
        });

    }

});



/*************************************************************************************
 * HELPER FUNCTIONS
 *************************************************************************************/


/* 
 * FORMAT TELEPHONE
 * @param {} number 
 * @returns 
 */
function formatTelephone(number) {
    const joined = number.match(/\w+/gi).join("");
    const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
    return joined.replace(regex, '($1) $2-$3')
};

/**
 * FORMAT DATE OF BIRTH
 * @param {date} data date of birth date information from profiles returned from API
 * @returns 
 */
function formatBirthday(data) {
    const birthday = new Date(data)
    const year = birthday.getFullYear();
    const month = birthday.getMonth();
    const day = birthday.getDate();

    return `${month}/${day}/${year}`;
}


/**
 * CREATE MODAL + CONTROLLERS
 * @param {*} index 
 */
function createModal(index) {  
    const fixedPhoneNumber = formatTelephone(fetchedData[index].phone);
    const fixedBirthday = formatBirthday(fetchedData[index].dob.date);

    console.log(fixedBirthday);

    gallery.insertAdjacentHTML(
        'beforeend',
        `<div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src=${fetchedData[index].picture.medium} alt="profile picture">
                    <h3 id="name" class="modal-name cap">${fetchedData[index].name.first} ${fetchedData[index].name.last}</h3>
                    <p class="modal-text">${fetchedData[index].email}</p>
                    <p class="modal-text cap">${fetchedData[index].location.city}</p>
                    <hr>
                    <p class="modal-text">${fixedPhoneNumber}</p>
                    <p class="modal-text">${fetchedData[index].location.street.number} ${fetchedData[index].location.street.name}, ${fetchedData[index].location.city}, ${fetchedData[index].location.state} ${fetchedData[index].location.postcode}</p>
                    <p class="modal-text">Birthday: ${fixedBirthday}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`
        );
     
    /**
     * FOR CLOSING THE MODAL WINDOW
     */
    const modalContainer = document.querySelector('.modal-container');
    const modalCloseBtn = document.querySelector('#modal-close-btn');

    modalCloseBtn.addEventListener('click', (e) => {
        modalContainer.remove();
    });

    /**
     * FOR ITERATING OVER PROFILE LIST ON MODAL WINDOW
     */
    const modalPrev = document.querySelector('#modal-prev');
    const modalNext = document.querySelector('#modal-next');

    modalPrev.addEventListener('click', () => {
        if(index !== 0) {
            modalContainer.remove();
            createModal(index - 1);
        } else {
            modalContainer.remove();
        }
    })

    modalNext.addEventListener('click', () => {
        if(index !== 11) {
            modalContainer.remove();
            createModal(index + 1);
        } else {
            modalContainer.remove();
        }
    })


}

/**
 * INSERT SEARCHBOX
 */
const searchContainer = document.querySelector('.search-container')

function insertSearchBox() {
    searchContainer.insertAdjacentHTML(
        'beforeend',
        `<form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`
    )
}

insertSearchBox();



/***********************************************************************************************
 * EXECUTE SEARCH FUNCTION
 **********************************************************************************************/


let searchInput = document.querySelector('#search-input');
let searchIcon = document.querySelector('#search-submit'); 

function clearCards(cards) {
    cards.forEach(card => {
        card.style.display ='none';
    });
}

function displayCards(cards) {
    cards.forEach(card => {
        card.style.display ='flex';
    });
}

function doSearch1 (input) {
    const allCards = gallery.querySelectorAll('.card');
    const inputLow = input.value.toLowerCase();


    let matches = [];

    allCards.forEach(card => {
        const name = card.querySelector('#name').textContent.toLowerCase();

        if (inputLow.length !== 0 && name.includes(inputLow)) {
            clearCards(allCards);
            matches.push(card);
            displayCards(matches);
        } else if (inputLow.length === 0) {
            displayCards(allCards);
        }

    })

};



searchInput.addEventListener('keyup', (e) => {
    doSearch1(searchInput);
});




    

});