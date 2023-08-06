"use strict";

const tasksData = [
  {
    text: "Go to the gym",
    cat: "Sport",
    complited: false,
    num: 1,
  },
  {
    text: "Make some codewars",
    cat: "Programing",
    complited: false,
    num: 2,
  },
  {
    text: "Prepare breakfast",
    cat: "Nutrition",
    complited: true,
    num: 3,
  },
];
const catData = ["All", "Sport", "Programing", "Nutrition"];

const overlay = document.querySelector(".overlay");

const listItemsTexts = document.getElementsByClassName("categories__text");
const tasksList = document.querySelector(".tasks__list");
const catList = document.querySelector(".categories__list");

const catAddBtn = document.querySelector(".categories__btn");
const catPopup = document.querySelector(".categories__popup ");
const catPopupBtn = document.querySelector(".categories__popup-btn");

const tasksPopup = document.querySelector(".tasks__popup ");
const tasksAddBtn = document.querySelector(".tasks__btn");
const tasksPopupBtn = document.querySelector(".tasks__popup-btn");

const tasksSearch = document.querySelector(".tasks__search");
const categoriesSearch = document.querySelector(".categories__search");

//! Functions

// ! Working with tasks

// * Creating task
const creatingTask = (currentNumber, text, cat = "All") => {
  let li = document.createElement("li");
  li.classList.add("tasks__item");
  li.innerHTML = `
                <input
                  class="tasks__checkbox"
                  type="checkbox"
                  id="tasks__checkbox-${currentNumber}"
                  value="yes"
                />
                <label class="tasks__text" for="tasks__checkbox-${currentNumber}"
                    ><h4 class="tasks__text-title">${text}</h4>
                    <span class="tasks__text-cat">${
                      cat.trim() === "" ? "All" : cat
                    }</span></label
                >
                <div class="tasks__basket">
                  <svg class="tasks__basket-svg"
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path class="tasks__basket-path"
                      d="M8 6.83333V13.8333M10.9167 6.83333L10.3333 13.8333M5.08333 6.83333L5.66667 13.8333M5.66667 3.33333L6.25 1H9.75L10.3333 3.33333M15 3.33333H2.16667L3.33333 17.3333H12.6667L13.8333 3.33333H1H15Z"
                      stroke="#FF0000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      />
                  </svg>
                </div>
  `;
  return li;
};

// * adding Task
const addTask = (elem) => {
  tasksList.append(elem);
};

// * Create Category
const createCat = (catName) => {
  let li = document.createElement("li");
  li.classList.add("categories__item");
  li.innerHTML = `<p class="categories__text">${catName}</p>`;

  return li;
};
// * Display Category
const displayCat = (elem) => {
  catList.append(elem);
};

// * Displaying each task and cat of the taskData arr
tasksData.forEach((item, i) => {
  addTask(creatingTask(i + 1, item.text, item.cat));
  displayCat(createCat(item.cat));
});

// ! Removing active class
const removeActiveClass = (catArr) => {
  Array.from(catArr).forEach((elem) => {
    elem.classList.remove("active");
  });
};

// * Display Popups
const displayPopup = (popup) => {
  overlay.style.display = "block";
  popup.classList.remove("hidden");
};
const hidepopup = (popup) => {
  overlay.style.display = "none";
  popup.classList.add("hidden");
};

// * Validating inputs
const validateInput = (input) => {
  if (input.value.trim().length === 0) {
    alert("Заполните Форму");
    return false;
  } else {
    return true;
  }
};

// * Filtring Tasks
const filtringTasksByName = (arrTasks, value) => {
  return arrTasks.filter((item) => {
    return item.text.toLowerCase().indexOf(value) !== -1;
  });
};

// * Filtring Categories
const filtringCatsByName = (arrCats, value) => {
  return arrCats.filter((cat) => {
    return cat.toLowerCase().indexOf(value) !== -1;
  });
};

// ! Event Listeners

// * displaying popups on click btns
catAddBtn.addEventListener("click", () => {
  displayPopup(catPopup);
});
tasksAddBtn.addEventListener("click", () => {
  displayPopup(tasksPopup);
});
overlay.addEventListener("click", () => {
  hidepopup(catPopup);
  hidepopup(tasksPopup);
});

// * Adding new elem and closing popups on click
catPopupBtn.addEventListener("click", () => {
  if (validateInput(document.querySelector(".categories__popup-input"))) {
    let catValue = document.querySelector(".categories__popup-input").value;
    displayCat(createCat(catValue));
    catData.push(catValue);
    hidepopup(catPopup);
  }
});
// ! Creating new Task
tasksPopupBtn.addEventListener("click", () => {
  if (validateInput(document.querySelector(".tasks__popup-task"))) {
    addTask(
      creatingTask(
        tasksData.length + 1,
        document.querySelector(".tasks__popup-task").value,
        document.querySelector(".tasks__popup-cat").value
      )
    );
    tasksData.push({
      text: document.querySelector(".tasks__popup-task").value,
      cat:
        document.querySelector(".tasks__popup-cat").value.trim().length === 0
          ? "All"
          : document.querySelector(".tasks__popup-cat").value,
      complited: false,
      num: tasksData.length + 1,
    });
    // ! Cheking if category already exists
    if (
      document.querySelector(".tasks__popup-cat").value !== "All" &&
      document.querySelector(".tasks__popup-cat").value.trim().length !== 0 &&
      !catData.includes(document.querySelector(".tasks__popup-cat").value)
    ) {
      catData.push(document.querySelector(".tasks__popup-cat").value);
      displayCat(createCat(document.querySelector(".tasks__popup-cat").value));
    }
    hidepopup(tasksPopup);
  }
});

// ! inputs filter
tasksSearch.addEventListener("keyup", (e) => {
  tasksList.innerHTML = "";
  const value = e.target.value.toLowerCase();
  if (value) {
    filtringTasksByName(tasksData, value).forEach((node) => {
      addTask(creatingTask(node.num, node.text, node.cat));
    });
  } else {
    tasksData.forEach((node) => {
      addTask(creatingTask(node.num, node.text, node.cat));
    });
  }
});

categoriesSearch.addEventListener("keyup", (e) => {
  catList.innerHTML = "";
  const value = e.target.value.toLowerCase();

  if (value) {
    filtringCatsByName(catData, value).forEach((cat) => {
      displayCat(createCat(cat));
    });
  } else {
    catData.forEach((cat) => {
      displayCat(createCat(cat));
    });
  }
});

// ! Cats list Listener
catList.addEventListener("click", (e) => {
  if (e.target && e.target.matches(".categories__text")) {
    removeActiveClass(document.getElementsByClassName("categories__text"));
    e.target.classList.add("active");
    document.querySelector(
      ".tasks__title"
    ).textContent = `${e.target.textContent} Tasks`;

    tasksList.innerHTML = "";
    tasksData.forEach((node) => {
      if (node.cat.toLowerCase() === e.target.textContent.toLowerCase()) {
        addTask(creatingTask(node.num, node.text, node.cat));
      } else if (e.target.textContent.toLowerCase() === "All".toLowerCase()) {
        addTask(creatingTask(node.num, node.text, node.cat));
      }
    });
  }
});

tasksList.addEventListener("click", (e) => {
  if (
    e.target &&
    (e.target.matches(".tasks__basket-svg") ||
      e.target.matches(".tasks__basket-path"))
  ) {
    e.target.closest("li").remove();
    tasksData.forEach((task, i) => {
      if (
        task.text ===
        e.target.closest("li").querySelector(".tasks__text h4").textContent
      ) {
        tasksData.splice(i, 1);
      }
    });
  }
});
