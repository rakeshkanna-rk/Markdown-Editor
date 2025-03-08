document.addEventListener("DOMContentLoaded", function () {
  var editor = CodeMirror(document.getElementById("editor"), {
    mode: "markdown",
    lineNumbers: true,
    theme: "base16-dark",
    autoCloseBrackets: true,
  });

  // Ensure CodeMirror expands to full height
  editor.setSize("100%", "100%");

  // Function to insert markdown text at cursor position
  function insertMarkdown(markdown) {
    const doc = editor.getDoc();
    const cursor = doc.getCursor();
    doc.replaceRange(markdown, cursor);
  }

  // Function to toggle between editor and preview mode
  function togglePreview() {
    const preview = document.getElementById("preview");
    const editorContainer = document.getElementById("editor");

    if (!preview.classList.contains("active")) {
      preview.innerHTML = marked(editor.getValue());
      preview.classList.add("active");
      editorContainer.style.opacity = "0";
    } else {
      preview.classList.remove("active");
      editorContainer.style.opacity = "1";
    }
  }

  // Function to download markdown content
  function downloadMarkdown() {
    const text = editor.getValue();
    const filename =
      document.getElementById("downloadmd").value || "document.md";
    const blob = new Blob([text], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  }

  // Exposing functions to global scope
  window.insertMarkdown = insertMarkdown;
  window.togglePreview = togglePreview;
  window.downloadMarkdown = downloadMarkdown;
});
