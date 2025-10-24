# Agendamento Salão (Manicures)

Pequeno app front-end para agendamento de manicures, usando apenas HTML/CSS/JS (sem backend). Ideal para testes locais e demonstração.

## Visão geral

Este projeto fornece uma interface simples para selecionar uma manicure, escolher data e horário, preencher dados do cliente e salvar agendamentos no `localStorage` do navegador. Também inclui uma visualização (oculta por padrão) para administração dos agendamentos.

Principais recursos:
- Seleção de manicure
- Calendário com navegação entre meses
- Horários disponíveis por manicure
- Salvamento de agendamentos no `localStorage`
- Modal de confirmação com botão para abrir WhatsApp (link configurável)

## Arquivos principais

- `index.html` — aplicação completa (HTML + CSS + JS).
- `1.png` — imagem usada como background/hero (colocada no `body`).

## Como executar (local)

1. Abra o arquivo `index.html` em um navegador moderno (Chrome, Edge, Firefox).
2. A aplicação roda sem servidor — basta abrir o arquivo localmente.

Observação: se preferir testar via servidor local (recarregamentos e CORS mais previsíveis), use um servidor estático simples. Exemplo com Python (opcional):

```powershell
# No PowerShell, a partir do diretório do projeto:
python -m http.server 8000
# Depois abra http://localhost:8000
```

## Configurações úteis

- Número do salão para WhatsApp: está na variável `SALON_WHATSAPP_NUMBER` dentro do `<script>` em `index.html`. Altere para o número no formato internacional sem sinais (ex: `5521999998888`).
- Horários disponíveis e manicures: arrays `timeSlotsAvailable` e `manicures` dentro do script em `index.html`.

## Notas de desenvolvimento

- Os agendamentos são armazenados no `localStorage` com a chave `appointments`.
- Para remover a interface de administração ou proteger com senha, edite a função `setupViewToggles` e a seção com `id="adminView"` em `index.html`.

## Licença

Conteúdo criado para divulgar. Sinta-se livre para adaptar ao seu uso.

---

Arquivo gerado automaticamente pelo assistente; commit correspondente criado no repositório.