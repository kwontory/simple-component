export default class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup() {}
  template() {
    return "";
  }
  render() {
    // render 호출할 때마다 event를 등록하게 된다.
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
