Vue.use(VueTheMask);

new Vue({
  el: "#app",

  data() {
    return {
      currentCardBackground: Math.floor(Math.random() * 25) + 1,
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false,
      blurTimer: null
    };
  },

  computed: {
    cardBackgroundUrl() {
      return `https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${this.currentCardBackground}.jpeg`;
    },

    cardTypeUrl() {
      const types = {
        visa: "visa",
        amex: "amex",
        mastercard: "mastercard",
        discover: "discover",
        troy: "troy"
      };

      return `https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/${types[this.getCardType]}.png`;
    },

    getCardType() {
      const number = this.cardNumber.replace(/\D/g, "");

      if (/^4/.test(number)) return "visa";
      if (/^(34|37)/.test(number)) return "amex";
      if (/^5[1-5]/.test(number)) return "mastercard";
      if (/^6011/.test(number)) return "discover";
      if (/^9792/.test(number)) return "troy";

      return "visa";
    },

    generateCardNumberMask() {
      return this.getCardType === "amex"
        ? this.amexCardMask
        : this.otherCardMask;
    },

    minCardMonth() {
      if (Number(this.cardYear) === this.minCardYear) {
        return new Date().getMonth() + 1;
      }

      return 1;
    }
  },

  watch: {
    cardYear() {
      if (Number(this.cardMonth) < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },

  methods: {
    flipCard(status) {
      this.isCardFlipped = status;
    },

    focusInput(event) {
      clearTimeout(this.blurTimer);
      this.isInputFocused = true;

      const target = this.$refs[event.target.dataset.ref];
      if (!target) return;

      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      };
    },

    blurInput() {
      this.isInputFocused = false;

      this.blurTimer = setTimeout(() => {
        if (!this.isInputFocused) {
          this.focusElementStyle = null;
        }
      }, 300);
    }
  }
});