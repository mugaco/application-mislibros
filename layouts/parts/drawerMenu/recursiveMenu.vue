<template>
  <Recursive
    :menu="items"
    text-id="title"
    text-title="title"
    text-children="childs"
    :padding-left="15"
    dark
  />
</template>
<script>
import Recursive from "&/common/recursive-menu-2";
export default {
  name: "drawer-menu",
  components: {
    Recursive,
  },
  mounted() {
    this.$nextTick(() => {
      const itemActive = document.getElementsByClassName(
        "xv-list-item--active"
      );
      if (itemActive.length > 0) {
        const el =
          itemActive[0].parentNode.parentNode.parentNode.parentNode.parentNode
            .firstChild.firstChild;
        console.log(el);
        if (el.classList.contains("v-list-item--link-xxx")) {
          setTimeout(()=>{
             el.click();
          },500)
        }
      }
    });
  },
  computed: {
    items() {
      let items = [];

      items.push({
        color: "white",
        icon: "home",
        title: this.$t("menu-inicio"),
        to: this.localePath("/"),
      });

      // ################    USUARIO    ################

      let userPages = [];
      if (this.$store.state.user.logged) {
        userPages = [
          {
            color: "white",
            title: this.$t("menu-cuenta-datos-basicos"),
            to: this.localePath("/admin/cuenta/datosBasicos"),
          },
          {
            color: "white",
            title: this.$t("menu-cuenta-datos-facturacion"),
            to: this.localePath("/admin/cuenta/datosFacturacion"),
          },
          {
            color: "white",
            title: this.$t("menu-cuenta-suscripcion"),
            to: this.localePath("/suscribir-plan/profesional"),
          },
        ];
        items.push({
          color: "white",
          icon: "person",
          title: this.$t("menu-cuenta"),
          to: this.localePath("/admin/cuenta"),
          // childs: userPages,
        });
      }

      if (this.$store.state.user.subscription) {
        userPages.push({
          color: "white",
          title: this.$t("menu-cuenta-sms"),
          to: this.localePath("/admin/cuenta/sms"),
        });
        items.push(
          {
            color: "white",
            icon: "contacts",
            title: this.$t("menu-contactos"),
            to: this.localePath("/admin/panel/contactos"),
          },
          {
            color: "white",
            icon: "send",
            title: this.$t("menu-envios"),
            to: this.localePath("/admin/panel/envios"),
          }
        );

        // ################    ADMINISTRADOR    ################
      }
      if (this.$store.state.user.is_admin) {
        items.push(
          {
            color: "white",
            icon: "inventory",
            title: this.$t("crear-suscripcion"),
            to: this.localePath("/admin/super-admin/crear-definir-suscripcion"),
          },
          {
            color: "white",
            icon: "inventory",
            title: this.$t("menu-admin-sms"),
            to: this.localePath("/admin/panel/sms_packs_admin"),
          },
          {
            color: "white",
            icon: "account_balance_wallet",
            title: this.$t("menu-admin-creditos-sms"),
            to: this.localePath("/admin/panel/sms_credito_admin"),
          },
          {
            color: "white",
            icon: "receipt",
            title: this.$t("books"),
            to: this.localePath("/admin/panel/books_admin"),
          },
          {
            color: "white",
            icon: "percent",
            title: this.$t("menu-admin-iva"),
            to: this.localePath("/helpdesk/settings"),
            childs: [
              {
                color: "white",
                title: this.$t("menu-admin-iva-pro-grupo"),
                to: this.localePath(
                  "/admin/super-admin/mp/iva_producto_grupos"
                ),
              },
              {
                color: "white",
                title: this.$t("menu-admin-iva-cli-grupo"),
                to: this.localePath("/admin/super-admin/mp/iva_cliente_grupos"),
              },
              {
                color: "white",
                title: this.$t("menu-admin-iva-tipos"),
                to: this.localePath("/admin/super-admin/mp/iva_tipos"),
              },
              {
                color: "white",
                title: this.$t("menu-admin-iva-reglas"),
                to: this.localePath("/admin/super-admin/mp/iva_reglas"),
              },
            ],
          }
        );
      }

      // ################    DESAROLLO    ################

      if (process.env.dev) {
        items.push({
          color: "white",
          icon: "engineering",
          title: "Desarollo ",
          to: this.localePath("/yyy"),
          childs: [
            {
              color: "white",
              title: "Inspire subscription",
              to: this.localePath("/inspires/inspire-subscription"),
            },
            {
              color: "white",
              title: "Inspire",
              to: this.localePath("/inspires/inspire"),
            },
            {
              color: "white",
              title: "Lector",
              to: this.localePath("/inspires/inspire-lector"),
            },
            {
              color: "white",
              title: "Tienda",
              to: this.localePath("/inspires/inspire-tienda"),
            },
          ],
        });
      }

      return items;
    },
  },
};
</script>

