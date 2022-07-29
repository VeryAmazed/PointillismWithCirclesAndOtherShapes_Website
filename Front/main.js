const form = document.querySelector('form');

const inFile = document.querySelector('#image');
const radio = document.getElementsByName("operation");
// form submits and then we hide main and make a fetch request
let unique_id = -1;

window.addEventListener('load', (e)=>{
    
    fetch('http://localhost:8080/id').then((resp) =>{
        //console.log("resp?");
        if(!resp.ok){
            
            throw new Error(`Http error! Status: ${resp.status}`);
        }
        return resp.json();
    }).then(vals=>{
        unique_id = vals.value;
        console.log(unique_id);
    });
    
});

form.addEventListener('submit', (e)=>{
   e.preventDefault();
    document.querySelector('main').style.visibility = "hidden";
    document.querySelector("#waiting").style.visibility = "visible";
    let result;
    for(i = 0; i < radio.length; i++){
        if(radio[i].checked){
            result = radio[i].value;
        }
    }
    //check file size here
    const formData = new FormData();
    formData.append("image", inFile.files[0]);
    formData.append("operation", result);
    formData.append("u_id", unique_id);
    formData.append("radius", document.querySelector("#radius").value);
    fetch("http://localhost:8080/send", {
        method: "POST",
        body: formData,
    }).then((resp)=>{
        //console.log("made it here1");
        
        if(!resp.ok){
            throw new Error(`HTTP error! Status: ${ response.status }`);
        }
        
        //console.log(resp.blob());
        return resp.blob();
    }).then(resp =>{
        console.log("made it here2");
        console.log(resp);
        const imgUrl =  URL.createObjectURL(resp);
        document.querySelector('main').style.visibility = "visible";
        document.querySelector("#waiting").style.visibility = "hidden";
        document.querySelector("#after").src = imgUrl;
    });
    
});

