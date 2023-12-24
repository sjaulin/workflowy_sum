// Fonction pour effectuer les actions lorsque la page est cliquée
function handlePageClick(event) {
  // Rechercher toutes les div avec la classe "project" mais sans la classe "root"
  const projects = document.querySelectorAll(".project:not(.root)");

  // Parcourir chaque div "project"
  projects.forEach((project) => {
    // Rechercher à l'intérieur la présence d'une div avec la classe "children"
    const children = project.querySelector(".children");

    // Si la div "project" a au moins une div "children", la considérer comme un "parent"
    if (children) {
      // Parcourir toutes les div contenues dans la div "children"
      const childProjects = children.querySelectorAll(":scope > .project");

      let sum = 0;

      // Pour chaque div "project" dans la div "children"
      childProjects.forEach((childProject) => {
        // Rechercher la présence d'un chiffre numérique suivi de la lettre "g"
        const text = childProject.textContent;
        const matches = text.match(/sum:(\d+)/);

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
      // Rechercher un span avec la classe "innerContentContainer"
      const contentContainer = project.querySelector(".content");

      if (contentContainer) {
        // Vérifier s'il existe déjà un span avec la classe "addon_sum" et le supprimer le cas échéant
        const existingAddonSum = project.querySelector(".addon_sum");
        if (existingAddonSum) {
          existingAddonSum.remove();
        }

        // Créer un nouveau span avec la classe "addon_sum"
        const addonSumSpan = document.createElement("span");
        addonSumSpan.className = "addon_sum";
        addonSumSpan.textContent = ` Total: ${sum}`;

        // Insérer le nouveau span après innerContentContainer
        contentContainer.insertAdjacentElement("afterend", addonSumSpan);

        // Ajouter la classe "addon_sum" au div de class "content"
        contentContainer.classList.add("addon_sum");
      }
    }
  });
}

// Ajouter un gestionnaire d'événements de clic à la page entière
document.addEventListener("click", handlePageClick);
// Appeler la fonction une première fois pour traiter le DOM initial
handlePageClick();
