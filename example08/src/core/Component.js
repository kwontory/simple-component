export default class Component {
  // Component에 'mounted'와 'props'를 추가
  // mounted는 render 이후에 추가적인 기능을 수행하기 위해서 추가
  // props는 부모 컴포넌트가 자식 컴포넌트에게 state 혹은 method를 넘겨주기 위해서 추가
  $target;
  $props;
  $state;
  constructor($target, $props) {
    // 생성자에서 props를 넘겨받는다!
    this.$target = $target;
    this.$props = $props; // props 할당..!
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() {}
  mounted() {}
  template() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted(); // render 후에 mounted 호출!
  }
  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return false;
      callback(event);
    });
  }
}
