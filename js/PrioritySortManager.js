import PriorityList from './PriorityList.js';
export default class PrioritySortManager
{
  constructor(options)
  {
    this.listClassName          = options.listClassName;
    this.$listElement           = $(this.listClassName)
    this.priorityLists          = [];
    this.sortAlphabetic         = options.sortAlphabetic;
    this.sortPriority           = options.sortPriority;
    this.sortAscending          = options.sortAscending;
    this.sortDescending         = options.sortDescending;
    this.seeAllElement          = options.seeAllId;
    this.seeLessElement         = options.seeLessId;
    this.initialCountAttribute  = options.initialCountAttribute;
    this.priorityOrderAttribute = options.priorityOrderAttribute;
    this.highlightClass         = options.highlightClass;
  }
  init()
  {
    this.createPriorityList();
    for(let listItem of this.priorityLists)
    {
      this.addSeeOptions(listItem);
      listItem.bindEvents();
      listItem.sortListItems();
      listItem.display();
    }
    $(this.seeLessElement).toggle();
  }
  createPriorityList()
  {
    for(let listItem of this.$listElement)
    {
      let newList = new PriorityList(listItem, this);
      this.priorityLists.push(newList);
    }
  }
  addSeeOptions(listItem)
  {
    let sortPriority   = $("<button>", {type: "button", id: "priority", class: "sortby priority highlight", text: "Priority"});
    let sortAlphabetic = $("<button>", {type: "button", id: "alpha", class: "sortby alpha", text: "Alphabetic"});
    let sortAscending  = $("<button>", {type: "button", id: "ascending", class: "orderby ascending highlight", text: "Ascend"});
    let sortDescending = $("<button>", {type: "button", id: "descending", class: "orderby descending", text: "Descend"});
    let seeAll = $("<a>", {href: "", id: "all", class: "all", text: "See All"});
    let seeLess = $("<a>", {href: "", id: "less", class: "less", text: "See Less"});
    // done FIXME_AB: $()  is done many times, it creates same object again and again. So we can cache it
    // done FIXME_AB: instead of 8 prepend statements that hits DOM, lets use documentFragment
    let $fragment = $(new DocumentFragment());
    $fragment.append(seeLess, seeAll, "<br>", sortAscending, sortDescending, "<br>", sortPriority, sortAlphabetic);
    $(listItem.list).append($fragment);

  }
}