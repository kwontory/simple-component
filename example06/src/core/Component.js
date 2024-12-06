export default class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() {}
  template() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.template();
  }
  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
  addEvent(eventType, selector, callback) {
    // selector는 CSS 선택자 형식으로 지정된 문자열
    // 이벤트 버블링을 추상화
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false; // closest(selector) : selector 조건에 맞는 가장 가까운 조상 요소(자기 자신을 포함)를 찾는다.
      callback(event);
    });
  }
}
