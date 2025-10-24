# Index

1. [_________________English documentation](./#english)
2. [_________________Documentación en español](./#español)
3. [_________________Documentação em espanhol](./#Português)

# English

## simply-markdown-ts

`simply-markdown-ts` is a lightweight and easy-to-use library to render markdown into HTML. It is an excellent alternative to heavier libraries, offering the essential features for blogs, documentation, and personal projects.

## Installation

To use `simply-markdown-ts` in your project, you can import it directly from JSR:

```typescript
import { render } from 'jsr:@sonickseven/simply-markdown';
```

## Usage

The `render` function is the entry point of the library. It takes a markdown string and returns the corresponding HTML.

```typescript
import { render } from 'jsr:@sonickseven/simply-markdown';

const markdown = `# Hello, world!

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

[Visit my website](https://sonickseven.deno.dev)
`;

const html = render(markdown, {
  disableUrlIndex: true,
});
console.log(html);
```

## Features

- **Headers**: Supports headers from `#` (H1) to `######` (H6).
- **Text formats**: Bold (`**text**`), italic (`*text*`), and strikethrough (`~~text~~`).
- **Links**: Create links with `[title](url)`.
- **Images**: Embed images with `![alt](url)`.
- **Lists**: Ordered (`1.`) and unordered (`-`, `*`, `+`) lists.
- **Blockquotes**: Create blockquotes with `>`.
- **Code**: Inline (`code`) and block (```) code.
- **Tables**: Create tables with markdown syntax.
- **Horizontal rules**: Create horizontal rules with `---`, `***`, or `___`.

## API

### `render(markdown: string, options?: renderTypes): string`

- `markdown`: The markdown string to be rendered.
- `options`: (Optional) An object with rendering options.

Returns the rendered HTML as a string.

### `CSS: string`

A string with the default CSS to style the rendered HTML. You can include it in your project to get a default style.

```typescript
import { CSS } from 'jsr:@sonickseven/simply-markdown';

const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);
```

### Use with Prism

This library works seamlessly with [Prism](https://prismjs.com/), a popular syntax highlighter, allowing you to format code blocks in multiple languages (TypeScript, JavaScript, Rust, Python, etc.).

**📚 [Review all supported Prism languages here](https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript)**

#### Example Integration

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown with Syntax Highlighting</title>

    <!-- Prism CSS Theme -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
    />

    <!-- Load Prism.js with more language support -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-rust.min.js"
    ></script>
  </head>
  <body>
    <div id="markdown-content"></div>

    <script type="module">
      import {
        clipBoard,
        CSS,
        render,
      } from 'https://esm.sh/jsr/@sonickseven/simply-markdown';

      const text_md = `# Hello, mundo!

This is a paragraph with **bold** and *italic* text.

## Code Example

\`\`\`typescript
function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

---

\`\`\`rust
fn greet(name: string) -> string {
    format!("Hello {}", name)
}

println!(greet("World"));
\`\`\`

---

- List item 1
- List item 2

[Visit my website](https://sonickseven.deno.dev)`;

      document.addEventListener('DOMContentLoaded', async () => {
        await new Promise((resol) => setTimeout(resol, 1000));

        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        const contentElement = document.getElementById('markdown-content');
        contentElement.innerHTML = render(text_md);

        const script = document.createElement('script');
        script.textContent = clipBoard;
        document.body.appendChild(script);

        if (window.Prism) {
          Prism.highlightAllUnder(contentElement);
        }
      });
    </script>
  </body>
</html>
```

## Contributing

Contributions are welcome. If you find a bug or want to suggest a new feature, please open an issue on GitHub.

## License

`simply-markdown-ts` is licensed under the MIT License.

---

# Español

## simply-markdown-ts

`simply-markdown-ts` es una biblioteca ligera y fácil de usar para renderizar markdown a HTML. Es una excelente alternativa a bibliotecas más pesadas, ofreciendo las características esenciales para blogs, documentación y proyectos personales.

## Instalación

Para usar `simply-markdown-ts` en tu proyecto, puedes importarlo directamente desde JSR:

```typescript
import { render } from 'jsr:@sonickseven/simply-markdown';
```

## Uso

La función `render` es el punto de entrada de la biblioteca. Toma una cadena de markdown y devuelve el HTML correspondiente.

```typescript
import { render } from 'jsr:@sonickseven/simply-markdown';

const markdown = `# ¡Hola, mundo!

Este es un párrafo con texto en **negrita** y *cursiva*.

- Elemento de lista 1
- Elemento de lista 2

[Visita mi sitio web](https://example.com)
`;

const html = render(markdown, {
  disableUrlIndex: true,
});
console.log(html);
```

## Características

- **Encabezados**: Soporta encabezados desde `#` (H1) hasta `######` (H6).
- **Formatos de texto**: Negrita (`**texto**`), cursiva (`*texto*`) y tachado (`~~texto~~`).
- **Enlaces**: Crea enlaces con `[título](url)`.
- **Imágenes**: Inserta imágenes con `![alt](url)`.
- **Listas**: Listas ordenadas (`1.`) y desordenadas (`-`, `*`, `+`).
- **Citas**: Crea citas con `>`.
- **Código**: Código en línea (`código`) y en bloque (```).
- **Tablas**: Crea tablas con la sintaxis de markdown.
- **Líneas horizontales**: Crea líneas horizontales con `---`, `***` o `___`.

## API

### `render(markdown: string, options?: renderTypes): string`

- `markdown`: La cadena de markdown a ser renderizada.
- `options`: (Opcional) Un objeto con opciones de renderizado.

Devuelve el HTML renderizado como una cadena.

### `CSS: string`

Una cadena con el CSS por defecto para estilizar el HTML renderizado. Puedes incluirlo en tu proyecto para obtener un estilo por defecto.

```typescript
import { CSS } from 'jsr:@sonickseven/simply-markdown';

const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);
```

### Uso con Prism

Esta librería funciona perfectamente con [Prism](https://prismjs.com/), un popular resaltador de sintaxis, permitiéndote formatear bloques de código en múltiples lenguajes (TypeScript, JavaScript, Rust, Python, etc.).

**📚 [Revisa todos los lenguajes soportados por Prism aquí](https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript)**

#### Ejemplo de Integración

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown con Resaltado de Sintaxis</title>

    <!-- Tema CSS de Prism -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
    />

    <!-- Cargar Prism.js con más soporte de lenguajes -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-rust.min.js"
    ></script>
  </head>
  <body>
    <div id="markdown-content"></div>

    <script type="module">
      import {
        clipBoard,
        CSS,
        render,
      } from 'https://esm.sh/jsr/@sonickseven/simply-markdown';

      const text_md = `# ¡Hola, mundo!

Este es un párrafo con texto **negrita** y *cursiva*.

## Ejemplo de Código

\`\`\`typescript
function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

---

\`\`\`rust
fn greet(name: string) -> string {
    format!("Hello {}", name)
}

println!(greet("World"));
\`\`\`

---

- Elemento de lista 1
- Elemento de lista 2

[Visita mi sitio web](https://sonickseven.deno.dev)`;

      document.addEventListener('DOMContentLoaded', async () => {
        await new Promise((resol) => setTimeout(resol, 1000));

        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        const contentElement = document.getElementById('markdown-content');
        contentElement.innerHTML = render(text_md);

        const script = document.createElement('script');
        script.textContent = clipBoard;
        document.body.appendChild(script);

        if (window.Prism) {
          Prism.highlightAllUnder(contentElement);
        }
      });
    </script>
  </body>
</html>
```

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras un error o quieres sugerir una nueva característica, por favor abre un issue en GitHub.

## Licencia

`simply-markdown-ts` está licenciado bajo la Licencia MIT.

---

# Português

## simply-markdown-ts

`simply-markdown-ts` é uma biblioteca leve e fácil de usar para renderizar markdown para HTML. É uma excelente alternativa a bibliotecas mais pesadas, oferecendo as funcionalidades essenciais para blogs, documentação e projetos pessoais.

## Instalação

Para usar `simply-markdown-ts` em seu projeto, você pode importá-lo diretamente do JSR:

```typescript
import { render } from 'jsr:@sonickseven/simply-markdown';
```

## Uso

A função `render` é o ponto de entrada da biblioteca. Ela recebe uma string de markdown e retorna o HTML correspondente.

```typescript
import { render } from 'jsr:@sonickseven/simply-markdown';

const markdown = `# Olá, mundo!

Este é um parágrafo com texto em **negrito** e *itálico*.

- Item de lista 1
- Item de lista 2

[Visite meu site](https://example.com)
`;

const html = render(markdown, {
  disableUrlIndex: true,
});
console.log(html);
```

## Características

- **Cabeçalhos**: Suporta cabeçalhos de `#` (H1) a `######` (H6).
- **Formatos de texto**: Negrito (`**texto**`), itálico (`*texto*`) e riscado (`~~texto~~`).
- **Links**: Crie links com `[título](url)`.
- **Imagens**: Insira imagens com `![alt](url)`.
- **Listas**: Listas ordenadas (`1.`) e não ordenadas (`-`, `*`, `+`).
- **Citações**: Crie citações com `>`.
- **Código**: Código em linha (`código`) e em bloco (```).
- **Tabelas**: Crie tabelas com a sintaxe de markdown.
- **Linhas horizontais**: Crie linhas horizontais com `---`, `***` ou `___`.

## API

### `render(markdown: string, options?: renderTypes): string`

- `markdown`: A string de markdown a ser renderizada.
- `options`: (Opcional) Um objeto com opções de renderização.

Retorna o HTML renderizado como uma string.

### `CSS: string`

Uma string com o CSS padrão para estilizar o HTML renderizado. Você pode incluí-lo em seu projeto para obter um estilo padrão.

```typescript
import { CSS } from 'jsr:@sonickseven/simply-markdown';

const style = document.createElement('style');
style.textContent = CSS;
document.head.appendChild(style);
```

### Uso com Prism

Esta biblioteca funciona perfeitamente com [Prism](https://prismjs.com/), um popular destacador de sintaxe, permitindo que você formate blocos de código em múltiplas linguagens (TypeScript, JavaScript, Rust, Python, etc.).

**📚 [Revise todas as linguagens suportadas pelo Prism aqui](https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript)**

#### Exemplo de Integração

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown com Realce de Sintaxe</title>

    <!-- Tema CSS do Prism -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
    />

    <!-- Carregar Prism.js com mais suporte a linguagens -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-rust.min.js"
    ></script>
  </head>
  <body>
    <div id="markdown-content"></div>

    <script type="module">
      import {
        clipBoard,
        CSS,
        render,
      } from 'https://esm.sh/jsr/@sonickseven/simply-markdown';

      const text_md = `# Olá, mundo!

Este é um parágrafo com texto **negrito** e *itálico*.

## Exemplo de Código

\`\`\`typescript
function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

---

\`\`\`rust
fn greet(name: string) -> string {
    format!("Hello {}", name)
}

println!(greet("World"));
\`\`\`

---

- Item da lista 1
- Item da lista 2

[Visite meu website](https://sonickseven.deno.dev)`;

      document.addEventListener('DOMContentLoaded', async () => {
        await new Promise((resol) => setTimeout(resol, 1000));

        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        const contentElement = document.getElementById('markdown-content');
        contentElement.innerHTML = render(text_md);

        const script = document.createElement('script');
        script.textContent = clipBoard;
        document.body.appendChild(script);

        if (window.Prism) {
          Prism.highlightAllUnder(contentElement);
        }
      });
    </script>
  </body>
</html>
```

## Contribuições

Contribuições são bem-vindas. Se você encontrar um erro ou quiser sugerir uma nova funcionalidade, por favor, abra uma issue no GitHub.

## Licença

`simply-markdown-ts` está licenciado sob a Licença MIT.
