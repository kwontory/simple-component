import Component from "../core/Component.js";

export default class Items extends Component {
  setup() {
    this.$state = { items: ["item1", "item2"] };
  }
  template() {
    const { items } = this.$state;
    // join('')을 이용해서 배열의 요소들을 문자열로 합친다.
    return `
      <ul>
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <button>추가</button>
    `;
  }

  setEvent() {
    this.$target.querySelector("button").addEventListener("click", () => {
      const { items } = this.$state;
      this.setState({ items: [...items, `item${items.length + 1}`] });
    });
  }
}
