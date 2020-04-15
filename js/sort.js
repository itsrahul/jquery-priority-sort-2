import PrioritySortManager from './PrioritySortManager.js';

$(document).ready(function(){
  let options  = {
    listClassName: ".priority-sort",
    sortPriority: "#priority",
    sortAlphabetic: "#alpha",
    sortAscending: "#ascending",
    sortDescending: "#descending",
    seeAllId: "#all",
    seeLessId: "#less",
    initialCountAttribute: "data-initial-items-count",
    priorityOrderAttribute: "data-priority-order",
    highlightClass: "highlight",
  };
  let sort = new PrioritySortManager(options);
  sort.init();
});