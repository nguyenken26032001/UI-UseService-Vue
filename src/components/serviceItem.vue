<template>
  <tr>
    <td>{{ serviceItem.serviceName }}</td>
    <td>{{ serviceItem.price }}</td>
  </tr>
</template>
<script>
export default {
  props: ["serviceItem"],
  data() {
    return {
      serviceName: "service item",
    };
  },
};
/* 
//props : đẩy dữ liệu từ component cha sang component con
có 2 cách để đẩy dữ liệu từ props
c1 : dùng mảng tên props['serviceItem']
*/
</script>
<style></style>
