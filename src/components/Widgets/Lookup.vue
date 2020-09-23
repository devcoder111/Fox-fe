<template>
  <div class="d-flex">
    <v-combobox
      v-model="select"
      :items="items"
      :label="label"
      :item-text="item_text"
      :item-value="item_value"
      :return-object="true"
      id="input"
      @input="onInput"
      :readonly="readonly"
    ></v-combobox>
    <div class="btn-section pl-5">
      <v-btn v-if="isNew" block @click="dialog = true">Add</v-btn>
    </div>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Add new item</v-card-title>

        <v-card-text>Do you want to add {{select}}?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="dialog = false">No</v-btn>

          <v-btn color="green darken-1" flat="flat" @click="addItem">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: "Lookup",
  props: {
    readonly: Boolean,
    label: String,
    item_text: String,
    item_value: String,
    default: [String, Number],
    getAll: {
      type: String,
      default: ""
    },
    addNew: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      select: null,
      items: [],
      isNew: false,
      dialog: false
    };
  },
  watch: {
    default(value) {
      for (let i = 0; i < this.items.length; i ++) {
        const element = this.items[i];
        if (element.id == value) {
          this.select = Object.assign({}, element);
        }
      }
    }
  },
  methods: {
    onInput() {
      if (typeof(this.select) == "object" && this.select[this.item_value]) {
        this.$emit('update-value', this.select[this.item_value]);
        return;
      }
      for (let i = 0; i < this.items.length; i ++) {
        const element = this.items[i];
        if (element[this.item_text] == this.select) {
          this.isNew = false;
          this.select = Object.assign({}, element);
          this.$emit('update-value', element[this.item_value]);
          return;
        }
      }
      this.isNew = true;
    },
    async addItem() {
      let payload = {
        text: this.select,
      };
      let res = await this.$store.dispatch(this.addNew, payload);
      if (res) {
        this.items.push(res);
        this.isNew = false;
        this.dialog = false;
        this.$emit('update-value', res.id);
      }
    }
  },
  async created() {
    let res = await this.$store.dispatch(this.getAll);
    this.items = Object.assign([], res);
  }
};
</script>

<style lang="stylus" scoped>
.v-select.v-text-field {
  width: 60%;
}
</style>
