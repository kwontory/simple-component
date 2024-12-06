import Component from "../core/Component.js";

export default class Items extends Component {
  // 만약에 Items 컴포넌트에 toggle, filter 등의 기능을 추가할 경우, 어떻게 되는가?
  get filteredItems() {
    const { isFilter, items } = this.$state;
    return items.filter(
      (
        { active } // 현재 처리 중인 요소의 active 만 가져와서 할당.. items [{},{}] items가 객체 배열이고, 현재 처리 중인 객체의 active 값만 가져옴
      ) =>
        // isFilter는 $state의 isFilter 값
        (isFilter === 1 && active) || // 활성 보기
        (isFilter === 2 && !active) || // 비활성 보기
        isFilter === 0 // 전체 보기
    );
  }

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
      <header>
        <input type="text" class="appender" placeholder="아이템 내용 입력" />
      </header>
      <main>
        <ul>
          ${this.filteredItems
            .map(
              ({ contents, active, seq }) => `
            <li data-seq="${seq}">
              ${contents}
              <button class="toggleBtn" style="color: ${
                active ? "#09F" : "#F09"
              }">
                ${active ? "활성" : "비활성"}
              </button>
              <button class="deleteBtn">삭제</button>
            </li>
          `
            )
            .join("")}
        </ul>
      </main>
      <footer>
        <button class="filterBtn" data-is-filter="0">전체 보기</button>
        <button class="filterBtn" data-is-filter="1">활성 보기</button>
        <button class="filterBtn" data-is-filter="2">비활성 보기</button>
      </footer>
    `;
  }

  setEvent() {
    this.addEvent("keyup", ".appender", ({ key, target }) => {
      // const key = event.key, const target = event.target 이랑 같다! 익숙해지자!
      if (key !== "Enter") return;
      const { items } = this.$state;
      const seq = Math.max(0, ...items.map((v) => v.seq)) + 1; // 최소 0 + 1이니까 최소 1을 리턴.. seq가 1부터 시작..
      const contents = target.value;
      const active = false;
      this.setState({
        items: [...items, { seq, contents, active }], // items는 객체 배열임!
      });
    });

    this.addEvent("click", ".deleteBtn", ({ target }) => {
      const items = [...this.$state.items];
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      items.splice(
        items.findIndex((v) => v.seq === seq), // 객체의 시퀀스 값과 일치하는 요소의 인덱스를 반환, 없으면 -1을 반환
        1 // 삭제할 요소의 개수, 0이면 아무것도 삭제하지 않는다.
        // 시퀀스 값이 일치하는 요소를 찾아서 삭제한다.
        // mutable하다! 원본을 변경한다!
      );
      this.setState({ items });
    });

    this.addEvent("click", ".toggleBtn", ({ target }) => {
      const items = [...this.$state.items];
      const seq = Number(target.closest("[data-seq]").dataset.seq);
      const index = items.findIndex((v) => v.seq === seq);
      items[index].active = !items[index].active;
      this.setState({ items });
    });

    this.addEvent("click", ".filterBtn", ({ target }) => {
      this.setState({ isFilter: Number(target.dataset.isFilter) });
    });
  }
}
