 let input = document.querySelector("#task-input");
      const todoList = document.getElementById("todo");
      let selected = null;

      window.onload = function () {
        loadTodos();
        loadDays();
      };

      function saveTodos() {
        localStorage.setItem("todos", todoList.innerHTML);
      }

      function saveDays() {
        const days = document.querySelectorAll(".days");
        days.forEach(day => {
          localStorage.setItem(day.id, day.innerHTML);
        });
      }

      function loadTodos() {
        const saved = localStorage.getItem("todos");
        if (saved) {
          todoList.innerHTML = saved;
          restoreListEvents(todoList);
        }
      }

      function loadDays() {
        const days = document.querySelectorAll(".days");
        days.forEach(day => {
          const saved = localStorage.getItem(day.id);
          if (saved) {
            day.innerHTML = saved;
            restoreListEvents(day);
          }
        });
      }

      function restoreListEvents(container) {
        const items = container.querySelectorAll("li");
        items.forEach(item => {
          item.setAttribute("draggable", "true");
          item.classList.add("todo-item");

          const delBtn = item.querySelector("button");
          if (delBtn) {
            delBtn.addEventListener("click", () => {
              item.remove();
              saveTodos();
              saveDays();
            });
          }

          item.addEventListener("dragstart", () => {
            selected = item;
            setTimeout(() => (item.style.display = "none"), 0);
          });

          item.addEventListener("dragend", () => {
            setTimeout(() => {
              item.style.display = "block";
              selected = null;
            }, 0);
          });
        });
      }

      function insert() {
        if (input.value === "") {
          alert("Enter Some Text in List");
          return;
        }

        const list = document.createElement("li");
        list.innerHTML = `${input.value} <button>Delete</button>`;
        list.setAttribute("draggable", "true");
        list.classList.add("todo-item");

        list.querySelector("button").addEventListener("click", () => {
          list.remove();
          saveTodos();
          saveDays();
        });

        list.addEventListener("dragstart", () => {
          selected = list;
          setTimeout(() => (list.style.display = "none"), 0);
        });

        list.addEventListener("dragend", () => {
          setTimeout(() => {
            list.style.display = "block";
            selected = null;
          }, 0);
        });

        todoList.appendChild(list);
        input.value = "";
        saveTodos();
      }

      function edit() {
        if (document.designMode === "off") {
          document.designMode = "on";
        } else {
          document.designMode = "off";
        }
      }

      const days = document.querySelectorAll(".days");
      days.forEach(day => {
        day.addEventListener("dragover", e => e.preventDefault());
        day.addEventListener("drop", e => {
          e.preventDefault();
          if (selected) {
            day.appendChild(selected);
            saveTodos();
            saveDays();
          }
        });
      });

      function resetList() {
        todoList.innerHTML = "";
        saveTodos();
      }

      document.getElementById("add-task").addEventListener("click", insert);
      document.getElementById("reset").addEventListener("click", resetList);