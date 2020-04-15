import ListItem from './ListItem.js';
export default class PriorityList
{
  constructor(list, managerObject)
  {
    this.listItems = [];
    this.sortedListItems = [];
    this.list      = list;
    this.manager   = managerObject;
    this.count     = ".less";
    this.sortBy    = "priority";
    this.orderBy   = "ascending";
    this.initialCountAttribute = $(list).attr("data-initial-items-count" );
    $(this.list).children().each((_i, item) => {
      let listItem = new ListItem($(item));
      this.listItems.push(listItem);
    })
  }

  bindEvents()
  {
    // done FIXME_AB: $(this.list) is done multiple times
    let $list = $(this.list);
    // done FIXME_AB: you don't need to pass arguments,
    $list.find(this.manager.sortAlphabetic).on("click", () => this.onClickSortBy());
    $list.find(this.manager.sortPriority).on("click", () => this.onClickSortBy());
    $list.find(this.manager.sortAscending).on("click", () => this.onClickOrderBy());
    $list.find(this.manager.sortDescending).on("click", () => this.onClickOrderBy());
    $list.find(this.manager.seeAllElement).on("click", () => this.onClickSee());
    $list.find(this.manager.seeLessElement).on("click", () => this.onClickSee());
    $list.find('.delete').on("click", () => this.deleteItem() );
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
    this.display();
  }

  onClickSortBy()
  {
    $(event.target)
      .addClass(this.manager.highlightClass)
      .siblings("button.sortby").removeClass(this.manager.highlightClass);
    event.preventDefault();
    this.sortBy = event.target.id;
    this.sortListItems();
    this.display();
  }

  onClickOrderBy()
  {
    $(event.target)
      .addClass(this.manager.highlightClass)
      .siblings("button.orderby").removeClass(this.manager.highlightClass);
    event.preventDefault();
    this.orderBy = event.target.id;
    this.sortListItems();
    this.display();
  }

  onClickSee()
  {
    $(event.target).toggle();
    $(event.target).siblings("a").toggle();
    event.preventDefault();
    this.count = "."+ event.target.id;
    this.sortListItems();
    this.display();
  }

  sortListItems()
  {
    this.listItems.forEach((item) => item.item.hide());
    
    this.sortedListItems = this.listItems.sort( (a,b) => this.sortArrayFunction(a, b, this.sortBy ))
    if(this.orderBy == "descending")
    {
      this.sortedListItems = this.sortedListItems.reverse();
    }
    if(this.count == ".less")
    {
      let count = this.initialCountAttribute;
      this.sortedListItems = this.sortedListItems.slice(0, count);
    }
  // done FIXME_AB: display(sortedItems) and should not be display from here
  }

  display()
  {
    this.sortedListItems.forEach(element => $(this.list).append(element.item.show()) );
  }
 
  sortArrayFunction(a, b, type)
  {
    let orderA;
    let orderB;
    if(type == "priority")
    {
      orderA = a.priority;
      orderB = b.priority;
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
