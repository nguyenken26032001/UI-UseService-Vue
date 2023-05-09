<template>
  <tr>
    <input type="radio" name="a" />
    <td>{{ packageItem.packageName }}</td>
    <td>{{ packageItem.quantityToken }}</td>
    <td>{{ packageItem.expire }}</td>
    <td>{{ formatPrice(packageItem.price) }} VND</td>
  </tr>
</template>
<script>
export default {
  props: ["packageItem"],
  data() {
    return {};
  },
  methods: {
    formatPrice(value) {
      return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
  },
  computed: {
    formatMoney(money) {
      return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    },
  },
};
</script>
