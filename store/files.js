/**
 * Control de los archivos para realizar un envío
 */
export const state = () => ({
  sizeToUpload: 0,
  filesUploading: 0,
  fileCounter: 0,

  noUserSendWindow: 1,

  fileList: [],        // Archivos para control del front

  filesError: [],     // Archivos con algun error
  paths: [],          // Archivos ya subidos a temporal que seran enviados a s3.

  error: null,
  errorToMany: null,

  success: false,
  successMessage: null,
  successPin: null,

});

export const mutations = {
  setNoUserSendWindow(state, val) { state.noUserSendWindow = val },
  setError(state, val) { state.error = val },
  setErrorTooMany(state, val) { state.errorToMany = val },

  setSuccess(state, val) { state.success = val },
  setSuccessMessage(state, val) { state.successMessage = val },
  setSuccessPin(state, val) { state.successPin = val },

  fileCounterIncrement(state) { state.fileCounter++ },

  // ---   sizeToUpload    ---
  setSizeToUpload(state, val) { state.sizeToUpload = val },
  sizeToUploadIncrement(state, val) { state.sizeToUpload += val },
  sizeToUploadDecrement(state, val) { state.sizeToUpload -= val },

  // ---   filesUploading    ---
  setfilesUploading(state, val) { state.sizeToUpload = val },
  filesUploadingIncrement(state) { state.filesUploading += 1 },
  filesUploadingDecrement(state) { state.filesUploading -= 1 },

  // ---   paths    ---
  setPaths(state, val) { state.paths = val },
  addToPaths(state, item) { state.paths.push(item) },
  removeFromPaths(state, index) { state.paths.splice(index, 1) },

  // ---   fileList    ---
  setFileList(state, val) { state.fileList = val },

  // ---   filesError    ---
  setFilesError(state, val) { state.filesError = val },
  addToFilesError(state, item) { state.filesError.push(item) },
  removeFromFilesError(state, index) { state.filesError.splice(index, 1) },

};

export const actions = {

  deleteFile(context, id) {
    context.state.paths.forEach((p, i) => {
      if (p.id == id) {
        context.commit("sizeToUploadDecrement", p.size)
        context.commit("removeFromPaths", i);
        this.$axios.delete(`file/upload-service/open-delete${p.relativePath}`)
      }
    })
  },
  deleteAllFiles(context) {
    context.state.paths.forEach(p => {
      this.$axios.delete(`file/upload-service/open-delete${p.relativePath}`)
    })
    context.commit("setSizeToUpload", 0)
    context.commit("setPaths", []);
    // context.commit("setFileList", []);
  },
  reset(context) {
    context.commit("setSizeToUpload", 0)
    context.commit("setPaths", []);
    context.commit("setError", false)
    context.commit("setSuccess", false)
    context.commit("setSuccessMessage", null)
    context.commit("setSuccessPin", null)
    context.commit("setSizeToUpload", 0)
    context.commit("setfilesUploading", 0)
    context.commit("setNoUserSendWindow", 1)
  }

}



