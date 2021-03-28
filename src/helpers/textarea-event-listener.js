export class TextareaEventListener {
  text = '';
  get textareaElements() {
    return document.querySelectorAll('textarea.simpleTextarea');
  }

  register(text) {
    this.text = text;
    if (!this.text) return;
    document.querySelectorAll('textarea.simpleTextarea').forEach((el) => {
      el.addEventListener('input', this.handleTyping.bind(this));
    });
  }

  revoke() {
    document.querySelectorAll('textarea.simpleTextarea').forEach((el) => {
      el.removeEventListener('input', this.handleTyping.bind(this));
    });
  }

  handleTyping(event) {
    const { target } = event;
    if (target.value.toLowerCase() !== 'fr') return;
    target.value = `From ${this.text}:`;
  }
}
