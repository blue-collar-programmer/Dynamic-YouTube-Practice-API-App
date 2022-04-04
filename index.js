

const appState = {
    searchEventCount: 0,
    incrementCount: function(){
        return this.searchEventCount++
    }
}// BREAKTHROUGH 4/2/22-- USING OBJS TO TRACK AND KEEP THE STATE IS KEY TO REFESHING WINDOW

let options = {
    method:'GET',
}

const searchButton = document.getElementById('searchButton');
let getYouTubeSearchResults = () => {
    // gets the current text value input in the search box by the user, and stores it into a variable
    // which is then inserted as a value after the key in the queryString and updated automatically
    let inputText = document.getElementById('searchInput').value;
    console.log('search input =>',inputText )// testing the inputText value
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${inputText}&maxResults=12&key=APIKEYGOESHERE`,options)
};

function reloadPage(){
    let c = appState.searchEventCount;
    if(c !== 1){
        //return  window.location.reload();
        return appState.incrementCount()
    } else {
        
        console.log('CLICK EVENT INSIDE RELOAD WAS TRIGGERED, search count=>', appState.searchEventCount);
        console.log('videoContainers value=>', videoContainers);
          return  searchButton.addEventListener('click', (e) => {            
            e.preventDefault()
        })    
    }
}  

searchButton.addEventListener('click', (e) => {
    appState.incrementCount();
           // reloadPage()
    // prevent the form from submitting the information by default
            e.preventDefault();
        getYouTubeSearchResults()
        .then(response =>{
            if(!response.ok) throw response.statusText;
            console.log({response}, "<={response}");
            return response.json()})
        // data here is the objects of results videos
    
        
        .then(data => {
            //used the forEach to loop through an array of items returned from the search, approx 5 items i.e. video. Why 5? IDK
    
            // get the id of the content container to render content to it dynamically using the DOM

            const contentContainer = document.getElementById('contentContainer');
            data.items.forEach(item => {
                let content = item.snippet;
                console.log(content); // output is the media that can be rendered to HTML dynamically      
                // create the container that each objects "snippet" will go into i.e thumbnail, title etc.
                //if()
                let div = document.createElement('div');
                console.log("div created again step 1")
                // add the same class for every div container created
                div.classList.add(`snippetContainer`);
                console.log('div class added -- snippet')
                //let snippetContainer = document.getElementsByClassName('snippetContainer')
                // append each div element create to the parent container
                contentContainer.appendChild(div)
                console.log('div appended again')
                /* now I am using the innerHTML property to render the data to the page and
                -to also create new elements/ containers for the data to matc the youtube 
                     -homepage as closely as I can 
                */
                
                div.innerHTML = `
            <img style= width:${content.thumbnails.medium.width}; height:${content.thumbnails.medium.height};\
                 class= "thumbnail" src="${content.thumbnails.medium.url}">
                <div class= "videoTitle-flex-container">
                 <div class= "mockAvatar"></div>
                 <h4 class="videoTitle">${content.title}</h4>
                 <div class= "videoOptionsIconContainer">
                 <div class= "optionDot">.</div>
                 <div class= "optionDot">.</div>
                 <div class= "optionDot">.</div>
                 </div>
                 </div>
                 <div class="detailsSection">
                 <p class= "channelTitle">${content.channelTitle}</p>
                 <p class= "publishTime">${content.publishedAt}</p>
                 </div>   
            `
        });
    })
    .catch(err => console.log("that didn't work heres the err=>", err))
    
})



function closeSideBar() {
    document.getElementById("sideBar").style.width = '0px';
    document.getElementById('mainContainer').style.cssText = "background-color:white; opacity:100%;";
}

function openSideBar() {
    document.getElementById("sideBar").style.width = '250px';
    document.getElementById('mainContainer').style.cssText = "background-color:grey; opacity:70%;";
}