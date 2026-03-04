# Feature Specification: Ícones das Habilidades Técnicas

**Feature Branch**: `002-skill-icons`  
**Created**: 2026-03-04  
**Status**: Draft  
**Input**: User description: "Adicionar novas imagens baixadas na internet dos ícones das habilidades técnicas que tem no site"

## Clarifications

### Session 2026-03-04

- Q: Estilo visual dos ícones — coloridos originais, monocromáticos ou mono com hover colorido? → A: Coloridos (logos originais com cores oficiais)
- Q: Fonte principal dos ícones — Devicons, Simple Icons, SVGRepo ou logos oficiais? → A: Devicons (foco em tecnologias de desenvolvimento)
- Q: Abordagem para ícones de conceitos de arquitetura (C4 Model, Hexagonal, Microservices) sem logos oficiais? → A: Criar SVGs simples e customizados representando cada conceito

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visualizar ícones das habilidades técnicas (Priority: P1)

Como visitante do site, ao navegar até a seção "Skills", quero ver ícones reconhecíveis ao lado de cada habilidade técnica listada, para identificar visualmente e rapidamente as tecnologias que o Nataniel domina.

**Why this priority**: Esta é a funcionalidade principal da feature. Sem os ícones, os badges de skills exibem apenas um placeholder genérico, prejudicando a percepção profissional e a experiência visual do site.

**Independent Test**: Pode ser testado abrindo o site no navegador, navegando até a seção "Skills" e verificando que cada habilidade exibe seu ícone correspondente em vez de um placeholder.

**Acceptance Scenarios**:

1. **Given** o visitante acessa o site, **When** navega até a seção "Skills", **Then** cada habilidade técnica exibe um ícone visual reconhecível da tecnologia correspondente
2. **Given** o visitante visualiza a seção "Skills", **When** observa qualquer badge de habilidade, **Then** o ícone exibido é visualmente coerente com a identidade da tecnologia representada (ex: o logo do Java para Java, o logo do React para React)

---

### User Story 2 - Carregamento adequado dos ícones (Priority: P2)

Como visitante do site em qualquer dispositivo ou velocidade de conexão, quero que os ícones das habilidades carreguem de forma rápida e sem erros visuais, para ter uma experiência fluida.

**Why this priority**: A qualidade e performance do carregamento dos ícones impactam diretamente a experiência do usuário e a percepção de profissionalismo do site.

**Independent Test**: Pode ser testado abrindo o site em diferentes dispositivos (desktop, tablet, mobile) e verificando que todos os ícones carregam corretamente sem distorções.

**Acceptance Scenarios**:

1. **Given** o visitante acessa o site em um dispositivo mobile, **When** a seção Skills é renderizada, **Then** todos os ícones são exibidos com proporções corretas e sem distorção
2. **Given** um ícone falha ao carregar por qualquer motivo, **When** o navegador tenta renderizar o badge, **Then** um fallback visual aceitável é exibido (primeira letra do nome da tecnologia)
3. **Given** o visitante acessa o site, **When** a página carrega, **Then** os ícones não causam atraso perceptível no carregamento da seção Skills

---

### User Story 3 - Consistência visual dos ícones (Priority: P3)

Como visitante do site, quero que todos os ícones das habilidades tenham um estilo visual consistente entre si, para que a seção Skills pareça profissional e organizada.

**Why this priority**: A consistência visual eleva a qualidade percebida do portfólio. Ícones com estilos díspares podem parecer descuidados.

**Independent Test**: Pode ser testado visualmente comparando os ícones lado a lado na seção Skills e verificando uniformidade de tamanho e estilo.

**Acceptance Scenarios**:

1. **Given** o visitante visualiza a seção Skills, **When** compara os ícones entre categorias diferentes, **Then** todos possuem dimensões visuais semelhantes (uniformidade de tamanho) mesmo usando cores distintas
2. **Given** o visitante visualiza a seção Skills em modo claro, **When** observa os ícones coloridos, **Then** todos são claramente visíveis contra o fundo da página

---

### Edge Cases

- O que acontece se um arquivo de ícone estiver corrompido ou ausente? O sistema deve exibir o fallback (placeholder com a inicial da tecnologia)
- O que acontece se o visitante usar um navegador que não suporta SVG? Os ícones em formato SVG devem ter fallback adequado ou usar formato alternativo (PNG)
- Como os ícones se comportam em dispositivos com tela retina/HiDPI? Devem manter nitidez visual

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O site DEVE exibir um ícone visual para cada uma das 19 habilidades técnicas listadas na seção Skills
- **FR-002**: Cada ícone DEVE representar fielmente a identidade visual da tecnologia correspondente (logo oficial ou amplamente reconhecido)
- **FR-003**: Os ícones DEVEM estar armazenados localmente no repositório do site, no diretório `assets/images/tech-icons/`
- **FR-004**: Os nomes dos arquivos de ícone DEVEM corresponder ao padrão já definido no campo `icon` de cada skill em `data.js` (ex: `java.svg`, `react.svg`, `mongodb.svg`)
- **FR-005**: O site DEVE manter o mecanismo de fallback existente para ícones que falhem ao carregar (placeholder com inicial da tecnologia)
- **FR-006**: Os ícones DEVEM ser obtidos de fontes públicas da internet e respeitar licenças de uso livre ou aberto
- **FR-007**: Cada ícone DEVE ter dimensões adequadas para exibição em badge (mínimo 48x48 pixels) sem perda de qualidade
- **FR-008**: Os ícones DEVEM manter boa legibilidade visual em tamanhos reduzidos (como exibidos nos skill badges)

### Key Entities

- **Ícone de Habilidade (Skill Icon)**: Arquivo de imagem que representa visualmente uma tecnologia. Atributos: nome do arquivo, formato (SVG preferencial, PNG como alternativa), dimensões, tecnologia associada
- **Habilidade Técnica (Technical Skill)**: Já existente em `data.js`. Cada skill possui um campo `icon` que aponta para o caminho esperado do ícone em `assets/images/tech-icons/`

### Inventário de Ícones Necessários

As 19 habilidades técnicas que necessitam de ícones são:

| Categoria              | Skill                    | Arquivo Esperado       |
| ---------------------- | ------------------------ | ---------------------- |
| Linguagens             | Java                     | java.svg               |
| Linguagens             | PHP                      | php.svg                |
| Linguagens             | Python                   | python.svg             |
| Linguagens             | JavaScript               | javascript.svg         |
| Linguagens             | TypeScript               | typescript.svg         |
| Frameworks Backend     | Spring Framework         | spring.png             |
| Frameworks Backend     | Laravel                  | laravel.svg            |
| Frameworks Backend     | Flask                    | flask.svg              |
| Frameworks Frontend    | React                    | react.svg              |
| Frameworks Frontend    | Angular                  | angular.svg            |
| Mobile                 | React Native             | react-native.svg       |
| Mobile                 | Ionic                    | ionic.svg              |
| Bancos de Dados        | MongoDB                  | mongodb.svg            |
| Bancos de Dados        | MySQL                    | mysql.svg              |
| Bancos de Dados        | Oracle                   | oracle.svg             |
| Bancos de Dados        | Cassandra                | cassandra.svg          |
| Arquitetura            | C4 Model                 | c4-model.svg           |
| Arquitetura            | Hexagonal Architecture   | hexagonal.svg          |
| Arquitetura            | Microservices            | microservices.svg      |

## Assumptions

- A fonte principal dos ícones será o Devicons (https://devicon.dev/), por ser focado em tecnologias de desenvolvimento; para ícones não disponíveis no Devicons, usar fontes alternativas como Simple Icons, SVGRepo ou logos oficiais
- O formato SVG é preferencial por ser vetorial e escalável; PNG será usado apenas quando SVG não estiver disponível (como Spring Framework que já está definido como `.png`)
- Os ícones DEVEM usar suas versões coloridas originais (logos oficiais com cores) para maximizar reconhecimento visual; não será aplicada conversão monocromática
- O diretório `assets/images/tech-icons/` será criado como parte desta feature
- Nenhuma alteração no código JavaScript é necessária, pois os caminhos dos ícones já estão definidos em `data.js`
- Os ícones para conceitos de arquitetura (C4 Model, Hexagonal, Microservices) serão SVGs simples e customizados: hexágono para Hexagonal Architecture, diagrama de camadas para C4 Model, e blocos conectados para Microservices

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% das 19 habilidades técnicas exibem um ícone visual ao invés de placeholder ao carregar a seção Skills
- **SC-002**: Todos os ícones carregam corretamente sem erros 404 no console do navegador
- **SC-003**: Os ícones são visualmente reconhecíveis em tamanho de badge (48x48 pixels) em desktop e mobile
- **SC-004**: O tempo de carregamento total dos ícones não adiciona mais do que 1 segundo ao tempo de load da página
- **SC-005**: A seção Skills mantém aparência consistente e profissional em resoluções de 320px até 1920px de largura
