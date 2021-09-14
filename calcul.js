// Chiffres
const zero = document.querySelector('.zero')
const one = document.querySelector('.one')
const two = document.querySelector('.two')
const three = document.querySelector('.three')
const four = document.querySelector('.four')
const five = document.querySelector('.five')
const six = document.querySelector('.six')
const seven = document.querySelector('.seven')
const eight = document.querySelector('.eight')
const nine = document.querySelector('.nine') 

// Fonctions de calculs 
const division =  document.querySelector('.division')
const multiply = document.querySelector('.multiply')
const moins = document.querySelector('.moins')
const plus = document.querySelector('.plus')
const percent = document.querySelector('.percent')
const virgule = document.querySelector('.virgule')


const equal = document.querySelector('.equal')
const dlt = document.querySelector('.delete')

// Liste qui contiendra les valeurs ajouté par l'utilisateur
var finalCalcul = []
// Variable qui contient la liste des varibles qui sélectionnent les éléments sélectionner précisément dans le DOM
const listChoice = [zero,one,two,three,four,five,six,seven,eight,nine,division,multiply,moins,plus]
//  Variable qui contient la liste des élements qui vont constituer l'élément à calculer. 
const listValues = [0,1,2,3,4,5,6,7,8,9,"/","*","-","+"]

/* Pour trier les chiffres avant et après le signe*/ 
const tabA = [] ;
const tabB = [] ;
var result = 0 ;
let joinFinalCalcul = null ;


/*  Partie Calcul - Création d'un noeud qui va écrire le résultat dans le DOM */
function createNodes(result) {
    
    document.querySelector('p').firstChild.data = result ;
    finalCalcul.splice(0,finalCalcul.length)
    tabA.splice(0,tabA.length)
    tabB.splice(0,tabB.length)
    // Mettre le résultat total dans result.
    finalCalcul.push(result);
    console.log("Résultat : "+ finalCalcul)
}


// Réalisation du calcul

function addition(a,b,createNodeCallBack){
    result = a + b ;
    createNodeCallBack(result)
} 
function soustraction(a,b,createNodeCallBack){
    result = a - b ;
    createNodeCallBack(result)
} 
function multiplication(a,b,createNodeCallBack){
    result = a * b ;
    createNodeCallBack(result)
} 
function divisionn(a,b,createNodeCallBack){
    result = a / b ;
    createNodeCallBack(result)
} 


function applyGoodFunction(symbole,callback){

    for (let i = 0 ; i < finalCalcul.length; i++){

        // On récupère l'index du symbole mis dans la tableau  puis on dit que si l'index est inférieur à cette derière valeur  alors on veut voir les valeurs associés.

        let repere = finalCalcul.indexOf(symbole)
        if (i < repere){
            tabA.push(finalCalcul[i])
        } 
        else if(i > repere){
            tabB.push(finalCalcul[i])
        }
            
    }

    if( result === 0){
        let nA = tabA.join('')
        var nbA = parseInt(nA)

        let nB = tabB.join('')
        var nbB = parseInt(nB)
        console.log( "table A "+ nbA)
        console.log( "table B "+ nbB)
        
        callback(nbA,nbB,createNodes)
    } 
    else{
        let nA = tabA.join('')
        var nbA = parseInt(nA)

        console.log("tableau table TAB1  : "+ tabA)

        let nB = tabB.join('');
        var nbB = parseInt(nB);
        console.log("table A v2 : "+ nbA)
        console.log("table B v2 : "+ nbB)
        
        callback(nbA,nbB,createNodes)
    }    
}




equal.onclick  = startCalculating ;
division.onclick  = startCalculating ;
moins.onclick  = startCalculating ;
plus.onclick  = startCalculating ;

function startCalculating () {  

    finalCalcul.forEach(function(element){
        let plus = "+" ;
        let moins = "-" ;
        let multiply = "*" ;
        let division= "/" ;
        let virgu = "." ;
        let percent= "%" ;
    
        if (element === plus){
            let symboles1 = element ;
            applyGoodFunction(symboles1,addition)

        } else if(element === moins){
            let symboles2 = element ;
            applyGoodFunction(symboles2,soustraction)
        
        } else if (element === multiply){
            let symboles3 = element ;
            applyGoodFunction(symboles3,multiplication)

        } else if(element === division){
            let symboles4 = element ;
            applyGoodFunction(symboles4,divisionn);
        
        } else if (element === virgu){
            let symboles5 = element ;
            applyGoodFunction(symboles5,multiplication)

        } else if(element === percent){
            let symboles6 = element ;
            applyGoodFunction(symboles6,divisionn);
        
        }

    })

}





/* --->   Création d'un noeud qui va écrire le résultat dans le DOM */
function createNode(tabFinalCalcul) {
    
    if (finalCalcul.length === 1){
        const parentNode = document.getElementById("div1");
        let newDiv = document.createElement("p") ;
        let newContent = document.createTextNode(tabFinalCalcul) ;
        newDiv.className = 'nodeResult' ; 
        newDiv.appendChild(newContent);
        parentNode.appendChild(newDiv);
    
    } if (finalCalcul.length > 1) { 
    
        // Modification d'un premier noeud de la balise p. avec les valeurs rentrées par le joueur
        document.querySelector('p').firstChild.data = tabFinalCalcul ;
    }

}



/* ---> Écoute évenement sur les boutons */
listChoice.forEach((item,index)=>{
    item.addEventListener('click', () => {
        /* Création d'une variable qui stock la valeur de l'index. Cet index va nous servir à trouver la valeur chiffrées associé à ce index mais dans l'autre liste. */
        let val = index ;
        finalCalcul.push(listValues[val]) ;
        // Pour afficher les valeurs saisies sous une forme normale sans espace et virgules.
        joinFinalCalcul = finalCalcul.join('') ;
        createNode(joinFinalCalcul) ;

    })

})



// Supprimer l'ensemble des valeurs saisi Partie écran utilisateur et dans les tableaux
dlt.addEventListener('click',()=>{
    // suppression du noeud p appartenant à la div qui a comme class '.container_screen'
    let nodeParentTarget = document.querySelector('.container_screen')
    let nodeChild = document.querySelector('p')
    nodeParentTarget.removeChild(nodeChild)

    // Suppression des valeurs dans les différents tableaux
    finalCalcul.splice(0,finalCalcul.length)
    tabA.splice(0,tabA.length)
    tabB.splice(0,tabB.length)


})



