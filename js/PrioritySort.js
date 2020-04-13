class PriorityList
{
  constructor(list, managerObject)
  {
    this.listItems = [];
    this.list      = list;
    this.manager   = managerObject;
    this.count     = ".less";
    this.sortBy    = ".priority";
    this.orderBy   = ".ascending";
    this.initialCountAttribute = $(list).attr("data-initial-items-count" );

    $(this.list).children().each((_i, item) => {
      let listItem = new ListItem($(item));
      this.listItems.push(listItem);
    })
  }

  init()
  {
   

  }

  bindEvents()
  {
    
    $(this.list).find(this.manager.sortAlphabetic).on("click", () => this.onClickSortBy(this.manager.sortAlphabetic, this.manager.sortPriority));
    $(this.list).find(this.manager.sortPriority).on("click", () => this.onClickSortBy(this.manager.sortPriority, this.manager.sortAlphabetic));

    $(this.list).find(this.manager.sortAscending).on("click", () => this.onClickOrderBy(this.manager.sortAscending, this.manager.sortDescending));
    $(this.list).find(this.manager.sortDescending).on("click", () => this.onClickOrderBy(this.manager.sortDescending, this.manager.sortAscending));

    $(this.list).find(this.manager.seeAllElement).on("click", () => this.onClickSee(this.manager.seeAllElement));
    $(this.list).find(this.manager.seeLessElement).on("click", () => this.onClickSee(this.manager.seeLessElement));

    $(this.list).find('.delete').on("click", () => this.deleteItem() );
  }

  deleteItem()
  {
    $(this.listItems).each((index, listItem) => {
      if(listItem.item[0] == $(event.target).parent().hide()[0])
      {
        this.listItems.splice(index, 1);
      }
    })

    this.sortListItems();
  }
  
  onClickSortBy(currentVal, oldVal)
  {
    $(event.target)
      .addClass(this.manager.highlightClass)
      .siblings("button"+oldVal).removeClass(this.manager.highlightClass);
    event.preventDefault();
    this.sortBy = currentVal;
    this.sortListItems();
  }

  onClickOrderBy(currentVal, oldVal)
  {
    $(event.target)
      .addClass(this.manager.highlightClass)
      .siblings("button"+oldVal).removeClass(this.manager.highlightClass);
    event.preventDefault();
    this.orderBy = currentVal;
    this.sortListItems();
  }

  onClickSee(type)
  {
    $(event.target).toggle();
    $(event.target).siblings("a").toggle();
    event.preventDefault();
    this.count = type;
    this.sortListItems();
  }


  sortListItems()
  {
    this.listItems.forEach((item) => item.item.hide());
    let sortedItems = this.listItems.sort( (a,b) => this.sortArrayFunction(a, b, this.sortBy ))

    if(this.count == ".less")
    {
      let count = this.initialCountAttribute; 
      sortedItems = sortedItems.slice(0, count);
    }
    if(this.orderBy == ".descending")
    {
      sortedItems = sortedItems.reverse();
    }
    sortedItems.forEach(element => $(this.list).append(element.item.show()) );    
  }

  sortArrayFunction(a, b, type)
  {
    let orderA;
    let orderB;
    if(type == ".priority")
    {
      orderA = a.priority || 100000;
      orderB = b.priority || 100000;
    }
    else
    {
      orderA = a.text;
      orderB = b.text;
    }
    if (orderA < orderB) {
      return  -1;
    }
    if (orderA > orderB) {
      return 1;
    }
    return 0;
  }
  
}

class ListItem
{
  constructor($item)
  {
    this.item = $item;
    this.priority =  $item.attr("data-priority-order");
    this.text = $item.text();
    this.init()
  }

  init()
  {
    if(this.priority)
    {
      this.item.append(` (${this.priority})`)
    }

    let delButton =  $("<button>", {'type': 'button', 'class': 'delete'}).text("Delete");
    this.item.append(delButton);
  }

}


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
    let sortPriority   = $("<button>", {'type': 'button', 'class': 'priority highlight'}).text("Priority");
    let sortAlphabetic = $("<button>", {'type': 'button', 'class': 'alpha'}).text("Alphabetic");
    let sortAscending  = $("<button>", {'type': 'button', 'class': 'ascending highlight'}).text("Ascend");
    let sortDescending = $("<button>", {'type': 'button', 'class': 'descending'}).text("Descend");
    let seeAll = $("<a>", {'href': '', 'class': 'all'}).text("See All");
    let seeLess = $("<a>", {'href': '', 'class': 'less'}).text("See Less");

    $(listItem.list).prepend(sortAlphabetic);
    $(listItem.list).prepend(sortPriority);
    $(listItem.list).prepend("<br>");
    $(listItem.list).prepend(sortDescending);
    $(listItem.list).prepend(sortAscending);
    $(listItem.list).prepend("<br>");
    $(listItem.list).prepend(seeAll);
    $(listItem.list).prepend(seeLess);
  }



  
}