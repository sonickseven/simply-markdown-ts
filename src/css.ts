const LIGHT_VARS = `
  --md-fg: #24292f;
  --md-bg: #ffffff;
  --md-border: #d0d7de;
  --md-muted: #57606a;
  --md-link: #0969da;
  --md-code-bg: rgba(175, 184, 193, 0.2);
  --md-pre-bg: #f6f8fa;
  --md-row-alt-bg: #f6f8fa;
  --md-row-border: #c6cbd1;
  --md-btn-bg: #4a5568;
  --md-btn-bg-hover: #2d3748;`;

const DARK_VARS = `
  --md-fg: #c9d1d9;
  --md-bg: #0d1117;
  --md-border: #21262d;
  --md-muted: #8b949e;
  --md-link: #58a6ff;
  --md-code-bg: rgba(110, 118, 129, 0.4);
  --md-pre-bg: #161b22;
  --md-row-alt-bg: #161b22;
  --md-row-border: #21262d;
  --md-nested-bullet: #8b949e;`;

const BASE_CSS: string =
  `.markdown-body{--md-fg:currentColor;--md-bg:transparent;--md-border:currentColor;--md-muted:currentColor;--md-link:currentColor;--md-code-bg:transparent;--md-pre-bg:transparent;--md-row-alt-bg:transparent;--md-row-border:currentColor;--md-btn-bg:rgba(0,  0,  0,  0.5);--md-btn-bg-hover:rgba(0,  0,  0,  0.7);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif;font-size:1rem;line-height:1.5;word-wrap:break-word;color:var(--md-fg);background-color:var(--md-bg);padding-top:1px;padding-bottom:1px}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{margin-top:20px;margin-bottom:1rem;font-weight:600;line-height:2;color:var(--md-fg)}.markdown-body h1{font-size:1.7em;border-bottom:1px solid var(--md-border);padding-bottom:.3em}.markdown-body h2{font-size:1.4em;border-bottom:1px solid var(--md-border);padding-bottom:.3em}.markdown-body h3{font-size:1.25em}.markdown-body h4{font-size:1em}.markdown-body h5{font-size:.875em}.markdown-body h6{font-size:.85em;color:var(--md-muted)}.markdown-body p{margin-top:0;margin-bottom:1rem}.markdown-body ol,.markdown-body ul{margin-top:0;margin-bottom:1rem;padding-left:0;list-style:none}.markdown-body ol{counter-reset:md-ol}.markdown-body li{word-wrap:break-word;position:relative;padding-left:2em;margin-bottom:.25em;line-height:.6}.markdown-body ul li::before,.markdown-body ol li::before{display:inline-block}.markdown-body ul li::before{content:"•";padding-right:.25em;font-size:2rem}.markdown-body ol li::before{padding-right:.8em;content:counter(md-ol) ".";font-size:1rem}.markdown-body ol li{counter-increment:md-ol;line-height:1.2;padding-left:2.3em}.markdown-body li>p{margin-top:1rem}.markdown-body li+li{margin-top:.25em}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{margin-top:0;margin-bottom:0;margin-left:1.5em}.markdown-body strong{font-weight:600}.markdown-body em{font-style:italic}.markdown-body a{color:var(--md-link);text-decoration:none}.markdown-body a:hover{text-decoration:underline}.markdown-body code{font-family:ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace;font-size:85%;padding:.2em .4em;margin:0;background-color:var(--md-code-bg);border-radius:6px}.markdown-body pre{padding:1rem;overflow:auto;font-size:85%;line-height:1.45;background-color:var(--md-pre-bg);border-radius:6px;margin-bottom:1rem}.markdown-body pre code{display:inline;max-width:auto;padding:0;margin:0;overflow:visible;line-height:inherit;word-wrap:normal;background-color:transparent;border:0;font-size:1rem}.markdown-body blockquote{padding:0 1em;color:var(--md-muted);border-left:.25em solid var(--md-border);margin:0 0 1rem}.markdown-body table{border-spacing:0;border-collapse:collapse;margin-bottom:1rem;width:100%}.markdown-body table th{font-weight:600;background-color:var(--md-pre-bg)}.markdown-body table td,.markdown-body table th{padding:6px 13px;border:1px solid var(--md-border)}.markdown-body table tr{background-color:var(--md-bg);border-top:1px solid var(--md-row-border)}.markdown-body table tr:nth-child(2n){background-color:var(--md-row-alt-bg)}.markdown-body hr{height:2px;padding:0;margin:20px 0;background-color:var(--md-border);border:0}.markdown-body img{max-width:100%;box-sizing:content-box;background-color:var(--md-bg);border-radius:6px}.markdown-body .copy-code-btn{position:absolute;top:8px;right:8px;padding:6px 12px;background:var(--md-btn-bg);color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:12px;display:flex;align-items:center;gap:4px;transition:background 0.2s}.markdown-body .copy-code-btn:hover{background:var(--md-btn-bg-hover)}`;

const DARK_NESTED_BULLETS = `
.markdown-body ul ul li::after{content:"";position:absolute;width:0.25em;height:0.25em;background-color:var(--md-nested-bullet);box-shadow:0.35em 0 0 var(--md-nested-bullet);border-radius:50%;left:0.5em;top:0.7em}
.markdown-body ul ul ul li::after{box-shadow:0.3em 0 0 var(--md-nested-bullet)}
.markdown-body ul ul ul ul li::after{box-shadow:0.25em 0 0 var(--md-nested-bullet), 0.5em 0 0 var(--md-nested-bullet)}
`;

const noneCSS: string = `${BASE_CSS}`;
const lightCSS: string = `${BASE_CSS}.markdown-body{${LIGHT_VARS}}`;
const darkCSS: string = `${BASE_CSS}.markdown-body{${DARK_VARS}}${DARK_NESTED_BULLETS}`;
const systemCSS: string =
  `${BASE_CSS}.markdown-body{${LIGHT_VARS}}@media (prefers-color-scheme: dark){.markdown-body{${DARK_VARS}}${DARK_NESTED_BULLETS}}`;

export const CSS: string = systemCSS;
export { darkCSS, lightCSS, noneCSS };

export default CSS;
