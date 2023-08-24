// import { data } from "./data/data.js";

// let renderData = JSON.parse(JSON.stringify(data));
let renderData = []

const fetchData = async () => {
  const resp = await fetch("https://agreeable-bee-veil.cyclic.cloud/api/products")
  const data = await resp.json()
  return data;
}


const mainContext = document.querySelector("#mainContext");
const filterBtns = document.querySelectorAll(".filter");
const searchInput = document.querySelector("#searchInput");
const suggestionsList = document.querySelector("#suggestionsList");
const searchBtn = document.querySelector("#searchBtn");

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  const color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

const addProduct = (title, category, price, img, description) => {
  const newProduct = {
    id: Math.round(new Date().getTime()),
    title,
    price: parseInt(price),
    category,
    image: img,
    description,
    rating: {
      rate: (Math.random() * 6).toFixed(1),
      count: Math.round(Math.random() * 100),
    },
  };
  renderData.push(newProduct);
  render(renderData);
};



const createAddWindow = () => {
  mainContext.innerHTML = "";

  const header = document.createElement("header");
  header.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "col-8",
    "mb-5"
  );

  const headerText = document.createElement("h1");
  headerText.classList.add("display-4", "font-weight-bold");
  headerText.textContent = "Add New Product:";

  const headerIcons = document.createElement("div");
  headerIcons.classList.add("d-flex", "justify-content-between");

  const arrowIcon = document.createElement("span");
  arrowIcon.classList.add("material-symbols-outlined");
  arrowIcon.textContent = "arrow_back";

  arrowIcon.onclick = () => (window.location.href = "index.html");

  headerIcons.appendChild(arrowIcon);

  header.appendChild(headerIcons);
  header.appendChild(headerText);

  const formDiv = document.createElement("div");

  const titleFormGroup = document.createElement("div");
  titleFormGroup.className = "form-group";

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.className = "form-control";
  titleInput.placeholder = "Add Title";

  titleFormGroup.appendChild(titleLabel);
  titleFormGroup.appendChild(titleInput);

  const categoryFormGroup = document.createElement("div");
  categoryFormGroup.className = "form-group";

  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Category";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.className = "form-control";
  categoryInput.placeholder = "Add Category";

  categoryFormGroup.appendChild(categoryLabel);
  categoryFormGroup.appendChild(categoryInput);

  const priceFormGroup = document.createElement("div");
  priceFormGroup.className = "form-group";

  const priceLabel = document.createElement("label");
  priceLabel.textContent = "Price";

  const priceInput = document.createElement("input");
  priceInput.type = "text";
  priceInput.className = "form-control";
  priceInput.placeholder = "Add Price";

  categoryFormGroup.appendChild(priceLabel);
  categoryFormGroup.appendChild(priceInput);

  const imgFormGroup = document.createElement("div");
  imgFormGroup.className = "form-group";

  const imgLabel = document.createElement("label");
  imgLabel.textContent = "Image URL";

  const imgInput = document.createElement("input");
  imgInput.type = "text";
  imgInput.className = "form-control";
  imgInput.placeholder = "Add Image URL";

  imgFormGroup.appendChild(imgLabel);
  imgFormGroup.appendChild(imgInput);

  const desFormGroup = document.createElement("div");
  desFormGroup.className = "form-group";

  const desLabel = document.createElement("label");
  desLabel.textContent = "Description";

  const desInput = document.createElement("textarea");
  desInput.className = "form-control";
  desInput.placeholder = "Add Description";

  desFormGroup.appendChild(desLabel);
  desFormGroup.appendChild(desInput);

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "btn btn-primary mt-2";
  addBtn.textContent = "Add";

  addBtn.addEventListener("click", () =>
    addProduct(
      titleInput.value,
      categoryInput.value,
      priceInput.value,
      imgInput.value,
      desInput.value
    )
  );

  formDiv.appendChild(titleFormGroup);
  formDiv.appendChild(categoryFormGroup);
  formDiv.appendChild(priceFormGroup);
  formDiv.appendChild(imgFormGroup);
  formDiv.appendChild(desFormGroup);
  formDiv.appendChild(addBtn);

  mainContext.appendChild(header);
  mainContext.appendChild(formDiv);
};

const editProduct = (product) => {
  renderData = renderData.map((item) => {
    if (product.id === item.id) {
      return { ...product };
    } else {
      return { ...item };
    }
  });
  render(renderData);
};

const createEditWindow = (product) => {
  const {
    id,
    title,
    price,
    description,
    category,
    image,
    rating: { rate, count },
  } = product;

  mainContext.innerHTML = "";

  const header = document.createElement("header");
  header.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "col-8",
    "mb-5"
  );

  const headerText = document.createElement("h1");
  headerText.classList.add("display-4", "font-weight-bold");
  headerText.textContent = "Edit Product:";

  const headerIcons = document.createElement("div");
  headerIcons.classList.add("d-flex", "justify-content-between");

  const arrowIcon = document.createElement("span");
  arrowIcon.classList.add("material-symbols-outlined");
  arrowIcon.textContent = "arrow_back";

  arrowIcon.onclick = () => (window.location.href = "index.html");

  headerIcons.appendChild(arrowIcon);

  header.appendChild(headerIcons);
  header.appendChild(headerText);

  const formDiv = document.createElement("div");

  const titleFormGroup = document.createElement("div");
  titleFormGroup.className = "form-group";

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.className = "form-control";
  titleInput.value = title;

  titleFormGroup.appendChild(titleLabel);
  titleFormGroup.appendChild(titleInput);

  const categoryFormGroup = document.createElement("div");
  categoryFormGroup.className = "form-group";

  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Category";

  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.className = "form-control";
  categoryInput.value = category;

  categoryFormGroup.appendChild(categoryLabel);
  categoryFormGroup.appendChild(categoryInput);

  const priceFormGroup = document.createElement("div");
  priceFormGroup.className = "form-group";

  const priceLabel = document.createElement("label");
  priceLabel.textContent = "Price";

  const priceInput = document.createElement("input");
  priceInput.type = "text";
  priceInput.className = "form-control";
  priceInput.value = price;

  categoryFormGroup.appendChild(priceLabel);
  categoryFormGroup.appendChild(priceInput);

  const imgFormGroup = document.createElement("div");
  imgFormGroup.className = "form-group";

  const imgLabel = document.createElement("label");
  imgLabel.textContent = "Image URL";

  const imgInput = document.createElement("input");
  imgInput.type = "text";
  imgInput.className = "form-control";
  imgInput.value = image;

  imgFormGroup.appendChild(imgLabel);
  imgFormGroup.appendChild(imgInput);

  const desFormGroup = document.createElement("div");
  desFormGroup.className = "form-group";

  const desLabel = document.createElement("label");
  desLabel.textContent = "Description";

  const desInput = document.createElement("textarea");
  desInput.className = "form-control";
  desInput.value = description;

  desFormGroup.appendChild(desLabel);
  desFormGroup.appendChild(desInput);

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "btn btn-primary mt-2";
  editBtn.textContent = "Edit";

  editBtn.addEventListener("click", () =>
    editProduct({
      id: product.id,
      title: titleInput.value,
      price: priceInput.value,
      description: desInput.value,
      category: categoryInput.value,
      image: imgInput.value,
      rating: product.rating,
    })
  );

  formDiv.appendChild(titleFormGroup);
  formDiv.appendChild(categoryFormGroup);
  formDiv.appendChild(priceFormGroup);
  formDiv.appendChild(imgFormGroup);
  formDiv.appendChild(desFormGroup);
  formDiv.appendChild(editBtn);

  mainContext.appendChild(header);
  mainContext.appendChild(formDiv);
};

const controlNavIcons = () => {
  let homeIcon = document.querySelector("#home");
  let addIcon = document.querySelector("#add");
  homeIcon.addEventListener(
    "click",
    () => (window.location.href = "index.html")
  );
  addIcon.addEventListener("click", createAddWindow);
};
const renderProduct = (product) => {
  const {
    id,
    title,
    price,
    description,
    category,
    image,
    rating: { rate, count },
  } = product;
  mainContext.innerHTML = "";

  const header = document.createElement("header");
  header.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "col-8",
    "mb-5"
  );

  const headerText = document.createElement("h1");
  headerText.classList.add("display-4", "font-weight-bold");
  headerText.textContent = "Product Page:";

  const headerIcons = document.createElement("div");
  headerIcons.classList.add("d-flex", "justify-content-between");

  const editIcon = document.createElement("span");
  editIcon.classList.add("material-symbols-outlined");
  editIcon.textContent = "edit";
  const arrowIcon = document.createElement("span");
  arrowIcon.classList.add("material-symbols-outlined");
  arrowIcon.textContent = "arrow_back";
  const homeIcon = document.createElement("span");
  homeIcon.classList.add("material-symbols-outlined");
  homeIcon.textContent = "home";

  editIcon.onclick = () => createEditWindow(product);
  arrowIcon.addEventListener(
    "click",
    () => (window.location.href = "index.html")
  );
  homeIcon.addEventListener(
    "click",
    () => (window.location.href = "index.html")
  );

  headerIcons.appendChild(editIcon);
  headerIcons.appendChild(arrowIcon);
  headerIcons.appendChild(homeIcon);

  header.appendChild(headerIcons);
  header.appendChild(headerText);

  const cardContainer = document.createElement("div");
  cardContainer.className = "card mb-3";
  cardContainer.style.width = "100%";
  cardContainer.style.padding = "3rem";
  cardContainer.style.border = "1px solid black";
  cardContainer.style.borderRadius = "40px";

  const rowDiv = document.createElement("div");
  rowDiv.className = "row no-gutters";

  const colLeft = document.createElement("div");
  colLeft.className = "col-md-4";

  const img = document.createElement("img");
  img.src = image;
  img.className = "card-img";
  img.alt = title;

  colLeft.appendChild(img);

  const colRight = document.createElement("div");
  colRight.className = "col-md-8";
  colRight.style.background = "#F9F5EB";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("p-4");

  const headTitle = document.createElement("h5");
  headTitle.classList.add("my-2");
  headTitle.textContent = "Title";

  const nameHeading = document.createElement("card-title");
  nameHeading.classList.add("mb-0");
  nameHeading.textContent = title;

  const headDes = document.createElement("h5");
  headDes.classList.add("my-2");
  headDes.textContent = "Description";

  const desParagraph = document.createElement("card-title");
  desParagraph.classList.add("mb-0");
  desParagraph.textContent = description;

  const headPrice = document.createElement("h5");
  headPrice.classList.add("my-2");
  headPrice.textContent = "Price";

  const priceParagraph = document.createElement("card-title");
  priceParagraph.classList.add("mb-0");
  priceParagraph.textContent = `${price} $`;

  const headCat = document.createElement("h5");
  headCat.classList.add("my-2");
  headCat.textContent = "Category";

  const catParagraph = document.createElement("card-title");
  catParagraph.classList.add("mb-0");
  catParagraph.textContent = category;

  const headRate = document.createElement("h5");
  headRate.classList.add("my-2");
  headRate.textContent = "Rating";

  const rateParagraph = document.createElement("card-title");
  rateParagraph.classList.add("mb-0");
  rateParagraph.textContent = `Rating: Vote:${count}, Rate: ${rate}`;

  infoDiv.appendChild(headTitle);
  infoDiv.appendChild(nameHeading);
  infoDiv.appendChild(headDes);
  infoDiv.appendChild(desParagraph);
  infoDiv.appendChild(headPrice);
  infoDiv.appendChild(priceParagraph);
  infoDiv.appendChild(headCat);
  infoDiv.appendChild(catParagraph);
  infoDiv.appendChild(headRate);
  infoDiv.appendChild(rateParagraph);

  cardBody.appendChild(infoDiv);

  colRight.appendChild(cardBody);

  rowDiv.appendChild(colLeft);
  rowDiv.appendChild(colRight);

  cardContainer.appendChild(rowDiv);

  mainContext.append(header);
  mainContext.appendChild(cardContainer);
};

const createCard = (product) => {
  const {
    id,
    title,
    price,
    description,
    category,
    image,
    rating: { rate, count },
  } = product;
  const colDiv = document.createElement("div");
  colDiv.classList.add("col-lg-3", "col-md-6", "mb-4");

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card", "shadow-lg", "border-1", "rounded-3", "h-100");

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.classList.add("card-body", "p-0");
  cardBodyDiv.style.background = "#FFBF9B";

  const img = document.createElement("img");
  img.setAttribute("src", image);
  img.setAttribute("alt", `picture of product ${id}`);
  img.classList.add("w-30", "card-img-top", "h-50");
  img.style.cursor = "pointer";
  img.addEventListener("click", () => renderProduct(product));

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("p-4");

  const nameHeading = document.createElement("h6");
  nameHeading.classList.add("mb-0");
  nameHeading.textContent = `${title}`;

  const line = document.createElement("hr");

  const btnsBox = document.createElement("div");
  btnsBox.classList.add("d-flex", "justify-content-center");

  const delBtn = document.createElement("span");
  delBtn.classList.add("material-symbols-outlined");
  delBtn.textContent = "delete";

  delBtn.addEventListener("click", () => colDiv.remove());

  const editBtn = document.createElement("span");
  editBtn.classList.add("material-symbols-outlined");
  editBtn.textContent = "edit";

  editBtn.addEventListener("click", () => createEditWindow(product));

  btnsBox.appendChild(delBtn);
  btnsBox.appendChild(editBtn);

  infoDiv.appendChild(nameHeading);

  infoDiv.appendChild(line);
  infoDiv.appendChild(btnsBox);

  cardBodyDiv.appendChild(img);
  cardBodyDiv.appendChild(infoDiv);

  cardDiv.appendChild(cardBodyDiv);

  colDiv.appendChild(cardDiv);

  return colDiv;
};

const render = (arr) => {
  mainContext.innerHTML = "";

  const header = document.createElement("header");
  header.classList.add("text-center", "mb-5");
  const headerText = document.createElement("h1");
  headerText.classList.add("display-4", "font-weight-bold");
  headerText.textContent = "Products:";

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row", "pb-5", "mb-4");

  header.appendChild(headerText);
  arr.map((product) => {
    const cardElement = createCard(product);
    rowDiv.appendChild(cardElement);
  });
  mainContext.appendChild(header);
  mainContext.appendChild(rowDiv);
};

const boldChosen = (text) => {
  filterBtns.forEach((btn) => {
    if (btn.id === text) {
      btn.classList.toggle("clicked");
    } else {
      btn.classList.remove("clicked");
    }
  });
};

const filterProducts = (text) => {
  const filterArr = renderData.filter((item) => item.category === text);
  render(filterArr);
};

const filterByTitle = (title) => {
  const filterArr = renderData.filter((item) => item.title === title);
  render(filterArr);
};

const controlFilters = () => {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      boldChosen(btn.id);
      if (btn.id === "all") {
        render(renderData);
      } else {
        filterProducts(btn.id);
      }
    });
  });
};

const updateSuggestions = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm)
  );

  suggestionsList.innerHTML = "";
  filteredData.forEach((item) => {
    const suggestionItem = document.createElement("li");
    suggestionItem.textContent = item.title;
    suggestionItem.addEventListener("click", () => {
      searchInput.value = item.title;
      suggestionsList.innerHTML = "";
    });
    suggestionsList.appendChild(suggestionItem);
  });
};

const handleSearch = () => {
  searchInput.addEventListener("input", updateSuggestions);
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target)) {
      suggestionsList.innerHTML = "";
    }
  });
  searchBtn.addEventListener("click", () => filterByTitle(searchInput.value));
};

const init =  async() => {
  renderData = await fetchData()
  render(renderData);
  controlFilters();
  controlNavIcons();
  handleSearch();
};

init();
