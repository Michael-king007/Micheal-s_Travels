/*
Prima di recuperare i dati dall'API devo selezionare gli elementi
del DOM.
*/
const loadTodosButton = document.getElementById('Todos');
const pacchetto = document.getElementById('pacchetto');

//Funzione per recuperare i dati dall'API
async function recupero()
{
    try 
    {
        //Effuettuo la chiamata API
        const response = await fetch("dati.json");
        
        //Controllo se la chiamata è andata a buon fine :
        if(!response.ok)
        {
            throw new Error(`Errore nella chiamata API: ${response.status}`);
        }
        
        //Ora devo convertire la chiamata in formato JSON :
        const todos = await response.json() ;
        
        //Pulisco la lista :
        pacchetto.innerHTML = '';
        let cont = 0;
        
        
        //Aggiungo i dati al DOM :
        todos.forEach(todo => {
            if(cont >= 5) return;
            const listItem = document.createElement('div');
            const nome = document.createElement('h4');
            nome.textContent = todo.nome;
            listItem.appendChild(nome);

            const bonus = document.createElement('p');
            bonus.textContent = todo.bonus;
            listItem.appendChild(bonus);

            const prezzo = document.createElement('span');
            prezzo.textContent = todo.prezzo;
            listItem.appendChild(prezzo);

            
            //Se il "todo" è completato, scrive un messaggio :
            if(todo.completed)
            {
                listItem.classList.add('completed');
            }
            pacchetto.appendChild(listItem) ;
            cont++;
        })
        console.log("Elementi aggiunti al DOM:", pacchetto.innerHTML);
    }
    catch(error)
    {
        console.error('Si è verificato un errore : ', error);
        alert('Errore nel caricamento dei dati. Riprova più tardi...');
    }
}
//Aggiunge un evento al pulsante per caricare le attività
loadTodosButton.addEventListener('click', recupero);
