// Selectors
const inputToDo = document.querySelector('.inputToDo');
const inputBtn = document.querySelector('.inputBtn');
const btnContainer = document.querySelector('.btnContainer');
const toDoList = document.querySelector('.toDoList');


// Events
document.addEventListener('DOMContentLoaded', renderLocalStorage());
inputBtn.addEventListener('click', renderInput);
toDoList.addEventListener('click', deleteIt);
btnContainer.addEventListener('click', filterIt);





// Functions

function renderInput(){
    // prevents refreshing after submit clicked
    event.preventDefault();

    // checks to see if inputbar has anything typed in
    // prevents empty divs from being created.
    if(inputToDo.value){

        //calls localStorageSave function 
        //to pushes inputToDo value into localStorage array 
        //because it is inside renderInput() whenever
        //renderInput() is called, this function will be called too.
        localStorageSave(inputToDo.value)

        // create div to contain list
        const toDo = document.createElement('div');
        toDo.classList.add('toDoItemContainer');
        toDoList.appendChild(toDo);

        // create li container value of input
        const toDoItem = document.createElement('li');
        toDoItem.classList.add('toDoItem');
        toDoItem.innerText = inputToDo.value;
        toDo.appendChild(toDoItem);

        // create CheckMark Btn
        const toDoCheckMark = document.createElement('button');
        toDoCheckMark.classList.add('checkMarkBtn');
        toDoCheckMark.innerHTML = `<i class="fas fa-check-circle"></i>`;
        toDo.appendChild(toDoCheckMark);

        // create delete Btn
        const toDoDeleteBtn = document.createElement('button');
        toDoDeleteBtn.classList.add('trashBtn')
        toDoDeleteBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
        toDo.appendChild(toDoDeleteBtn);

        // clears input in searchbar
        inputToDo.value = ''
    }
};



function deleteIt(e){
    // takes what is clicked DOM and store it into a variable.
    const targetClicked = e.target;

    // check if DOM has class mentioned.
    // remove target elements parent if has trashBtn class
    if(targetClicked.classList[0] == "trashBtn"){

        // adds a class called shrink. This shrink class has 
        // a transform css attached. Making the div turn smaller 
        // then disappear by turning opacity to 0. NOTE: the actual div is 
        // still there but it is just invisible because of opacity.
        targetClicked.parentElement.classList.add('shrink')

        // transitionend makes the targeted element wait till transitions are finished then
        // it will call function attached. In this case it will then remove div and call
        // deleteFromLocalStorage() to delete from localStorage.
        targetClicked.parentElement.addEventListener('transitionend', () => {
            targetClicked.parentElement.remove()
            deleteFromLocalStorage(targetClicked);
        })
    }

    // change target elements parents style if has checkMarkBtn class
    // add class checkedOff to parent element
    // for easier hide/show elements.
    if(targetClicked.classList[0] == "checkMarkBtn"){
        targetClicked.parentElement.style.opacity = 0.2
        targetClicked.parentElement.classList.toggle("checkedOff")
    }
};


function filterIt(e){
    // takes what is clicked DOM and store it into a variable.
    const targetClicked = e.target

    // takes all children of toDoList and stores in variable
    const items = toDoList.childNodes
    
    // checks what is being clicked
    // if what is being clicked has class called allBtn at index 0
    if(targetClicked.classList[0] == "allBtn"){

        // checks to see if items which is an array
        // is empty or not. NOTE: in this code the array called items
        // even when empty, has an object occupying position 1/index 0.
        // by checking to make sure the array is not empty it will allow loop 
        // to run. Avoiding undefined issues.
        if(items.length > 1){

            // loop through items array and chance the display of all items to flex.
            // starts loop at index 1.
            // LESSON LEARNED: LOOPS CANT NOT USE ARRAYS THAT ARE UNDEFINED AKA "EMPTY"/"NULL"/"NaN"
            for(let i = 1; i < items.length; i++){
                items[i].style.display = "flex"
            }
        }
    }


    // checks what is being clicked
    // if what is being clicked has class called completedBtn at index 0
    if(targetClicked.classList[0] == "completedBtn"){

        // checks to see if items which is an array
        // is empty or not. NOTE: in this code the array called items
        // even when empty, has an object occupying position 1/index 0.
        // by checking to make sure the array is not empty it will allow loop 
        // to run. Avoiding undefined issues.
        if(items.length > 1){


            // loop through items array and chance the display of all items to flex.
            // starts loop at index 1.
            // LESSON LEARNED: LOOPS CANT NOT USE ARRAYS THAT ARE UNDEFINED AKA "EMPTY"/"NULL"/"NaN"
            for(let i = 1; i < items.length; i++){

                // checks if each item in the items array 
                // has a class called checkedOff in index position 1
                // if it does change that item in items array
                // to flex
                if(items[i].classList[1] == "checkedOff"){
                    items[i].style.display = "flex"

                // if first condition is not met
                // change item to display none.
                }else{
                    items[i].style.display = "none"
                }
                
            }
        }
    }



    // checks what is being clicked
    // if what is being clicked has class called uncompletedBtn at index 0
    if(targetClicked.classList[0] == "uncompletedBtn"){


        // checks to see if items which is an array
        // is empty or not. NOTE: in this code the array called items
        // even when empty, has an object occupying position 1/index 0.
        // by checking to make sure the array is not empty it will allow loop 
        // to run. Avoiding undefined issues.
        if(items.length > 1){

            
            // loop through items array and chance the display of all items to flex.
            // starts loop at index 1.
            // LESSON LEARNED: LOOPS CANT NOT USE ARRAYS THAT ARE UNDEFINED AKA "EMPTY"/"NULL"/"NaN"
            for(let i = 1; i < items.length; i++){


                // checks if each item in the items array 
                // has a class called checkedOff in index position 1
                // if it does not, change that item in items array
                // to flex
                if(items[i].classList[1] !== "checkedOff"){
                    items[i].style.display = "flex"


                // if first condition is not met
                // that means item has class checkedOff then
                // change that item to display none.
                }else{
                    items[i].style.display = "none"
                }
            }
        }
    }
};



function localStorageSave(toDoValue){

    // create empty variable for future purposes.
    let saveLocalStorage;
   

    // checks to see if localstorage has any data saved to the key "saveLocalStorage"
    // if it does not then turn the variable saveLocalStorage into an empty array
    // then procede to pushing the toDoValue parameter into array and saving it to localStorage
    if (JSON.parse(localStorage.getItem("saveLocalStorage")) == null){
        saveLocalStorage = [];


    // if the first condition is not met
    // that means that after checking the localstorage 
    // it contains previously saved data under the key "saveLocalStorage".
    // Pull data from localstorage into the variable saveLocalStorage
    // because the data pulled is in string form, inside the localstorage
    // it is saved in an array. Hence by pulling data into saveLocalStorage variable
    // it automatically turns it into an array also.
    // Then it being an array already, we can just push the toDoValue obtained from the above
    // function, into the array adding onto the data pulled. Then we set the array back into the
    // localstorage which now includes the old data and the new data.
    } else {
        saveLocalStorage = JSON.parse(localStorage.getItem("saveLocalStorage"))
    }


    // push current value of inputToDo, in this function it is known as toDos AKA whatever is typed 
    // into localStorage array.
    // must use push method to add data/value into array
    // using += does not work for array. Only adds into variables.
    saveLocalStorage.push(toDoValue)


    // save localStorage into chrome localstorage.
    // by stringifying it, it turns it into an item that can only be pushed into
    // an array and prevents
    // it from becoming an object.
    localStorage.setItem('saveLocalStorage', JSON.stringify(saveLocalStorage));
};


function deleteFromLocalStorage(target) {

    // create empty variable for future purposes.
    let saveLocalStorage;


    // checks to see if localstorage has any data saved to the key "saveLocalStorage"
    // if it does not then turn the variable saveLocalStorage into an empty array
    // then procede to pushing the toDoValue parameter into array and saving it to localStorage
    if (JSON.parse(localStorage.getItem("saveLocalStorage")) == null){
        saveLocalStorage = [];
    
    
    // if the first condition is not met
    // that means that after checking the localstorage 
    // it contains previously saved data under the key "saveLocalStorage".
    // Pull data from localstorage into the variable saveLocalStorage
    // because the data pulled is in string form, inside the localstorage
    // it is saved in an array. Hence by pulling data into saveLocalStorage variable
    // it automatically turns it into an array also.
    // Then it being an array already, we can just push the toDoValue obtained from the above
    // function, into the array adding onto the data pulled. Then we set the array back into the
    // localstorage which now includes the old data and the new data.
    } else {
        saveLocalStorage = JSON.parse(localStorage.getItem("saveLocalStorage"))
    }


    // stores the parameter called target taken from the targetClicked event 
    // on the trashcanBtn. Searching the DOM, leading to the parent of trashcanBtn
    // then back to the children of toDoItemContainer and specifically calling the 
    // child in index position 0. Then the innerText of that child.
    const indexOfStorageItem = target.parentElement.childNodes[0].innerText;


    // Using the innerText stored in indexOfStorageItem to target and remove any elements
    // inside the saveLocalStorage array.
    saveLocalStorage.splice(indexOfStorageItem, 1)


    // save localStorage into chrome localstorage.
    // by stringifying it, it turns it into an item that can only be pushed into
    // an array and prevents
    // it from becoming an object.
    localStorage.setItem('saveLocalStorage', JSON.stringify(saveLocalStorage));
};


function renderLocalStorage(){
    // create empty variable for future purposes.
    let saveLocalStorage;

    // checks to see if localstorage has any data saved to the key "saveLocalStorage"
    // if it does not then turn the variable saveLocalStorage into an empty array
    // then procede to pushing the toDoValue parameter into array and saving it to localStorage
    if (JSON.parse(localStorage.getItem("saveLocalStorage")) == null){
        saveLocalStorage = [];
    
    
    // if the first condition is not met
    // that means that after checking the localstorage 
    // it contains previously saved data under the key "saveLocalStorage".
    // Pull data from localstorage into the variable saveLocalStorage
    // because the data pulled is in string form, inside the localstorage
    // it is saved in an array. Hence by pulling data into saveLocalStorage variable
    // it automatically turns it into an array also.
    // Then it being an array already, we can just push the toDoValue obtained from the above
    // function, into the array adding onto the data pulled. Then we set the array back into the
    // localstorage which now includes the old data and the new data.
    } else {
        saveLocalStorage = JSON.parse(localStorage.getItem("saveLocalStorage"))
    }

    // loops through the saveLocalStorage array
    // to create new div/li/btn's based on the length.
    for(let i = 0; i < saveLocalStorage.length; i++){

        // create div to contain list
        const toDo = document.createElement('div');
        toDo.classList.add('toDoItemContainer');
        toDoList.appendChild(toDo);

        // create li container using data from saveLocalStorage.
        const toDoItem = document.createElement('li');
        toDoItem.classList.add('toDoItem');
        toDoItem.innerText = saveLocalStorage[i];
        toDo.appendChild(toDoItem);

        // create CheckMark Btn
        const toDoCheckMark = document.createElement('button');
        toDoCheckMark.classList.add('checkMarkBtn');
        toDoCheckMark.innerHTML = `<i class="fas fa-check-circle"></i>`;
        toDo.appendChild(toDoCheckMark);

        // create delete Btn
        const toDoDeleteBtn = document.createElement('button');
        toDoDeleteBtn.classList.add('trashBtn')
        toDoDeleteBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
        toDo.appendChild(toDoDeleteBtn);
    }

};