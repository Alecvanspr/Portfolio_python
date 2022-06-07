function add(){
    let waarde = document.getElementById("Kwantiteit-veld").value
    document.getElementById("Kwantiteit-veld").value = parseInt(waarde)+1
}

function remove(){
    let waarde = document.getElementById("Kwantiteit-veld").value
    if(waarde>0){
        document.getElementById("Kwantiteit-veld").value = parseInt(waarde)-1
    }
}
