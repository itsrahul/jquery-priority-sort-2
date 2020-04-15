export default class ListItem
{
  constructor($item)
  {
    this.item = $item;
    // done FIXME_AB: set default priority here
    this.priority = $item.attr("data-priority-order") || 100000;
    this.text = $item.text();
    this.init()
  }

  init()
  {
    if(this.priority < 100000)
    {
      this.item.append(` (${this.priority})`)
    }
    let delButton =  $("<button>", {'type': 'button', 'class': 'delete'}).text("Delete");
    this.item.append(delButton);
  }
}