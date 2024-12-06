export default class Component {
  $target;
  $state;
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.setEvent();
    // 기존에는 reder 호출 시 이벤트를 등록하였기 때문에
    // 상태가 변할 때마다 render가 되고 render 될 때마다 event가 등록되었다.
    // 이벤트 버블링을 활용해서 taget에 이벤트를 등록하도록 변경하였기 때문에
    // 생성자 호출 시에 한번만 이벤트를 등록하도록 변경한다.
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
}
