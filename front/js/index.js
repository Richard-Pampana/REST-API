// On utilise querySelector pour sélectionner le composant dont on va changer le contenu et les boutons qui activeront ce changement
const div = document.querySelector("#data-to-replace");
const worldButton = document.getElementById("world-button");
const friendButton = document.getElementById("friend-button");
const cattoButton = document.getElementById("catto-button");
const doggoButton = document.getElementById("doggo-button");

// On crée une fonction qui va permettre la mise à jour de notre élément de la DOM en fonction de l'endpoint spécifié
function fetchContent(endpoint) {
  // On fait la requête vers l'API en utilisant l'endpoint spécifié
  fetch(`http://localhost:8084/index.php/${endpoint}`)
    .then((res) => {
      // Parser le retour de la requête en JSON
      res.json().then((content) => {
        // Afficher le contenu du retour de la requête
        div.innerHTML = content.message;
      });
    })
    // Afficher l'erreur s'il y en a une
    .catch((err) => console.log(err));
}

// Mettre la fonction sur chaque bouton pour déclencher l'appel API avec l'endpoint correspondant
worldButton.addEventListener('click', function() {
    fetchContent('world');
});

friendButton.addEventListener('click', function() {
    fetchContent('friend');
});

cattoButton.addEventListener('click', function() {
    fetchContent('catto');
});

doggoButton.addEventListener('click', function() {
    fetchContent('doggo');
});
