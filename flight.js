let countries = ["Mumbai", "Bangalore", "Chennai", "Kolkata", "Lucknow", "Amritsar", "Delhi", "Goa", "Patna", "Pune",
                "Surat", "Netaji Subhas Chandra Bose International Airport", "Indira Gandhi International Airport",
                "Pune Airport", "Cochin International Airport" ]
               

let container = document.querySelector('.rds-head4');
let dropDownList = document.querySelector('.input-box');
let searchInput = document.querySelector('.inp');
let list = dropDownList.querySelector('.lsti');

searchInput.addEventListener('keyup',()=>{
    list.classList.toggle('active');
})
function addCountry() {
    document.querySelectorAll('.lsti').forEach(list => {
        list.innerHTML = "";
        countries.forEach(country => {
            let listItem = '<li>' + country + '</li>';
            list.insertAdjacentHTML('beforeend', listItem);
        });
    });
    addClickEventToLi();
}
addCountry();

function addClickEventToLi() {
    document.querySelectorAll('.lsti li').forEach(li => {
        li.addEventListener('click', function() {
            let inputBox = this.closest('.input-box');
            let searchInput = inputBox.querySelector('.inp');
            let list = inputBox.querySelector('.lsti');

            updateSelectCountry(this, searchInput, list);
        });
    });
}

function updateSelectCountry(listItem, searchInput, list) {
    searchInput.value = listItem.innerHTML;
    list.classList.remove('active');
    addCountry();
    list.style.display = 'none';
}

document.querySelectorAll('.input-box .inp').forEach(input => {
    input.addEventListener('input', function() {
        let list = this.parentElement.querySelector('.lsti');
        if (this.value.length > 0) {
            list.style.display = 'block';
        } else {
            list.style.display = 'none';
        }

        let searchval = this.value.toLowerCase();
        let filterCountries = countries.filter(country => {
            return country.toLowerCase().includes(searchval);
        }).map(country => {
            return '<li>' + country + '</li>';
        }).join("");
        
        list.innerHTML = filterCountries;
        addClickEventToLi();
    });
});
// This is for radio button.
document.addEventListener('DOMContentLoaded', function() {
    const returnInput = document.getElementById('return-input');
    const returnBox = document.getElementById('return-box');

    // Function to disable the return input
    function disableReturnInput() {
        returnInput.disabled = true;
        returnBox.classList.add('disabled');
    }

    // Function to enable the return input
    function enableReturnInput() {
        returnInput.disabled = false;
        returnBox.classList.remove('disabled');
    }

    // Add event listeners to the radio buttons
    document.getElementById('one-way').addEventListener('change', function() {
        if (this.checked) {
            disableReturnInput();
        }
    });

    document.getElementById('return').addEventListener('change', function() {
        if (this.checked) {
            enableReturnInput();
        }
    });

    document.getElementById('multi-city').addEventListener('change', function() {
        if (this.checked) {
            enableReturnInput();
        }
    });

    // Initial check to set the correct state based on the selected radio button
    if (document.getElementById('one-way').checked) {
        disableReturnInput();
    } else {
        enableReturnInput();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const travellersInput = document.querySelector('.inps');
    const pref = document.querySelector('.pref');
    const prefDoneButton = document.querySelector('.pref-done');
    const selectClassInput = document.querySelector('.pref-inp');
    const classList = document.querySelector('.lst-class');
    const classItems = classList.querySelectorAll('li');
    const adultsInput = document.querySelector('.adults-inp');
    const childrenInput = document.querySelector('.children-inp');

    function updateTravellersInput() {
        const cabinClass = selectClassInput.value || 'Economy';
        const adults = parseInt(adultsInput.value) || 0;
        const children = parseInt(childrenInput.value) || 0;
        const adultsText = adults === 1 ? '1 adult' : `${adults} adults`;
        const childrenText = children === 0 ? '' : children === 1 ? ', 1 child' : `, ${children} children`;
        travellersInput.value = `${adultsText}${childrenText}, ${cabinClass}`;
    }

    // Show/Hide traveller and cabin class options
    travellersInput.addEventListener('click', (event) => {
        event.stopPropagation();
        pref.classList.toggle('active');
    });

    prefDoneButton.addEventListener('click', () => {
        pref.classList.remove('active');
        updateTravellersInput();
    });

    document.addEventListener('click', (event) => {
        if (!pref.contains(event.target) && event.target !== travellersInput) {
            pref.classList.remove('active');
        }
    });

    // Show/Hide cabin class dropdown
    selectClassInput.addEventListener('click', (event) => {
        event.stopPropagation();
        classList.classList.toggle('active');
    });

    // Update cabin class input and hide dropdown on selection
    classItems.forEach(item => {
        item.addEventListener('click', () => {
            selectClassInput.value = item.textContent;
            classList.classList.remove('active');
            updateTravellersInput();
        });
    });

    document.addEventListener('click', (event) => {
        if (!classList.contains(event.target) && event.target !== selectClassInput) {
            classList.classList.remove('active');
        }
    });

    // Functionality for plus and minus buttons
    const minusButtons = document.querySelectorAll('.minus-btn');
    const plusButtons = document.querySelectorAll('.plus-btn');

    minusButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const input = button.nextElementSibling;
            let value = parseInt(input.value);
            if (value > 0) {  // Ensure the value does not go below 0
                input.value = value - 1;
                updateTravellersInput();
            }
        });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const input = button.previousElementSibling;
            let value = parseInt(input.value);
            input.value = value + 1;
            updateTravellersInput();
        });
    });
});