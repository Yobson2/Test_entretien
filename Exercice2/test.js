// Ecrivons une fonction qui prend en entrée une chaine de caractères ...

function formatChaine(chaine){
  if(typeof chaine !== "string"){
    return -1;
  }else{
     let arrLettres=chaine.split('');
     let newChaine=[... new Set(arrLettres)]
     return newChaine.join('');
  }
}

console.log(formatChaine("abracadabra"))