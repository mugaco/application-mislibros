<template>
  <DownloadFileByToken
    :token="token"
    :sender-name="sender_name"
    :to-name="to_name"
    :doc-name="doc_name"
    :doc-type="doc_type"
    :doc-size="doc_size"
  />
</template>

<script>
import DownloadFileByToken from "@/components/DownloadFileByToken";
export default {
  
  asyncData({ params, query }) {
    return {
      token: params.token,
      sender_name: query.sender_name,
      to_name: query.to_name,
      doc_name: query.doc_name,
      doc_type: query.type,
      doc_size: query.size,
    };
  },
  components: {
    DownloadFileByToken,
  },
};
</script>