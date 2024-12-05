export async function addLight(accordion, light, lightHelper, scene) {
  const accordionItem = document.createElement("div");
  accordionItem.classList.add("accordion-item");

  const header = document.createElement("div");
  header.className = "accordion-header";
  header.textContent = `Light: ${light.uuid}`;
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    content.style.display =
      content.style.display === "block" ? "none" : "block";
  });

  const content = document.createElement("div");
  content.className = "accordion-content";
  content.innerHTML = `
    <p>Position: (${light.position.x}, ${light.position.y}, ${light.position.z})</p>
    <button id="remove-${light.uuid}">Remove</button>
  `;

  const removeBtn = content.querySelector(`#remove-${light.uuid}`);
  removeBtn.classList.add("btnStyle");
  removeBtn.addEventListener("click", () => {
    scene.remove(light);
    scene.remove(lightHelper);
    accordionItem.remove();
  });

  accordionItem.appendChild(header);
  accordionItem.appendChild(content);
  accordion.appendChild(accordionItem);
}

