const loadPhone = async (searchText='20', isAllShow) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const phones = data.data;
    // console.log(phone)
    displayPhone(phones, isAllShow);
}


function displayPhone(phones, isAllShow) {
    // 1
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.textContent = '';
    
    console.log(!isAllShow)


    //all-show id get in here
    const allShow = document.getElementById('all-show');
    if(phones.length > 12 && !isAllShow) {
        allShow.classList.remove('hidden')
    }
    else {
        allShow.classList.add('hidden')
    }

    if(!isAllShow) {
        // search result give the 12 item
        phones = phones.splice(0,12)
    }

    phones.forEach(phone => {
        // console.log(phone)
        // 4
        const phoneCard = document.createElement('div');
        // 5
        phoneCard.classList = `card card-compact p-6 bg-red-200 shadow-x`;
        //6
        phoneCard.innerHTML = `
        <figure> 
            <img src="${phone.image}" al="Shoes"/> 
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2> 
            <p> If a dog chews shoes whose shoes does he choose ? </p> 
            <div class = "card-actions justify-center">
                <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary">Show Details</button> 
            </div> 
        </div>
        `;
        // 5
        phoneContainer.appendChild(phoneCard)
        
    });

    loadingHandler(false);
}


// showDetailsHandler function in here create 
const showDetailsHandler = async (id) => {
    // console.log('clicked', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data)
    const phoneData = data.data;
    showPhoneDetails(phoneData)
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.classList = `space-y-4 text-[#706F6F] text-xl font-normal`
    showDetailsContainer.innerHTML = `
        <img class="mx-auto" src="${phone.image}" alt="">
        <h4 class="text-[#403F3F] font-bold text-3xl capitalize">${phone.name}</h4>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="text-[#403F3F] font-semibold">Storage: <span>${ phone.mainFeatures?.storage}</span></p>
        <p class="text-[#403F3F] font-semibold">Display Size: <span>${ phone.mainFeatures?.displaySize}</span></p>
        <p class="text-[#403F3F] font-semibold">ChipSet: <span>${ phone.mainFeatures?.displaySize}</span></p>
        <p class="text-[#403F3F] font-semibold">Memory: <span>${ phone.mainFeatures?.memory}</span></p>
        <p class="text-[#403F3F] font-semibold">Slug: <span>${ phone?.slug}</span></p>
        <p class="text-[#403F3F] font-semibold">Release data: <span>${ phone?.releaseDate}</span></p>
        <p class="text-[#403F3F] font-semibold">Brand: <span>${ phone?.brand}</span></p>
        <p class="text-[#403F3F] font-semibold">GPS: <span>${ phone?.others?.GPS || 'No GPS'}</span></p>
          
    `;

    // show details modal 
    show_details_modal.showModal()
}


// HandleSearch function create in here 
const  HandleSearch = (isAllShow) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    // loading function call in here
    loadingHandler(true);
    // loadPhone function call in here 
    loadPhone(searchText, isAllShow);
    // the searchField is into data clear 
    // searchField.value = ''

    

}


// loading function is here create 
function loadingHandler(isLoading) {
    const loadingElement = document.getElementById('loading-element')
    if(isLoading) {
        loadingElement.classList.remove('hidden')
    }else{
        loadingElement.classList.add('hidden')
    }
}



// allContentShow handle function in here 
const handleAllContentShow = ()=> {
    // HandleSearch function call in here 
    HandleSearch(true);
}





loadPhone();