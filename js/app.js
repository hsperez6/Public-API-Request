
document.addEventListener('DOMContentLoaded', async (e) => {

    const gallery = document.getElementById('gallery')
    const body = document.getElementsByTagName('body')


    /***************************************************************************************
     * FETCH DATA FROM API
     * fetched data gets parsed to json
     * json.results saved to variable profilesArray
     **************************************************************************************/
    const profilesArray = await fetch('https://randomuser.me/api/?results=12&nat=us')
                            .then(res => res.json())
                            .then(json => {
                                return json.results;
    });

    /***************************************************************************************
     * FILL PAGE WITH PROFILES RETURNED FROM FETCH FUNCTION
     * @param {*} data Array of profiles in JSON format
     * creates a <div> with class 'card' and fills it with profile information for each employee
     * inserts each <div> into gallery section of webpage
     **************************************************************************************/
    function fillGallery(data) {  
        data.map(person => {
            gallery.insertAdjacentHTML(
                'beforeend',
                `<div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${person.picture.medium}" alt="profile picture">
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

    fillGallery(profilesArray);

    
    /***************************************************************************************
     * EVENT LISTENER FOR SELECTING PROFILE AND CREATING MODAL WINDOW
     * allows user to click anywhere inside the '.card' element and selects that person's index
     * uses the selected index to execute the createModal function which pops up the modal
     **************************************************************************************/
    gallery.addEventListener('click', (e) => {
        if(e.target.classList.contains('card') || e.target.classList.contains('card-img') || e.target.classList.contains('card-name') || e.target.classList.contains('card-text')) {
            const clickedCard = e.target.closest('.card');
            const clickedCardName = clickedCard.querySelector('#name').textContent;
            
            profilesArray.forEach((person, index) => {
                if (clickedCardName.includes(person.name.first) && clickedCardName.includes(person.name.last)) {
                    const clickedIndex = index;
                    createModal(clickedIndex);
                }
            });
        }
    });



    /***********************************************************************************
     * MODAL
     **********************************************************************************/
    /********************************************
     * FORMATTING FUNCTIONS
     *******************************************/

    /********************
     * FORMAT TELEPHONE
     * @param {number} phone number  
     * @returns formatted number in the format (XXX) XXX-XXXX
     *******************/
    function formatTelephone(number) {
        const joined = number.match(/\w+/gi).join("");
        const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
        return joined.replace(regex, '($1) $2-$3')
    };

    /********************
     * FORMAT DATE OF BIRTH
     * @param {date} data date of birth date information from profiles returned from API
     * @returns data in format XX/XX/XXXX
     *******************/
    function formatBirthday(data) {
        const birthday = new Date(data)
        const year = birthday.getFullYear();
        const month = birthday.getMonth();
        const day = birthday.getDate();
        return `${month}/${day}/${year}`;
    };


    /***************************************************************************************
     * CREATE MODAL + CONTROLLERS
     * @param {*} index index of the clicked card profile, used to create modal and controls
     * takes index of selected person and formats their phone number and birthday
     * creates a modal window and populates it with the information from selected profile
     * creates a second div containing the toggle controls for the modal
     * adds the toggle and close controls for the modal
     **************************************************************************************/
    function createModal(index) {  
        const fixedPhoneNumber = formatTelephone(profilesArray[index].phone);
        const fixedBirthday = formatBirthday(profilesArray[index].dob.date);

        gallery.insertAdjacentHTML(
            'beforeend',
            `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${profilesArray[index].picture.medium} alt="profile picture">
                        <h3 id="name" class="modal-name cap">${profilesArray[index].name.first} ${profilesArray[index].name.last}</h3>
                        <p class="modal-text">${profilesArray[index].email}</p>
                        <p class="modal-text cap">${profilesArray[index].location.city}</p>
                        <hr>
                        <p class="modal-text">${fixedPhoneNumber}</p>
                        <p class="modal-text">${profilesArray[index].location.street.number} ${profilesArray[index].location.street.name}, ${profilesArray[index].location.city}, ${profilesArray[index].location.state} ${profilesArray[index].location.postcode}</p>
                        <p class="modal-text">Birthday: ${fixedBirthday}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`
        );
        
        /******************************
         * FOR CLOSING THE MODAL WINDOW
         ******************************/
        const modalContainer = document.querySelector('.modal-container');
        const modalCloseBtn = document.querySelector('#modal-close-btn');

        modalCloseBtn.addEventListener('click', (e) => {
            modalContainer.remove();
        });

        /*******************************
         * FOR ITERATING OVER PROFILE LIST ON MODAL WINDOW
         ******************************/
        const modalPrev = document.querySelector('#modal-prev');
        const modalNext = document.querySelector('#modal-next');

        modalPrev.addEventListener('click', () => {
            if(index !== 0) {
                modalContainer.remove();
                createModal(index - 1);
            } else {
                modalContainer.remove();
            }
        });

        modalNext.addEventListener('click', () => {
            if(index !== 11) {
                modalContainer.remove();
                createModal(index + 1);
            } else {
                modalContainer.remove();
            }
        });

    };




    /***********************************************************************************************
     * SEARCH FUNCTION
     **********************************************************************************************/
    const searchContainer = document.querySelector('.search-container');

    /*********************
     * INSERT SEARCHBOX
     *********************/
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


    /********************
     * SEARCH HELPER FUNCTIONS
     * For toggling display
     *******************/
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

    /***********************************************************************************************
     * EXECUTE SEARCH FUNCTION
     * @param {*} input uses search input from user to search through all cards
     **********************************************************************************************/
    let searchInput = document.querySelector('#search-input');
    let searchIcon = document.querySelector('#search-submit'); 

    function doSearch (input) {
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

        });

    };

    /***********************
     * EVENT LISTENERS FOR SEARCH FUNCTION
     **********************/

    searchInput.addEventListener('keyup', (e) => {
        doSearch(searchInput);
    });

    searchIcon.addEventListener('submit', (e) => {
        doSearch(searchInput);
    });


});