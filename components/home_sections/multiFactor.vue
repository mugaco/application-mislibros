<template>
  <div class="mini-spacer">
    <v-container>
      <v-row justify="end">
        <v-col cols="12" lg="6">
          <div class="fg-card-subtitle" style="font-family: roobertsemibold">
            {{ $t("mfa-title") }}
          </div>
          <div class="fg-card-subtitle" style="font-family: roobertregular">
            {{ $t("mfa-subtitle") }}
          </div>
        </v-col>
        <v-col cols="12" lg="6">
          <v-img
            :src="require('/static/MFA.svg')"
            :alt="$t('mfa-alt-text-image')"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "MultiFactor",
};
</script>
