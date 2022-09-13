# MVP screencast video of web3 login and smart contract interaction

I had to deploy this MVP to gcp the get the GPS validation work. The youtube short covers the web3 login and interaction with event token collection.

https://youtube.com/shorts/_F3jQoyDf6E?feature=share

## Keywords

- Google Cloud Run
- Next.js
- TypeScript

## Development

```
yarn install
yarn dev
```

## Deploy

https://cloud.google.com/run/docs/quickstarts/build-and-deploy

### Build image

```
gcloud builds submit \
  --tag gcr.io/$(gcloud config get-value project)/catch-game-dapp
```

### Deploy image

```
gcloud run deploy \
  --image gcr.io/$(gcloud config get-value project)/catch-game-dapp \
  --platform managed
```
