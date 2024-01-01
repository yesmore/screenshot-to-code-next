# screenshot-to-code-next

> Refactoring [screenshot-to-code](https://github.com/abi/screenshot-to-code) with nextjs14

This simple app converts a screenshot to code (HTML/Tailwind CSS, or React or Bootstrap). It uses GPT-4 Vision to generate the code and DALL-E 3 to generate similar-looking images. You can now also enter a URL to clone a live website!

## 🛠 Getting Started

```bash
git clone https://github.com/yesmore/screenshot-to-code-next

cd screenshot-to-code-next
pnpm i
pnpm dev
```

## Self Hosting

You can deploy your own version of screenshot-to-code-next to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-link=https%3A%2F%2Fgithub.com%2Fyesmore%2Fscreenshot-to-code-next&env=OPENAI_BASE_URL&env=OPENAI_API_KEY&envDescription=Find%20your%20OpenAI%20API%20Key%20by%20click%20the%20right%20Learn%20More%20button.%20%20&envLink=https%3A%2F%2Fplatform.openai.com%2Faccount%2Fapi-keys&project-name=screenshot-to-code-next&repository-name=screenshot-to-code-next)

## Environment variables

| Prop              | Type     | Description                                       | Example                     |
| ----------------- | -------- | ------------------------------------------------- | --------------------------- |
| `OPENAI_API_KEY`  | `string` | The API Key to use for the OpenAI completion API. | `sk-xxx`                    |
| `OPENAI_BASE_URL` | `string` | OpenAI url                                        | `https://api.openai.com/v1` |


## License

[Apache-2.0](./LICENSE) © [yesmore](https://github.com/yesmore)

