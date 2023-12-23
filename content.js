// Fonction pour effectuer les actions lorsque la page est cliquée
function handlePageClick(event) {
    // Explorer le DOM à la recherche de toutes les div avec une classe "project"
    const projectDivs = document.querySelectorAll(".project:not(.root)");
  
    // Parcourir chaque div "project"
    projectDivs.forEach((projectDiv) => {
      // Rechercher à l'intérieur la présence d'une div avec la classe "children"
      const childrenDiv = projectDiv.querySelector(".children");
  
      // Si la div "project" a au moins une div "children", la considérer comme un "parent"
      if (childrenDiv) {
        // Parcourir toutes les div contenues dans la div "children"
        const childProjectDivs = childrenDiv.querySelectorAll(".project");
  
        let sum = 0;
  
        // Pour chaque div "project" dans la div "children"
        childProjectDivs.forEach((childProjectDiv) => {
          // Rechercher la présence d'un chiffre numérique suivi de la lettre "g"
          const text = childProjectDiv.textContent;
          const matches = text.match(/(\d+)g/g);
  
          // Si des correspondances sont trouvées, ajouter les valeurs à la somme
          if (matches) {
            matches.forEach((match) => {
              const numericValue = parseInt(match);
              if (!isNaN(numericValue)) {
                sum += numericValue;
              }
            });
          }
        });
  
        // Afficher la somme dans la div parent
        const innerContentContainer = projectDiv.querySelector(
          ".innerContentContainer"
        );
  
        if (innerContentContainer) {
          const content = innerContentContainer.textContent;
          if (content.includes("Total:")) {
            // Remplacer le nombre numérique existant par la somme
            innerContentContainer.textContent = content.replace(
              /Total:\s*\d+/i,
              "Total:" + sum
            );
          } else {
            // Ajouter "Total: " suivi de la somme à la fin du contenu
            innerContentContainer.textContent = content + " Total:" + sum + "g";
          }
        }
      }
    });
  }
  
  // Ajouter un gestionnaire d'événements de clic à la page entière
  document.addEventListener("click", handlePageClick);
  