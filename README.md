# Elite Group Carpentry Inc. — Website (Projeto 1)

Site estático (HTML + CSS + JavaScript), pronto para GitHub Pages. Réplica fiel do layout aprovado.

## Estrutura

```
elite-site/
├── index.html                ← a página inteira
├── assets/
│   ├── css/styles.css         ← todo o estilo (cores, layout, responsivo)
│   ├── js/script.js           ← menu, carrossel, reviews, formulário, animações
│   └── img/                    ← imagens (placeholders da marca por enquanto)
│       ├── hero.svg            ← TROCAR pela foto principal (gazebo/pergola)
│       ├── service-gazebo.svg  ← TROCAR pela foto de gazebo
│       ├── service-pergola.svg ← TROCAR pela foto de pergola
│       ├── service-playset.svg ← TROCAR pela foto de playset
│       ├── service-shed.svg    ← TROCAR pela foto de shed
│       ├── team.svg            ← TROCAR pela foto da equipe
│       ├── project-1..4.svg    ← TROCAR pelas fotos de projetos recentes
│       └── favicon.svg         ← ícone da marca (pode manter)
```

## 1) Trocar os placeholders pelas suas fotos reais

O **banner principal (hero)** e os cards de **Gazebo** e **Pergola** já vêm com fotos
profissionais de banco de imagens (Unsplash — uso comercial livre, sem atribuição),
carregadas direto da internet. Se a internet/Unsplash falhar, o site cai automaticamente
no placeholder da marca (não quebra).

Os cards de **Playset** e **Shed** e os **Projetos Recentes** estão com placeholders da
marca (charcoal + dourado) de propósito — o ideal é colocar AÍ as fotos dos seus
projetos reais (gazebos, pergolas, playsets e sheds que a Elite Group construiu). Foto
real de obra sua gera muito mais confiança e ajuda no Google do que foto de banco.

Para usar suas fotos:

- Coloque sua foto em `assets/img/` (ex.: `hero.jpg`).
- Abra `index.html` e troque o `src` da imagem desejada por `assets/img/hero.jpg`.
  (No hero, troque a URL `https://images.unsplash.com/...` por `assets/img/hero.jpg`.)
- Tamanhos recomendados: hero `1600×1000`, cards `800×600`, projetos `800×600`, equipe `900×700`.
- Use `.jpg` (mais leve para fotos) e otimize antes (TinyPNG, Squoosh).

## 2) Fazer o formulário enviar de verdade

Por padrão, o botão "Send My Estimate Request" abre o app de e-mail do visitante já preenchido.
Para receber por e-mail automaticamente (com fotos anexadas), use o Formspree (plano grátis):

1. Crie conta em https://formspree.io e crie um form novo.
2. Copie o ID do form (ex.: `xrgkpqab`).
3. Abra `assets/js/script.js` e cole no topo:
   ```js
   formspreeId: "xrgkpqab",
   ```
4. Pronto — os envios passam a cair no seu e-mail, com as fotos.

## 3) Ajustar dados de contato

Telefone, e-mail e links já estão como `(857) 702-9366` e `elite.group.carpentry@gmail.com`.
Para mudar: procure por esses valores em `index.html` (aparecem no topo, hero, formulário e rodapé)
e no `script.js` (objeto `CONFIG`).
O Instagram está com link genérico `https://instagram.com/` — troque pela sua URL real.

## 4) Botão "Leave Us a Review"

Em `index.html`, no botão `LEAVE US A REVIEW`, troque `REPLACE_WITH_YOUR_PLACE_ID`
pelo link de avaliação do seu Google Business (isso será gerado no Projeto 2).

## 5) Publicar no GitHub Pages

1. Crie um repositório (ex.: `elite-group-site`) e suba todos os arquivos.
2. Settings → Pages → Source: `Deploy from a branch` → branch `main` → pasta `/root`.
3. Em alguns minutos o site fica no ar em `https://SEU-USUARIO.github.io/elite-group-site/`.
4. Para domínio próprio (ex.: `elitegroupcarpentry.com`): Settings → Pages → Custom domain.

---

Próximos: **Projeto 2** (SEO + Google Business + Google Reviews) e **Projeto 3** (Marketing + Instagram + Tráfego Gratuito).
