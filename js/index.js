
var siteName = document.getElementById("sn");
var  siteUrl    = document.getElementById("su");


var allBookMark =[];
var addBtn=document.getElementById("submit");


var updateValue =0;



if(localStorage.getItem('allBookMark')!=null){
    allBookMark=JSON.parse(localStorage.getItem('allBookMark'))
    displayAllSites();
}







function addUrl(){

  if(validateSiteName()==true && validateSiteURL()==true){

    

        if(addBtn.innerHTML === 'Update')
        {
            UpdateElements();
        }
        else{
    
            var bookmark = {
                name:siteName.value,
               
                url:siteUrl.value
               
            
            
            
            
            }
            
            
            allBookMark.push(bookmark);
            localStorage.setItem('allBookMark',JSON.stringify(allBookMark))
            console.log(allBookMark);
            
            
            clear();
            displayAllSites();
            
    
    
    
    
    
    
        }

    
  



  }
  else{
    alert(`Site Name or Url is not valid, Please follow the rules below :

    Site name must contain at least 3 characters
    Site URL must be a valid one`)
  }
    
    

        



}

function clear(){
    document.getElementById("sn").value="";
    document.getElementById("su").value="";
   
}



function displayAllSites(){
    item="";
    for(var i=0;i<allBookMark.length;i++){

        item+=`  <tr >

        <td>${i+1}</td>

        <td>${allBookMark[i].name}</td>
        

        <td >
        <button  class="btn btn-success"><a href="${allBookMark[i].url}" target="_blank" class="text-decoration-none text-white" >visit </a></button>
    </td>
       
        <td >
        <button onclick="deleteElements(${i})" class="btn btn-danger">Delete</button>
    </td>
    <td>
        <button onclick="setUpdateForm(${i})" class="btn btn-warning">Update</button>
    </td>
    </tr>`





    }

    document.getElementById("display").innerHTML=item;

}


function deleteElements(index){

    allBookMark.splice(index,1);
    localStorage.setItem('allBookMark',JSON.stringify(allBookMark))
    displayAllSites();

}




function setUpdateForm(index){

    addBtn.innerHTML="Update";
    addBtn.classList.replace('btn-outline-success','btn-outline-warning')

    updateValue =index;

    siteName.value=allBookMark[index].name;
    siteUrl.value=allBookMark[index].url;
  

}


function UpdateElements(){

    allBookMark[updateValue].name= siteName.value;
    allBookMark[updateValue].url=siteUrl.value;
 

    addBtn.innerHTML = "Submit";
    addBtn.classList.replace('btn-outline-warning','btn-outline-success')


    localStorage.setItem('allBookMark',JSON.stringify(allBookMark))
    


    displayAllSites();
    clear();


}


function searchElement(){


    var element = document.getElementById('search').value


    var container = "";


    for(var i=0; i<allBookMark.length;i++){


        if(allBookMark[i].name.toLowerCase().includes(element)== true || allBookMark[i].name.toUpperCase().includes(element)== true ){


            container+=`  <tr >

            <td>${i+1}</td>
    
            <td>${allBookMark[i].name}</td>
            
    
            <td >
            <button  class="btn btn-dark"><a href="${allBookMark[i].url}" target="_blank" class="text-decoration-none text-white" >visit </a></button>
        </td>
           
            <td >
            <button onclick="deleteElements(${i})" class="btn btn-danger">Delete</button>
        </td>
        <td>
            <button onclick="setUpdateForm(${i})" class="btn btn-warning">Update</button>
        </td>
        </tr>`



        }





    }

    document.getElementById("display").innerHTML= container;

}




function validateSiteName() {
    
    const regex = /^[a-zA-Z0-9_-]{3,}$/;
    return regex.test(siteName.value);
  }




  function validateSiteURL() {
    // Site URL validation using a simple regex
    var regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/\S*)?$/;
    return regex.test(siteUrl.value );
  }