const coming =()=> {
    return new Promise((resolve,rej)=> {
        fetch('http://13.233.130.97:4000/api/gubor')
        .then(res=> res.json())
        .then(data=> resolve(data.slides))
        .catch(e=> rej("Error123"))
    })
}


const call = async()=> {
    let data;
    try {
        data= await coming();
        
    }
    catch(err){
        console.log(err);
    }
    if(data) console.log(data);
}

