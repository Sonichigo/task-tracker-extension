addTasktoTheList = (task) => {
    const ul = document.querySelector("#tasksList");
    const li = document.createElement("li");
  
    li.innerHTML = task.task;
    task.complete ? li.classList.add("complete") : "";
    li.dataset.id = task.id;
  
    var span = document.createElement("span");
    span.setAttribute("id", "remove");
    span.innerHTML = "X";
    li.append(span);
    li.addEventListener("click", () => updateComplete(li), "false");
    span.addEventListener("click", () => removeItem(li));
    ul.append(li);
  };

  const removeItem = (e) => {
    e.parentNode.removeChild(e);
   
    const dataId = e.dataset.id;
   
    chrome.storage.sync.get({ tasks: [] }, function (items) {
      const updatedList = items.tasks.filter((item) => item.id != dataId);
      chrome.storage.sync.set({ tasks: updatedList });
    });
   };

   const updateComplete = (e) => {
    if (e.tagName === "LI") {
      e.classList.toggle("complete");
      const dataId = e.dataset.id;
   
      chrome.storage.sync.get("tasks", function (items) {
        const updatedList = items.tasks.map((item) => {
          if (item.id === dataId) {
            item["complete"] = !item["complete"];
          }
          return item;
        });
   
        chrome.storage.sync.set({ tasks: updatedList });
      });
    }
   };
   
const addTask = document.querySelector("#addTask");

addTask.addEventListener("click", e => {
  e.preventDefault();

  let task = document.querySelector("#tasks").value;

  if (!task.length) {
    alert("Please add a task to add");
  } else {
    const obj = {
      task: task,
      complete: false,
      id: Date.now(),
    };

    chrome.storage.sync.get("tasks", function (result) {
      if (result.tasks) {
        chrome.storage.sync.set({ tasks: [...result.tasks, obj] });   
        }
    });

    document.querySelector("#tasks").value = "";
  }
});