import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cardItem: any = [];
  totalPrice: any = 0;
  itemMap: any = {};

  ngOnInit() {
    this.loadCartItems();
    console.log('cardItem.itemsWithQuantity',this.cardItem);
    
  }

  loadCartItems() {
    let storedCardItem: any = localStorage.getItem('cardItem');
    let cartFromStorage = JSON.parse(storedCardItem);
    this.cardItem = this.calculateTotalPriceWithQuantity(cartFromStorage);
  }

  calculateTotalPriceWithQuantity(items: any) {
    let totalPrice: any = 0;
    let itemMap: any = {};

    // Calculate the total price and handle duplicates
    items.forEach((item: any) => {
      let key: any = item.name.toLowerCase();

      if (!itemMap[key]) {
        itemMap[key] = { ...item, quantity: 1 };
        totalPrice += parseFloat(item.price.replace('$', ''));
      } else {
        itemMap[key].quantity++;
        totalPrice += parseFloat(item.price.replace('$', ''));
      }
    });

    return { totalPrice, itemsWithQuantity: Object.values(itemMap) };
  }

  calculateTotalPrice(): number {
    return this.cardItem.reduce((total: any, item: any) => total + parseFloat(item.price.replace('$', '')), 0);
  }

  removeItem(index: number): void {
    this.cardItem.itemsWithQuantity.splice(index, 1);

    localStorage.setItem('cardItem', JSON.stringify(this.cardItem.itemsWithQuantity));

    this.loadCartItems();
  }

  updateTotalPrice(): void {
    const totalPrice = this.calculateTotalPrice();
  }
}
