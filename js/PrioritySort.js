export default class PrioritySort
{
  constructor(options)
  {
    this.$listElement           = options.$listElement
    this.sortAlphabetic         = options.sortAlphabetic;
    this.sortPriority           = options.sortPriority;
    this.sortAscending          = options.sortAscending;
    this.sortDescending         = options.sortDescending;
    this.seeAllElement          = options.seeAllId;
    this.seeLessElement         = options.seeLessId;
    this.initialCountAttribute  = options.initialCountAttribute;
    this.priorityOrderAttribute = options.priorityOrderAttribute;
    this.highlightClass         = options.highlightClass;
    this.count                  = ".less";
    this.sortBy                 = ".priority";
    this.orderBy                = ".ascending";
  }

  init()
  {
    this.addSeeOptions();
    this.bindEvents();
    this.sortListItems(this.$listElement);
    $(this.seeLessElement).toggle();
  }

  bindEvents()
  {
    $(this.sortAlphabetic).on("click", () => this.onClickSortBy(this.sortAlphabetic, this.sortPriority));
    $(this.sortPriority).on("click", () => this.onClickSortBy(this.sortPriority, this.sortAlphabetic));

    $(this.sortAscending).on("click", () => this.onClickOrderBy(this.sortAscending, this.sortDescending));
    $(this.sortDescending).on("click", () => this.onClickOrderBy(this.sortDescending, this.sortAscending));

    $(this.seeAllElement).on("click", () => this.onClickSee(this.seeAllElement));
    $(this.seeLessElement).on("click", () => this.onClickSee(this.seeLessElement));
  }
  
  onClickSortBy(currentVal, oldVal)
  {
    $(event.target)
      .addClass(this.highlightClass)
      .siblings("button"+oldVal).removeClass(this.highlightClass);
    event.preventDefault();
    this.sortBy = currentVal;

    this.sortListItems($(event.target).parent());
  }

  onClickOrderBy(currentVal, oldVal)
  {
    $(event.target)
      .addClass(this.highlightClass)
      .siblings("button"+oldVal).removeClass(this.highlightClass);
    event.preventDefault();
    this.orderBy = currentVal;
    this.sortListItems($(event.target).parent());
  }

  onClickSee(type)
  {
    $(event.target).toggle();
    $(event.target).siblings("a").toggle();
    event.preventDefault();
    this.count = type;
    this.sortListItems($(event.target).parent());
  }


  addSeeOptions()
  {
    for(let listItem of this.$listElement)
    {
      let sortPriority   = $("<button>", {'type': 'button', 'class': 'priority highlight'}).text("Priority");
      let sortAlphabetic = $("<button>", {'type': 'button', 'class': 'alpha'}).text("Alphabetic");
      let sortAscending  = $("<button>", {'type': 'button', 'class': 'ascending highlight'}).text("Ascend");
      let sortDescending = $("<button>", {'type': 'button', 'class': 'descending'}).text("Descend");
      let seeAll = $("<a>", {'href': '', 'class': 'all'}).text("See All");
      let seeLess = $("<a>", {'href': '', 'class': 'less'}).text("See Less");

      $(listItem).prepend(sortAlphabetic);
      $(listItem).prepend(sortPriority);
      $(listItem).prepend("<br>");
      $(listItem).prepend(sortDescending);
      $(listItem).prepend(sortAscending);
      $(listItem).append(seeAll);
      $(listItem).append(seeLess);
      
    }

  }

  sortListItems(arrayList)
  {
    for(let listItem of arrayList)
    {
      let items = Array.prototype
        .slice.call( $(listItem).children("li").hide() )
        .sort( (a,b) => this.sortArrayFunction(a, b, this.sortBy ))
        
      if(this.count == ".less")
      {
        let count = $(listItem).attr(this.initialCountAttribute);  
        items = items.slice(0, count);
      }
      if(this.orderBy == ".descending")
      {
        items = items.reverse();
      }

      items.forEach(element => $(listItem).append($(element).show()) );
    }
  }

  sortArrayFunction(a, b, type)
  {
    let orderA;
    let orderB;
    if(type == ".priority")
    {
      orderA = $(a).attr(this.priorityOrderAttribute) || 40;
      orderB = $(b).attr(this.priorityOrderAttribute) || 40;
    }
    else
    {
      orderA = $(a).prop("textContent");
      orderB = $(b).prop("textContent");
    }
    if (orderA < orderB) {
      return -1;
    }
    if (orderA > orderB) {
      return 1;
    }
    return 0;
  }
}