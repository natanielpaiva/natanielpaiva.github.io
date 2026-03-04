# Feature Specification: Contact Form — Transparent Google Forms Integration

**Feature Branch**: `003-contact-google-form`  
**Created**: 2026-03-04  
**Status**: Draft  
**Input**: User description: "A página na parte de contatos deve enviar os dados do formulário diretamente para o Google Forms de forma transparente para o usuário (https://forms.gle/sdG2nAFgvgpraGr2A)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visitante envia mensagem pelo formulário do site (Priority: P1)

Um visitante do portfólio deseja entrar em contato com Nataniel. Ele preenche o formulário de contato diretamente no site (Nome, Email, Assunto, Mensagem) e clica em "Enviar Mensagem". Os dados são enviados automaticamente para o Google Forms em segundo plano, e o visitante recebe uma confirmação de sucesso no próprio site — sem jamais saber que o Google Forms é o backend.

**Why this priority**: Este é o fluxo principal da feature. Sem ele, não há meio de receber mensagens dos visitantes. A experiência deve ser idêntica à atual para o usuário, mudando apenas o destino dos dados (de Formspree para Google Forms).

**Independent Test**: Pode ser testado preenchendo o formulário no site, clicando em enviar e verificando que (1) o visitante vê mensagem de sucesso no site e (2) a resposta aparece na planilha vinculada ao Google Form.

**Acceptance Scenarios**:

1. **Given** o visitante está na seção de contato do site, **When** preenche todos os campos obrigatórios (Nome, Email, Mensagem) e clica em "Enviar Mensagem", **Then** os dados são enviados ao Google Forms em segundo plano e uma mensagem de sucesso é exibida no formulário do site.
2. **Given** o visitante preencheu e enviou o formulário com sucesso, **When** verifica a planilha do Google Forms, **Then** os dados (Nome, Email, Assunto, Mensagem) estão registrados corretamente.
3. **Given** o visitante está na seção de contato, **When** tenta enviar o formulário sem preencher os campos obrigatórios, **Then** mensagens de validação são exibidas indicando os campos faltantes — nenhum envio é feito ao Google Forms.

---

### User Story 2 — Visitante recebe feedback adequado em caso de falha (Priority: P2)

Se o envio ao Google Forms falhar (problema de rede, serviço indisponível), o visitante deve receber uma mensagem de erro amigável e ter a opção de tentar novamente, sem perder os dados já preenchidos.

**Why this priority**: Garante uma experiência robusta. Sem tratamento de erros, o visitante pode pensar que a mensagem foi enviada quando na verdade não foi.

**Independent Test**: Pode ser testado simulando falha de rede (modo offline do navegador) e verificando que a mensagem de erro é exibida e os dados permanecem preenchidos no formulário.

**Acceptance Scenarios**:

1. **Given** o visitante preencheu o formulário, **When** clica em enviar mas o envio falha (problema de rede), **Then** uma mensagem de erro amigável é exibida informando que o envio não foi possível.
2. **Given** o envio falhou, **When** o visitante visualiza o formulário, **Then** todos os dados previamente preenchidos permanecem nos campos (não são limpos).
3. **Given** o envio falhou, **When** o visitante clica em "Enviar Mensagem" novamente, **Then** o sistema tenta reenviar os dados.

---

### User Story 3 — Visitante acessa contato via botões do hero ou CTA (Priority: P3)

Os botões "Entre em Contato" espalhados pela página (hero section, seção de experiência, etc.) devem continuar funcionando e levar o visitante à seção de contato com o formulário.

**Why this priority**: Garante consistência de navegação em toda a página, mas depende do formulário principal estar implementado.

**Independent Test**: Pode ser testado clicando em cada botão/link "Entre em Contato" da página e verificando que todos levam à seção de contato.

**Acceptance Scenarios**:

1. **Given** o visitante está na hero section, **When** clica no botão "Entre em Contato", **Then** a página rola até a seção de contato com o formulário visível.
2. **Given** o visitante está na seção de experiência, **When** clica no link "Entre em Contato", **Then** a página rola até a seção de contato com o formulário visível.

---

### Edge Cases

- O que acontece se o Google Forms estiver temporariamente indisponível? O visitante deve ver uma mensagem de erro amigável no site, sem exposição de detalhes técnicos, e os dados preenchidos devem ser preservados.
- O que acontece se o visitante enviar o formulário várias vezes seguidas? O botão de envio deve ser desabilitado durante o envio (estado loading) para prevenir submissões duplicadas.
- O que acontece em dispositivos móveis? O formulário deve continuar responsivo e funcional como já é atualmente.
- O que acontece se o visitante tiver JavaScript desabilitado? O formulário não funcionará — este é o comportamento esperado, pois todo o site já depende de JavaScript.
- O que acontece com requisições CORS? O envio ao Google Forms via fetch/XHR pode ser bloqueado por CORS. O sistema deve tratar isso adequadamente (ex: envio via iframe oculto ou modo no-cors).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O formulário de contato do site DEVE manter os mesmos campos atuais: Nome (obrigatório), Email (obrigatório), Assunto (opcional) e Mensagem (obrigatório).
- **FR-002**: Ao submeter o formulário, os dados DEVEM ser enviados automaticamente ao Google Forms em segundo plano, sem redirecionar o visitante para fora do site.
- **FR-003**: O mapeamento entre os campos do site e os campos do Google Form DEVE ser: Nome → entry.437236891, Email → entry.572187819, Assunto → entry.1008170530, Mensagem → entry.1210054035.
- **FR-004**: A validação dos campos (nome mínimo 2 caracteres, email válido, mensagem mínimo 10 caracteres) DEVE ser mantida no lado do cliente antes do envio.
- **FR-005**: Após envio bem-sucedido, o formulário DEVE exibir mensagem de confirmação e limpar os campos.
- **FR-006**: Em caso de falha no envio, o formulário DEVE exibir mensagem de erro amigável e preservar os dados preenchidos.
- **FR-007**: O botão de envio DEVE exibir estado de carregamento (loading) durante o envio, impedindo submissões duplicadas.
- **FR-008**: A integração com o Formspree DEVE ser substituída pela integração com o Google Forms — o contrato com Formspree deixa de ser necessário.
- **FR-009**: A experiência DEVE ser transparente para o visitante — nenhuma referência visual ou textual ao Google Forms deve existir no site.
- **FR-010**: As informações de contato existentes (email, localização, disponibilidade) e links de redes sociais DEVEM ser preservadas na seção.
- **FR-011**: A navegação interna da página (links âncora para `#contact`) DEVE continuar funcionando normalmente.

### Key Entities

- **Google Form Endpoint**: URL de destino para submissão dos dados do formulário. ID do formulário: `1FAIpQLSfekOv2-RyIlc9VpWnMUZ2NvIrJARLTKOETH8q9LnYxpgv7Sw`. Recebe campos via entry IDs numéricos.
- **Campo de formulário**: Cada campo do site possui um correspondente no Google Form, mapeado via entry ID. Campos: Nome (entry.437236891), Email (entry.572187819), Assunto (entry.1008170530), Mensagem (entry.1210054035).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% dos envios bem-sucedidos do formulário do site resultam em respostas registradas na planilha vinculada ao Google Form.
- **SC-002**: O visitante recebe feedback visual (sucesso ou erro) em até 5 segundos após clicar em "Enviar Mensagem".
- **SC-003**: A seção de contato carrega sem erros no console do navegador.
- **SC-004**: O visitante não é redirecionado para fora do site em nenhum momento do fluxo de envio.
- **SC-005**: Todos os links internos ("Contato" na navbar, "Entre em Contato" no hero) continuam direcionando o visitante à seção de contato.
- **SC-006**: A seção de contato mantém aparência responsiva e funcional em telas de 320px a 1920px de largura.
- **SC-007**: Os dados preenchidos são preservados no formulário em caso de falha no envio.

## Assumptions

- O Google Form (https://forms.gle/sdG2nAFgvgpraGr2A) já está criado, configurado e pronto para receber respostas — nenhuma alteração é necessária no formulário do Google.
- Os entry IDs do Google Form (437236891, 572187819, 1008170530, 1210054035) são estáveis e não mudam sem que o formulário seja recriado.
- O contrato com a Formspree pode ser descontinuado, já que será substituído pelo Google Forms.
- As informações de contato (email, localização, disponibilidade, redes sociais) devem permanecer visíveis na página.
- O layout e estilo visual do formulário no site devem permanecer iguais aos atuais — a mudança é apenas no backend de envio.
- O Google Forms aceita submissões cross-origin via método POST no endpoint `/formResponse` — caso CORS bloqueie, uma abordagem alternativa (iframe oculto ou modo no-cors) deve ser usada.
