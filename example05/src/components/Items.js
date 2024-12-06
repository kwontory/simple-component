import Component from "../core/Component.js";

export default class Items extends Component {
  setup() {
    this.$state = { items: ["item1", "item2"] };
  }
  template() {
    const { items } = this.$state;
    return `
      <ul>
        ${items
          .map(
            (item, key) => `
          <li>
            ${item}
            <button class="deleteBtn" data-index="${key}">삭제</button>
          </li>
        `
          )
          .join("")}
      </ul>
      <button class="addBtn">추가</button>
    `;
  }

  setEvent() {
    this.$target.addEventListener("click", ({ target }) => {
      // 이벤트 버블링을 활용해서 taget에 이벤트를 등록하도록 변경
      const items = [...this.$state.items];

      if (target.classList.contains("addBtn")) {
        this.setState({ items: [...items, `item${items.length + 1}`] });
      }

      if (target.classList.contains("deleteBtn")) {
        items.splice(target.dataset.index, 1);
        this.setState({ items });
      }
    });
  }
}
