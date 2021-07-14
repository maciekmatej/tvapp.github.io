const form = document.querySelector('#searchForm');
const h1 = document.querySelector('h1');
const showInput = document.querySelector('#search');
const alertDiv = document.querySelector('#alert');
const cardsDiv = document.querySelector('.cards');


form.addEventListener('submit', (e) => { // search on submit
    e.preventDefault();
    
    if(showInput.value === ""){ // empty imput error
        alertDiv.classList.remove('hidden');
        alertDiv.classList.add('alert');
        console.log('asdasad');
        form.classList.add('disabled');
        const alertBtn = document.querySelector('button[type="button"]');
        alertBtn.addEventListener('click', () => {
            form.classList.remove('disabled');
            alertDiv.classList.add('hidden');
            alertDiv.classList.remove('alert');
        })
    }
    const images = document.querySelectorAll('img');
    for (img of images) { // clearing images on next search
        
        if(img){
            img.parentElement.remove();
            img.remove();

        }
    }
    
    const userInput = form.elements.query;
    const api = 'http://api.tvmaze.com/search/shows?q=';
    // 
    // fetch(`${api}${userInput.value}`)
    //     .then((res) => {
    //         return res.json();
    //     })
    //     .then(data => {
    //         console.log(data);
    //     })
    //      .catch((e)=> {
   //           console.log('eeerroro', e);
    // })
        
     const fetchData = async () => {
        try{
            const res = await fetch(`${api}${userInput.value}`);
            const data = await res.json();
            console.log(data);
            
            for(result of data){
                
                
                if(result.show.image){
                    
                    const newImg = document.createElement('img');
                    console.dir(newImg);
                    // const cardsDiv = document.querySelector('.cards');
                    newImg.setAttribute('src',`${result.show.image.medium}`);    
                    const newCard = document.createElement('div');
                    newCard.classList.add('single-card')
                    cardsDiv.append(newCard);
                    newCard.append(newImg);

                    const scoreData = Math.round(100 * result.score);
                    const scoreCard = document.createElement('div');
                    scoreCard.classList.add('score-card');
                    scoreCard.innerText = `Rating: ${scoreData}`
                    newCard.append(scoreCard);
                    
                    
                    
                }else{
                    
                    console.log('no image')
                }   
            }
         }catch (e){
             console.log('sth went wrong', e)
         }
    }       
    fetchData();
    showInput.value = "";
})
console.dir(showInput)
showInput.addEventListener('input', () => { // search input transfered to h1
    if(showInput.value === ""){
        h1.innerText = 'Search for any TV show'
    }else{
        h1.innerText = `${showInput.value}`
    }
})

cardsDiv.addEventListener('click', (e) => {
                const scoreCardTarget = e.target.nextSibling
                if(e.target.nodeName === 'IMG'){
                    console.log(scoreCardTarget);
                }
                
            })