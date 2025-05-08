import { paths } from "./routes/paths";

export const CONFIG= {
    serverUrl: import.meta.env.SERVER_URL ?? '',
    stripePublicKey: 'pk_test_51RMSnw2a1uV8iiiDLMnxXCDavpKVz1eh3p9QxT1Mk9rbhqG7wifwZNTr3EHvbmO5WrT7Sxb0kXXQ5vzCEuBKGEj600hSObvQao',


    auth: {
        method: 'jwt',
        skip: false,
        redirectPath: paths.root,
      },
}