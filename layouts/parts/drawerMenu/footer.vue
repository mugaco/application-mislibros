<template>
  <div class="footer-wrapper">
       <div style="margin-left: 0px ">
          <span style ="font-size: 14px; color: #aaa; position: relative; bottom: 7px; padding-right: 4px"> powered by </span> 

          <img width="220" id="logo"  alt="quartup-logo"   :src="require(`&/theme/assets/Logo/svg/${name}`)" />
        </div>
  </div>
</template>

<script>

export default {
  data:()=>({
    name:"mugaco-base-1-blanco.svg"
  })
};
</script>

