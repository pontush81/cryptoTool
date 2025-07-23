# Replicate AI Integration Setup

Denna guide förklarar hur du konfigurerar och använder Replicate AI integration i crypto-analysis-tool.

## Vad är Replicate?

Replicate är en plattform som gör det enkelt att köra AI-modeller i molnet. Genom vår integration kan du:

- **Generera marknadsinsikter** med AI-baserad analys av kryptovalutadata
- **Skapa utbildningsmaterial** om krypto-koncept på olika nivåer
- **Generera visualiseringar** och grafiska representationer
- **Analysera text** med avancerade språkmodeller

## Setup

### 1. Skaffa Replicate API Token

1. Gå till [replicate.com](https://replicate.com)
2. Skapa ett konto eller logga in
3. Navigera till din profil → API tokens
4. Skapa en ny API token
5. Kopiera token (den kommer att se ut som `r8_...`)

### 2. Konfigurera Environment Variables

1. Öppna `.env.local` filen i projektets rot
2. Lägg till din Replicate API token:

```env
REPLICATE_API_TOKEN=r8_your_actual_token_here
```

3. Spara filen
4. Starta om utvecklingsservern:

```bash
npm run dev
```

## Hur man använder AI-assistenten

### 1. Öppna AI Assistant

1. Gå till Dashboard
2. Klicka på "AI Assistant" fliken
3. Du kommer nu se tre huvudfunktioner:

### 2. Market Insights

**Vad det gör:** Analyserar aktuell marknadsdata och ger AI-baserade insikter.

**Hur man använder:**
1. Välj "Market Insights" fliken
2. Skriv en fråga som "What are the current trends and risks?"
3. Klicka "Generate Insight"
4. AI:n kommer att analysera den aktuella marknadsdatan och ge detaljerade insikter

**Exempel på frågor:**
- "What are the key opportunities in the current market?"
- "Analyze the risk factors for Bitcoin right now"
- "What does the market sentiment look like today?"

### 3. Educational Content

**Vad det gör:** Skapar utbildningsmaterial om krypto-koncept.

**Hur man använder:**
1. Välj "Education" fliken
2. Ange ett ämne (ex: "DeFi", "Blockchain basics", "NFTs")
3. Välj nivå (Beginner, Intermediate, Advanced)
4. Klicka "Create Content"

**Exempel på ämnen:**
- "Smart contracts"
- "Yield farming"
- "Layer 2 solutions"
- "Market making"

### 4. Image Generation

**Vad det gör:** Genererar professionella visualiseringar och bilder.

**Hur man använder:**
1. Välj "Visualizations" fliken
2. Beskriv vad du vill ha (ex: "Bitcoin price chart", "DeFi infographic")
3. Klicka "Generate Image"
4. AI:n skapar en professionell bild baserat på din beskrivning

## Tillgängliga AI-modeller

Vår integration använder följande modeller:

### Text Analysis & Insights
- **Llama 2 70B Chat**: Avancerad textanalys och generering
- Används för marknadsinsikter och utbildningsinnehåll

### Image Generation
- **FLUX.1 [schnell]**: Snabb bildgenerering
- **Stable Diffusion**: Högkvalitativ bildgenerering
- Automatiskt optimerad för kryptovaluta-relaterat innehåll

## API Endpoints

Integreringen exponerar följande endpoints:

### GET /api/replicate
- `?action=search-models&query=text` - Sök efter AI-modeller
- `?action=get-models` - Hämta populära modeller

### POST /api/replicate

```json
{
  "action": "market-insight",
  "marketData": {...},
  "insightPrompt": "What are the trends?"
}
```

```json
{
  "action": "educational-content",
  "topic": "DeFi",
  "level": "beginner"
}
```

```json
{
  "action": "generate-image",
  "prompt": "Bitcoin price chart",
  "width": 1024,
  "height": 768
}
```

## Felsökning

### API Token fungerar inte
- Kontrollera att token är korrekt kopierad till `.env.local`
- Se till att det inte finns extra mellanslag
- Starta om utvecklingsservern

### Slow Response Times
- Replicate AI-modeller kan ta 10-30 sekunder att köra
- Detta är normalt för komplexa AI-operationer
- Undvik att klicka flera gånger

### Rate Limits
- Replicate har rate limits på sin gratis tier
- Överväg att uppgradera ditt Replicate-konto för högre limits

## Kostnader

- Replicate tar betalt per API-anrop
- Textanalys: ~$0.01-0.05 per anrop
- Bildgenerering: ~$0.05-0.10 per bild
- Kontrollera aktuella priser på replicate.com

## Best Practices

1. **Specifika Prompts**: Ju mer specifik du är, desto bättre resultat
2. **Testa Olika Nivåer**: Prova beginner/intermediate/advanced för utbildningsinnehåll
3. **Kombinera med Data**: AI-insikter är bäst när de kombineras med aktuell marknadsdata
4. **Spara Resultat**: Kopiera bra resultat - AI-svar kan variera mellan anrop

## Säkerhet

- API-nyckeln lagras säkert i miljövariabler
- Inga känsliga data skickas till Replicate
- All kommunikation sker över HTTPS

## Support

För support:
1. Kolla först denna dokumentation
2. Se Replicate's dokumentation på replicate.com/docs
3. Kontrollera `.env.local` konfiguration
4. Restart utvecklingsservern

---

*Senast uppdaterad: 2025-01-23* 