export {getFirebase, putToFirebase, deleteScoresFirebase}

//GET
async function getFirebase(){
    const url = 'https://rockpaperscissor-5995a-default-rtdb.europe-west1.firebasedatabase.app/scores.json'

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

//PUT
async function putToFirebase(message){
    const url = 'https://rockpaperscissor-5995a-default-rtdb.europe-west1.firebasedatabase.app/.json';

    const options = {
        method: 'PUT',
        body: JSON.stringify({
            scores: message,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const response = await fetch(url, options);
    const data = await response.json(); 
}
