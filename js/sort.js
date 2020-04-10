import PrioritySort from './PrioritySort.js';

$(document).ready(function(){
  let options  = {
    $listElement: $(".priority-sort"),
    sortPriority: ".priority",
    sortAlphabetic: ".alpha",
    sortAscending: ".ascending",
    sortDescending: ".descending",
    seeAllId: ".all",
    seeLessId: ".less",
    initialCountAttribute: "data-initial-items-count",
    priorityOrderAttribute: "data-priority-order",
    highlightClass: "highlight",
  };
  let sort = new PrioritySort(options);
  sort.init();
});