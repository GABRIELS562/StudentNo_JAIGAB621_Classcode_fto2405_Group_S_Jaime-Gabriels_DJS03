// Function to create an option element
function createOptionElement(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = text;
  return option;
}

// Function to render dropdown options
export function renderDropdownOptions(
  options,
  container,
  defaultOptionText = "Any",
) {
  const fragment = document.createDocumentFragment();
  const defaultOption = createOptionElement("any", defaultOptionText);
  fragment.appendChild(defaultOption);

  options.forEach((option) => {
    const optionElement = createOptionElement(option.id, option.name);
    fragment.appendChild(optionElement);
  });

  container.appendChild(fragment);
}
