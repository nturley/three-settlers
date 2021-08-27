// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "html,\nbody,\n#root,\n.App {\n  height: 100%;\n}\n\n.App {\n  display: grid;\n  grid-template-columns: auto 1fr;\n}\n\n@font-face {\n  font-family: 'Allison-Regular';\n  src: url('https://neilturley.dev/game-assets/Allison-Regular.ttf');\n}\n\n.page {\n  background-color: #f8f5de;\n  background-image: linear-gradient(\n    to right,\n    rgba(255, 210, 0, 0.4),\n    rgba(200, 160, 0, 0.1) 11%,\n    rgba(0, 0, 0, 0) 35%,\n    rgba(200, 160, 0, 0.1) 65%\n  );\n  box-shadow: inset 0 0 75px rgba(255, 210, 0, 0.3),\n    inset 0 0 20px rgba(255, 210, 0, 0.4), inset 0 0 30px rgba(220, 120, 0, 0.8);\n  color: rgba(0, 0, 0, 0.5);\n  font-family: 'Allison-Regular';\n  font-size: 24px;\n  font-weight: bold;\n  width: 250px;\n  letter-spacing: 0.05em;\n  line-height: 1.8;\n  padding: 30px;\n}\n\n.page h2 {\n  margin: 0px;\n}\n\n.page table {\n  width: 100%;\n  border-collapse: collapse;\n}\n\n.page th,\n.page td {\n  line-height: 1;\n  text-align: center;\n}\n\n.page th {\n  border: 0px;\n  border-bottom: gray 2px solid;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}