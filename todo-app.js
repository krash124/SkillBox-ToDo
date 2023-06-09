(function () {
  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  // создаём и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add = "input-group-append";
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";

    button.disabled = true; // ЭЛЕМЕНТ ВЫКЛЮЧЕНИЯ КНОПКИ ПРИ ЗАКГРУЗКИ СТРАНИЦИ И ВКЛЮЧЕНИИ ЕЕ ПРИ ЗАПОЛНЕНОМ ИНПУТЕ
    input.addEventListener("input", function () {
      if (input.value !== "") {
        button.disabled = false;
      }
    });

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  // Создаём и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoItem(name) {
    let item = document.createElement("li");
    // Кнопки помещаем в элемент, который покажет их в группе
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    //устанавливаем стили для элемента списка, а также для размещения кнопок
    // в его правой части с помощью flex
    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-item-center"
    );
    item.textContent = name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function createTodoApp(container, title) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    // браузер создает событие submit на форме по нажатию enter или на кнопку создания дела
    todoItemForm.form.addEventListener("submit", function (e) {
      //эта строчки необходима, чтобы предотвратить стандартное действие браузера
      // в данном случае мы не хотим, чтобы страница перезагружалась при отправки формы
      e.preventDefault();

      // игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);
      // добавляем обработчики на кнопки
      todoItem.doneButton.addEventListener("click", function () {
        todoItem.item.classList.toggle("list-group-item-success");
      });
      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Вы уверены?")) {
          todoItem.item.remove();
        }
      });
      // создаем и добавляем в список новое дело с названием из поля ввода
      todoList.append(todoItem.item);

      // обнуляем значение в поле
      todoItemForm.input.value = "";
      todoItemForm.button.disabled = true; // ВЫКЛЮЧАЮ КНОПКУ ПОСЛЕ СОЗДАНИЯ UL ЭЛЕМЕТНА СПИСКА
    });
  }

  // зарегестрировать фенкцию createTodoApp  в глобальном объекте window,
  // чтобы получить доступ из других скритов
  window.createTodoApp = createTodoApp;
})();
