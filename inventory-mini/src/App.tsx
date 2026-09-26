import type { Item } from "./schemas/item";

const dummyItems: Item[] = [
  { id: "1", name: "コーヒー豆", category: "drink", price: 800, stock: 12},
  { id: "2", name: "ノート", category: "other", price: 150, stock: 0},
  { id: "3", name: "チョコレート", category: "food", price: 300, stock: 5, memo: "季節限定"},
];

const message = `${dummyItems[0].price}円`;

function App(){
  return(
    <div style={{ padding: 24, fontFamily: "sans-serif"}}>
      <h1>在庫管理ミニアプリ</h1>
      <ul>
        {
          dummyItems.map( (item)=>(
            <li key={item.id}>  {item.name} - {item.price}円（在庫:{item.stock}個）</li>) 
          )
        }
      </ul>
    </div>
  );
}

export default App;

