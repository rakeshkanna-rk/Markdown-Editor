// Initialize the CodeMirror editor
var editor = CodeMirror(document.getElementById("editor"), {
  mode: "markdown",
  theme: "base16-dark",
  lineNumbers: true,
  scrollbarStyle: "null",
  extraKeys: {
    Enter: function (cm) {
      cm.replaceSelection("\n", "end");
    },
    "Ctrl-Space": "autocomplete",
  },
  autoCloseBrackets: true,
});

// Get the preview div
var preview = document.getElementById("preview");

// Function to update the preview with the Markdown HTML output
function updatePreview() {
  var markdownText = editor.getValue();
  preview.innerHTML = marked(markdownText);
}

// Event listener to update the preview whenever the content changes
editor.on("change", updatePreview);

// Function to download Markdown content as a file
function downloadMarkdown() {
  var markdownText = editor.getValue();
  var fileName = document.getElementById("downloadmd").value + ".md";
  var blob = new Blob([markdownText], { type: "text/markdown" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
}

// Hide vertical scrollbar
document.querySelector(".CodeMirror-vscrollbar").style.display = "none";

// Update the preview when the page loads
updatePreview();