import Component from "./core/Component.js";
import Items from "./components/Items.js";
import ItemAppender from "./components/ItemAppender.js";
import ItemFilter from "./components/ItemFilter.js";

export default class App extends Component {
  // 컴포넌트 분할!
  // 기존의 Items에 존재하던 로직을 App.js로 넘겨준다.
  // Items, ItemAppender, ItemFilter 등은 App.js에서 넘겨주는 로직을 사용하도록 한다.

  setup() {
    this.$state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: "item1",
          active: false,
        },
        {
          seq: 2,
          contents: "item2",
          active: true,
        },
      ],
    };
  }

  template() {
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  // mounted에서 자식 컴포넌트를 마운트 해야 한다!..
  // mount란 무엇인가..
  // 특정 UI 컴포넌트를 DOM에 "부착"(Attach) 하는 과정
  // 컴포넌트가 DOM에 추가되는 시점
  // 컴포넌트가 초기화 되어서 브라우저의 DOM 트리에 추가될 때를 의미
  // 초기 렌더링..!
  mounted() {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector(
      '[data-component="item-appender"]' // 내부에서 특정 data-component 속성을 가진 요소를 선택한다!
    );
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector(
      '[data-component="item-filter"]'
    );

    // 하위 컴포넌트 초기화하고 각 컴포넌트가 해야 할 작업과 데이터를 전달
    // 특정 method, 속성 등을 전달한다!

    // TO-DO
    // 하나의 객체에서 사용하는 메소드를 넘겨줄 bind를 사용하여 this를 변경하거나,
    // 다음과 같이 새로운 함수를 만들어줘야 한다.
    // ex) { addItem: contents => addItem(contents) }
    new ItemAppender($itemAppender, {
      addItem: addItem.bind(this), // addItem 메서드를 바인딩해서 전달 -> this 컨텍스트를 유지하도록 하기 위함
      // bind(this)
      // *함수의 this 값을 명시적으로 설정한다.
      // this가 명시적으로 설정된 !!!새로운 함수를 반환!!!한다.
      // 두번째 파라미터로 인수를 미리 전달할 수도 있다.
    });
    new Items($items, {
      filteredItems, // getter로 필터링된 items를 전달
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this),
    });
  }

  // *메서드로 상태를 업데이트하고 다시 렌더링
  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(
      ({ active }) =>
        (isFilter === 1 && active) ||
        (isFilter === 2 && !active) ||
        isFilter === 0
    );
  }

  addItem(contents) {
    const { items } = this.$state;
    const seq = Math.max(0, ...items.map((v) => v.seq)) + 1;
    const active = false;
    this.setState({
      items: [...items, { seq, contents, active }],
    });
  }

  deleteItem(seq) {
    const items = [...this.$state.items];
    items.splice(
      items.findIndex((v) => v.seq === seq),
      1
    );
    this.setState({ items });
  }

  toggleItem(seq) {
    const items = [...this.$state.items];
    const index = items.findIndex((v) => v.seq === seq);
    items[index].active = !items[index].active;
    this.setState({ items });
  }

  filterItem(isFilter) {
    this.setState({ isFilter });
  }
}
